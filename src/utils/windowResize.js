import { useEffect, useState } from "react";

const isWindowMobile = () => window.innerWidth <= 768;

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(isWindowMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(isWindowMobile());
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isMobile;
}