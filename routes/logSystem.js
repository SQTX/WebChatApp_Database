function getTime() {
  let now = new Date();

  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let year = now.getFullYear();
  const date = `${year}-${month}-${day}`;

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const time = `${hours}:${minutes}:${seconds}`;

  const fullTime = `${date} ${time}`
  return fullTime;
}

function printLog(txt) {
  const now = getTime();
  console.log(`>(${now}): ${txt}`);
}

module.exports = printLog;