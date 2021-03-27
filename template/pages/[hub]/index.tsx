import { GetStaticPaths, GetStaticProps } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { Category, SubsectionArticles, CategoryFeature } from '../../types'

import { Box, Container, Heading, Inline } from '@sanity/ui'
import { NavBar, SubsectionBar } from '$components'
import { handleBlockFeature, coalesceCampaignAndFeature } from '$utils/helpers'

import { getClient, usePreviewSubscription } from '$utils/sanity'
import { GiWomanElfFace } from 'react-icons/gi'
import { categoryAndFeaturedArticleQuery, 
         subsectionArticleQueryHasFeature,
         subsectionArticleQueryNoFeature }  from '$utils/sanityGroqQueries'


export default function Hub({categories, subsectionArticleData, categoryData, preview}
  : {categories: Category[],
    subsectionArticleData: SubsectionArticles[],
    categoryData: CategoryFeature,
    preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !categoryData?.categoryId) {
    return <Error statusCode={404} />;
  } else if (router.isFallback) {
    return <div>Loading...</div>
  }
  const hub = router.query.hub ?? ""

  const {data: category} = usePreviewSubscription(categoryAndFeaturedArticleQuery, {
    params: {hub: hub},
    initialData: categoryData,
    enabled: preview || !!router.query.preview,
  })

  let featuredArticleDisplay = (<span />) 
  if (category.featuredArticle) {
    const formattedFeature = coalesceCampaignAndFeature(category.featuredArticle)
    featuredArticleDisplay = handleBlockFeature(category.featuredArticleDisplay, formattedFeature)
  }


  //TODO: we could probably have more elegant handling for no features
  let subsectionArticles = subsectionArticleData
  if (category.featuredArticle) {
    const {data: subsectionArticles} = usePreviewSubscription(subsectionArticleQueryHasFeature, {
      params: {id: category.categoryId,
             featuredArticleId: category.featuredArticle._id},
      initialData: subsectionArticleData,
      enabled: preview || !!router.query.preview,
    })
  } else {
    const {data: subsectionArticles} = usePreviewSubscription(subsectionArticleQueryNoFeature, {
      params: {id: category.categoryId},
      initialData: subsectionArticleData,
      enabled: preview || !!router.query.preview,
    })
  }


  const subsectionRows = subsectionArticles
          .filter(sub => sub.articles.length)
          .map((subsection, i) => (
            <SubsectionBar hub={(typeof hub == 'string') ? hub : hub[0]} subsectionArticles={subsection} key={i} /> 
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
              {category.name}
            </Inline>
          </Heading>
        </Box>
          { featuredArticleDisplay }
        <Box>
          { subsectionRows }
        </Box>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const categories = await getClient().fetch(
    `*[_type == "category"].slug.current`)

    return {
      ...{paths: categories.map((cat: string) => ({params: {hub: cat}}))},
     fallback: true
   }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false }) => {

  const category = await getClient(preview).fetch(
        categoryAndFeaturedArticleQuery, {hub: params?.hub}) 

  if (!category) {
    return {notFound: true}
  }

  let subsectionArticles;
  if (category.featuredArticle) {
    subsectionArticles = await getClient(preview).fetch(
        subsectionArticleQueryHasFeature, {id: category.categoryId,
             featuredArticleId: category.featuredArticle._id})
  } else {
    subsectionArticles = await getClient(preview).fetch(
        subsectionArticleQueryNoFeature, {id: category.categoryId})
  }

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      subsectionArticleData: subsectionArticles,
      categoryData: category,
      preview
    }
  })
}

