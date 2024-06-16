"use client";
import Loader from "@/components/Loader";
import ImageBody from "@/components/image/ImageBody";
import React, { useState, useEffect } from "react";

interface CatData {
  id: string;
  url: string;
  categories: { id: number; name: string };
}

type Props = {
  params: {
    id: string;
  };
};

const ImagePage = ({ params }: Props) => {
  const [catData, setCatData] = useState<CatData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCatData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/${params.id}`,
        {
          method: "GET",
          headers: {
            "x-api-key":
              "live_S8NzNsPlSjriXEAGWcDHiDrYlNBOYWfQnp3KjJwtlQjWDYPi3cd26iD9MLdmQv67",
          },
        }
      );
      const catData: CatData = await response.json();
      setCatData(catData);
    } catch (error) {
      console.error("Error fetching data!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, [params.id]);

  return (
    <div>
      {loading ? <Loader /> : catData && <ImageBody catData={catData} />}
    </div>
  );
};

export default ImagePage;
