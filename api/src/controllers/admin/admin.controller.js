/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Admin controller class
| Dependencies  :
| > ./../../middleware/database/connection/connection
| > ./../../middleware/logging/logger/ onHttpRequestCompleted(...) as logger
| > ./../../common/utils/object.util
| > ./../../middleware/database/context/db.context
| > ./../../database/schemas/schemas.enum/{Shared, Admin}
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { getRequestUid, formatRequestResult, getRequestParamsAsPredicate } =
  require("./../../common/utils/http.util")();
const { notSet } = require("./../../common/utils/object.util")();

/**
 * Creates a new Admin controller instance
 * @param connection: database connection instance
 * @param logger: an instance of the onHttpRequestCompleted method
 */
const AdminController = (connection, logger) => {
  if (notSet(logger)) {
    throw new Error(
      "AdminController - Logger instance not instantiated or provided"
    );
  }
  if (notSet(connection)) {
    throw new Error(
      "AdminController - Database connection instance not instantiated or provided"
    );
  }
  const dbContext = require("./../../middleware/database/context/db.context")(
    connection
  );
  const { Admin } = require("./../../database/schemas/schemas.enum");

  // Tenants

  /**
   * Creates a new Tenant
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   * @returns
   */
  const createTenant = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.create(
        uid,
        Admin.Tenant,
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
   * Gets (retrieves) all Tenants
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getAllTenants = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getAll(
        uid,
        Admin.Tenant,
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
   * Gets (retrieves) all Tenant(s) that match the specified predicate
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getTenantsBy = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getBy(
        uid,
        Admin.Tenant,
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
   * Gets (retrieves) the Tenant(s) that match the specified predicate
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getTenantBy = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getOneBy(
        uid,
        Admin.Tenant,
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
   * Gets (retrieves) the Tenant with the specified id
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const getTenantById = async (request, response) => {
    try {
      const uid = getRequestUid(request);
      return await dbContext.getById(
        uid,
        Admin.Tenant,
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
   * Updates the Tenant, with the specified id, if the Tenant exists
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const updateTenant = async (request, response) => {
    return;
  };
  /**
   * Deletes the Tenant, with the specified id, if the Tenant exists
   * @param {*} request the request with the data to be processed
   * @param {*} response the response to send results back after processing of request
   */
  const deleteTenant = async (request, response) => {
    return;
  };
  return {
    createTenant,
    getAllTenants,
    getTenantsBy,
    getTenantBy,
    getTenantById,
    updateTenant,
    deleteTenant,
  };
};
module.exports = AdminController;
