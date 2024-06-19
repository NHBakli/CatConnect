import React from "react";
import SelectCategory from "./SelectCategory";
import CarouselCustomNavigation from "./Carousel";

type Breed = {
  id: string;
  name: string;
};

type CatImage = {
  id: string;
  url: string;
  breeds: {
    name: string;
    description: string;
    wikipedia_url: string;
    origin: string;
  }[];
};

interface BodyBreedsProps {
  breeds: Breed[];
  onSelect: (categoryId: string) => void;
  catImages: CatImage[];
  loadingImages: boolean;
}

const BodyBreeds: React.FC<BodyBreedsProps> = ({
  breeds,
  onSelect,
  catImages,
  loadingImages,
}) => {
  const firstCatImage = catImages.length > 0 ? catImages[0] : null;

  return (
    <div className="bg-navbarBg p-6 rounded-lg shadow-lg">
      <SelectCategory breeds={breeds} onSelect={onSelect} />
      {loadingImages ? (
        <div className="text-white">Loading images...</div>
      ) : (
        <div className="mt-4">
          <CarouselCustomNavigation catImages={catImages} />
          {firstCatImage && (
            <div className="mt-4">
              <div className="flex items-center text-sm text-white mb-3">
                <h2 className="text-xl font-semibold text-white mb-3 mr-2">
                  {firstCatImage.breeds[0].name}
                </h2>
                <h3 className="text-l text-center text-white-10 mb-3">
                  ({firstCatImage.breeds[0].origin})
                </h3>
              </div>
              <p className="text-sm text-white mb-3">
                {firstCatImage.breeds[0].description}
              </p>
              <a
                href={firstCatImage.breeds[0].wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Wikipedia
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BodyBreeds;
