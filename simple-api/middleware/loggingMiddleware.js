import logger from "../logger.js";

const loggingMiddleware = async (req, res, next) => {
    req._requestStartTime = process.hrtime.bigint();
    const originalSend = res.send;

    res.send = logRequestThenSend(req, res, originalSend);

    next();    
}

const logRequestThenSend = (req, res, originalSend) => (body) => {
    const {
        url, method, remoteAddress, traceparent,
        runningTimeMs, contentLength: headeredContentLength, statusCode,
        userId, userRole
    } = responseMetrics(req, res);

    const contentLength = !isNaN(headeredContentLength) ? headeredContentLength : body.length;

    logger.info(
        `${method} ${url} ${statusCode} ${contentLength} - ${runningTimeMs}ms`,
        {
            method, url, statusCode, contentLength, runningTimeMs, traceparent, remoteAddress
        }
    );

    originalSend.call(res, body);
}

const responseMetrics = (req, res) => {
    // peel off interesting request details
    const { originalUrl: url, method, _remoteAddress: remoteAddress = 'localhost' } = req;
    const { traceparent } = req.headers;

    // calculate response duration
    const runningTimeMs = +(Number(process.hrtime.bigint() - req._requestStartTime) / 1000000).toFixed(3);

    // peel off interesting response details
    const {
        'content-length': len,
        contentLength = +len
    } = res.getHeaders();
    const statusCode = res.statusCode;

    return {
        url, method, remoteAddress, traceparent,
        runningTimeMs, contentLength, statusCode
    }
}

export default loggingMiddleware;