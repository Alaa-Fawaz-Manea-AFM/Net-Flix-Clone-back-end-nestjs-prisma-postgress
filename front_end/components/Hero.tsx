import { getRandomMovie, request } from "@/utils/api";
import { star } from "@/public/assets";
import Image from "next/image";

const Hero = async () => {
  const movie = await getRandomMovie(request?.requestPopular as string);

  return (
    <div className="w-full overflow-hidden bg-black text-white">
      <div className="h-[80vh] sm:h-screen w-full max-h-[1000px] relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.original_title || "Hero Backdrop"}
          fill
          className="object-cover opacity-75"
          priority
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent" />

        <div className="absolute inset-x-0 bottom-0 top-0 px-6 sm:px-16 lg:px-24 flex flex-col justify-center items-start z-10">
          <div className="flex flex-col gap-4 sm:gap-6 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
              {movie?.original_title}
            </h1>
            <div className="flex items-center gap-6 text-sm sm:text-base font-medium text-zinc-300">
              <span className="bg-zinc-800/80 px-3 py-1 rounded-md border border-zinc-700">
                {movie?.release_date?.split("-")[0] || movie?.release_date}{" "}
              </span>
              <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-2.5 py-1 rounded-md border border-yellow-500/20">
                {movie?.vote_average?.toFixed(1)}{" "}
                <Image
                  src={star}
                  alt="star_icon"
                  width={16}
                  height={16}
                  className="inline-block"
                  unoptimized
                />
              </span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl lg:max-w-2xl font-normal drop-shadow-sm line-clamp-4 sm:line-clamp-5 whitespace-normal break-words">
              {movie?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
