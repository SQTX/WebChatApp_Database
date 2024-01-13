const winston = require('winston');   // Winston module
const {combine, timestamp, printf, json, prettyPrint, errors} = winston.format;


const loggersLevels = {
  levels: {
    error: 0,
    warn: 1,
    debug: 2,
    server: 3,
    database: 4,
    http: 5,
    info: 6
  },
  colors: {
    error: 'redBG',
    warn: 'red',
    debug: 'white',
    server: 'cyan',
    database: 'magenta',
    http: 'yellow',
    info: 'green'
  }
};
winston.addColors(loggersLevels.colors);


// Logger to print data in console:
winston.loggers.add('cliLogger', {
  levels: loggersLevels.levels,
  format: combine(
    winston.format.colorize(),
    errors({stack: true}),
    timestamp(),
    printf((info) => `(${info.timestamp})[${info.level}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

// Loggers to save data in files:
winston.loggers.add('allLoggerFile', {
  levels: loggersLevels.levels,
  format: combine(
    errors({stack: true}),
    timestamp(),
    json(),
    // prettyPrint(),
  ),
  transports: [
    new winston.transports.File({filename: './logs/allIn.log'}),
  ]
});

winston.loggers.add('serverFile', {
  levels: loggersLevels.levels,
  format: combine(
    errors({stack: true}),
    timestamp(),
    json(),
    // prettyPrint(),
  ),
  transports: [
    new winston.transports.File({filename: './logs/server.log', level: 'server'}),
  ]
});

winston.loggers.add('dbFile', {
  levels: loggersLevels.levels,
  format: combine(
    errors({stack: true}),
    timestamp(),
    json(),
    // prettyPrint(),
  ),
  transports: [
    new winston.transports.File({filename: './logs/database.log', level: 'database'}),
  ]
});


module.exports = loggersLevels.levels;