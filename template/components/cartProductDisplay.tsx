import {  Text, Box, Inline, Heading, Button } from '@sanity/ui'
import { urlFor } from '$utils/sanity'
import { ResponsiveFixedRatioImage } from '$components'
import { BsTrash2 } from 'react-icons/bs'
import { Product } from '../types'
import { useDeleteItem } from '../contexts/bigcommerce-context'

export function CartProductDisplay({product}: {product: Product}) {

  const deleteItem = useDeleteItem()

   return (
     <Inline>
       <Box flex={1} marginX={1} style={{width: '80px', height: '80px'}}>
           <ResponsiveFixedRatioImage imageUrl={urlFor(product.image).url() ?? ""} />
        </Box>
       <Box flex={1} paddingX={1} style={{maxWidth: '200px'}}>
          <Text>
            <span style={{fontSize: '.8em'}}>
              {product.manufacturer}<br/>
            </span>

            <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
              {product.name}<br/>
            </span>
            <span style={{fontSize: '.8em'}}>
              ${product.price}<br/>
            </span>
            <span style={{fontSize: '.8em'}}>
              Quantity: {product.quantity}<br/>
            </span>
          </Text>
        </Box>
         <Box flex={1} paddingX={1}>
           <Button mode='bleed'
              onClick={() => deleteItem(product.lineID)}>
             <Heading size={1}>
              <BsTrash2 />
             </Heading>
           </Button>
         </Box>
      </Inline>
    )
}
