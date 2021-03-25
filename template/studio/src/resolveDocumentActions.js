import defaultResolve from 'part:@sanity/base/document-actions'
import {UpdateBigCommerce} from './UpdateBigCommerce'

export default function resolveDocumentActions(props) {
  if (props.type !== 'product') {
    return defaultResolve(props)
  }
  return [...defaultResolve(props), UpdateBigCommerce]

}
