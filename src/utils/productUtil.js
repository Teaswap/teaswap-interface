import React from 'react'

export const preview = (productPictureUrl, media_type, loaded, onLoad, $width, $height) => {
    const src = productPictureUrl.startsWith('http') ? productPictureUrl : `https://teaswap.mypinata.cloud/ipfs/${productPictureUrl}`
    switch(media_type) {
      case 'Video':
        return <video style={{width: '100%'}} controls src={src} ></video>
      case "Audio":
        return <audio controls src={src} ></audio>
      default:
        return (
          <ProductPicture
            src={src}
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={onLoad}
            $width={$width}
            $height={$height}
          />
        )
    }
  }