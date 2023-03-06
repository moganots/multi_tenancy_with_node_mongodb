/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Database (MongoDB) manager utlity class
| Dependencies  :
| > continuation-local-storage
| > ./../common/config/database{...}
| > ./../middleware/logger/log(...) as logger
| > ../../../common/utils/mongo.db.util
| > ../../../common/utils/object.util
| > ./../../../controllers/admin/admin.controller
| > ./connection
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { setDBConnectionString } =
  require("../../../common/utils/mongo.db.util")();
const { notSet, ifMapGetter } = require("../../../common/utils/object.util")();

/**
 * Creates a new ConnectionManager instance
 * @param config: database configuraton
 * @param logger: an instance of the log manager
 */
const ConnectionManager = (config, logger) => {
  if (notSet(logger)) {
    throw new Error(
      "ConnectionManager - Logger instance not instantiated or provided"
    );
  }
  if (notSet(config)) {
    throw new Error(
      "ConnectionManager - Configuration instance not instantiated or provided"
    );
  }
  logger(
    __filename,
    "INFO",
    "init",
    "Initialising the database connection manager"
  );
  let dbConnectionAdmin;
  let dbConnectionTenantMap;
  const { getNamespace } = require("continuation-local-storage");
  /**
   * Instantiates connections to all available database instances (both Admin and Tenant(s)) and places these into a connection map
   */
  const connectAll = async () => {
    let tenants;
    logger(
      __filename,
      "INFO",
      "connectAll",
      "Connecting all available databases"
    );
    try {
      // Connect to the Admin database
      dbConnectionAdmin = await require("./connection")(
        "Admin",
        setDBConnectionString(
          config.DB_PROTOCOL,
          config.DB_HOST,
          config.DB_PORT,
          config.DB_NAME,
          config.DB_UID,
          config.DB_PWD
        ),
        config.DB_OPTIONS,
        logger
      ).connect();
      // Get all Tenants
      tenants = await require("./../../../controllers/admin/admin.controller")(
        dbConnectionAdmin,
        logger
      ).getAllTenants();
      // Setup Tenant(s) connection map
      dbConnectionTenantMap = tenants
        .map(async (tenant) => {
          return {
            [tenant.code]: await require("./connection")(
              "Tenant",
              setDBConnectionString(
                config.DB_PROTOCOL,
                config.DB_HOST,
                config.DB_PORT,
                tenant.databaseName,
                config.DB_UID,
                config.DB_PWD
              ),
              config.DB_OPTIONS,
              logger
            ).connect(),
          };
        })
        .reduce((prev, next) => {
          return Object.assign({}, prev, next);
        }, {});
    } catch (exception) {
      logger(__filename, "FATAL", "connectAll", exception, exception.stack);
    }
  };
  /**
   * Get the Admin database connection
   */
  const getDBConnectionAdmin = () => {
    try {
      if (notSet(dbConnectionAdmin)) {
        throw new Error(
          "Admin database connection has not been instantiated or has closed (disconnected)"
        );
      }
      return dbConnectionAdmin;
    } catch (exception) {
      logger(
        __filename,
        "FATAL",
        "getDBConnectionAdmin",
        exception,
        exception.stack
      );
    }
  };
  /**
   * Gets (retrieves) the Tenant database connection by the Tenant code
   * @param {*} tenantCode the Tenant code to get (retrive) the database connection for
   * @returns
   */
  const getDBConnectionTenantBy = (tenantCode) => {
    try {
      const connection = ifMapGetter(dbConnectionTenantMap, tenantCode);
      if (notSet(connection)) {
        throw new Error(
          `Tenant: ${tenantCode} database connection has not been instantiated or has closed (disconnected)`
        );
      }
      return connection;
    } catch (exception) {
      logger(
        __filename,
        "FATAL",
        "getDBConnectionTenantBy",
        exception,
        exception.stack
      );
    }
  };
  /**
   * Get the connection information (knex instance) for current context. Here we have used a
   * getNamespace from 'continuation-local-storage'. This will let us get / set any
   * information and binds the information to current request context.
   */
  const getConnection = () => {
    const nameSpace = getNamespace("unique context");
    const connection = nameSpace.get("connection");
    if (!connection) {
      throw new Error("Connection is not set for any Admin or Tenant database");
    }
    return connection;
  };
  /**
   * Closes all open database connections
   */
  const disconnectAll = async () => {
    logger(
      __filename,
      "INFO",
      "disconnectAll",
      "Closing (disconnecting) all open database connections"
    );
    // Close the Admin database connection
    await getDBConnectionAdmin()?.close();
    dbConnectionTenantMap?.forEach(async (connection) => {
      await connection?.close();
    });
  };
  return {
    connectAll,
    getDBConnectionAdmin,
    getDBConnectionTenantBy,
    getConnection,
    disconnectAll,
  };
};
module.exports = ConnectionManager;
