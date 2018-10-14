const callIfExists = (
  fnc: ((...v: any[]) => any) | undefined,
  ...args: any[]
) => {
  if (fnc) {
    return fnc(...args);
  }
  return null;
};
export default callIfExists;
