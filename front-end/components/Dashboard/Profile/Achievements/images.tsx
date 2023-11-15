import React, { useState } from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';

type ImageType = {
  src: string;
  alt: string;
  className?: string;
};

type ImageComponentProps = {
  images: ImageType[][];
};

function ImageComponent({ images }: ImageComponentProps) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex items-center flex-col w-12/12 gap-[30px] lg:gap-0 pb-[30px]">
      {loading && <Loading />}
      {images.map((imageRow, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
          {imageRow.map((img, imgIndex) => (
            <div key={imgIndex} className="transform hover:scale-110 transition-transform duration-300 relative">
              <Image src={img.src} alt={img.alt} className={img.className} width={197} height={220} onLoad={handleImageLoad} loading="lazy"/>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageComponent;