export const ERRORS_NAME_LIST = {
    ValidationError : 'ValidationError',
    ConnectionError: 'ConnectionError'
}

const createErrorFactory = (name) => (
    class CustomizedError extends Error {
        constructor (message) {
            super(message)
            this.name = name
        }
    }
)

let CUSTOM_ERRORS = {};
for (const errorName in ERRORS_NAME_LIST) {
    CUSTOM_ERRORS[errorName] = createErrorFactory(ERRORS_NAME_LIST[errorName]);
}

export default CUSTOM_ERRORS
