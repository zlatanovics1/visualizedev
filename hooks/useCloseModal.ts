"use client";

import { MutableRefObject, ReactHTMLElement, useEffect, useRef } from "react";

export function useCloseModal(
  closeFn: () => void,
  listenCapturing = false,
  ul = false
) {
  const ref = ul
    ? (useRef() as MutableRefObject<HTMLUListElement>)
    : (useRef() as MutableRefObject<HTMLDivElement>);
  useEffect(function () {
    function handleClick(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) closeFn();
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, []);
  return ref;
}
