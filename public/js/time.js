export function getNowTime() {
  const now = new Date();
  // Date:
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // Time:
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // console.log("Time:", time);

  return time;
}