"use client";
import { MutableRefObject, useEffect, useRef } from "react";

export function useDisableEnterKey() {
  const ref = useRef<HTMLFormElement>() as MutableRefObject<HTMLFormElement>;

  useEffect(function () {
    ref.current.addEventListener(
      "keypress",
      function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          return false;
        }
      },
      true
    );
  }, []);

  return ref;
}
