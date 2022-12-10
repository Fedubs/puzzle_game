export const getToday = () => {
  let d = new Date();
  let yy = d.getUTCFullYear();
  let mm = d.getUTCMonth();
  let dd = d.getUTCDate();
  return Date.UTC(yy, addZero(mm), addZero(dd));
};

const addZero = e => {
  return e < 10 ? '0' + e : e;
};
