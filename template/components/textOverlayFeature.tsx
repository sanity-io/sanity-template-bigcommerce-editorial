import {Heading, Box, Flex, Text, Button} from '@sanity/ui'
import {Article, Image} from '../types'
import Link from 'next/link'
import { urlFor, PortableText } from '$utils/sanity'
import styled from 'styled-components'

const OverlayBox = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
  `

const OverlayText = styled.div`
  color: white;
  position: absolute;
  top: 40%;
  left: 35%;
  transform: translate(-50%, -50%);
`

export function TextOverlayFeature({title, text, image, url, fullSize}
  : {title: string, text: any | any[], image: Image, url: string, fullSize: boolean}) {

    const imageUrl = (fullSize) ?
      urlFor(image).url() : urlFor(image).height(600).url()

    const backgroundImageStyle = {
      backgroundSize: 'cover',
      background: `
        linear-gradient(
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.4)
        ),
        url(${imageUrl})`
    }

    return  (
      <Box flex={1} style={{ minWidth: '350px', height: (fullSize) ? '100vh' : '400px'}}>  
          <OverlayBox style={backgroundImageStyle}>
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
          </OverlayBox>
        </Box>
    )
  }
