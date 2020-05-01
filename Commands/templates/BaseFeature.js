const safeAwait = require('safe-await')

class BaseFeature {
    constructor(data) {
        this.data = data
    }

    async doAsyncOperation(operation) {
        return await safeAwait(operation)
    }

    /**
     * Provides a response for an operation either successful or failed.
     * This method by default assumes the operation failed - a real pessimist.
     * 
     * @param {Object}  error       - Error object (if any)
     * @param {String}  status      - Denotes operation status
     * @param {String}  errorlabel       - Provides a label for log messages
     * @param {Integer} statusCode  - Provides a label for log messages
     * @param {Array|Null} results
     * 
     * @returns {Object}
     */
    createOperationResponse({
        error,
        status = "Error",
        errorLabel,
        statusCode = 400,
        message,
        results = [],
    }) {
        if (error)
            console.log(
                `${errorLabel} error ==> Encountered a fatal error: `,
                error ? error.message : ""
            );
        return {
            status_code: statusCode,
            status,
            message,
            results,
        };
    }

}

module.exports = BaseFeature