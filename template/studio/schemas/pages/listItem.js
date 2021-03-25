import React from 'react'

export default {
  title: "List Item",
  name: "listItem",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this list item",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Orientation",
      name: "orientation",
      type: "string",
      description: "The orientation of this list item",
      options: {
        list: ["horizontal", "vertical"],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Text",
      name: "text",
      description: "The text of this list item",
      type: 'array', 
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Product Display Size",
      name: "productDisplaySize",
      type: "string",
      description: "Determines whether the items display in large format below the list item or small format to the side of the list item (only applicable in horizontal list items)",
      options: {
        list: ["small", "large"],
      },
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
  initialValue: {
    orientation: "horizontal",
    productDisplaySize: "small",
  }
}

