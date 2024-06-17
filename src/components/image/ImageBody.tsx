import React from "react";
import { FaStar, FaDownload, FaVoteYea, FaWikipediaW } from "react-icons/fa";

interface CatData {
  id: string;
  url: string;
  breeds?: Array<{
    name: string;
    temperament: string;
    origin: string;
    description: string;
    wikipedia_url: string;
    flag_url?: string;
  }>;
}

type ImageBodyProps = {
  catData: CatData;
  onFavorite: () => void;
  isFavorite: boolean;
};

const ImageBody: React.FC<ImageBodyProps> = ({
  catData,
  onFavorite,
  isFavorite,
}) => {
  const handleFavoriteClick = () => {
    onFavorite();
  };

  const breedInfo = catData.breeds?.[0];

  return (
    <div className="flex justify-center items-center mx-auto my-20 w-3/4">
      <div className="image-body bg-custom-gradient rounded-3xl shadow-lg p-6 flex w-full border-4 border-customBlue">
        <img
          src={catData.url}
          alt={`Cat ${catData.id}`}
          className="rounded-3xl w-1/2"
        />
        {breedInfo && (
          <div className="ml-6 w-1/2 flex flex-col">
            <h2 className="text-2xl font-bold text-white">{breedInfo.name}</h2>
            <p className="text-white mt-2 flex items-center">
              <strong>Origin: </strong>&nbsp;{breedInfo.origin}
              {breedInfo.flag_url && (
                <img
                  src={breedInfo.flag_url}
                  alt={`${breedInfo.origin} flag`}
                  className="w-8 h-8 ml-2"
                />
              )}
            </p>
            <p className="text-white mt-2">
              <strong>Temperament:</strong> {breedInfo.temperament}
            </p>
            <p className="text-white mt-2">{breedInfo.description}</p>
            <div className="flex justify-between mt-auto">
              <div>
                <a
                  href={breedInfo.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWikipediaW
                    size={24}
                    className="text-white hover:text-blue-500 cursor-pointer"
                  />
                </a>
              </div>
              <div>
                <FaStar
                  size={24}
                  className={`text-white cursor-pointer ${
                    isFavorite ? "text-yellow-500" : "hover:text-yellow-500"
                  }`}
                  onClick={handleFavoriteClick}
                />
              </div>
              <div>
                <FaDownload
                  size={24}
                  className="text-white hover:text-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <FaVoteYea
                  size={24}
                  className="text-white hover:text-green-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageBody;
