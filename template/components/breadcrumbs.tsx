import { Article } from '../types'
import Link from 'next/link'
import { Box, Text } from '@sanity/ui'

export function Breadcrumbs({article}: {article: Article}) {

  return (

      <Box margin={[3, 0, 0, 3]} paddingTop={3} paddingLeft={1}>
        <Text size={1}>
          <Link href={`/${article.category.slug}`}>
            { `${article.category.name} >>` }
          </Link>
          <Link href={`/${article.category.slug}/${article.subsection.slug}`}>
            { ` ${article.subsection.name} >>` }
          </Link>
          <Link href={`/${article.category.slug}/${article.subsection.slug}/${article.slug}`}>
            { ` ${article.title} ` }
          </Link>
        </Text>
      </Box>

  )
}




