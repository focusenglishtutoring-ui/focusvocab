import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useUnit() {
  return useQuery({
    queryKey: [api.content.getUnit.path],
    queryFn: async () => {
      const res = await fetch(api.content.getUnit.path);
      if (!res.ok) {
        throw new Error("Failed to fetch unit content");
      }
      return api.content.getUnit.responses[200].parse(await res.json());
    },
  });
}
