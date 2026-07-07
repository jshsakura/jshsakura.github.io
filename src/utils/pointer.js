// Touch-first devices report a coarse primary pointer; used to avoid
// force-focusing the terminal input (which pops the soft keyboard).
export function isCoarsePointer() {
  return typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches === true
}
