// import { MdLink } from "react-icons/md"
import {slugifier} from '../utils'

export default {
  name: 'route',
  type: 'document',
  title: 'Page route',
  fieldsets: [
    {
      title: 'Visibility',
      name: 'visibility',
    },
  ],
  fields: [
    {
      name: 'slug',
      type: 'slug',
      description: 'This is the website path the page will accessible on',
      title: 'Path',
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (slug && slug.current && slug.current === '/') {
            return 'Cannot be /'
          }
          return true
        }),
      options: {
        source: (doc, options) => options.parent.page,
        slugify: slugifier
      }
    },
    // {
    //   title: 'Open graph',
    //   name: 'openGraph',
    //   description: 'These values populate meta tags',
    //   type: 'openGraph',
    // },
    {
      title: 'Include in sitemap',
      description: 'For search engines. Will be generateed to /sitemap.xml',
      name: 'includeInSitemap',
      type: 'boolean',
      fieldset: 'visibility'
    },
    {
      title: 'Disallow in robots.txt',
      description: 'Hide this route for search engines like google',
      name: 'disallowRobots',
      type: 'boolean',
      fieldset: 'visibility'
    },
    /*
    // This can be used by a server-side rendered website. We plan to figure out proper JAMstack support
    {
      name: 'queries',
      type: 'array',
      description: 'Used to return personalized content based on paid search terms and remarketing',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'tags'
      }
    }, */
    // {
    //   name: 'campaign',
    //   type: 'string',
    //   title: 'Campaign',
    //   description: 'UTM for campaings'
    // },
    /*
    // This can be used by a server-side rendered website. We plan to figure out proper JAMstack support
    {
      name: 'experiment',
      type: 'experiment',
      description: 'Use this to A/B/n test this route towards different pages',
    }, */
  ],
  initialValue: {
    useSiteTitle: false,
  },
  preview: {
    select: {
      title: 'slug.current',
      subtitle: 'page.title',
    },
    prepare({ title, subtitle }) {
      return {
        title: ['/', title].join(''),
        subtitle,
      }
    },
  },
}
