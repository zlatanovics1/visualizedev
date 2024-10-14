export function debounce(fn: Function, timeout: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
