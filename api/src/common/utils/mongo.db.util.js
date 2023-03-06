/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : MongoDB utility (extension / helper) class
| Dependencies  :
|   > ./http.util
|   > ./io.util
|   > ./object.util
|   > ./string.util
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { setProtocol } = require("./http.util")();
const { getFileNameWithoutExtension } = require("./io.util")();
const { ifJoin } = require("./object.util")();
const { isEmpty, capitalizeFirstLetter } = require("./string.util")();

/**
 * Creates a new MongoDBUtil instance
 */
const MongoDBUtil = () => {
  const setDBURI = (
    protocol,
    hostname,
    port,
    username = null,
    password = null
  ) => {
    if (isEmpty(protocol)) {
      throw new Error("Database configuration [DB_PROTOCOL] not provided");
    }
    if (isEmpty(hostname)) {
      throw new Error("Database configuration [DB_HOST] not provided");
    }
    if (isEmpty(port)) {
      throw new Error("Database configuration [DB_PORT] not provided");
    }
    return ifJoin(
      "/",
      setProtocol(protocol),
      ifJoin(
        "@",
        addCredentials(username, password),
        ifJoin(":", hostname, port)
      )
    );
  };
  const addCredentials = (username, password) => {
    return ifJoin(
      ":",
      encodeURIComponent(username),
      encodeURIComponent(password)
    );
  };
  const setDBConnectionString = (
    protocol,
    hostname,
    port,
    databaseName,
    username = null,
    password = null
  ) => {
    if (isEmpty(databaseName)) {
      throw new Error("Database configuration [DB_NAME] not provided");
    }
    return ifJoin(
      "/",
      setDBURI(protocol, hostname, port, username, password),
      databaseName
    );
  };
  const getSchemaNameFromFile = (path) => {
    return getFileNameWithoutExtension(path)
      ?.split(/[-:_.]/)
      ?.map((element) => capitalizeFirstLetter(element))
      ?.join(" ");
  };
  return {
    setDBURI,
    setDBConnectionString,
    getSchemaNameFromFile,
  };
};
module.exports = MongoDBUtil;
