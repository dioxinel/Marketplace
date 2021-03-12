import React from 'react';
import s from '../ProductDescription.module.scss';

export function ProductImage({ photoList, className }) {
  let imageLink;
  try {
    imageLink = photoList[0];
    if (!imageLink.startsWith('http')) {
      imageLink = 'https://argamak-sher.uz/wp-content/uploads/no-image.png';
    }
  } catch (error) {
    imageLink = 'https://argamak-sher.uz/wp-content/uploads/no-image.png';
  }
  return (
    <div>
      <img
        src={imageLink}
        alt="Exist"
        className={className}
      />
    </div>
  );
}
