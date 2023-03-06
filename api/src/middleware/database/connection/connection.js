/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Database connection utility class
| Dependencies  :
| > mongoose    >= 6.9.2 or latest
| > path
| > ./../../middleware/logger/log(...) as logger
| > ./../../../common/utils/io.db.util
| > ./../../../common/utils/mongo.db.util
| > ./../../../common/utils/object.util
| > ./../../../common/utils/string.util
| > ./../../../database/schemas
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { getDirectoryFilesRecursive } =
  require("./../../../common/utils/io.util")();
const { getSchemaNameFromFile } =
  require("./../../../common/utils/mongo.db.util")();
const { notSet } = require("../../../common/utils/object.util")();
const { isEmpty } = require("../../../common/utils/string.util")();

/**
 * Creates a new Connection instance
 * @param providerName: the name of the provider this connection instance belongs to
 * @param connectionString: the fully qualified path of the connection string
 * @param connectionOptions the database connection options
 * @param logger: an instance of the log manager
 */
const Connection = (
  providerName,
  connectionString,
  connectionOptions,
  logger
) => {
  if (notSet(logger)) {
    throw new Error(
      "Connection - Logger instance not instantiated or provided"
    );
  }
  if (isEmpty(connectionString)) {
    throw new Error(
      "Connection - ConnectingString instance not instantiated or provided"
    );
  }
  if (notSet(connectionOptions)) {
    throw new Error(
      "Connection - ConnectionOptions instance not instantiated or provided"
    );
  }
  const { join } = require("path");
  const mongoose = require("mongoose");
  let connection;

  /**
   * Opens a connection to a database
   */
  const connect = async () => {
    logger(
      __filename,
      "INFO",
      "connect",
      `Attempting database connection to : ${connectionString}`
    );
    try {
      const db = await mongoose.createConnection(
        connectionString,
        connectionOptions
      );
      db.on("error", (error) => {
        logger(
          __filename,
          "ERROR",
          "connect",
          `Error: ${error} occured while attempting to connect to, ${connectionString}`
        );
      });
      db.once("connected", () => {
        logger(
          __filename,
          "INFO",
          "connect",
          `Connection to : ${connectionString}, created (established) successfully`
        );
      });
      db.on("disconnected", () => {
        logger(
          __filename,
          "INFO",
          "connect",
          `Connection to : ${connectionString}, closed (disconnected) successfully`
        );
      });
      db.on("reconnected", () => {
        logger(
          __filename,
          "INFO",
          "connect",
          `Connection to : ${connectionString}, reconnected (re-established) successfully`
        );
      });
      // Register (require) all model(s)
      // Shared model(s) and schema(s)
      registerDBModels("./../../../database/schemas/@shared", db);
      if (providerName) {
        // Connection provider specific model(s) and schema(s)
        registerDBModels(`./../../../database/schemas/${providerName}`, db);
      }
      connection = db;
      return db;
    } catch (exception) {
      logger(__filename, "FATAL", "connect", exception, exception.stack);
    }
  };
  /**
   * Registers the model(s) or schema(s) found in the specified path on the specified connection instance
   * @param {*} path the relative path to the model(s) or schema(s) to be registered
   * @param {*} connection the connection to register the model(s) or schema(s) on
   */
  const registerDBModels = (path, connection) => {
    try {
      const normalizedPath = join(__dirname, path);
      getDirectoryFilesRecursive(normalizedPath)
        ?.filter((file) => !String(file).includes("index.js"))
        ?.forEach((file) => {
          const schema = require(file);
          const schemaName = getSchemaNameFromFile(file);
          connection?.model(schemaName, schema);
        });
    } catch (exception) {
      logger(
        __filename,
        "FATAL",
        "registerDBModels",
        exception,
        exception.stack
      );
    }
  };
  const getConnection = () => {
    return connection || mongoose.connection;
  };
  /**
   * Closes an open database connection
   */
  const disconnect = () => {
    try {
      getConnection()?.close();
      logger(
        __filename,
        "INFO",
        "disconnect",
        `Connection to : ${connectionString}, closed successfully`
      );
    } catch (exception) {
      logger(__filename, "FATAL", "disconnect", exception, exception.stack);
    }
  };
  return {
    connect,
    getConnection,
    disconnect,
  };
};

module.exports = Connection;
