"use client";

import { useEffect } from "react";

export default function DarkMode() {
  useEffect(function () {
    document.body.classList.add("dark");
  }, []);

  return null;
}
