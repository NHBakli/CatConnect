"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import ImageBody from "@/components/image/ImageBody";
import { useAuth } from "@/hooks/Auth";
import AlertNotification from "@/components/alertNotification";

interface CatData {
  id: string;
  url: string;
  breeds?: Array<{
    name: string;
    temperament: string;
    origin: string;
    description: string;
    wikipedia_url: string;
    country_code: string;
    flag_url?: string;
  }>;
}

type AlertNotificationProps = {
  content: string;
  color: string;
  title: string;
};

type Props = {
  params: {
    id: string;
  };
};

const ImagePage = ({ params }: Props) => {
  const [catData, setCatData] = useState<CatData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] =
    useState<AlertNotificationProps | null>(null);
  const auth = useAuth();

  const userId = auth.user?.id;

  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const storedIsFavorite = localStorage.getItem(`favorite_${params.id}`);
    return storedIsFavorite ? JSON.parse(storedIsFavorite) : false;
  });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }

  const fetchFlagUrl = async (countryCode: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      const data = await response.json();
      return data[0]?.flags?.svg || null;
    } catch (error) {
      console.error("Error fetching flag URL!", error);
      return null;
    }
  };

  const fetchCatData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/${params.id}`,
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      const catData: CatData = await response.json();

      if (catData.breeds && catData.breeds[0]) {
        const flagUrl = await fetchFlagUrl(catData.breeds[0].country_code);
        catData.breeds[0].flag_url = flagUrl || undefined;
      }

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

  const handleFavorite = async () => {
    try {
      let rawBody;
      let favoriteId = null;

      if (isFavorite) {
        const favoriteToDelete = await fetch(
          `https://api.thecatapi.com/v1/favourites?image_id=${params.id}&sub_id=${userId}`,
          {
            method: "GET",
            headers: {
              "x-api-key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );
        const favoriteData = await favoriteToDelete.json();

        if (favoriteData.length > 0) {
          favoriteId = favoriteData[0].id;
        }

        rawBody = JSON.stringify({ image_id: favoriteId });
      } else {
        rawBody = JSON.stringify({
          image_id: params.id,
          sub_id: userId,
        });
      }

      const response = await fetch(
        isFavorite
          ? `https://api.thecatapi.com/v1/favourites/${favoriteId}`
          : "https://api.thecatapi.com/v1/favourites",
        {
          method: isFavorite ? "DELETE" : "POST",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: rawBody,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorite(!isFavorite);
        localStorage.setItem(
          `favorite_${params.id}`,
          JSON.stringify(!isFavorite)
        );
        setNotification({
          title: "Success",
          content: isFavorite
            ? "Image removed from favorites successfully!"
            : "Image added to favorites successfully!",
          color: "text-green-500",
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error favoriting image!", error);
      setNotification({
        title: "Error",
        content: isFavorite
          ? "Error removing image from favorites!"
          : "Error adding image to favorites!",
        color: "text-red-500",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleVotes = async () => {
    try {
      let rawBody = JSON.stringify({
        image_id: params.id,
        sub_id: userId,
        value: 1,
      });
      const response = await fetch("https://api.thecatapi.com/v1/votes", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: rawBody,
      });
      if (response.ok) {
        setNotification({
          title: "Congratulation",
          content: "Your vote has been taken into account.",
          color: "text-green-500",
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      setNotification({
        title: "Error",
        content: "Voting error for this image!",
        color: "text-red-500",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div>
      {notification && (
        <AlertNotification
          title={notification.title}
          content={notification.content}
          color={notification.color}
          onClose={() => setNotification(null)}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        catData && (
          <ImageBody
            catData={catData}
            onFavorite={handleFavorite}
            isFavorite={isFavorite}
            onVotes={handleVotes}
          />
        )
      )}
    </div>
  );
};

export default ImagePage;
