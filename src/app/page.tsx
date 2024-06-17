"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";

interface CatData {
  id: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState<CatData[]>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }

  const fetchCatData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=25&has_breeds=1",
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      const catData: CatData[] = await response.json();
      setData((prevData) => [...prevData, ...catData]);
    } catch (error) {
      console.error("Error fetching data!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {!data.length && loading ? <Loader /> : ""}
      <div className="mt-4 grid w-auto h-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((cat) => (
          <Link
            href={`/image/${cat.id}`}
            key={cat.id}
            className="bg-transparent rounded-lg shadow-md overflow-hidden w-full h-full"
          >
            <div className="w-full h-full aspect-w-1 aspect-h-1">
              <img
                src={cat.url}
                alt={`Cat`}
                className="object-cover object-center w-full h-full"
              />
            </div>
          </Link>
        ))}
      </div>
      {data.length > 0 && (
        <button
          onClick={fetchCatData}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "More"}
        </button>
      )}
    </main>
  );
}
