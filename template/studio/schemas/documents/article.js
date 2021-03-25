export default {
  title: "Article",
  name: "article",
  type: "document",
  fields: [
    {
      title: 'Subsection', 
      name: 'subsection',
      type: 'reference', 
      to: [{type: "subsection"}]
    },
    {
      title: "Hero Image",
      name: "heroImage",
      type: "image",
      description: "The lead image for this page. Also used in thumbnails, etc.",
      options: {
        crop: true,
        hotspot: true
      }
    },
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this page (this will show up in your browser heading and internal links)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "slug",
      name: "slug",
      type: "slug",
      description: "The slug for this page",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Published date',
      name: 'publishedDate',
      description: "Date to start showing this article",
      type: 'date',
    },
    {
      title: "Authors",
      name: "authors",
      type: "array",
      of: [
        {type: "reference",
         to: [{type: "person"}]}
      ]
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
    },
    // {
    //   title: "Include Author Block",
    //   name: "includeAuthorBlock",
    //   type: "boolean",
    //   description: "Flag to include the authors' images and bio (note: bio only shows up for single authors)"
    // },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'},
           {type: 'listItem'},
           {type: 'hr'},
           {type: 'productsDisplay'}]
    },
  ]
}
