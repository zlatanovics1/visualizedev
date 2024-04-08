"use client";

import { useEffect, useState } from "react";

export const revalidate = 0;
export function useLocalStorageState(initialState: any, key: string) {
  const [value, setValue] = useState(initialState);

  useEffect(
    function () {
      localStorage.setItem(key, value);
    },
    [value, key]
  );

  return [value, setValue];
}
