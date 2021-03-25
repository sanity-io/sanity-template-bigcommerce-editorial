import {Container, Heading, Card, Flex, Grid } from '@sanity/ui'
import {SubsectionArticles} from '../types'
import Link from 'next/link'
import { ArticlePane } from '$components'

export function SubsectionBar({hub, subsectionArticles}
  : {hub: string, subsectionArticles: SubsectionArticles}) {

    const articlePanes = subsectionArticles.articles.map((article, i) => (
      <ArticlePane article={article} key={i} />) 
    )

    const heading = (<Heading size={1}>{ subsectionArticles.name }</Heading>)

    return (
      <Container width={1}>
        <Card borderBottom style={{backgroundColor: "#FCFCFF"}} paddingTop={5} paddingBottom={3}>
              { heading }
        </Card>
        <Grid columns={[1, 1, 2]}  padding={[0, 0, 2]}>
          { articlePanes }
        </Grid>

      </Container>
    )
    
  }
