export default {
  title: "Text Overlay Feature",
  name: "textOverlayFeature",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this block",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Text",
      name: "text",
      description: "The text of this block",
      type: 'array', 
      of: [{type: 'block'}],
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      description: "The image to be used for this block",
      options: {
        crop: true,
        hotspot: true
      }
    },
  ]
}

