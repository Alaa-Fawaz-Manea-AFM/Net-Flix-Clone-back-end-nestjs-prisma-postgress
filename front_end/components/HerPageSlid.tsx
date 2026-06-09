import { IMovieDetail } from "@/types";
import { MovieItems, TitleBorder } from "@/components";

interface IHerPage {
  title: string;
  movies: IMovieDetail[];
}

const HerPageSlid = ({ title, movies }: IHerPage) => {
  return (
    <div className="w-11/12 mx-auto py-32">
      <TitleBorder title={title} />
      <div className="flex flex-wrap gap-5 justify-center">
        <MovieItems movies={movies} />
      </div>
    </div>
  );
};

export default HerPageSlid;
