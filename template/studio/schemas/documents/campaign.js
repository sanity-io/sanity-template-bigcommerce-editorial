export default {
  title: "Campaign",
  name: "campaign",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this campaign (this will show up in your browser heading and internal links)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Hero image",
      name: "heroImage",
      type: "image",
      description: "The image used to promote this campaign (for example, if featured on index page or hubs)",
      options: {
        crop: true,
        hotspot: true
      }
    },
    {
      title: "Text",
      name: "text",
      type: "excerptPortableText",
description: "Short descriptive text that may be used to promote this campaign",
    },
    {
      title: "slug",
      name: "slug",
      type: "slug",
      description: "The slug for this campaign",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Published date',
      name: 'publishedDate',
      description: "Date to start showing this campaign",
      type: 'date',
    },
    {
      title: 'Hide lead block',
      name: 'hideLeadBlock',
      description: 'Toggle to show if you want to display the hero image, title, and description at the top of the campaign page',
      type: 'boolean',
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      description: "The content to show on the campaign page. The image and text you use for the first block will also be used internally across the site.",
        of: [
          //todo: consider block quotes -- maybe just an object that allows you to do a text block?
          {type: 'productCardFeature'},
          {type: 'solidBlockFeature'},
          {type: 'textOverlayFeature'},
        ]
    },
    {
      title: 'Products', 
      name: 'products',
      description: "The products featured on this campaign",
      type: 'array', 
      of: [{type: 'reference', to: [{type: 'product'}]}]
    }
  ]
}
