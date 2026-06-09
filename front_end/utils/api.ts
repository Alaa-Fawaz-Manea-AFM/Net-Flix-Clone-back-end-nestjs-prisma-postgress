import {
  IForm,
  IHeart,
  IMovieDetail,
  IMovieDetailHeart,
  IUser,
  TRequest,
  TRequestArrary,
} from "@/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import AxiosClient from "@/lib/axios-client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

export const Links = ["Popular", "Trending", "Horror", "Heart"];

export const key = process.env.NEXT_PUBLIC_MOVIES_APP_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const request: TRequest = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${key}&language=en-US`,
  requestPopular: `${BASE_URL}/movie/popular?api_key=${key}&language=en-US&page=1`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${key}&language=en-US&with_genres=28`,
  requestHorror: `${BASE_URL}/discover/movie?api_key=${key}&language=en-US&with_genres=27`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${key}&language=en-US&with_genres=35`,
};

export const arrReq: TRequestArrary[] = [
  { name: "Trending Now", req: "fetchTrending" },
  { name: "Popular on Netflix", req: "requestPopular" },
  { name: "Top Rated", req: "fetchTopRated" },
  { name: "Action Thrillers", req: "fetchActionMovies" },
  { name: "Horror Movies", req: "requestHorror" },
  { name: "Comedies", req: "fetchComedyMovies" },
];

export const getUserData = async () => {
  const { data } = await AxiosClient.get("auth/me");
  return data?.data || {};
};

export const getData = async (req: string) => {
  try {
    const response = await fetch(req, {
      next: { revalidate: 120 },
    });
    const { results }: { results: IMovieDetail[] } = await response.json();
    return results;
  } catch {
    throw Error;
  }
};

export async function getRandomMovie(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const movies = data?.results || [];

    if (movies.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  } catch {
    return null;
  }
}

export const getDataDetails = async (movieId: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`,
    { next: { revalidate: 120 } },
  );
  return await response.json();
};

export const handleToogleHeart = async (
  movie: IMovieDetailHeart,
  setHeart: Dispatch<SetStateAction<Set<IHeart>>>,
  route: AppRouterInstance,
  like: boolean,
  heartPage?: boolean,
) => {
  try {
    const body =
      like || heartPage
        ? {
            id: movie?.movieId || movie?.id,
          }
        : {
            id: movie?.id,
            backdrop_path: movie?.backdrop_path,
            title: movie?.title || movie?.name,
          };

    const { data } = await AxiosClient.post("heart", body);
    setHeart((pre) => {
      const newHeart = new Set(pre);

      if (data?.data) {
        newHeart.add(Number(movie.id));
      } else {
        newHeart.delete(Number(movie?.movieId || movie?.id));
      }

      return newHeart;
    });

    if (heartPage) route.refresh();
    toast.success(data?.message || "filme Heart successfully");
  } catch {
    toast.error("Failed Toogle to My Heart");
  }
};

export const handle_logIn_And_SignUp = async (
  link: string,
  router: AppRouterInstance,
  form: IForm,
  setForm: Dispatch<SetStateAction<IForm>>,
  setUser: Dispatch<SetStateAction<IUser | null>>,
  setHeart: Dispatch<SetStateAction<Set<IHeart>>>,
) => {
  try {
    const { data } = await AxiosClient.post(
      `auth/${link.replace("-", "")}`,
      form,
    );
    setUser(data?.data?.user);
    if (link == "log-in") {
      setHeart(new Set(data?.data?.hearts) || new Set());
    }
    setForm({ email: "", password: "" });
    toast.success(`${link} Succesfully`);
    router.refresh();
    router.push("/");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Sign Up Failed");
    } else {
      toast.error("Sign Up Failed");
    }
  }
};
