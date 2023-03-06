/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Api Log controller class
| Dependencies  :
| > ./../../middleware/database/connection/connection
| > ./../../middleware/logging/logger/log(...) as logger
| > ./../../common/utils/object.util
| > ./../../middleware/database/context/db.context
| > ./../../database/schemas/schemas.enum/{Shared}
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { notSet } = require("./../../common/utils/object.util")();

/**
 * Creates a new Api Log controller instance
 * @param connection: database connection instance
 * @param logger: an instance of the log manager
 */
const ApiLogController = (connection, logger) => {
  if (notSet(logger)) {
    throw new Error(
      "ApiLogController - Logger instance not instantiated or provided"
    );
  }
  if (notSet(connection)) {
    throw new Error(
      "ApiLogController - Database connection instance not instantiated or provided"
    );
  }
  const dbContext = require("./../../middleware/database/context/db.context")(
    connection,
    logger
  );
  const { Shared } = require("./../../database/schemas/schemas.enum");

  // Api Logs

  /**
   * Creates a new Api Log
   * @param {*} apiLog the new Api Log to be created
   */
  const createApiLog = async (apiLog) => {
    return await dbContext.create(Shared.ApiLog, apiLog);
  };
  /**
   * Gets (retrieves) all Api Logs
   */
  const getAllApiLogs = async () => {
    return await dbContext.getAll(Shared.ApiLog);
  };
  /**
   * Gets (retrieves) all Api Logs that match the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getApiLogsBy = async (predicate) => {
    return await dbContext.getBy(Shared.ApiLog, predicate);
  };
  /**
   * Gets (retrieves) the first Api Log that matches the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getApiLogBy = async (predicate) => {
    return await dbContext.getOneBy(Shared.ApiLog, predicate);
  };
  /**
   * Gets (retrieves) the Api Log with the specified id
   * @param {*} id the Api Log it to search for
   */
  const getApiLogById = async (id) => {
    return await dbContext.getById(Shared.ApiLog, id);
  };
  /**
   * Updates the Api Log, with the specified id, if the Api Log exists
   * @param {*} id the id of the schema (model) collection object to be updated
   * @param {*} apiLog object containing updates
   */
  const updateApiLog = async (id, apiLog) => {
    return await dbContext.update(Shared.ApiLog, id, apiLog);
  };
  /**
   * Deletes the Api Log, with the specified id, if the Api Log exists
   * @param {*} id the id of the Api Log to be deleted
   */
  const deleteApiLog = async (id) => {
    return await dbContext.delete(Shared.ApiLog, id);
  };
  return {
    createApiLog,
    getAllApiLogs,
    getApiLogsBy,
    getApiLogBy,
    getApiLogById,
    updateApiLog,
    deleteApiLog,
  };
};
module.exports = ApiLogController;
