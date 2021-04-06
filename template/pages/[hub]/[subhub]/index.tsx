import { GetStaticPaths, GetStaticProps } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { Category, SubsectionArticles } from '../../../types'

import { Box, Container, Heading, Inline, Grid } from '@sanity/ui'
import { NavBar, ArticlePane } from '$components'

import { getClient, usePreviewSubscription } from '$utils/sanity'
import { GiWomanElfFace } from 'react-icons/gi'
import { subsectionArticleQuery }  from '$utils/sanityGroqQueries'


export default function Subhub({categories, subsectionArticleData, preview}
  : {categories: Category[],
    subsectionArticleData: SubsectionArticles,
    preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !subsectionArticleData?.name) {
    return <Error statusCode={404} />;
  } else if (router.isFallback) {
    return <div>Loading...</div>
  }

  const hub = router.query.hub ?? ""
  const subhub = router.query.subhub ?? ""

  const {data: subsectionArticles} = usePreviewSubscription(subsectionArticleQuery, {
    params: {slug: subhub},
    initialData: subsectionArticleData,
    enabled: preview || !!router.query.preview,
  })

  const subsectionArticleDisplays = subsectionArticles.articles.map(
    (article, i) => (
      <ArticlePane key={i} article={article} /> 
    )
  )

  return (
    <>
      <NavBar categories={categories} />
      <Container width={1}>
        <Box paddingY={[3,5]}>
          <Heading size={2}>
            <Inline>
              <GiWomanElfFace style={{margin: "0 1rem"}}/>
              {subsectionArticles.name}
            </Inline>
          </Heading>
        </Box>
        <Grid columns={[1, 1, 2]}  padding={[0, 0, 2]}>
          { subsectionArticleDisplays }
        </Grid>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const subsections = await getClient().fetch(
    `*[_type == 'subsection']{
        'subhub': slug.current,
        'hub': category->slug.current
      }`)

    return {
      ...{paths: subsections.map(({subhub, hub}
        : {subhub: string, hub: string}) => (
        {params: {subhub: subhub, hub: hub}}))},
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false }) => {

  const subsectionArticles = await getClient(preview).fetch(subsectionArticleQuery,
    {slug: params?.subhub})

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      subsectionArticleData: subsectionArticles
    }
  })
}
