import { getData, request } from "@/utils/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://net-flix-clone-pink.vercel.app/";

  const dataArr = [];
  for (const i in request) {
    const arr = await getData(request[i as keyof typeof request]);
    dataArr.push(...(arr || []));
  }

  const sotmap: MetadataRoute.Sitemap = dataArr.map((arr) => {
    return {
      url: `${baseUrl}/movie/${arr.id}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/horror`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/heart`,
      lastModified: new Date(),
    },
    ...sotmap,
  ];
}
