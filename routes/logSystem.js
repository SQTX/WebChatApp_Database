var colors = require('colors');

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

// Settings:
const dbActive = false;
// const dbActive = true;
const errActive = false;
// const errActive = true;

// Types: {normal, db, err}
function printLog(txt, type = 'normal') {
  const now = getTime();
  if(type === 'db' && !dbActive) return;
  else if(type === 'db' && dbActive) {
    console.log(`>[DB](${now}): ${txt}`.magenta);
    return;
  }
  if(type === 'err' && !errActive) return;
  else if(type === 'err' && errActive) {
    console.log(`>[ERR](${now}): ${txt}`.bgRed);
    return;
  }
  console.log(`>(${now}): ${txt}`);
}

module.exports = printLog;