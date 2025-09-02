import { useEffect, useState } from "react";

const useHydrate = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
};

export default useHydrate;
