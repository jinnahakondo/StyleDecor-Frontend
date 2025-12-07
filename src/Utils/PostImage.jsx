import axios from 'axios';
import React from 'react';

const PostImage = async (image) => {

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(import.meta.env.VITE_IMAGEBB_API, formData)
    
    const imageUrl =res.data.data.url
    return imageUrl;
};

export default PostImage;