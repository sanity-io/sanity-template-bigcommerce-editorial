export default {
  title: "Products Display",
  name: "productsDisplay",
  type: "document",
  fields: [
    {
      title: 'Copy', 
      name: 'copy',
      description: 'Text to  displays alongside the product; filling out this field will make products display to the right side of your text. Leave blank to ensure products display in their own row.',
      type: 'array', 
      of: [{type: 'block'}]
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
