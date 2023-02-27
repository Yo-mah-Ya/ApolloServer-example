export type CallSite = {
    file?: string;
    function?: string;
    line?: string;
};
type LogMessage = {
    message: string;
    callSite?: CallSite;
};

const logLevelConfig = {
    trace: {
        name: "TRACE",
        level: 0,
        logger: console.trace,
    },
    debug: {
        name: "DEBUG",
        level: 1,
        logger: console.debug,
    },
    info: {
        name: "INFO",
        level: 2,
        logger: console.info,
    },
    warn: {
        name: "WARN",
        level: 3,
        logger: console.warn,
    },
    error: {
        name: "ERROR",
        level: 4,
        logger: console.error,
    },
} as const;

const envLogLevelConfig = ((): (typeof logLevelConfig)[keyof typeof logLevelConfig] => {
    switch (process.env.LOG_LEVEL) {
        case logLevelConfig.trace.name:
            return logLevelConfig.trace;
        case logLevelConfig.info.name:
            return logLevelConfig.info;
        case logLevelConfig.warn.name:
            return logLevelConfig.warn;
        case logLevelConfig.error.name:
            return logLevelConfig.error;
        case logLevelConfig.debug.name:
        default:
            return logLevelConfig.debug;
    }
})();

type ConsoleLogger =
    | Console["trace"]
    | Console["debug"]
    | Console["info"]
    | Console["warn"]
    | Console["error"];
const getLogger = (
    logLevel: (typeof logLevelConfig)[keyof typeof logLevelConfig]
): ConsoleLogger => {
    if (logLevel.level >= envLogLevelConfig.level) {
        return logLevel.logger;
    } else {
        return () => {};
    }
};

const messageWith = (
    logLevel: (typeof logLevelConfig)[keyof typeof logLevelConfig]
): (<T extends LogMessage>(message: T) => void) => {
    const logFn = getLogger(logLevel);
    const name = logFn.name.toUpperCase();
    return <T extends LogMessage>(message: T): void => {
        logFn(`[${name}] ${new Date().toISOString()}`, message);
    };
};

export const trace = messageWith(logLevelConfig.trace);
export const debug = messageWith(logLevelConfig.debug);
export const info = messageWith(logLevelConfig.info);
export const warn = messageWith(logLevelConfig.warn);
export const error = messageWith(logLevelConfig.error);
