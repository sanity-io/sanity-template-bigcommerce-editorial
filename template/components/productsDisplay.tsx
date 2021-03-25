import { Flex, Stack, Grid, Text, Box } from '@sanity/ui'
import { ProductDisplay } from '$components'
import { urlFor, PortableText } from '$utils/sanity'
import Link from 'next/link'
import { Product } from '../types'

export function ProductsDisplay({products, fullSize, copy}
  : {products: Product[], fullSize: boolean, copy: any[] | any}) {
  let displayHorizontal: boolean;
  let productDisplays;

  if (!products) { return <span /> }

  if (fullSize) {

    //if there's only one product and products are on their own row,
    //put its info beside it to fill up space
    displayHorizontal = (products.length == 1)

    productDisplays = products.map((product, i) => (
      <ProductDisplay
        key={i}
        product={product}
        displayHorizontal={displayHorizontal}
        width={150}
        shopNow />))


    //4 products get a grid, fewer get a flex
    if (products.length < 4) {
      return ( <Flex wrap='wrap' justify='center'>{productDisplays}</Flex> )
    } else {
      return ( <Grid columns={[1,1,2]}>{productDisplays.slice(0, 4)}</Grid> )
    }
  } 


  //products not on own row
  else {
  //if there's multiple products, put its info beside it to avoid filling vertical space
    displayHorizontal = (products.length > 1)
    productDisplays = products.map((product, i) => (
      <ProductDisplay
        key={i}
        product={product}
        displayHorizontal={displayHorizontal}
        width={150}
        shopNow />))

    const finalDisplay = <Stack>{productDisplays.slice(0,3)}</Stack>

    if (copy && typeof(copy) != 'undefined') {
      return (
        <Box paddingY={4}>
          <Flex wrap='wrap' align='center'>
            <Box flex={1} paddingX={1}>
              <Text>
                <PortableText blocks={copy}/>
              </Text>
            </Box>
            <Stack flex={1}>{finalDisplay}</Stack>
          </Flex>
        </Box>
      )
    } else {
      return ( <Box paddingY={4}>{finalDisplay}</Box> )
    }
  }
}
