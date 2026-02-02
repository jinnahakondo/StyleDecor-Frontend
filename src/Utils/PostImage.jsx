import React from 'react';

const PostImage = async (image) => {

    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'styledecor')
    const res = await fetch(import.meta.env.VITE_appId_cloudinaryImageApi, {
        method: "POST",
        body: data
    })
    const uploadedImageurl = await res.json()
    return uploadedImageurl.url
};

export default PostImage;