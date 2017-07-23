export const preventDefaultEvent = f => e => {
  e.preventDefault();
  return f();
}
