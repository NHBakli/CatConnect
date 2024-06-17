"use client";
import { useAuth } from "@/hooks/Auth";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import FavoritesBody from "@/components/image/FavoritesBody";

interface CatData {
  id: string;
  url: string;
  categories: { id: number; name: string };
}

const favoritePage = () => {
  const auth = useAuth();
  const [catData, setCatData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorite = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/favourites?limit=20&sub_id=${auth.user?.id}&order=DESC`,
        {
          headers: {
            "content-type": "application/json",
            "x-api-key":
              "live_oQShL3x4fwpTTRczMScjFteY3yzdXeQx3GizpAgCiPV1ZxdaL10zlS0w5fY7o1lj",
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
