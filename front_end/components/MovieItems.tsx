import { IMovieDetail } from "@/types";
import { info } from "@/public/assets";
import BtnHeart from "./BtnHeart";
import Image from "next/image";
import Link from "next/link";

const MovieItems = ({ movies }: { movies: IMovieDetail[] }) => (
  <>
    {movies?.map((movie) => (
      <div
        key={movie.id}
        className={`${
          movie.backdrop_path ? "w-56 h-56 relative group" : "sr-only"
        }`}
      >
        <Image
          fill
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="netflix"
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-0 left-0 w-full h-full items-center justify-center bg-black/40 hidden group-hover:flex line-clamp-1">
          {movie.title}
          <Link
            href={`/movie/${movie.id}`}
            className="absolute bottom-0 right-0 flex items-center gap-2 p-2 bg-black/60 text-xl font-semibold text-white rounded-md"
          >
            <Image
              src={info}
              alt="info_icon"
              width={30}
              height={30}
              unoptimized
            />
          </Link>
          <BtnHeart movie={movie} />
        </div>
      </div>
    ))}
  </>
);

export default MovieItems;
