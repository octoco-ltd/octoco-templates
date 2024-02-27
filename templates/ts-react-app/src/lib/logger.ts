import { env } from 'src/env';

/** Signature of a logging function */
export interface LogFn {
    (message?: any, ...optionalParams: any[]): void;
}

/** Log levels */
export enum LogLevel {
    LOG = 'log',
    WARN = 'warn',
    ERROR = 'error',
}

/** Basic logger interface */
export interface Logger {
    log: LogFn;
    warn: LogFn;
    error: LogFn;
}

/** No-op logger - it will then not log any output if this is called */
const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => { };

/**
 * Function that returns metadata to be included in logs.
 * Add any meta data you always want to see within your logs.
 */
const getLoggerMeta: () => any = () => {
    return ''; // Add metadata logic here if needed
}

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
    readonly log: LogFn;
    readonly warn: LogFn;
    readonly error: LogFn;

    /**
     * Constructor for ConsoleLogger.
     * @param options - Optional object with a 'level' property specifying the logging level.
     *                  If 'level' is set to LogLevel.ERROR, only errors will be logged.
     *                  If 'level' is set to LogLevel.WARN, warnings and errors will be logged.
     *                  If 'level' is not provided or set to LogLevel.LOG, all log levels will be used.
     */
    constructor(options?: { level?: LogLevel }) {
        const { level } = options || {};

        this.error = console.error.bind(console, getLoggerMeta());

        // If logging level is set to ERROR, disable warn and log
        if (level === LogLevel.ERROR) {
            this.warn = NO_OP;
            this.log = NO_OP;
            return;
        }

        this.warn = console.warn.bind(console, getLoggerMeta());

        // If logging level is set to WARN, disable log
        if (level === LogLevel.WARN) {
            this.log = NO_OP;
            return;
        }

        this.log = console.log.bind(console, getLoggerMeta())

    }
}

/**
 * Function to determine the logging level based on the current environment.
 * In 'production', it returns LogLevel.WARN; otherwise, it returns LogLevel.LOG.
 */
const getEnv = (): LogLevel => {
    const currentEnv = env.REACT_APP_DEPLOYMENT_ENV;
    //TODO: get 'production from enum and not hardcoded'
    if (currentEnv === 'production') {
        return LogLevel.WARN;
    } else {
        return LogLevel.LOG;
    }
}

// Create a logger instance with the logging level based on the current environment
export const logger = new ConsoleLogger({ level: getEnv() });
