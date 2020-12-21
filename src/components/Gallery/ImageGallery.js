import React from 'react';
import './Gallery.css';

export default function ImageGallery ({ images, onClick }) {
 return (
  <ul className="ImageGallery">
    {images.map(image => (
      <li key={image.id} onClick={() => onClick(image.largeImageURL)}>
        <img src={image.webformatURL} alt="" className="ImageGalleryItem-image" />
      </li>
    ))}
  </ul>
 )
}