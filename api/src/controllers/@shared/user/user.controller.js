/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : User controller class
| Dependencies  :
| > ./../../../middleware/database/connection/connection
| > ./../../../middleware/logging/logger/ onHttpRequestCompleted(...) as logger
| > ./../../../common/utils/object.util
| > ./../../../middleware/database/context/db.context
| > ./../../../database/schemas/schemas.enum/{Shared}
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { getRequestUid, formatRequestResult, getRequestParamsAsPredicate } =
  require("./../../../common/utils/http.util")();
const { notSet } = require("./../../../common/utils/object.util")();

/**
 * Creates a new User controller instance
 * @param connection: database connection instance
 * @param logger: an instance of the onHttpRequestCompleted method
 */
const UserController = (connection, logger) => {
  if (notSet(logger)) {
    throw new Error(
      "UserController - Logger instance not instantiated or provided"
    );
  }
  if (notSet(connection)) {
    throw new Error(
      "UserController - Database connection instance not instantiated or provided"
    );
  }
  const dbContext =
    require("./../../../middleware/database/context/db.context")(connection);
  const { Shared } = require("./../../../database/schemas/schemas.enum");

  // Users

  /**
   * Creates a new User
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   * @returns
   */
  const createUser = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.create(
        uid,
        Shared.User,
        request.body,
        (error, data, message) => {
          return logger(
            __filename,
            request,
            response,
            formatRequestResult(data, message, error)
          );
        }
      );
    } catch (exception) {
      return logger(
        __filename,
        request,
        response,
        formatRequestResult(null, null, exception)
      );
    }
  };
  /**
   * Gets (retrieves) all Users
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getAllUsers = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getAll(
        uid,
        Shared.User,
        (error, data, message) => {
          return logger(
            __filename,
            request,
            response,
            formatRequestResult(data, message, error)
          );
        }
      );
    } catch (exception) {
      return logger(
        __filename,
        request,
        response,
        formatRequestResult(null, null, exception)
      );
    }
  };
  /**
   * Gets (retrieves) all User(s) that match the specified predicate
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getUsersBy = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getBy(
        uid,
        Shared.User,
        getRequestParamsAsPredicate(request.params),
        (error, data, message) => {
          return logger(
            __filename,
            request,
            response,
            formatRequestResult(data, message, error)
          );
        }
      );
    } catch (exception) {
      return logger(
        __filename,
        request,
        response,
        formatRequestResult(null, null, exception)
      );
    }
  };
  /**
   * Gets (retrieves) the User(s) that match the specified predicate
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getUserBy = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getOneBy(
        uid,
        Shared.User,
        getRequestParamsAsPredicate(request.params),
        (error, data, message) => {
          return logger(
            __filename,
            request,
            response,
            formatRequestResult(data, message, error)
          );
        }
      );
    } catch (exception) {
      return logger(
        __filename,
        request,
        response,
        formatRequestResult(null, null, exception)
      );
    }
  };
  /**
   * Gets (retrieves) the User with the specified id
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getUserById = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getById(
        uid,
        Shared.User,
        getRequestParamsAsPredicate(request.params),
        (error, data, message) => {
          return logger(
            __filename,
            request,
            response,
            formatRequestResult(data, message, error)
          );
        }
      );
    } catch (exception) {
      return logger(
        __filename,
        request,
        response,
        formatRequestResult(null, null, exception)
      );
    }
  };
  /**
   * Updates the User, with the specified id, if the User exists
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const updateUser = async (request, response) => {
    return;
  };
  /**
   * Deletes the User, with the specified id, if the User exists
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const deleteUser = async (request, response) => {
    return;
  };
  return {
    createUser,
    getAllUsers,
    getUsersBy,
    getUserBy,
    getUserById,
    updateUser,
    deleteUser,
  };
};
module.exports = UserController;
