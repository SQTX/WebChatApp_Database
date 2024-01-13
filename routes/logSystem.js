const winston = require('winston');   // Winston module

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
function printLog2(txt, type = 'normal') {
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

const logLevels = require('./loggers');

const cliLogger = winston.loggers.get('cliLogger');
const allLoggerFile = winston.loggers.get('allLoggerFile');
const serverFile = winston.loggers.get('serverFile');
const dbFile = winston.loggers.get('dbFile');

const loggersLevels = {
  levels: {
    error: 0,
    warn: 1,
    debug: 2,
    server: 3,
    database: 4,
    http: 5,
    info: 6
  }
};

const allLevels = ['error', 'warn', 'debug', 'server', 'database', 'http', 'info']

function printLog(mess, level = 'server', errMess = "") {
  let logLevel = 0;

  allLevels.forEach((lvl, i) => {
    if(level === lvl) logLevel = i;
  })

  switch(logLevel) {
    case 0:
      cliLogger.error(`${mess}`, new Error(errMess));
      allLoggerFile.error(`${mess}`, new Error(errMess));
      break;
    case 1:
      cliLogger.warn(`${mess}`);
      allLoggerFile.warn(`${mess}`);
      break;
    case 2:
      cliLogger.debug(`${mess}`);
      allLoggerFile.debug(`${mess}`);
      break;
    case 3:
      cliLogger.server(`${mess}`);
      serverFile.server(`${mess}`);
      allLoggerFile.server(`${mess}`);
      break;
    case 4:
      cliLogger.database(`${mess}`);
      dbFile.database(`${mess}`);
      allLoggerFile.database(`${mess}`);
      break;
    case 5:
      cliLogger.http(`${mess}`);
      allLoggerFile.http(`${mess}`);
      break;
    case 6:
      cliLogger.info(`${mess}`);
      allLoggerFile.info(`${mess}`);
      break;
    default:
      break;
  }
}


module.exports = printLog;



