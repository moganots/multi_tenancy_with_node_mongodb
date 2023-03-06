/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Database context utility class
| Dependencies  :
| > ./../connection/connection
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { isSet, notSet } = require("../../../common/utils/object.util")();

/**
 * Creates a new database context instance
 * @param connection: database connection instance to be used within this context
 */
const DbContext = (connection) => {
  if (notSet(connection)) {
    throw new Error(
      "DbContext - Connection instance not instantiated or provided"
    );
  }
  /**
   * Creates a new schema (model) collection
   * @param {*} uid the User ID of the requestor
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} entity the Entity record
   * @param {*} callback the callback function to use
   */
  const create = async (uid, modelName, entity, callback) => {
    try {
      // ToDo: Add record to ApplicationLog
      const found = await getOneBy(modelName, entity);
      if (isSet(found)) {
        throw new Error(`${modelName} already exists`);
      }
      const Model = await getModel(modelName);
      const newEntity = await new Model(entity).save();
      callback(
        null,
        newEntity,
        `Successfully created a new ${modelName} with ID: ${newEntity?._id}`
      );
    } catch (exception) {
      callback(exception);
    }
  };
  /**
   * Gets (retrieves) all the schema (model) collection objects
   * @param {*} uid the User ID of the requestor
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} callback the callback function to use
   */
  const getAll = async (uid, modelName, callback) => {
    try {
      // ToDo: Add record to ApplicationLog
      const Model = await getModel(modelName);
      const rows = await Model.find({});
      callback(
        null,
        rows,
        `Successfully fetched ${rows?.length} ${modelName} row(s)`
      );
    } catch (exception) {
      callback(exception);
    }
  };
  /**
   * Filters and gets (retrieves) all the schema (model) collection objects that match the specified predicate
   * @param {*} uid the User ID of the requestor
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} predicate the filter predicate to be applied
   * @param {*} callback the callback function to use
   */
  const getBy = async (uid, modelName, predicate, callback) => {
    try {
      // ToDo: Add record to ApplicationLog
      const Model = await getModel(modelName);
      const rows = await Model.find(predicate);
      callback(
        null,
        rows,
        `Successfully fetched ${rows?.length} ${modelName} row(s)`
      );
    } catch (exception) {
      callback(exception);
    }
  };
  /**
   * Filters and gets (retrieves) all the schema (model) collection objects that match the specified id
   * @param {*} uid the User ID of the requestor
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} id the id to filter and search by
   * @param {*} callback the callback function to use
   */
  const getById = async (uid, modelName, id, callback) => {
    try {
      // ToDo: Add record to ApplicationLog
      const Model = await getModel(modelName);
      const rows = await Model.find({ _id: id });
      callback(
        null,
        rows,
        `Successfully fetched ${rows?.length} ${modelName} row(s)`
      );
    } catch (exception) {
      callback(exception);
    }
  };
  /**
   * Filters and gets (retrieves) the first schema (model) collection object that matches the specified predicate
   * @param {*} uid the User ID of the requestor
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} predicate the filter predicate to be applied
   * @param {*} callback the callback function to use
   */
  const getOneBy = async (uid, modelName, predicate, callback) => {
    try {
      // ToDo: Add record to ApplicationLog
      const Model = await getModel(modelName);
      const rows = await Model.findOne(predicate);
      callback(
        null,
        rows,
        `Successfully fetched ${rows?.length} ${modelName} row(s)`
      );
    } catch (exception) {
      callback(exception);
    }
  };
  /**
   * Updates a schema (model) collection object with the specified id, if it exists
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} id the id of the schema (model) collection object to be updated
   * @param {*} entity object containing updates
   */
  const update = async () => {};
  /**
   * Deletes a schema (model) collection object with the specified id, if it exists
   * @param {*} modelName the name of the schema (model) collection
   * @param {*} id the id of the schema (model) collection object to be deleted
   */
  const delete_ = async () => {};
  /**
   * Gets the Model for the specified schema
   * @param {*} modelName the name of the schema (model) collection
   * @returns Model
   */
  const getModel = async (modelName) => {
    const model = await connection.model(modelName);
    if (notSet(model)) {
      throw new Error(
        `${modelName} does not exist or is not defined or has not been registered on the ${connection.connectionString} connection`
      );
    }
    return model;
  };
  return {
    create,
    getAll,
    getBy,
    getById,
    getOneBy,
    update,
    delete: delete_,
  };
};
module.exports = DbContext;
