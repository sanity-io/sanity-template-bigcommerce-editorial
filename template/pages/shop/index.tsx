import { Box, Grid, Heading } from '@sanity/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanityClient } from '$utils/sanity'
import { Category, Product } from '../../types'
import { NavBar, ShopGrid } from '$components'
import { shopQuery }  from '$utils/sanityGroqQueries'

export default function Shop({categories, products}
  : {categories: Category[], products: Product[]}) {

    //TODO: promotion/campaign up top
    return (
      <>
        <NavBar categories={categories} />
        <Box paddingY={3}> 
          <ShopGrid sectionTitle={"All Products"} products={products} />)
        </Box>
      </> 
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  return ({
    props: {
      categories: await sanityClient.fetch(`*[_type == 'category']{name,'slug': slug.current}`),
      products: await sanityClient.fetch(shopQuery) 
    }
  })

}
