import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import { Product } from '../types'
import { ProductsDisplay } from '$components'
import { PortableText } from '$utils/sanity'

export function ProductCardFeature(
  {title, text, products}: {title: string, text: any | any[], products: Product[]}) {
    return (
      <Box paddingY={5} paddingX= {3} style={{minHeight: '600px', textAlign: 'center'}}>
        <Heading size={3}>
          {title}
        </Heading>
        <Box padding={3}>
          <Text>
            <PortableText blocks={text} />
          </Text> 
        </Box>
        <Box style={{textAlign: 'left'}}>
          <ProductsDisplay copy="" fullSize={true} products={products} />
        </Box>
      </Box> 
    )

  }
