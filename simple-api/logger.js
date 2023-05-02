import { createLogger, format, transports } from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';
import dotenv from 'dotenv';
dotenv.config();

const { combine, timestamp, errors, json } = format;

const defaultFormat = [
    timestamp(),
    errors({ stack: true }),
    json()    
];

const cloudWatchConfig = {
    logGroupName: 'simple-api',
    logStreamName: `simple-api-local`,
    level: 'info',
    messageFormatter: ({ level, message, ...additionalInfo }) =>    `[${level}] : ${message}\nDetails: ${JSON.stringify(additionalInfo)}`
};

const logTransports = [
    // output logs to the console.
    // largely used for local development
    // and not needed in your cloud environment
    new transports.Console(),
    // output logs to some local file.
    new transports.File({ filename: 'combined.log' }),
    // outputs to CloudWatch
    new WinstonCloudwatch(cloudWatchConfig)
];

const logger = createLogger({
    level: 'info',
    format: combine.apply(null, defaultFormat),
    transports: logTransports,
    defaultMeta: {
        environment: 'local',
        application: 'simple-api',
    }
});

export default logger;