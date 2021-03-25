export default {
  title: "Category",
  name: "category",
  type: "document",
  fields: [
    {
      title: "name",
      name: "name",
      type: "string",
      description: "The name of this category",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "slug",
      name: "slug",
      type: "slug",
      description: "The slug for this category; where it is routable on the main site.",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Featured Article",
      name: "featuredArticle",
      description: "The featured article for this category",
      type: "reference",
      to: [{type: "article"}, {type: 'campaign'}],
      // options: {
      //   filter: ({document}) => {
      //     return {
      //       filter: "*[_type == 'article' && references(*[_type == 'subsection' && references($id)]._id)]",
      //       params: {id: document._id}
      //     }
      //   }
      // }
    },
    {
      title: "Featured Article Display",
      name: "featuredArticleDisplay",
      type: "string",
      description: "Determines how the featured article will be displayed on the hub page.",
      options: {
      list: [
        {title: 'Text Below', value: 'textBelowFeature'},
        {title: '50/50 Card', value: 'solidBlockFeature'},
        {title: 'Text Overlay', value: 'textOverlayFeature'}
      ],
    },
    },
  ]
}
