import S from '@sanity/desk-tool/structure-builder'
import client from 'part:@sanity/base/client'
import { MdEdit,
         MdRemoveRedEye,
         MdStayPrimaryPortrait,
         MdTune,
         MdFormatAlignLeft,
         MdPerson,
         MdShoppingCart,
         MdTrendingUp,
         MdSettings
} from "react-icons/md"
import { IFramePreview, MobilePreview } from './preview'
import React from 'react'

const BASE_PREVIEW_URL = (process.env.NODE_ENV == 'production') ?  
  '../../' : 'http://localhost:3000'

async function categoriesToListItems() {
  const query = `*[_type=='category' && !(_id in path("drafts.**"))]{
      name, _id, slug,
      'subsections': *[_type=='subsection'&& references(^._id) ]{name, _id, slug} 
    }`
  const categories = await client.fetch(query)

  return categories.map(cat => (
      S.listItem()
        .title(cat.name)
        .id(cat._id)
        .child(
          S.list()
            .initialValueTemplates([
              S.initialValueTemplateItem('subsection-with-category', {categoryId: cat._id})
            ])
            .title(cat.name)
            .id(cat._id)
            .items([
              S.documentListItem()
                .schemaType('category')
                .title(`${cat.name} Hub Options`)
                .id(cat._id)
                .child(
                  S.document()
                    .schemaType('category')
                    .documentId(cat._id)
                    .views([
                      S.view.form(), 
                      S.view.component(document => IFramePreview(BASE_PREVIEW_URL, document))
                        .title('Web Preview')
                        .icon(MdRemoveRedEye),
                      S.view.component(document => MobilePreview(BASE_PREVIEW_URL, document))
                        .title('Mobile Preview')
                        .icon(MdStayPrimaryPortrait)
                    ])
              ),
              ...createSubsectionListItems(cat.slug.current, cat.subsections)
            ]) 
        ) 
    )
  ) 
}

function createSubsectionListItems(categorySlug, subsections) {
  return subsections.map(sub => (
      S.listItem()
        .title(sub.name)
        .child(
          S.documentTypeList('article')
            .title(sub.name)
            .filter("subsection._ref == $id")
            .params({id: sub._id})
            .initialValueTemplates([
              S.initialValueTemplateItem('article-with-subsection', {subsectionId: sub._id})
            ])
            .child(id => 
              S.document()
                .schemaType('article')
                .documentId(id)
                .views([
                  S.view.form(),   
                  S.view.component(document =>
                    IFramePreview(BASE_PREVIEW_URL, document, `${categorySlug}/${sub.slug.current}`))
                    .title('Web Preview')
                    .icon(MdRemoveRedEye),
                  S.view.component(document => 
                   MobilePreview(BASE_PREVIEW_URL, document, `${categorySlug}/${sub.slug.current}`))
                    .title('Mobile Preview')
                    .icon(MdStayPrimaryPortrait)
                ])
            )
          ) 
      )
    )
}

async function buildList() {
  return (
    S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('Site settings')
          .icon(MdTune)
          .child(
            S.editor()
              .schemaType('siteSettings')
              .documentId('siteSettings')
              .title('Index Page Settings')
              .views([
                  S.view.form(),
                  S.view.component(document =>
                  <iframe
                  src={`${BASE_PREVIEW_URL}?preview=true`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                 )
                .title('Web Preview')
                .icon(MdRemoveRedEye)
              ])
          ),
         S.documentTypeListItem('subsection')
          .title('Subsection options')
          .icon(MdSettings),
         S.divider(),
        ...await categoriesToListItems(),
         S.divider(), 
         S.documentTypeListItem('person')
          .title('Authors')
          .icon(MdPerson),
         S.divider(), 
         S.listItem()
            .title('Shop')
            .icon(MdShoppingCart)
            .child(
              S.documentTypeList('product')
                .child(id => 
                  S.document()
                    .schemaType('product')
                    .documentId(id)
                    .views([
                      S.view.form(),
                      S.view.component(document => IFramePreview(
                      BASE_PREVIEW_URL, document, 'shop'))
                        .title('Web Preview')
                        .icon(MdRemoveRedEye),
                      S.view.component(document => MobilePreview(
                      BASE_PREVIEW_URL, document, 'shop'))
                        .title('Mobile Preview')
                        .icon(MdStayPrimaryPortrait)
                    ])
                )
          ),
         S.documentTypeListItem('campaign')
            .title('Campaigns')
            .icon(MdTrendingUp)
            .child(
              S.documentTypeList('campaign')
                .child(id => 
                  S.document()
                    .schemaType('campaign')
                    .documentId(id)
                    .views([
                      S.view.form(),
                      S.view.component(document => IFramePreview(
                        BASE_PREVIEW_URL, document, 'shop/campaign'))
                        .title('Web Preview')
                        .icon(MdRemoveRedEye),
                      S.view.component(document => MobilePreview(
                        BASE_PREVIEW_URL, document, 'shop/campaign'))
                        .title('Mobile Preview')
                        .icon(MdStayPrimaryPortrait)
                    ])
                )
            )
       ])
  )
}

export default buildList;
