import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    let pathnameSplited = pathname.split('/');
    if(!(pathnameSplited[1] === 'animes' && pathnameSplited[3] === 'episodes')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname]);

  return null;
}