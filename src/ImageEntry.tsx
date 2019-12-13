import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ImageCard from './ImageEntryCard';

const getImg = (i: any) => {
    return (i.map((img: any, i:number) => (<ImageCard image={img} key={i}/>)));
}
const ImageEntryComp = () => {
    const [images, setImages] = useState();

   
    useEffect(() => {
        axios.get('http://128.194.233.9:5000/getimages')
        .then((d: any) => {
            console.log(d);
            setImages(d.data);
        })
    }, []);
    return images ? (
        <div>
            <div>{getImg(images.images)}</div>
        </div>
        
    ) : (<div>loading</div>)
}

export default ImageEntryComp