/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Configuration utlity class
| Dependencies  :
|   > path  >= 0.12.7 or latest
|   > ./common/utils/date-util
|   > ./common/utils/http-util
|   > ./common/utils/string-util
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const { join, resolve } = require("path");
const { yyyymmdd } = require("./utils/date.util")();
const { setUri } = require("./utils/http.util")();
const { setDBURI, setDBConnectionString } = require("./utils/mongo.db.util")();
const { ifJoin } = require("./utils/object.util")();
const { nullIfTrim } = require("./utils/string.util")();

const APP_ROOT_DIR = resolve(".");
const NODE_ENV = nullIfTrim(process.env.NODE_ENV, "local");
const APP_ENV = nullIfTrim(process.env.APP_ENV || NODE_ENV, "local");
const APP_ENV_CONFIG_NAME = ifJoin(".", ".env", APP_ENV || NODE_ENV);
const APP_ENV_CONFIG_PATH = resolve(join(APP_ROOT_DIR, APP_ENV_CONFIG_NAME));

require("custom-env").env(); // ({envname: process.env.APP_ENV, path: APP_ENV_CONFIG});

const API_PROTOCOL = process.env.API_PROTOCOL;
const API_HOST = process.env.API_HOST;
const API_HTTP_PORT = process.env.API_HTTP_PORT;
const API_HTTPS_PORT = process.env.API_HTTPS_PORT;
const API_HEADERS_TIMEOUT = process.env.API_HEADERS_TIMEOUT;
const API_KEEP_ALIVE_TIMEOUT = process.env.API_KEEP_ALIVE_TIMEOUT;
const API_TIMEOUT = process.env.API_TIMEOUT;
const API_RELATIVE_PATH = process.env.API_RELATIVE_PATH;
const BASE_API_HTTP_URI = setUri(
  API_PROTOCOL,
  API_HOST,
  API_HTTP_PORT,
  API_RELATIVE_PATH
);
const BASE_API_HTTPS_URI = setUri(
  "https",
  API_HOST,
  API_HTTPS_PORT,
  API_RELATIVE_PATH
);

const DB_PROTOCOL = process.env.DB_PROTOCOL;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_UID = process.env.DB_UID;
const DB_PWD = process.env.DB_PWD;
const BASE_DB_URI = setDBURI(DB_PROTOCOL, DB_HOST, DB_PORT, DB_UID, DB_PWD);
const BASE_DB_CONNECTION_STRING = setDBConnectionString(
  DB_PROTOCOL,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_UID,
  DB_PWD
);
const BASE_DB_OPTIONS = {
  autoIndex: process.env.DB_AUTO_INDEX,
  socketTimeoutMS: process.env.DB_SOCKET_TIMEOUTMS,
  keepAlive: process.env.DB_KEEP_ALIVE,
  maxPoolSize: process.env.DB_MAX_POOL_SIZE,
  useNewUrlParser: process.env.DB_USE_NEW_URL_PARSER,
  serverSelectionTimeoutMS: process.env.DB_SERVER_SELECTION_TIMEOUT_MS,
  family: process.env.DB_FAMILY,
  // useUnifiedTopology: process.env.DB_USE_UNIFIED_TOPOLOGY,
  // useFindAndModify: process.env.DB_USE_FIND_AND_MODIFY,
};

const LOG_DATE = yyyymmdd();
const LOG_DIRECTORY = join(APP_ROOT_DIR, LOG_DATE);
const LOG_FILE_NAME = ifJoin(
  ".",
  APP_ENV,
  "api",
  LOG_DATE,
  "log"
)?.toLocaleLowerCase();
const LOG_FILE_FULL_PATH = join(LOG_DIRECTORY, LOG_FILE_NAME);
const LOG_FILE_SIZE_LIMIT = process.env.LOG_FILE_SIZE_LIMIT;

module.exports = {
  env: {
    APP_ROOT_DIR: APP_ROOT_DIR,
    APP_ENV: APP_ENV,
    NODE_ENV: NODE_ENV,
    APP_ENV_CONFIG_NAME: APP_ENV_CONFIG_NAME,
    APP_ENV_CONFIG_PATH: APP_ENV_CONFIG_PATH,
  },
  api: {
    API_PROTOCOL: API_PROTOCOL,
    API_HOST: API_HOST,
    API_HTTP_PORT: API_HTTP_PORT,
    API_HTTPS_PORT: API_HTTPS_PORT,
    API_HEADERS_TIMEOUT: API_HEADERS_TIMEOUT,
    API_KEEP_ALIVE_TIMEOUT: API_KEEP_ALIVE_TIMEOUT,
    API_TIMEOUT: API_TIMEOUT,
    API_RELATIVE_PATH: API_RELATIVE_PATH,
    BASE_API_HTTP_URI: BASE_API_HTTP_URI,
    BASE_API_HTTPS_URI: BASE_API_HTTPS_URI,
  },
  database: {
    DB_PROTOCOL: DB_PROTOCOL,
    DB_HOST: DB_HOST,
    DB_PORT: DB_PORT,
    DB_NAME: DB_NAME,
    DB_UID: DB_UID,
    DB_PWD: DB_PWD,
    BASE_DB_URI: BASE_DB_URI,
    BASE_DB_CONNECTION_STRING: BASE_DB_CONNECTION_STRING,
    DB_OPTIONS: BASE_DB_OPTIONS,
  },
  logging: {
    LOG_DIRECTORY: LOG_DIRECTORY,
    LOG_FILE_NAME: LOG_FILE_NAME,
    LOG_FILE_FULL_PATH: LOG_FILE_FULL_PATH,
    LOG_FILE_SIZE_LIMIT: LOG_FILE_SIZE_LIMIT,
  },
};
