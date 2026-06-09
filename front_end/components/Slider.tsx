import { IMovieDetail, ISlider } from "@/types";
import { getData } from "@/utils/api";
import { TitleBorder } from ".";
import MovieItems from "./MovieItems";

const Slider = async ({ title, req }: ISlider) => {
  const movies: IMovieDetail[] = (await getData(req)) || [];

  return (
    <div className="sm:w-[95%] max-sm:w-full max-sm:px-2 mx-auto my-5">
      <TitleBorder title={title} />

      <div className="flex h-72 flex-wrap flex-col justify-center w-full gap-5 overflow-x-auto">
        <MovieItems movies={movies} />
      </div>
    </div>
  );
};

export default Slider;
