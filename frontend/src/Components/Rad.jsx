import React, { useState } from 'react';
import { galeryRad } from '../assets/assets';
import Title from './Title';

const Rad = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null); // Promenio false u null

  const openImage = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const closeImage = () => {
    setCurrentImageIndex(null);
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (currentImageIndex < galeryRad.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className='pt-20 mb-20 animated-section-left' id='rad'>
      <div className='text-4xl text-center'>
        <p className='dancing-script-400 amber'>Moja jaja slajdraju</p>
          </div>
          <div className='text-5xl text-center header'>
              <p className='font-bold mb-4'>Mog rada</p>
          </div>
          <p className='text-lg font-medium text-neutral-400 text-center p-4'>
              Spoj tradicije i modernog stila – svaka frizura i brada oblikovani su s posebnom pažnjom, osmišljeni da naglase tvoj karakter i jedinstveni izgled.
          </p>

      <div className='mx-auto max-w-screen-xl'>
      
        {galeryRad.length > 0 && (
          <div>
          <div className='grid grid-cols-4 grid-rows-2 gap-4'>
            {galeryRad.map((images, index) => (
              <div className='w-full' key={index}>
                <img
                  src={images.image}
                  alt={images.name}
                  className='w-full h-auto rounded-lg cursor-pointer'
                  onClick={() => openImage(index)}
                />
                
              </div>
            ))}
            
          </div>
          </div>
        )}
        
        {currentImageIndex !== null && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
            onClick={closeImage}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              {currentImageIndex !== null && galeryRad[currentImageIndex] && ( // Dodao provere
                <div>
                  <img
                  src={galeryRad[currentImageIndex].image}
                  alt={`Screenshot ${currentImageIndex + 1}`}
                  className="max-w-full max-h-screen"
                />
                </div>
              )}
             
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={closeImage}
              >
                &times;
              </button>

              {currentImageIndex > 0 && (
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                  onClick={prevImage}
                >
                  &#10094;
                </button>
              )}

              {currentImageIndex < galeryRad.length - 1 && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                  onClick={nextImage}
                >
                  &#10095;
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rad;
