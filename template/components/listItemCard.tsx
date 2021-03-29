import { Heading, Text, Box} from '@sanity/ui'
import { ListItem } from '../types'
import { ProductsDisplay } from '$components'
import { urlFor, PortableText } from '$utils/sanity'

export function ListItemCard({item, groupParent}
           : {item: ListItem, groupParent: boolean}) {

  let display;

  if (item.products) {
    if (item.orientation == 'horizontal' || !groupParent) {
      if (item.productDisplaySize == 'small') {
        display = (<ProductsDisplay products={item.products} fullSize={false} copy={item.text} />)
      } else {
        display = (
          <>
            <PortableText blocks={item.text} />
            <ProductsDisplay copy ="" products={item.products} fullSize={true} />
          </>
          )
      }
    } else {
        display = (
          <>
            <PortableText blocks={item.text} />
            <ProductsDisplay copy="" products={item.products} fullSize={false} />
          </>
          )
    }
  } else {
    display = (
      <PortableText blocks={item.text} />)
  }
  
  return (
    <Box padding={2} margin={3} style={{minWidth: '225px'}}>
      <Heading size={2}>{item.title}</Heading>
      <Text>
        { display }
      </Text>
    </Box>)
}
