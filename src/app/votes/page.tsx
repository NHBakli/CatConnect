"use client";
import { useAuth } from "@/hooks/Auth";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Link from "next/link";

interface CatData {
  id: number;
  image_id: string;
  sub_id: string;
  value: number;
  image: {
    id: string;
    url: string;
  };
}

const VotesPage: React.FC = () => {
  const [data, setData] = useState<CatData[]>([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }

  const auth = useAuth();
  let userId = auth.user?.id;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.thecatapi.com/v1/votes?sub_id=${userId}`,
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {loading && <Loader />}
      <div className="mt-4 grid w-auto h-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((cat) => (
          <Link href={`/image/${cat.image.id}`} key={cat.id}>
            <div className="bg-transparent rounded-lg shadow-md overflow-hidden w-full h-full cursor-pointer">
              <div className="w-full h-full aspect-w-1 aspect-h-1">
                <img
                  src={cat.image.url}
                  alt={`Cat ${cat.id}`}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default VotesPage;
