import {Heading, Stack, Box } from '@sanity/ui'
import {Article} from '../types'
import Link from 'next/link'
import { urlFor } from '$utils/sanity'

export function ArticlePane({article} : {article: Article}) {
    return (
      <Box padding={2} display='flex' flex={1} style={{minWidth: '350px'}}>
        <Link href={`/${article.category.slug}/${article.subsection.slug}/${article.slug}`}>
          <Stack space={2} >
            <Box padding={2}>
              <img style={{height: '350px', width: '100%', objectFit: 'cover'}} src={urlFor(article.image).url() ?? ""}/>
             </Box>
            <Heading size={1}>
                {article.title}
              </Heading>
            </Stack>
          </Link>
      </Box>
    )
}
