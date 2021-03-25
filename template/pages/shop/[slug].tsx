import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'

import { Stack, Inline, Button, Box, Heading, Text, Badge, Flex, Grid } from '@sanity/ui'

import { Product, Category } from '../../types'
import { useStore, useAddItem } from '../../contexts/bigcommerce-context'

import { getClient, urlFor, PortableText, usePreviewSubscription } from '$utils/sanity'
import { handleLocaleField } from '$utils/helpers'
import { NavBar, SubsectionBar, ResponsiveFixedRatioImage } from '$components'

import { productDetailPageQuery }  from '$utils/sanityGroqQueries'

export default function ProductPage({categories, productData, preview}
  : {categories: Category[], productData: Product, preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !productData?.slug) {
    return <Error statusCode={404} />;
  }

  const {data: product} = usePreviewSubscription(productDetailPageQuery, {
    params: {slug: router.query.slug},
    initialData: productData,
    enabled: preview || router.query.preview !== null,
  })

  const addItemToCart = useAddItem() 

  return (
    <>
      <NavBar categories={categories} />
      <Grid columns={[1, 1, 1, 2]}>
        <Flex flex={1} justify='center' margin={5} padding={[2, 3, 5]}>
          <ResponsiveFixedRatioImage imageUrl={urlFor(product.image)} />
        </Flex> 
        <Box flex={1} margin={4} style={{minWidth: '200px'}}>
          <Stack space={4} >
            <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
              { product.manufacturer }
            </Text>
            <Heading size={4}>
              { handleLocaleField('name', product, router.locale) }
            </Heading>
            <Text>
              <Inline space={2}>
                <span>US ${product.price}</span>
                <Badge mode='outline' tone='primary'>Free Shipping!</Badge>
              </Inline>
            </Text>
            <hr />
            <Button text='Add to Bag' mode='ghost' 
              //don't let people add NON BigCommerce (e.g., test) items!
              disabled={ product._id.search('imported-BC')}
              onClick={() => addItemToCart(product._id)} />
            <hr /> 
            <Heading size={1}>
              Product Details
            </Heading>
            <Text>
              <PortableText blocks={ handleLocaleField('description', product, router.locale) } />
            </Text>

          </Stack>
        </Box>
      </Grid> 
      <SubsectionBar hub="" subsectionArticles={{name: "See Related Articles", articles: product.relatedArticles}} /> 
    </>
    )
}
            
export const getStaticPaths: GetStaticPaths = async ({locales}) => {
  const productSlugs = await getClient().fetch(
    `*[_type == "product"]{
      'slug': slug.current
    }`)

  const slugsWithLocales = locales.map(locale => (
              productSlugs.map(slug => (
                {params: {...slug}, locale: locale}
              ))
  )).flat()

    return {
      paths: slugsWithLocales,
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {
  const product = await getClient(preview).fetch(productDetailPageQuery, params)

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      productData: product,
      preview
    }
  })
}
