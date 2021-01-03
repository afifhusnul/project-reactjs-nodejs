'use strict'

module.exports.rest = {
  createResponse: (code, response, errorCode, errorDescription, errorTitle) => {
    const newResponse = {
      meta: {
        code: code,
        errorDescription: errorDescription
      },
      response: response
    }

    if (errorCode) {
      newResponse.meta.errorCode = errorCode
      newResponse.meta.errorTitle = errorTitle
    }

    return newResponse
  }
}