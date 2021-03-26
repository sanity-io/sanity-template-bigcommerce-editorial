import { groq } from "next-sanity"

/* ------------------------------------------------------------------ */
/* Fragments -- partial queries for hubpages, inline references, etc  */
/* ------------------------------------------------------------------ */

export const productQuery = `
   _id,
  'slug': slug.current,
  'image': {"asset": {"_ref": productImage.asset._ref}, "crop": productImage.crop, "hotspot": productImage.hotspot},
  name,
  description,
  price,
  manufacturer
`

export const articleDisplayQuery = `
        _id,
        title,
        text,
        "slug": slug.current,
        'image': {"asset": {"_ref": heroImage.asset._ref}, "crop": heroImage.crop, "hotspot": heroImage.hotspot},
        "subsection": subsection->{name, "slug": slug.current},
        "category": subsection->category->{name, "slug": slug.current},
        excerpt,
        publishedDate
`

/* ------------ */
/* Page queries */
/* ------------ */


export const indexQuery =  `
{"featuredArticles": *[_type == 'siteSettings'][0]{featuredArticles[]->{
    ${articleDisplayQuery}
      }}.featuredArticles[],
    "recentArticles": *[_type == 'article'] | order(publishedDate desc)[0...20]{
      ${articleDisplayQuery}
    },
  }

`

export const categoryAndFeaturedArticleQuery = groq`
  *[_type == 'category' && slug.current == $hub][0]
    {
      "categoryId": _id,
      name,
      featuredArticleDisplay,
      featuredArticle->{
        ${articleDisplayQuery}
      }
    }`

export const subsectionArticleQueryHasFeature = groq`
  *[_type == 'subsection' && category._ref == $id]
    {
      name,
      "slug": slug.current,
      "articles": *[_type == 'article' 
    && references(^._id) && _id != $featuredArticleId] 
        | order('publishedDate' desc)[0...2]{
          ${articleDisplayQuery} 
        }
    }`

export const subsectionArticleQueryNoFeature = groq`
  *[_type == 'subsection' && category._ref == $id]
    {
      name,
      "slug": slug.current,
      "articles": *[_type == 'article' && references(^._id)] 
        | order('publishedDate' desc)[0...2]{
          ${articleDisplayQuery} 
        }
    }`

export const articlePageQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
      title, 
      "slug": slug.current,
      "subsection": subsection->{name, "slug": slug.current},
      "category": subsection->category->{name, "slug": slug.current},
      "storyProducts": content[]{
          _type == 'listItem' || _type == 'productsDisplay'=>{
            products[]->{
            ${productQuery}
            }
          },
        },
      content[]{
          ...,
          _type == 'listItem' ||  _type == 'productsDisplay'=>{
            products[]->{
              ${productQuery}
            }
          },
        },
        "image": {"asset": heroImage.asset, "crop": heroImage.crop, "hotspot": heroImage.hotspot}
     }`


/* ---------------- */
/* Commerce queries */
/* ---------------- */

//for use in cart etc
export const singleProductQuery = (id) => (
  `*[_type == 'product' && _id == '${id}'][0]
  { ${productQuery} }`
)

//TODO: break down into categories and serve in frontend that way
export const shopQuery = `
    *[_type == 'product']{${productQuery}}
`

export const productDetailPageQuery = groq`
    *[_type == 'product' && slug.current == $slug][0]
      {
        ${productQuery},
        locale_es_name,
        locale_es_description,
        locale_fr_name,
        locale_fr_description,
        'relatedArticles': *[_type == 'article' && references(^._id)][0..2]
          { ${articleDisplayQuery} }
      }
`

export const campaignQuery = groq`
  *[_type == 'campaign' && slug.current == $slug][0]
    {
     'slug': slug.current,
     'image': {"asset": {"_ref": heroImage.asset._ref}, "crop": heroImage.crop, "hotspot": heroImage.hotspot},
      title,
      text,
      hideLeadBlock,
      content[]{
        ...,
        _type == 'productCardFeature'=>{
          products[]->{${productQuery}},
        }
      },
      products[]->{
        ${productQuery}
      }
    }
`

