import { getData, request } from "@/utils/api";
import { HerPageSlid } from "@/components";
import { IMovieDetail } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular",
  description: "Popular Movies",
};

const PopularPagae = async () => {
  let data: IMovieDetail[];
  try {
    data = await getData(request.requestPopular as string);
  } catch {
    throw Error;
  }
  const movies: IMovieDetail[] = data;
  return (
    <div className="flex justify-center flex-wrap w-full gap-5">
      <HerPageSlid title="Popular" movies={movies} />
    </div>
  );
};

export default PopularPagae;
