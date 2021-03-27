import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook
} from "next-sanity";

import { 
  ListItemGroup,
  ListItemCard, 
  ProductsDisplay,
  TextOverlayFeature
} from '../components'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  
}

export const sanityClient = createClient(config);
//TODO: put placeholder "problem fetching image!" as default
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient)

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {
    types: {
      listItemGroup: props => (<ListItemGroup listItems={props.node.children} />),
      listItem: props => (<ListItemCard item={props.node} />),
      productsDisplay: props => (<ProductsDisplay
        products={props.node.products}
        fullSize={!props.node.copy || typeof(props.node.copy) == 'undefined'}
        copy={props.node.copy} />),
      hr: props => (<hr />),
      textOverlayFeature: props => (<TextOverlayFeature {...props.node} />),
      undefined: props => (<span />)
    }
  },
});

