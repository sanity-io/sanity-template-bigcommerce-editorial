import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'article-with-subsection',
    title: 'Article With Subsection',
    schemaType: 'article',
    parameters: [
      {
        name: 'subsectionId',
        title: 'Subsection ID',
        type: 'string'
      }
    ],
    value: params => ({
      subsection: {_type: 'reference', _ref: params.subsectionId}
    })
  }),
  T.template({
    id: 'subsection-with-category',
    title: 'Subsection With Category',
    schemaType: 'subsection',
    parameters: [
      {
        name: 'categoryId',
        title: 'Category ID',
        type: 'string'
      }
    ],
    value: params => ({
      category: {_type: 'reference', _ref: params.categoryId}
    })
  })
]


