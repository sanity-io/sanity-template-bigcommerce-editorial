import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'rrw497vy',
  dataset: 'production', 
  useCdn: false // `false` if you want to ensure fresh data
})
