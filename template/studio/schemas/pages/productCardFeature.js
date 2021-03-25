export default {
  title: "Product Card Feature",
  name: "productCardFeature",
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
      title: "Products",
      name: "products",
      description: "The products for this list item",
      type: "array",
      of: [{type: "reference",
            to: [
                  {type: "product"}
                ]
          }]
    }
  ],
}
