const fieldsetOptions = {options: {collapsible: true, collapsed: true}}

export default {
  title: "Product",
  name: "product",
  type: "document",
  fieldsets: [
    {name: 'locale_fr', title: 'French language overrides', ...fieldsetOptions},
    {name: 'locale_es', title: 'Spanish language overrides', ...fieldsetOptions},
  ],
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      description: "The name of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Product image",
      name: "productImage",
      type: "image",
      description: "The manufacturer photo for this image.",
      options: {
        crop: true,
        hotspot: true
      }
    },
    {
      title: "slug",
      name: "slug",
      type: "slug",
      description: "The slug for the dedicated product page",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "SKU",
      name: "sku",
      type: "string",
      description: "The sku of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: 'array',
      of: [{type: 'block'}],
      description: "The description for this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Price",
      name: "price",
      type: "number",
      description: "The price of this product (note, this is the first price in USD that we could find in BigCommerce -- there may be other prices available!)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Manufacturer",
      name: "manufacturer",
      type: "string",
      description: "The manufacturer of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Category",
      name: "category",
      description: "Category this product belongs to (used for editorial embeds, etc.)",
      type: "reference",
      to: [{type: "category"}]
    },
    {
      title: "Name (French)",
      name: "locale_fr_name",
      type: "string",
      description: "Le nom en francais",
      fieldset: 'locale_fr'
    },
    {
      title: "Description (French)",
      name: "locale_fr_description",
      description: "La description  en francais",
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'locale_fr'
    },
    {
      title: "Name (Spanish)",
      name: "locale_es_name",
      type: "string",
      description: "El nombre en español",
      fieldset: 'locale_es'
    },
    {
      title: "Description (Spanish)",
      name: "locale_es_description",
      description: "La descripción en español",
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'locale_es'
    },
  ]
}
