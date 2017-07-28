export const preventDefaultEvent = f => e => {
  e.preventDefault();
  if (f) {
    return f();
  }
}
