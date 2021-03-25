import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import excerptPortableText from './objects/excerptPortableText'
import article from './documents/article'
import person from './documents/person'
import category from './documents/category'
import subsection from './documents/subsection'
import product from './documents/product'
import campaign from './documents/campaign'
import siteSettings from './documents/siteSettings'

import listItem from './pages/listItem'
import hr from './pages/hr'
import productsDisplay from './pages/productsDisplay'
import solidBlockFeature from './pages/solidBlockFeature'
import textOverlayFeature from './pages/textOverlayFeature'
import productCardFeature from './pages/productCardFeature'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes
    .concat([
      excerptPortableText,
      article,
      person,
      category,
      subsection,
      product,
      campaign,
      siteSettings,
      productsDisplay,
      listItem,
      hr,
      solidBlockFeature,
      textOverlayFeature,
      productCardFeature
    ])
})
