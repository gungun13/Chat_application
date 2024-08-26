import winston from "winston"; 
const { createLogger,format,transports } = winston;

const myFormat = format.printf(({ level, message, timestamp,...meta}) => {
    return `"level":${level} "message":${message} ${meta ? JSON.stringify(meta) : ''} ${timestamp}`;
  });

export const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({format: 'YYYY-MM-DD HH:mm:ss' }),myFormat),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });