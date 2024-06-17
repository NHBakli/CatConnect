import Link from "next/link";

interface CatData {
  id: number;
  image: {
    id: string;
    url: string;
  };
}

type FavoritesBodyProps = {
  catData: CatData[];
};

const FavoritesBody: React.FC<FavoritesBodyProps> = ({ catData }) => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="mt-4 grid w-auto h-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {catData.map((cat) => (
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

export default FavoritesBody;
