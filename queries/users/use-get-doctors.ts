import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetDoctors = () => {
  const query = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await client.api.doctors.$get();

      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
