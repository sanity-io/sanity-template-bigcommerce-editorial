import sanityClient from '@sanity/client'

export default sanityClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false // `false` if you want to ensure fresh data
})
