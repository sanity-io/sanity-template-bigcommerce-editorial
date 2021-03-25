import { FaPinterest, FaFacebook, FaRegEnvelope } from 'react-icons/fa'
import { Inline, Text } from '@sanity/ui'

export function SocialBar() {
  return (
    <Inline space={1}
      style={{width: "100%", textAlign: "center", paddingTop: "1rem"}}>
      <Text>Share:</Text>
      <Inline space={3}>
        <FaPinterest />
        <FaFacebook />
        <FaRegEnvelope />
      </Inline>
    </Inline>
  )
}
