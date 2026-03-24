const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [new winston.transports.Console()]
});

const requestLogger = (req, res, next) => {
    const start = Date.now();
    let logged = false;

    res.on('finish', () => {
        if (logged) return;
        logged = true;
        const duration = Date.now() - start;

        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
    });

    res.on('close', () => {
        if (logged || res.writableEnded) return;
        logged = true;
        const duration = Date.now() - start;

        logger.warn({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            message: 'Request closed before response finished'
        });
    });

    next();
};

module.exports = requestLogger;
