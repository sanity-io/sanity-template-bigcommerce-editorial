import { Stack, Flex, Text, Box } from '@sanity/ui'
import { urlFor } from '$utils/sanity'
import { ResponsiveFixedRatioImage } from '$components'
import Link from 'next/link'

export function ProductDisplay({product, displayHorizontal, shopNow, width}
  : {product: any, displayHorizontal: boolean, shopNow: boolean, width: number}) {

  const imgBox = (
    <Box style={{width: `${width}px`}}>
      <ResponsiveFixedRatioImage imageUrl={urlFor(product.image).url() ?? ""} />
    </Box>
  )

  const productInfo = (
    <Text style={{textAlign: 'center', margin: 'auto 0', width: `${width}px`}}>

        <span style={{fontSize: '.9em'}}>
          {product.manufacturer}<br/>
        </span>

        <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          {product.name}<br/>
        </span>

        <span style={{fontSize: '.9em'}}>
          ${product.price}<br/>
        </span>

        <span style={{textTransform: 'uppercase', textDecoration: 'underline', fontSize: '.9em'}}>
          <Link href={`/shop/${product.slug}`}>
            { (shopNow) ? "Shop now" : "More..." }
          </Link> 
        </span>

      </Text>
  )

  if (displayHorizontal) {
    return (
      <Flex justify='center'  style={{width: '100%', margin: '0 auto'}}>
        { imgBox }
        { productInfo }
      </Flex>
    )
  } else {
    return (
      <Box paddingX={4}>
        <Stack>
          { imgBox }
          { productInfo }
        </Stack>
      </Box>
    )
  }
}
