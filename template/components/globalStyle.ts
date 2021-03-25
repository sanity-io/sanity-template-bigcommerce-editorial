import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle((props: {theme: Theme}) => {
  //
  //TODO: control in studio?
  const {theme} = props
  const colorBase = theme.sanity.color.base
  const color = {fg: colorBase.fg, bg: "#FCFCFF"}


  return css`

    html,
    body,
    #__next {
      height: 100%;
    }

    body {
      background-color: ${color.bg};
      color: ${color.fg};
      -webkit-font-smoothing: antialiased;
      margin: 0;
    }

      `
})
