import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.splat(),
    format.colorize(),
    format.printf(
      ({ level, message, label, timestamp }) =>
        `${timestamp} ${label || '-'} ${level}: ${message}`,
    ),
  ),
});

logger.add(new transports.Console());

export { logger };
