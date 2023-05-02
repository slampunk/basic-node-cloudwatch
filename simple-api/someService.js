import logger from "./logger.js";

export const handleGetMethod = (params) => {
    logger.info("handleGetMethod called", { params });
    return Promise.resolve(params);
}

export const handlePostMethod = async(params, body) => {
    logger.info("handlePostMethod called", { params, body });
    return Promise.resolve({ params, body });
}