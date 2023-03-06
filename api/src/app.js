/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : This is the API entry point for the Multi-tenancy (instances) shared environment
| Dependencies  :
|   > ./common/utils/string.util
|   > ./common/config
|   > ./middleware/logger
|   > ./middleware/database/connection/connection.manager
|   > body-parser
|   > cors
|   > express
|   > helmet
|   > path
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
console.clear();
/*
|------------------------------------------------------------------------------------------------------------------
| Dependency(ies)
|------------------------------------------------------------------------------------------------------------------
 */
const { env, api, database, logging } = require("./common/config");
const { info, error, fatal, log, onHttpRequestCompleted } =
  require("./middleware/logging/logger")({
    env,
    api,
    database,
    logging,
  });
const { createServerHandler, startServerHandler, stopServerHandler } =
  require("./app.util")(info, error, fatal);
const serverTypes = [`Http`, `Https`];
let serverTypesMap;

try {
  /*
  |------------------------------------------------------------------------------------------------------------------
  | Dependency(ies)
  |------------------------------------------------------------------------------------------------------------------
   */
  const bodyParser = require(`body-parser`);
  const cors = require(`cors`);
  const helmet = require("helmet");
  const methodOverride = require(`method-override`);
  const responseTime = require(`response-time`);
  const express = require(`express`);
  const { resolve } = require(`path`);

  info(__filename, `init`, `Dependencies loaded successfully`);

  /*
  |------------------------------------------------------------------------------------------------------------------
  | Set the global application root directory
  |------------------------------------------------------------------------------------------------------------------
   */
  global.appRoot = resolve(env.APP_ROOT_DIR);

  log(
    __filename,
    "INFO",
    "init",
    `Global Application Root set to ${env.APP_ROOT_DIR}, successfully`
  );

  /*
  |------------------------------------------------------------------------------------------------------------------
  | App
  |------------------------------------------------------------------------------------------------------------------
   */
  const app = express();
  app.use(bodyParser.json({ parameterLimit: 100000, limit: 100000000 }));
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: 100000000,
      extended: false,
    })
  );
  app.use(cors());
  app.use(helmet());
  app.use(methodOverride());
  app.use(responseTime());

  info(__filename, `init`, `Express app initialised successfully`);

  /*
  |------------------------------------------------------------------------------------------------------------------
  | Initialise all database connections
  |------------------------------------------------------------------------------------------------------------------
   */
  const { connectAll, disconnectAll } =
    require("./middleware/database/connection/connection.manager")(
      database,
      log
    );
  // Connet to all databases
  const connectDatabases = async () => {
    await connectAll();
  };
  // connectDatabases();

  /*
  |------------------------------------------------------------------------------------------------------------------
  | Create Servers - HTTP / HTTPS
  |------------------------------------------------------------------------------------------------------------------
   */
  serverTypesMap = serverTypes
    .map((serverType) => {
      return {
        [serverType]: createServerHandler(
          serverType,
          app,
          {},
          api?.API_HEADERS_TIMEOUT,
          api?.API_KEEP_ALIVE_TIMEOUT,
          api?.API_TIMEOUT
        ),
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});

  /*
  |------------------------------------------------------------------------------------------------------------------
  | Instantiate and setup API routes
  |------------------------------------------------------------------------------------------------------------------
   */
  const router = require(`./routes/routes`)(api, onHttpRequestCompleted);
  app.use("/api", router);
  info(
    __filename,
    `app.use('/api', router)`,
    `API routes initialised successfully`
  );

  /*
  |------------------------------------------------------------------------------------------------------------------
  | Start up servers - HTTP / HTTPS
  |------------------------------------------------------------------------------------------------------------------
   */
  const getServerTypeConfig = (serverType = `Http`) => {
    switch (serverType) {
      case `https`:
      case `Https`:
      case `HTTPS`:
        return { port: api?.API_HTTPS_PORT, uri: api?.BASE_API_HTTPS_URI };
      default:
        return { port: api?.API_HTTP_PORT, uri: api?.BASE_API_HTTP_URI };
    }
  };
  serverTypes.forEach(async (serverType) => {
    const server = serverTypesMap[serverType];
    const config = getServerTypeConfig(serverType);
    await startServerHandler(
      server,
      config?.port,
      config?.uri,
      api?.API_KEEP_ALIVE_TIMEOUT,
      api?.API_TIMEOUT
    );
  });

  /*
  |------------------------------------------------------------------------------------------------------------------
  | Graceful shutdown
  |------------------------------------------------------------------------------------------------------------------
   */
  const gracefulShutdownHandler = async function gracefulShutdownHandler(
    signal
  ) {
    info(
      __filename,
      "shutdown",
      `Signal event: ${signal} received, preparing to shutdown server(s)`
    );
    /* setTimeout(async () => {
    }, 0); */
    info(__filename, "shutdown", `Shutting down application`);
    serverTypes.forEach(async (serverType) => {
      await stopServerHandler(serverTypesMap[serverType]);
    });
    // Close (disconnect) all databases
    await disconnectAll();
    // Once the server is not accepting connections, exit
    process.exit(0);
  };

  // The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
  process.on("SIGINT", gracefulShutdownHandler);
  // The SIGTERM signal is sent to a process to request its termination.
  process.on("SIGTERM", gracefulShutdownHandler);
} catch (exception) {
  fatal(__filename, "init", exception, exception.stack);
}
