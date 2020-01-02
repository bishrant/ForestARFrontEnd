import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './ImageEntryCard';

const ImageEntryComp = () => {
    const [images, setImages] = useState();
    useEffect(() => {
        getAllAnchors();
    }, []);
    
    const getAllAnchors = () => {
        axios.get('http://localhost:5000/getimages')
        .then((d: any) => {
            setImages(d.data['images']);
        })
    }

    const del = (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete "+ id);

        if (confirmed) {
        axios.get('http://localhost:5000/deleteAnchor/?id='+ id)
        .then((d: any) => {
            if (d.data.success) {
                getAllAnchors();
            } else {
                console.error('Error deleting entry');
            }
        })
    }

    }

    return images ? (
        <div>
            {images.map(
                (img: any, i: number) => {
                    return <ImageCard image={img} key={i} onDelete={() => {del(img.id)}}/>
                })
            }
            
        </div>

    ) : (<div>loading</div>)
}

export default ImageEntryComp