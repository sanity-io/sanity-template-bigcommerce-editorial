export default {
  title: "Subsection",
  name: "subsection",
  type: "document",
  fields: [
    {
      title: "name",
      name: "name",
      type: "string",
      description: "The name of this subsection",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "slug",
      name: "slug",
      description: "The slug for this subsection",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Category",
      name: "category",
      description: "The category this subsection belongs to",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{type: "category"}]
    }
  ]
}
