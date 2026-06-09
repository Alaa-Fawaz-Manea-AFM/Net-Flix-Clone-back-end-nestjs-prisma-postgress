import { getDataDetails } from "@/utils/api";
import { notFound } from "next/navigation";
import { star } from "@/public/assets";
import { IMovieDetail } from "@/types";
import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";

type IParamsDetails = { params: { movieId: string } };

export async function generateMetadata({
  params: { movieId },
}: IParamsDetails): Promise<Metadata> {
  try {
    const { overview, original_title, backdrop_path }: IMovieDetail =
      await getDataDetails(movieId);
    const imgage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    return {
      title: original_title,
      description: overview,
      openGraph: {
        images: [imgage],
      },
    };
  } catch {
    return {
      title: "not-found",
      description: "The page you are looking for does not exist.",
    };
  }
}

const MovieDetailsPage = async ({ params }: IParamsDetails) => {
  const patam = await params;
  const movieId = patam?.movieId;

  let movieDetail: IMovieDetail;
  try {
    movieDetail = await getDataDetails(movieId);
  } catch {
    notFound();
  }

  const {
    genres,
    runtime,
    tagline,
    overview,
    vote_count,
    poster_path,
    vote_average,
    release_date,
    backdrop_path,
    original_title,
    production_companies,
  } = movieDetail;

  return (
    <div className="w-full min-h-screen pb-16 space-y-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="relative w-full h-[50vh] sm:h-[65vh] max-h-[800px] overflow-hidden bg-black">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
          }
        >
          <Image
            fill
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={original_title || "Backdrop"}
            className="object-cover opacity-60"
            priority
            unoptimized
          />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-black/40" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          <div className="w-[240px] sm:w-[300px] shrink-0 shadow-2xl rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            <Suspense
              fallback={
                <div className="aspect-[2/3] w-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
              }
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                width={300}
                height={450}
                alt={`${original_title} Poster`}
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                unoptimized
              />
            </Suspense>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-start space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {original_title}
            </h1>

            {tagline && (
              <p className="text-md sm:text-lg italic font-medium text-custom-red">
                {tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-2.5 py-1 rounded-lg border border-yellow-500/20 shadow-xs">
                {vote_average}
                <Image
                  src={star}
                  alt="star"
                  width={16}
                  height={16}
                  unoptimized
                />
                <span className="text-xs text-zinc-400">({vote_count})</span>
              </span>
              <span className="bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {runtime} mins
              </span>
              <span className="bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
                Released: {release_date?.split("-")[0] || release_date}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              {genres?.map((genre, index) => (
                <span
                  key={index}
                  className="rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors hover:border-custom-red"
                >
                  {genre?.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold tracking-tight border-l-4 border-custom-red pl-3">
            Synopsis
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-md text-justify whitespace-normal break-words">
            {overview}
          </p>
        </div>

        {production_companies && production_companies.length > 0 && (
          <div className="space-y-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold tracking-tight text-center sm:text-left">
              Production Companies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
              {production_companies?.map((company, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 group text-center"
                >
                  {company?.logo_path ? (
                    <div className="w-full aspect-video bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center justify-center shadow-xs group-hover:shadow-md transition-shadow duration-300">
                      <Image
                        width={140}
                        height={60}
                        className="object-contain max-h-[60px]"
                        src={`https://image.tmdb.org/t/p/w300${company?.logo_path}`}
                        alt={company?.name}
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-xs font-medium text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700">
                      No Logo
                    </div>
                  )}
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {company?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
