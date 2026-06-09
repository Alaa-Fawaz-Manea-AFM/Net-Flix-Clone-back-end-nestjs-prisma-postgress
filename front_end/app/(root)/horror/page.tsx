import { HerPageSlid } from "@/components";
import { IMovieDetail } from "@/types";
import { getData, request } from "@/utils/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horror",
  description: "Horror Movies",
};

const HorrorPagae = async () => {
  let data: IMovieDetail[];
  try {
    data = await getData(request.requestHorror as string);
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

export default HorrorPagae;
