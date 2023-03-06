/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : Logging utility (extension / helper) class
| Dependencies  :
|   > ../../common/config/{...}
|   > ../../common/utils/date.util
|   > ./../../common/utils/logging.util
|   > ../../common/utils/object.util
|   > ../../common/utils/string.util
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/**
 * Creates a new Logger instance
 * @param config an instance of the configuration settings
 */
const Logger = (config) => {
  const { isSet, notSet, ifJoin } = require("../../common/utils/object.util")();
  if (notSet(config)) {
    throw new Error(
      "Logger - Configuration instance not instantiated or provided"
    );
  }
  if (notSet(config.env)) {
    throw new Error(
      "Logger - Configuration [env] instance not instantiated or provided"
    );
  }
  if (notSet(config.api)) {
    throw new Error(
      "Logger - Configuration [api] instance not instantiated or provided"
    );
  }
  if (notSet(config.database)) {
    throw new Error(
      "Logger - Configuration [database] instance not instantiated or provided"
    );
  }
  if (notSet(config.logging)) {
    throw new Error(
      "Logger - Configuration [logging] instance not instantiated or provided"
    );
  }
  const { yyyymmddThmsmsZ0200WithDashSeparator } =
    require("../../common/utils/date.util")();
  const { getRequestPacket, getRequestStatusCode } =
    require("../../common/utils/http.util")();
  const { hasEmptyString } = require("../../common/utils/string.util")();
  const { formatLogMessage, formatMessage, logToConsole, logToFile } =
    require("./../../common/utils/logging.util")(
      config.env.APP_ENV,
      config.logging.LOG_DIRECTORY,
      config.logging.LOG_FILE_FULL_PATH
    );

  const debug = (caller, methodName, message, detailMessage = null) => {
    log(caller, `DEBUG`, methodName, message, detailMessage);
  };
  const info = (caller, methodName, message, detailMessage = null) => {
    log(caller, `INFO`, methodName, message, detailMessage);
  };
  const warn = (caller, methodName, message, detailMessage = null) => {
    log(caller, `WARN`, methodName, message, detailMessage);
  };
  const error = (caller, methodName, message, detailMessage = null) => {
    log(caller, `ERROR`, methodName, message, detailMessage);
  };
  const fatal = (caller, methodName, message, detailMessage = null) => {
    log(caller, `FATAL`, methodName, message, detailMessage);
  };
  const critical = (caller, methodName, message, detailMessage = null) => {
    log(caller, `CRITICAL`, methodName, message, detailMessage);
  };
  const log = (caller, logType, methodName, message, detailMessage = null) => {
    if (hasEmptyString([caller, logType, methodName]) || notSet(message))
      return;
    if (Array.isArray(message) && detailMessage) {
      message.push(detailMessage);
    } else if (message && detailMessage) {
      message = [message, detailMessage];
    }
    const logMessage = formatLogMessage(
      yyyymmddThmsmsZ0200WithDashSeparator(),
      logType,
      (caller || __filename).replace(/\\/g, `/`),
      methodName,
      formatMessage(message)
    );
    logToConsole(logType, logMessage);
    // logToFile(logMessage);
  };
  const onHttpRequestCompleted = (
    caller,
    request,
    response,
    result = {
      data: null,
      hasError: false,
      message: null,
      messageDetailed: null,
    }
  ) => {
    caller = caller || __filename;
    const logType = request?.hasError ? `ERROR` : `INFO`;
    const methodName = getRequestPacket(request)?.action;
    const statusCode = getRequestStatusCode(logType, methodName);
    log(caller, logType, methodName, result?.message, result?.messageDetailed);
    return response?.status(statusCode).json({
      hasData: isSet(result?.data),
      data: result?.data,
      dataCount: notSet(result?.data)
        ? 0
        : Array.isArray(result?.data)
        ? result?.data?.length
        : 1,
      hasError: result?.hasError,
      message: ifJoin(`\r\n`, result?.message, result?.messageDetailed),
    });
  };

  log(__filename, "INFO", "init", "Loading configuration");

  // Application configuration
  log(__filename, "INFO", "init", `APP_ROOT_DIR=${config.env.APP_ROOT_DIR}`);
  log(__filename, "INFO", "init", `APP_ENV=${config.env.APP_ENV}`);
  log(__filename, "INFO", "init", `NODE_ENV=${config.env.NODE_ENV}`);
  log(
    __filename,
    "INFO",
    "init",
    `APP_ENV_CONFIG_NAME=${config.env.APP_ENV_CONFIG_NAME}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `APP_ENV_CONFIG_PATH=${config.env.APP_ENV_CONFIG_PATH}`
  );

  // API configuration
  log(__filename, "INFO", "init", `API_PROTOCOL=${config.api.API_PROTOCOL}`);
  log(__filename, "INFO", "init", `API_HOST=${config.api.API_HOST}`);
  log(__filename, "INFO", "init", `API_HTTP_PORT=${config.api.API_HTTP_PORT}`);
  log(
    __filename,
    "INFO",
    "init",
    `API_HTTPS_PORT=${config.api.API_HTTPS_PORT}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `API_RELATIVE_PATH=${config.api.API_RELATIVE_PATH}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `BASE_API_HTTP_URI=${config.api.BASE_API_HTTP_URI}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `BASE_API_HTTPS_URI=${config.api.BASE_API_HTTPS_URI}`
  );

  // Database configuration
  log(__filename, "INFO", "init", `DB_PROTOCOL=${config.database.DB_PROTOCOL}`);
  log(__filename, "INFO", "init", `DB_HOST=${config.database.DB_HOST}`);
  log(__filename, "INFO", "init", `DB_PORT=${config.database.DB_PORT}`);
  log(__filename, "INFO", "init", `DB_NAME=${config.database.DB_NAME}`);

  // Logging configuration
  log(
    __filename,
    "INFO",
    "init",
    `LOG_DIRECTORY=${config.logging.LOG_DIRECTORY}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `LOG_FILE_NAME=${config.logging.LOG_FILE_NAME}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `LOG_FILE_FULL_PATH=${config.logging.LOG_FILE_FULL_PATH}`
  );
  log(
    __filename,
    "INFO",
    "init",
    `LOG_FILE_SIZE_LIMIT=${config.logging.LOG_FILE_SIZE_LIMIT}`
  );

  log(__filename, "INFO", "init", "Configuration loaded successfully");

  return {
    debug,
    info,
    warn,
    error,
    fatal,
    critical,
    log,
    onHttpRequestCompleted,
  };
};

module.exports = Logger;
