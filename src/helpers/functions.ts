export function debounce(func: any, wait: number = 300): any {
  let timeout: any
  return function(...args: any[]): void {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args)
    }, wait)
  }
}
