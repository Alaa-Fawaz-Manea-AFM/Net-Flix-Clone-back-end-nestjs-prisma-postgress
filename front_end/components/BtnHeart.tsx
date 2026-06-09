"use client";
import { useUserContext } from "@/context/MyState";
import { Heart, CheckCheck } from "lucide-react";
import { handleToogleHeart } from "@/utils/api";
import { useEffect, useState } from "react";
import { IMovieDetailHeart } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BtnHeart = ({
  movie,
  heartPage,
}: {
  heartPage?: boolean;
  movie: IMovieDetailHeart;
}) => {
  const { user, heart, setHeart } = useUserContext();
  const [like, setLike] = useState<boolean>(false);
  const getLike = () => setLike(heart?.has(Number(movie?.id)) || false);
  const route = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getLike();
  }, [heart]);

  const handleToogleHeartFun = async (movie: IMovieDetailHeart) => {
    return handleToogleHeart(movie, setHeart, route, like, heartPage);
  };

  return (
    <div
      onClick={() =>
        user
          ? handleToogleHeartFun(movie)
          : toast.error("Sorry, you must log In")
      }
      className="top-2 right-2 absolute cursor-pointer"
    >
      {heartPage ? (
        <CheckCheck
          size={30}
          strokeWidth={2}
          className="cursor-pointer transition"
        />
      ) : (
        <Heart
          size={30}
          fill={like ? "#ef4444" : "none"}
          strokeWidth={2}
          className="cursor-pointer transition"
        />
      )}
    </div>
  );
};

export default BtnHeart;
