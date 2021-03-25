import styled from 'styled-components'

export function ResponsiveFixedRatioImage({imageUrl}: {imageUrl: string}) {
  return (
    <div style={{paddingBottom:'100%',
                 overflow:'hidden',
                 position:'relative',
                 height: '100%',
                 width: '100%' }}>
      <img 
        style={
          {height: '50%',
           width: '100%',
           objectFit: 'cover',
           borderRadius: '50%',
           position: 'absolute'
          }
        }
        src={imageUrl}/>
    </div>

  )
}
