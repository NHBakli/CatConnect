"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import BodyBreeds from "@/components/breeds/Body";

type Breed = {
  id: string;
  name: string;
  wikipedia_url: string;
  country_code: string;
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

const BreedsPage = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBreeds(true);
        const response = await fetch("https://api.thecatapi.com/v1/breeds", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBreeds(data);
        } else {
          console.error("Error fetching data!", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data!", error);
      } finally {
        setLoadingBreeds(false);
      }
    };

    fetchData();
  }, [apiKey]);

  const fetchImages = async (categoryId: string) => {
    try {
      setLoadingImages(true);
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_id=${categoryId}&limit=10`,
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCatImages(data);
      } else {
        console.error("Error fetching images!", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching images!", error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    fetchImages(categoryId);
  };

  return (
    <div className="w-1/3 mx-auto mt-10">
      {loadingBreeds ? (
        <Loader />
      ) : (
        <BodyBreeds
          breeds={breeds}
          onSelect={handleCategorySelect}
          catImages={catImages}
          loadingImages={loadingImages}
        />
      )}
    </div>
  );
};

export default BreedsPage;
