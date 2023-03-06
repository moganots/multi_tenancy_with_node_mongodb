/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Tenant provider class
| Dependencies  :
| > ./../middleware/logger/log(...) as logger
| > ./../../common/utils/object.util
| > ./../../common/utils/string.util
| > ./../../middleware/database/connection/connection
| > ./../../middleware/database/context/db.context
| > ./../../middleware/database/schemas/schemas.enum/Tenant{...}
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { notSet } = require("./../../common/utils/object.util")();
const { isEmpty } = require("./../../common/utils/string.util")();

/**
 * Creates a new TenantProvider instance
 * @param connectionString: Tenant database connection string
 * @param connectionOptions: database connection options
 * @param logger: an instance of the log manager
 */
const TenantProvider = (connectionString, connectionOptions, logger) => {
  if (notSet(logger)) {
    throw new Error("TenantProvider - Logger instance not instantiated or provided");
  }
  if (isEmpty(connectionString)) {
    throw new Error("TenantProvider - ConnectionString instance not instantiated or provided");
  }
  if (notSet(connectionOptions)) {
    throw new Error("TenantProvider - ConnectionOptions instance not instantiated or provided");
  }
  const { connect } =
    require("./../../middleware/database/connection/connection")(
      "Tenant",
      connectionString,
      connectionOptions,
      logger
    );
  let connection;
  /**
   * Opens a connection to the Tenant database
   */
  const _connect = async () => {
    return (connection = await connect());
  };
  /**
   * Gets an instance of the Tenant database connection
   */
  const getConnection = () => {
    return connection;
  };
  const { Tenant } = require("../../middleware/database/schema/schema.enum");

  // Users

  /**
   * Creates a new User
   * @param {*} user the new User to be created
   */
  const createUser = async (user) => {
    return await require("../../middleware/database/context/db.context")(
      "Tenant",
      getConnection(),
      logger
    ).create(Tenant.User, user);
  };
  /**
   * Gets (retrieves) all users
   */
  const getAllUsers = async () => {
    return await require("../../middleware/database/context/db.context")(
      "Tenant",
      getConnection(),
      logger
    ).getAll(Tenant.User);
  };
  /**
   * Gets (retrieves) all Users that match the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getUsersBy = async (predicate) => {
    return await require("../../middleware/database/context/db.context")(
      "Tenant",
      getConnection(),
      logger
    ).getBy(Tenant.User, predicate);
  };
  /**
   * Gets (retrieves) the first User that matches the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getUserBy = async (predicate) => {
    return await require("../../middleware/database/context/db.context")(
      "Tenant",
      getConnection(),
      logger
    ).getOneBy(Tenant.User, predicate);
  };
  /**
   * Gets (retrieves) the User with the specified id
   * @param {*} id the User it to search for
   */
  const getUserById = async (id) => {
    return await require("../../middleware/database/context/db.context")(
      "Tenant",
      getConnection(),
      logger
    ).getById(Tenant.User, id);
  };
  return {
    connect: _connect,
    getConnection,
    createUser,
    getAllUsers,
    getUsersBy,
    getUserBy,
    getUserById
  };
};
module.exports = TenantProvider;
