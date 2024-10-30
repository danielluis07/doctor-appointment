import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetSearchedDoctor = (q: string | string[] | undefined) => {
  const query = useQuery({
    enabled: !!q,
    queryKey: ["searched-doctors", { q }],
    queryFn: async () => {
      const res = await client.api.doctors.search.$get({
        query: { q },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch searched doctors");
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
