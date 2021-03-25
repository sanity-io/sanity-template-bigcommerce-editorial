import { Box, Grid, Heading } from '@sanity/ui'
import { Product } from '../types'
import { ProductDisplay } from '$components'


export function ShopGrid({sectionTitle, products}
  : {sectionTitle: string, products: Product[]}) {

    return (
      <Box paddingTop={4} margin={[0,0,1,2]}>
        <Heading style={{textAlign: 'center'}}>
          <span>{sectionTitle}</span>
        </Heading>
        <Grid columns={[1, 2, 3, 4]} gap={[1, 1, 3, 6]}  padding={[0, 0, 2]} margin={5}>
          { products.map(prod => (
            <ProductDisplay 
              key={prod._id}
              product={prod}
              displayHorizontal={false}
              shopNow={false} 
              width={200} />)) }
        </Grid>
      </Box>
    )
}
