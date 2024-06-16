import React from "react";
import { FaHeart, FaStar, FaDownload, FaVoteYea } from "react-icons/fa";

interface CatData {
  id: string;
  url: string;
}

type ImageBodyProps = {
  catData: CatData;
};

const ImageBody: React.FC<ImageBodyProps> = ({ catData }) => {
  return (
    <div className="flex justify-center items-center mt-28">
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
              className="text-white hover:text-red-500 cursor-pointer"
            />
          </div>
          <div>
            <FaStar
              size={24}
              className="text-white hover:text-yellow-500 cursor-pointer"
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
