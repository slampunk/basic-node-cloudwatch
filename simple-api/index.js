import logger from "./logger.js";
import api from "./api.js";

api.listen(process.env.PORT || '8000', () => {
    logger.info(`started on ${process.env.PORT || '8000'}`);
});
