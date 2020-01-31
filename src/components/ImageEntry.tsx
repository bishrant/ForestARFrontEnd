import React, { useState, useEffect } from 'react';
import ImageCard from './ImageEntryCard';
import { api } from '../utils/oauth';

const ImageEntryComp = () => {
    const [images, setImages] = useState();
    const [error, setError] = useState(false);
    useEffect(() => {
        getAllAnchors();
    }, []);

    const getAllAnchors = () => {
        api.post('/getimages')
            .then((d: any) => {
                setImages(d.data['images']);
            }).catch((e: any) => {
                setError(e);
            })
    }

    const del = (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete " + id);

        if (confirmed) {
            api.post('/deleteAnchor/' + { id: id })
                .then((d: any) => {
                    if (d.data.success) {
                        getAllAnchors();
                    } else {
                        console.error('Error deleting entry');
                    }
                })
        }
    }

    return error ?
        (<div className={'error'}>
            No entries found
   </div>
        ) : (
            images ? (
                <div>
                    {images.map(
                        (img: any, i: number) => {
                            return <ImageCard image={img} key={i} onDelete={() => { del(img.id) }} />
                        })
                    }

                </div>

            ) : (<div>loading</div>)
        )
}

export default ImageEntryComp