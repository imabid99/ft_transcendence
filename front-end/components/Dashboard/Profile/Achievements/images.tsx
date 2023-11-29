import React, { useState } from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';
import { Blurhash } from 'react-blurhash';
const images = [
  [
      { unlocked: '/ach1.svg', locked: '/ach1Lock.svg', alt: 'Ach1' },
      { unlocked: '/ach2.svg', locked: '/ach2Lock.svg', alt: 'Ach2'},
  ],
  [
      { unlocked: '/ach3.svg', locked: '/ach3Lock.svg', alt: 'Ach3'},
      { unlocked: '/ach4.svg', locked: '/ach4Lock.svg', alt: 'Ach4'},
      { unlocked: '/ach5.svg', locked: '/ach5Lock.svg', alt: 'Ach5', className: 'lg:block hidden'},
  ],
  [
      { unlocked: '/ach6.svg', locked: '/ach6Lock.svg', alt: 'Ach6'},
      { unlocked: '/ach7.svg', locked: '/ach7Lock.svg', alt: 'Ach7'},
  ],
  [
      { unlocked: '/ach5.svg', locked: '/ach5Lock.svg', alt: 'Ach5', className: 'pb-[30px] block lg:hidden'},
  ],
];
// type ImageType = {
//   src: string;
//   alt: string;
//   className?: string;
// };

// type ImageComponentProps = {
//   images: ImageType[][];
// };
// images.forEach(row => {
//   row.forEach(image => {
//       console.log(image.locked);
//   });
// });

function ImageComponent({achievements} : any) {
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(false);
  console.log("this is achiasdfkljasdf alsdfj :",achievements);
  // const handleImageLoad = () => {
  //   setLoading(false);
  // };
  // const timer = setTimeout(() => {
  //   setShowImages(true);
  // }, 2000);

  // clearTimeout(timer);
  return (
    <div className="flex items-center flex-col w-12/12 gap-[30px] lg:gap-0 pb-[30px]">
      {/* {loading && <Loading />} */}
      {images.map((imageRow, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
          {imageRow.map((img, imgIndex) => (
            <div key={imgIndex} className="transform hover:scale-110 transition-transform duration-300 relative">
              <Image src={img.unlocked} alt={img.alt} className={img.className} width={197} height={220} loading="lazy"/>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageComponent;