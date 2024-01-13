const winston = require('winston');   // Winston module

require('./loggers');


const allLevels = ['error', 'warn', 'debug', 'server', 'database', 'http', 'info']


const cliLogger = winston.loggers.get('cliLogger');
const allLoggerFile = winston.loggers.get('allLoggerFile');
const serverFile = winston.loggers.get('serverFile');
const dbFile = winston.loggers.get('dbFile');


function printLog(mess, level = 'server', err) {
  let logLevel = 0;

  allLevels.forEach((lvl, i) => {
    if(level === lvl) logLevel = i;
  })

  switch(logLevel) {
    case 0:
      cliLogger.error(`${mess}`, err);
      allLoggerFile.error(`${mess}`, err);
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