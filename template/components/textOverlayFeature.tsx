import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import {Article, Image} from '../types'
import Link from 'next/link'
import { urlFor, PortableText } from '$utils/sanity'
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

export function TextOverlayFeature({title, text, image, url, fullSize}
  : {title: string, text: any | any[], image: Image, url: string, fullSize: boolean}) {

    const imageUrl = ((fullSize) ?
      urlFor(image).url() : urlFor(image).height(600).url())!!

    return  (
      <Box flex={1} style={{ minWidth: '350px', height: (fullSize) ? '100vh' : '400px'}}>  
          <PaneContainer>
            <PaneImage src={imageUrl} />
            <OverlayText>
              <Heading size={3}>
                {title}
              </Heading>
              <Box paddingTop={4}>
                <Text>
                  <PortableText blocks={text} />
                </Text> 
              </Box>
              <Box paddingTop={4}>
                { url ? 
                ( <Link href={url}>
                    <Button
                      fontSize={[2, 2, 3]}
                      mode="ghost"
                      text="Read more"
                      style={{maxWidth: '200px', margin: '0 auto'}}
                    />
                  </Link> ) : <></>
                }
              </Box>
            </OverlayText>
          </PaneContainer>
        </Box>
    )
  }
