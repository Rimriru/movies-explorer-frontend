import { useEffect, useState } from "react";

const isWindowDesktop = () => window.innerWidth > 768;
const isWindowTabOrMobile = () => window.innerWidth <= 768;
const isWindowTab = () => window.innerWidth > 480 && window.innerWidth <= 768;
const isWindowMobile = () => window.innerWidth <= 480;

export default function useWindowResize() {
  const [isDesktop, setIsDesktop] = useState(isWindowDesktop());
  const [isTabOrMobile, setIsTabOrMobile] = useState(isWindowTabOrMobile());
  const [isTab, setIsTab] = useState(isWindowTab());
  const [isMobile, setIsMobile] = useState(isWindowMobile());

  useEffect(() => {
    const onResize = () => {
      setTimeout(() => {
        setIsDesktop(isWindowDesktop());
        setIsTabOrMobile(isWindowTabOrMobile());
        setIsTab(isWindowTab());
        setIsMobile(isWindowMobile());
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { isDesktop, isTabOrMobile, isTab, isMobile };
}
