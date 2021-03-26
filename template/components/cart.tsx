import React from 'react'
import { Dialog, Box, Text } from '@sanity/ui'

import { useStore, useToggleCart } from '../contexts/bigcommerce-context'
import { CartProductDisplay } from '$components'

export const Cart = () => {
  const { isCartOpen, cart } = useStore()
  const toggleCart = useToggleCart()
  let cartDisplay;

  const products = cart.line_items.map((product, i) => (
      <CartProductDisplay
        key={`cart-${i}`}
        product={product}
        />
  ))

  if (isCartOpen) {
    cartDisplay = (
      <Dialog
        header='Your cart'
        id='cart'
        onClose={toggleCart}
        zOffset={1000}
        style={{minHeight: '300px'}}>
          <Box padding={4}
            style={{minHeight: '200px'}}>
            { products } 
          </Box>
          <Box padding={4}
            style={{minHeight: '100px'}}>
            <Text>
              Cart Total: ${cart.total}
            </Text>
            </Box>
      </Dialog>
    )
  } else {
    cartDisplay = <span />
  }

  return  (
    <React.Fragment>
      {cartDisplay}
    </React.Fragment>  
    )
}
