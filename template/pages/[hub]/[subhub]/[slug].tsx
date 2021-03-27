import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'

import { Stack, Card, Box, Heading, Text, Container, Flex } from '@sanity/ui'
import { NavBar, SocialBar, Breadcrumbs, ShopTheStory } from '$components'
import { Category, Article, ArticleSlug } from '../../../types'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$utils/sanity'
import { handleGroupedItems } from '$utils/helpers'
import { articlePageQuery }  from '$utils/sanityGroqQueries'


export default function ArticlePage({categories, articleData, preview}
  : {categories: Category[], articleData: Article, preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !articleData?.slug) {
    return <Error statusCode={404} />;
  } else if (router.isFallback) {
    return <div>Loading...</div>
  }


  const {data: article} = usePreviewSubscription(articlePageQuery, {
    params: {slug: articleData.slug},
    initialData: articleData,
    enabled: preview || !!router.query.preview,
  })

  const content = handleGroupedItems(
    article.content, "listItem", {_key: "orientation", _value: "vertical"})
      
  return (
    <>
      <NavBar categories={categories} />
      <Breadcrumbs article={article} />

      <Flex>
        <Box paddingLeft={3} flex={2}>
          <Stack space={2}>
            <SocialBar />
            <Box style={{maxHeight: '800px'}}>
              <img src={urlFor(article.image).url() ?? "" } 
                style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </Box>
              <Box padding={[1, 3, 4]}>
                <Box paddingY={3}>
                  <Heading size={[2, 3, 4]}>
                    { article.title }
                  </Heading>
                </Box>
                <Text>
                  <PortableText blocks={content} />
                </Text>
              </Box>
            </Stack>
          </Box>
         <Flex align='center' flex={[0, 0, 0, 1]}>
           <Box>
             { article.storyProducts && (
             <ShopTheStory products={article.storyProducts} /> ) }
          </Box>
         </Flex>
        </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const articleSlugs = await getClient().fetch(
    `*[_type == "article"]{
      'slug': slug.current,
      'subhub': subsection->slug.current,
      'hub': subsection->category->slug.current
    }`)

  const paths = {paths: articleSlugs.map(
    (slugs: ArticleSlug) => ({params: slugs}))}
    return {
      ...paths,
     fallback: true
   }
}


export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {

  const article = await getClient(preview).fetch(articlePageQuery,
    {slug: params?.slug})

  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      articleData: article
    }
  })
}

