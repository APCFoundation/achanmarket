import { useQuery } from "@tanstack/react-query";
import { mockCollections } from "../lib/mockCollections";

const useTopCollection = () => {
  const { data } = useQuery({
    queryKey: ["top-collection"],
    queryFn: () => mockCollections,
  });
  return { data };
};

export { useTopCollection };
