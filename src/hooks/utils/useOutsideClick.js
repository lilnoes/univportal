import { useEffect } from "react";

export default function useOutsideClick(ref, handler) {
  const handleClick = (evt) => {
    if (ref.current && !ref.current.contains(evt.target)) {
      handler();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref]);
}
