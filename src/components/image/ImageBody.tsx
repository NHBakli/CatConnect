import React from "react";
import { FaHeart, FaStar, FaDownload, FaVoteYea } from "react-icons/fa";

interface CatData {
  id: string;
  url: string;
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

  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <div className="image-body bg-custom-gradient rounded-3xl shadow-lg p-6">
        <img
          src={catData.url}
          alt={`Cat ${catData.id}`}
          className="rounded-3xl"
        />
        <div className="flex justify-between mt-4">
          <div>
            <FaHeart
              size={24}
              className={`text-white cursor-pointer ${
                isFavorite ? "text-red-500" : "hover:text-red-500"
              }`}
            />
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
    </div>
  );
};

export default ImageBody;
