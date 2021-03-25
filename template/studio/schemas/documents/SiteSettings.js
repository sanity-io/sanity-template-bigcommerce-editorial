export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  // __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      title: 'Featured Articles',
      name: 'featuredArticles',
      description: 'Which articles are featured on the hero spot on the front page? (If 3 items are not set, we will use the most recent articles to fill the gap)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}, {type: 'campaign'}]}],
      validation: Rule => Rule.max(3)
    },
  ]
}
