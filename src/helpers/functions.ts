import { act } from 'react-dom/test-utils'

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

export async function wait(ms = 0) {
  // @ts-ignore
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  })
}
