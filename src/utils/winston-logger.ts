import { Logger, LoggerOptions, createLogger, format, transports } from "winston";

const defaultLevel = process.env.LOG_LEVEL || "info";

const options: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    format: format.json(),
};

const logger: Logger = createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            colorize: true,
            showLevel: true,
            timestamp: true,
            level: "debug",
        } as any),
    );
}

export default logger;
