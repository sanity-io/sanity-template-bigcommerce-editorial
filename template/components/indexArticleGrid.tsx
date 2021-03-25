import { Grid, Box } from '@sanity/ui'
import { Feature } from '../types'
import { urlFor } from '$utils/sanity'
import { IndexFeaturePane } from '$components'

export function IndexArticleGrid({features}: {features: Feature[]}) {

  return (

    <Grid 
      columns={[1, 1, 3]} 
      rows={[3, 3, 2]} 
      gap={[1, 1, 2, 4]}
      style={{maxHeight: '600px'}}>

      <Box columnStart={1} columnEnd={[1, 1, 3]} rowStart={1} rowEnd={[1,1,3]}>
        <IndexFeaturePane feature={features[0]} headingSize={4} />
      </Box>  
      { features[1] && (
        <IndexFeaturePane feature={features[1]} headingSize={2} />
        ) 
      }

      { features[2] && (
        <IndexFeaturePane feature={features[2]} headingSize={2} />
        ) 
      }

    </Grid> 

  )

}
