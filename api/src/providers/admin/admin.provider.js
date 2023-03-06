/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Admin provider class
| Dependencies  :
| > ./../middleware/logger/log(...) as logger
| > ./../../common/utils/object.util
| > ./../../common/utils/string.util
| > ./../../middleware/database/connection/connection
| > ./../../middleware/database/context/db.context
| > ./../../middleware/database/schemas/schemas.enum/Admin{...}
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { notSet } = require("./../../common/utils/object.util")();
const { isEmpty } = require("./../../common/utils/string.util")();

/**
 * Creates a new AdminProvider instance
 * @param connectionString: Admin database connection string
 * @param connectionOptions: database connection options
 * @param logger: an instance of the log manager
 */
const AdminProvider = (connectionString, connectionOptions, logger) => {
  if (notSet(logger)) {
    throw new Error("AdminProvider - Logger instance not instantiated or provided");
  }
  if (isEmpty(connectionString)) {
    throw new Error("AdminProvider - ConnectionString instance not instantiated or provided");
  }
  if (notSet(connectionOptions)) {
    throw new Error("AdminProvider - ConnectionOptions instance not instantiated or provided");
  }
  const { connect } =
    require("./../../middleware/database/connection/connection")(
      "Admin",
      connectionString,
      connectionOptions,
      logger
    );
  let connection;
  /**
   * Opens a connection to the Admin database
   */
  const _connect = async () => {
    return (connection = await connect());
  };
  /**
   * Gets an instance of the Admin database connection
   */
  const getConnection = () => {
    return connection;
  };
  const { Admin } = require("../../middleware/database/schema/schema.enum");

  // Users

  /**
   * Creates a new User
   * @param {*} user the new User to be created
   */
  const createUser = async (user) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).create(Admin.User, user);
  };
  /**
   * Gets (retrieves) all users
   */
  const getAllUsers = async () => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getAll(Admin.User);
  };
  /**
   * Gets (retrieves) all Users that match the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getUsersBy = async (predicate) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getBy(Admin.User, predicate);
  };
  /**
   * Gets (retrieves) the first User that matches the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getUserBy = async (predicate) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getOneBy(Admin.User, predicate);
  };
  /**
   * Gets (retrieves) the User with the specified id
   * @param {*} id the User it to search for
   */
  const getUserById = async (id) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getById(Admin.User, id);
  };

  // Tenants

  /**
   * Creates a new Tenant
   * @param {*} tenant the new Tenant to be created
   */
  const createTenant = async (tenant) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).create(Admin.Tenant, tenant);
  };
  /**
   * Gets (retrieves) all Tenants
   */
  const getAllTenants = async () => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getAll(Admin.Tenant);
  };
  /**
   * Gets (retrieves) all Tenants that match the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getTenantsBy = async (predicate) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getBy(Admin.Tenant, predicate);
  };
  /**
   * Gets (retrieves) the first Tenant that matches the specified predicate
   * @param {*} predicate the predicate to be applied
   */
  const getTenantBy = async (predicate) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getOneBy(Admin.Tenant, predicate);
  };
  /**
   * Gets (retrieves) the Tenant with the specified id
   * @param {*} id the Tenant it to search for
   */
  const getTenantById = async (id) => {
    return await require("../../middleware/database/context/db.context")(
      "Admin",
      getConnection(),
      logger
    ).getById(Admin.Tenant, id);
  };
  return {
    connect: _connect,
    getConnection,
    createUser,
    getAllUsers,
    getUsersBy,
    getUserBy,
    getUserById,
    createTenant,
    getAllTenants,
    getTenantsBy,
    getTenantBy,
    getTenantById,
  };
};
module.exports = AdminProvider;
