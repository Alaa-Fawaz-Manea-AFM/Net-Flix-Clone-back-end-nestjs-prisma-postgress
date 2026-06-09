import { AxiosServer } from "@/lib/axios-server";
import { IMovieDetail } from "@/types";
import BtnHeart from "./BtnHeart";
import Image from "next/image";

const Card_My_heart = async () => {
  const { data } = await AxiosServer("get", "heart");
  const hearts = data?.data?.hearts || [];

  return (
    <>
      {hearts.length === 0 ? (
        <div className="text-7xl max-xsm:text-3xl w-full flex sm:justify-center px-5 sm:p-0 sm:w-4/5 text-white absolute top-[30%] right-1/2 translate-x-1/2">
          There are no favorite movies
        </div>
      ) : (
        <div className="flex flex-wrap h-64 flex-col gap-5 overflow-x-auto scroll-smooth absolute top-[40%] px-10">
          {hearts.map((movie: IMovieDetail) => (
            <div key={movie.backdrop_path} className="w-56 h-56 relative group">
              {movie?.backdrop_path && (
                <>
                  <Image
                    fill
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt="backdrop_path"
                    className="w-full h-full object-cover"
                    unoptimized
                  />

                  <BtnHeart movie={movie} heartPage />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Card_My_heart;
