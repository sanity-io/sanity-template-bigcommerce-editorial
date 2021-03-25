export default {
  title: "Person",
  name: "person",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Picture",
      name: "picture",
      type: "image",
      description: "The portrait for this editor.",
    },
    {
      title: "Bio",
      name: "bio",
      type: "text",
      description: "A short biography for this editor, to appear in articles, hub pages, etc.",
    },
  ]
}
