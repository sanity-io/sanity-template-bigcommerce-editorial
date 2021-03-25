import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { Stack, Box } from '@sanity/ui'

import { Product, Category } from '../../types'
import { getClient, urlFor, PortableText, usePreviewSubscription } from '$utils/sanity'
import { campaignQuery }  from '$utils/sanityGroqQueries'

import { NavBar, ShopGrid, SolidBlockFeature } from '$components'
import { handleBlockFeature } from '$utils/helpers'


export default function CampaignPage({categories, campaignData, preview}
  : {categories: Category[], campaignData: Campaign, preview: boolean}) {

  const router = useRouter();
  if (!router.isFallback && !campaignData?.slug) {
    return <Error statusCode={404} />;
  }

  const {data: campaign} = usePreviewSubscription(campaignQuery, {
    params: {slug: campaignData.slug},
    initialData: campaignData,
    enabled: preview || router.query.preview !== null,
  })

  const parsedContent = campaign.content.map(({_type, ...block}, i) => (
    <Box key={i} padding={0}>
      { handleBlockFeature(_type, block, true) }
    </Box>
  ))

  const campaignFeatureProps = {
    ...campaign,
    blockColor: {hex: '#FFF'},
    textColor: {hex: '#000'},
    orientation: 'right'
  }

  return (
    <>
      <NavBar categories={categories} />
      <Stack>
        { (campaign.hideLeadBlock) ?  <span /> : <SolidBlockFeature {...campaignFeatureProps} /> }
        { parsedContent }
      </Stack>
      <ShopGrid sectionTitle="Shop the Campaign" products={campaign.products} />
    </>
    )
}
            
export const getStaticPaths: GetStaticPaths = async (context) => {
  const campaignSlugs = await getClient().fetch(
    `*[_type == "campaign"]{
      'slug': slug.current
    }`)

  const paths = {paths: campaignSlugs.map(
    (slugObj) => ({params: slugObj}))}
    
  return { ...paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({params, preview = false}) => {
  const campaign = await getClient(preview).fetch(campaignQuery, params)


  return ({
    props: {
      categories: await getClient(preview).fetch(`*[_type == "category"]{name,'slug': slug.current}`),
      campaignData: campaign,
      preview
    }
  })
}
