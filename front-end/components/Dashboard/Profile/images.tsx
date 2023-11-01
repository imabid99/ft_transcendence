import React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

interface ImageGridProps {
    images: ImageProps[][];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
    return (
      <div className="flex items-center flex-col w-12/12 gap-[30px] lg:gap-0 pb-[30px]">
        {images.map((imageRow, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
            {imageRow.map((img, imgIndex) => (
              <div key={imgIndex} className="transform hover:scale-110 transition-transform duration-300 relative">
                <img src={img.src} alt={img.alt} className={img.className} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default ImageGrid;