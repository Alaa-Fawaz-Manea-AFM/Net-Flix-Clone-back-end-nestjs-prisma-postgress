import { Hero, Skiliton_Slider, Slider } from "@/components";
import { arrReq, request } from "@/utils/api";
import { TRequestArrary } from "@/types";
import { Suspense } from "react";

const HomePage = () => {
  const skiltonArr = Array.from({ length: arrReq.length });
  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="mb-10 mt-28">
        <Suspense
          fallback={
            <>
              {skiltonArr.map((arr, i) => (
                <Skiliton_Slider key={i} />
              ))}
            </>
          }
        >
          {arrReq?.map((req: TRequestArrary) => (
            <Slider
              key={req?.name}
              title={req?.name}
              req={request[req?.req as keyof typeof request]}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
