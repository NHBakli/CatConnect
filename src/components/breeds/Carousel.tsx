import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type CatImage = {
  id: string;
  url: string;
  breeds: {
    name: string;
    temperament: string;
    wikipedia_url: string;
  }[];
};

interface CarouselProps {
  catImages: CatImage[];
}

const Carousel: React.FC<CarouselProps> = ({ catImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (catImages.length > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : catImages.length - 1
        );
        setAnimating(false);
      }, 500);
    }
  };

  const handleNext = () => {
    if (catImages.length > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < catImages.length - 1 ? prevIndex + 1 : 0
        );
        setAnimating(false);
      }, 500);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (animating) {
      timeout = setTimeout(() => setAnimating(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [animating]);

  if (catImages.length === 0) {
    return;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6">
      <div className="flex justify-center items-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white"
        >
          <FaArrowLeft size={20} />
        </button>
        <div className="overflow-hidden rounded-lg">
          <img
            src={catImages[currentIndex].url}
            alt={catImages[currentIndex].breeds[0]?.name || "Cat image"}
            className={`w-full h-64 object-cover transition-transform duration-500 ${
              animating ? "transform scale-105" : ""
            }`}
          />
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
