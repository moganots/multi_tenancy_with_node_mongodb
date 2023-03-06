/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Application Log controller class
| Dependencies  :
| > ./../../middleware/database/connection/connection
| > ./../../middleware/logging/logger/log(...) as logger
| > ./../../common/utils/object.util
| > ./../../middleware/database/context/db.context
| > ./../../database/schemas/schemas.enum/{Shared}
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { notSet } = require("../../common/utils/object.util")();

/**
 * Creates a new Application Log controller instance
 * @param connection: database connection instance
 * @param logger: an instance of the log manager
 */
const ApplicationLogController = (connection, logger) => {
  if (notSet(logger)) {
    throw new Error(
      "ApplicationLogController - Logger instance not instantiated or provided"
    );
  }
  if (notSet(connection)) {
    throw new Error(
      "ApplicationLogController - Database connection instance not instantiated or provided"
    );
  }
  const dbContext = require("../../middleware/database/context/db.context")(
    connection
  );
  const { Shared } = require("../../database/schemas/schemas.enum");

  // Application Logs

  /**
   * Creates a new Application Log
   * @param {*} applicationLog the new Application Log to be created
   */
  const createApplicationLog = async (applicationLog) => {
    return await dbContext.create(Shared.ApplicationLog, applicationLog);
  };
  /**
   * Gets (retrieves) all Application Logs
   */
  const getAllApplicationLogs = async () => {
    return await dbContext.getAll(Shared.ApplicationLog);
  };
  /**
   * Gets (retrieves) all Application Logs that match the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getApplicationLogsBy = async (predicate) => {
    return await dbContext.getBy(Shared.ApplicationLog, predicate);
  };
  /**
   * Gets (retrieves) the first Application Log that matches the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getApplicationLogBy = async (predicate) => {
    return await dbContext.getOneBy(Shared.ApplicationLog, predicate);
  };
  /**
   * Gets (retrieves) the Application Log with the specified id
   * @param {*} id the Application Log it to search for
   */
  const getApplicationLogById = async (id) => {
    return await dbContext.getById(Shared.ApplicationLog, id);
  };
  /**
   * Updates the Application Log, with the specified id, if the Application Log exists
   * @param {*} id the id of the schema (model) collection object to be updated
   * @param {*} applicationLog object containing updates
   */
  const updateApplicationLog = async (id, applicationLog) => {
    return await dbContext.update(Shared.ApplicationLog, id, applicationLog);
  };
  /**
   * Deletes the Application Log, with the specified id, if the Application Log exists
   * @param {*} id the id of the Application Log to be deleted
   */
  const deleteApplicationLog = async (id) => {
    return await dbContext.delete(Shared.ApplicationLog, id);
  };
  return {
    createApplicationLog,
    getAllApplicationLogs,
    getApplicationLogsBy,
    getApplicationLogBy,
    getApplicationLogById,
    updateApplicationLog,
    deleteApplicationLog,
  };
};
module.exports = ApplicationLogController;
