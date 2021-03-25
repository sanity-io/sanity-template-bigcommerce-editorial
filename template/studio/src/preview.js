import React from 'react'
import SanityMobilePreview from 'sanity-mobile-preview'
import 'sanity-mobile-preview/dist/index.css?raw'

export function IFramePreview({document: {displayed: { slug = {}}}}, prefix){

  if (!slug || typeof(slug) == 'undefined') {
    return (
      <div>
        <p>Please create a slug first for this document.</p>
      </div>
    )
  }

  let url;

  if (prefix && typeof(prefix) != 'undefined') {
    url = `http://localhost:3000/${prefix}/${slug.current}?preview`
  } else {
    url = `http://localhost:3000/${slug.current}?preview`
  }
  
  return (
      <iframe
      src={url}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
  )
}

export function MobilePreview(document, prefix) {
  return (
    <SanityMobilePreview>
      { IFramePreview(document, prefix) }
    </SanityMobilePreview>
  )
}
