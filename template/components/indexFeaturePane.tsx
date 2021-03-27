import Link from 'next/link'
import { Heading, Button } from '@sanity/ui'
import { Feature } from '../types'
import { urlFor } from '$utils/sanity'
import styled from 'styled-components'

const PaneContainer = styled.div`
  height: 100%;
  width: 100%;
  background: black;
  overflow: hidden;
  position: relative;
`

const PaneImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.65;
`

const OverlayText = styled.div`
  color: white;
  position: absolute;
  top: 20%;
  left: 5%;
  width: 50%;
`

export function IndexFeaturePane({feature, headingSize}: {feature: Feature, headingSize: number}) {
  let imageUrl: string = "/blank.png"
  if (feature.image && feature.image.asset._ref) {
    imageUrl = urlFor(feature.image).url() as string
  } 

  return (
    <Link href={feature.url}>
      <PaneContainer>
        <PaneImage src={imageUrl} />
        <OverlayText>
          <Heading size={headingSize}>
            { feature.title }
          </Heading>
        </OverlayText>
      </PaneContainer>
    </Link>
  )

}
