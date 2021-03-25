import React, { createContext, useContext, useEffect, useState } from 'react'
import { getClient } from '../utils/sanity'
import { singleProductQuery } from '../utils/sanityGroqQueries'

const BC_CART_ID = 'bc_cart_id'

const initialStoreState = {
  isCartOpen: false,
  isUpdating: false,
  cart: {
    id: null,
    line_items: [],
    total: 0
  }
}

const BigCommerceContext = createContext({
  store: initialStoreState,
  setStore: () => null
})

/* ---------- */
/* Actions    */
/* ---------- */

const setCartState = async (cart, setStore, openCart) => {

// Save cart to localstorage
  if (typeof window !== `undefined` && typeof cart !== 'undefined') {
    localStorage.setItem(BC_CART_ID, cart.id)
  }

  //fetch full product data from Sanity
  const line_items = await Promise.all(
    Object.values(cart.line_items).map(async itemCategory => (
      await Promise.all(itemCategory.map(async item => {
        const sanityID = `imported-BC-${item.product_id}`
        const sanityProduct = await getClient().fetch(singleProductQuery(sanityID))
        return { ...sanityProduct, quantity: item.quantity, lineID: item.id }
      }))
    ))
  )

  // update state
  setStore((prevState) => {
    return {
      ...prevState,
      isUpdating: false,
      isCartOpen: openCart ? true : prevState.isCartOpen,
      cart: {
        id: cart.id,
        line_items: line_items.flat(),
        total: cart.cart_amount
      },
    }
  })
}


/* ------------------ */
/* Context Wrapper    */
/* ------------------ */

const BigCommerceContextProvider = ({ children }) => {
  const [store, setStore] = useState(initialStoreState)
  const [initStore, setInitStore] = useState(false)

  useEffect(() => {

    if (initStore === false) {
      const initializeCart = async () => {
        const existingCartID =
          typeof window !== 'undefined'
            ? localStorage.getItem(BC_CART_ID)
            : false

        if (existingCartID && existingCartID != 'undefined' && existingCartID != 'null') {
          try {
            // fetch cart from BC
            const existingCart = await fetch(`/api/bigcommerce?cartID=${existingCartID}`)
              .then(res => res.json())
              .then(res => res.data)

            setCartState(existingCart, setStore)
            
            return
          
            //TODO: in a real world context, you probably want to check if
            //all line items are available, the cart is not already purchased, etc. 
            
          } catch (e) {
            //endpoint came back with error, remove the invalid cart id from localStorage
            localStorage.setItem(BC_CART_ID, null)
          }
        }

        //if no cart id, create a new cart
        const newCart = await fetch('/api/bigcommerce', {method: 'POST'})
          .then(res => res.json())
          .then(res => res.data)

        setCartState(newCart, setStore)
      }

      initializeCart()
      setInitStore(true)
    }
  }, [initStore, store, setStore])

  return (
    <BigCommerceContext.Provider
      value={{
        store,
        setStore
      }}>
      {children}
    </BigCommerceContext.Provider>
  )
}


/* ------------------ */
/* Context Helpers    */
/* ------------------ */
function useStore() {
  const { store } = useContext(BigCommerceContext)
  return store
}

function useToggleCart() {
  const {
    store: { isCartOpen },
    setStore,
  } = useContext(BigCommerceContext)

  async function toggleCart() {
    setStore((prevState) => {
      return { ...prevState, isCartOpen: !isCartOpen }
    })
  }
  return toggleCart
}


// Add an item to the checkout cart
function useAddItem() {
  const {
    store: { cart },
    setStore,
  } = useContext(BigCommerceContext)

  async function addItem(sanityProductID) {

    //start update process
    setStore((prevState) => {
      return { ...prevState, isUpdating: true }
    })

    //make valid input for the add line item endpoint
    const BCItem = {
      //variant_id is required by BC products with variants
      //be sure to add it in your use case!
      product_id: parseInt(sanityProductID.replace('imported-BC-', '')),
      quantity: 1
    }


    // Add it to the BC cart
    const newCart = await fetch(`/api/bigcommerce?cartID=${cart.id}`, {
        method: 'PUT',
        body: JSON.stringify({line_items: [BCItem]})
      })
        .then(res => res.json())
        .then(res => res.data)

    // Update our global store states
    setCartState(newCart, setStore, true)
  }

  return addItem

}

// Add an item to the checkout cart
function useDeleteItem() {
  const {
    store: { cart },
    setStore,
  } = useContext(BigCommerceContext)

  async function deleteItem(sanityProductID) {

    //start update process
    setStore((prevState) => {
      return { ...prevState, isUpdating: true }
    })

    //transform ID again
    const bigCommerceID = sanityProductID.replace('imported-BC-', '')

    // Remove it from the BC cart
    const newCart = await fetch(`/api/bigcommerce?cartID=${cart.id}&itemID=${bigCommerceID}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(res => res.data)

    // Update our global store states
    setCartState(newCart, setStore, true)
  }

  return deleteItem

}

export {
  BigCommerceContextProvider,
  useStore,
  useToggleCart,
  useAddItem,
  useDeleteItem
}
