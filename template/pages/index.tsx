import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'

import { Card, Container, Flex, Stack, Text } from '@sanity/ui'

import { Category, Article, MonthArticle } from '../types'
import { getClient, usePreviewSubscription } from '$utils/sanity'
import { coalesceCampaignAndFeature } from '$utils/helpers'
import { IndexArticleGrid, NavBar, SubsectionBar } from '$components'
import { indexQuery } from '$utils/sanityGroqQueries'


function IndexPage({categories, featuredArticleData, recentArticleData, preview}
  : {categories: Category[], featuredArticleData: Article[], recentArticleData: Article[], preview: boolean}) {

  const router = useRouter()
  const hub = router.query.hub ?? ""

  const {data: {featuredArticles, recentArticles}} = usePreviewSubscription(indexQuery, {
    initialData: {
      featuredArticles: featuredArticleData,
      recentArticles: recentArticleData},
      enabled: preview || !!router.query.preview,
  })


  const articlesByMonth: MonthArticle[] = []
  recentArticles.forEach(article => {
    const date = new Date(article.publishedDate)
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const stringDate = `${month} ${year}`
    if (!articlesByMonth.length || articlesByMonth[articlesByMonth.length - 1].name != stringDate) {
      articlesByMonth.push({
        name: stringDate,
        articles: [article]
      })
    } else {
      articlesByMonth[articlesByMonth.length - 1].articles.push(article)
    }
  })

  const formattedFeatures = featuredArticles.map(feat => coalesceCampaignAndFeature(feat))

  return (
    <>
      <NavBar categories={categories} />
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[3, 4, 5]}>
        <Stack space={[3, 4, 5]}>
          <IndexArticleGrid features={formattedFeatures} /> 
          <Container width={1}>
            { articlesByMonth.map((month, i) => (
              <SubsectionBar hub="" subsectionArticles={{...month, slug: ""}} key={i} />

            ))}
          </Container>
        </Stack>
      </Card>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({params, preview = false }) => {
  const {featuredArticles, recentArticles} = await getClient(preview).fetch(indexQuery)
  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      featuredArticleData: featuredArticles,
      recentArticleData: recentArticles,
      preview: preview
    }
  })
}

export default IndexPage;


//logic for featured index articles
//either they're set or are the most recent across the board
//all set come before auto

