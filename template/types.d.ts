export type Category = {
  name: string,
  slug: string
}

export type Subsection = {
  name: string,
  slug: string
}

export type Color = {
  hex: string
}

export type ImageAsset = {
  _ref: string
}

export type Image = {
  asset: ImageAsset
  crop: any,
  hotspot: any
}

export type Product = {
  _id: string,
  image: Image,
  name: string,
  slug: string,
  description: string,
  price: string,
  manufacturer: string,
  relatedArticles: Article[],
  quantity: number?,
  lineID: string?
}

export type Article = {
  _id: string?,
  title: string,
  slug: string,
  image: Image,
  subsection: Subsection,
  category: Category,
  publishedDate: string, //comes in from Sanity this way
  storyProducts: StoryProducts[],
  excerpt: any[] | any?,
  content: any[] | any?
}

export type MonthArticle = {
  name: string,
  articles: Article[]
}

export type Feature = {
  title: string,
  text: any | any[],
  image: Image,
  url: string
}

export type ArticleSlug = {
  slug: string,
  subhub: string,
  hub: string
}

export type CategoryFeature = {
  categoryId: string,
  name: string,
  featuredArticleDisplay: string,
  featuredArticle: Article
}

export type SubsectionArticles = {
  name: string,
  slug: string?,
  articles: Article[]
}

export type ListItem = {
  _key: string,
  _type: string,
  orientation: string,
  text: any[] | any?,
  title: string,
  productDisplaySize: string,
  products: Product[]
}

export type StoryProducts = {
  products: Product[]
}

export type Campaign = {
  slug: string,
  image: Image,
  title: string,
  text: any[] | any?,
  content: any[] | any?,
  products: Product[],
  hideLeadBlock: boolean
}

export type Slug = {
  slug: string
}