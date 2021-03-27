import { Grid, Heading, Card, Box } from '@sanity/ui'
import { StoryProducts } from '../types'
import { ProductDisplay } from '$components'

export function ShopTheStory({products}: {products: StoryProducts[]}) {

  //have to unnest out of containing blocks
  const productDisplays = products.filter(elem => elem.products).map(elem => (
      elem.products.map((product, i) => (
          <ProductDisplay
            key={`shop-the-story-${i}`}
            product={product}
            displayHorizontal={false}
            width={100}
            shopNow />
      ))
  ))

  return (
    <Card border marginX={[2,3,4,5]} padding={[2,3]}>
      <Heading style={{textAlign: 'center'}}>Shop It Now!</Heading>
      <Box paddingY={5}>
        <Grid columns={[0,0,1,1,2]} gap={[0,0,1,1,2]}>
          { productDisplays }
        </Grid>
      </Box>
    </Card>
  )
}
