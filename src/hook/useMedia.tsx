import { useMediaQuery } from "react-responsive";

const useMedia = () => {
  const isDesktop = useMediaQuery({ minWidth: "1280px" });
  const isLaptop = useMediaQuery({ minWidth: "1024px" });
  const isTablet = useMediaQuery({ minWidth: "470px" });
  const isMobile = useMediaQuery({ maxWidth: "470px" });
  return { isDesktop, isLaptop, isTablet, isMobile };
};

export default useMedia;
