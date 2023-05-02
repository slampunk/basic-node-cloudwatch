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
    logGroupName: 'simple-logging',
    logStreamName: `simple-logging-local`,
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
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    transports: logTransports,
    defaultMeta: {
        environment: 'development',
        application: 'my-app-name',
    }
});

logger.info('hello world!');
logger.info('additional metadata', { user: 'me', other: 'stuff' });
logger.warn('warning error', { watchOut: 'forThisWarning' });
logger.error('this is an error with a stack trace', new Error('some error'));
logger.debug('this wont be seen since the default level was set to info', { noLogs: 'to be seen here' });