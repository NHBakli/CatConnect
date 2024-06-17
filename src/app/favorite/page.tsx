"use client";
import { useAuth } from "@/hooks/Auth";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import FavoritesBody from "@/components/image/FavoritesBody";

const favoritePage = () => {
  const auth = useAuth();
  const [catData, setCatData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }

  const fetchFavorite = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/favourites?limit=20&sub_id=${auth.user?.id}&order=DESC`,
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );
      const favourites = await response.json();
      setCatData(favourites);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching favorite image" + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auth.user?.id) {
      fetchFavorite();
    }
  }, [auth.user?.id]);

  return (
    <div>
      {loading ? <Loader /> : catData && <FavoritesBody catData={catData} />}
    </div>
  );
};

export default favoritePage;
