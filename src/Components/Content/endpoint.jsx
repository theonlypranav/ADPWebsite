
import React, { useState, useEffect } from 'react';

const Endpoint = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const imageContext = import.meta.glob('../../assets/fest1/*.{jpg,jpeg,png}');
            const imageModules = await Promise.all(
                Object.values(imageContext).map(importFn => importFn())
            );
            setPhotos(imageModules.map(module => module.default));
        };

        loadImages();
    }, []);

    return (
        <div className="slideshow">
            <h1>Slideshow Page</h1>
            {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Photo ${index + 1}`} />
            ))}
        </div>
    );
};

export default Endpoint;