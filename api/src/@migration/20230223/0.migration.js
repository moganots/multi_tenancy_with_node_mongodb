const { env, api, database, logging } = require("./../../common/config");
const { info, log } = require("../../middleware/logging/logger")({
  env,
  api,
  database,
  logging,
});
const { setDBConnectionString } =
  require("./../../common/utils/mongo.db.util")();

info(__filename, "init", "Starting");

const DB_PROTOCOL = database?.DB_PROTOCOL;
const DB_HOST = database?.DB_HOST;
const DB_PORT = database?.DB_PORT;
const DB_NAME = database?.DB_NAME;
const DB_UID = database?.DB_UID;
const DB_PWD = database?.DB_PWD;
const DB_OPTIONS = database?.DB_OPTIONS;

async function run() {
  /**************************************************************************************
   * Create db_multitenant_admin database and collection(s)
   **************************************************************************************
   */
  // Open connection to the {mongodb://localhost:27017/db_multitenant_admin} database
  const connection =
    await require("./../../middleware/database/connection/connection")(
      "Admin",
      setDBConnectionString(
        DB_PROTOCOL,
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_UID,
        DB_PWD
      ),
      DB_OPTIONS,
      log
    ).connect();
  // Initialise context to the {mongodb://localhost:27017/db_multitenant_admin} database
  const context = require("./../../middleware/database/context/db.context")(
    connection,
    log
  );

  /**************************************************************************************
   * User(s)
   **************************************************************************************
   */
  // Root user
  const rootUser = await context.create("User", {
    emailAddress: "root@multitenant.test",
    passwordHash: "passw0rd",
    userTypeId: "Root",
    isActive: true,
  });
  // Admin user
  await context.create("User", {
    emailAddress: "admin@multitenant.test",
    passwordHash: "passw0rd",
    userTypeId: "Admin",
    isActive: true,
    createdBy: rootUser?._id,
  });
  // Test user 1
  await context.create("User", {
    emailAddress: "test.user1@multitenant.test",
    passwordHash: "passw0rd",
    userTypeId: "User",
    isActive: true,
    createdBy: rootUser?._id,
  });

  /**************************************************************************************
   * Tenant(s)
   **************************************************************************************
   */
  // Tenant - Algeria
  await context.create("Tenant", {
    code: "DZA",
    name: "Algeria",
    logo: null,
    description: "Tenant - Algeria (DZA)",
    databaseName: "db_multitenant_algeria_(dza)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Angola
  await context.create("Tenant", {
    code: "AGO",
    name: "Angola",
    logo: null,
    description: "Tenant - Angola (AGO)",
    databaseName: "db_multitenant_angola_(ago)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Benin
  await context.create("Tenant", {
    code: "BEN",
    name: "Benin",
    logo: null,
    description: "Tenant - Benin (BEN)",
    databaseName: "db_multitenant_benin_(ben)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Botswana
  await context.create("Tenant", {
    code: "BWA",
    name: "Botswana",
    logo: null,
    description: "Tenant - Botswana (BWA)",
    databaseName: "db_multitenant_botswana_(bwa)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Burkina Faso
  await context.create("Tenant", {
    code: "BFA",
    name: "Burkina Faso",
    logo: null,
    description: "Tenant - Burkina Faso (BFA)",
    databaseName: "db_multitenant_burkina_faso_(bfa)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Burundi
  await context.create("Tenant", {
    code: "BDI",
    name: "Burundi",
    logo: null,
    description: "Tenant - Burundi (BDI)",
    databaseName: "db_multitenant_burundi_(bdi)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Cameroon
  await context.create("Tenant", {
    code: "CMR",
    name: "Cameroon",
    logo: null,
    description: "Tenant - Cameroon (CMR)",
    databaseName: "db_multitenant_cameroon_(cmr)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Cape Verde
  await context.create("Tenant", {
    code: "CPV",
    name: "Cape Verde",
    logo: null,
    description: "Tenant - Cape Verde (CPV)",
    databaseName: "db_multitenant_cape_verde_(cpv)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Central African Republic
  await context.create("Tenant", {
    code: "CAF",
    name: "Central African Republic",
    logo: null,
    description: "Tenant - Central African Republic (CAF)",
    databaseName: "db_multitenant_central_african_republic_(caf)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Chad
  await context.create("Tenant", {
    code: "TCD",
    name: "Chad",
    logo: null,
    description: "Tenant - Chad (TCD)",
    databaseName: "db_multitenant_chad_(tcd)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Comoros
  await context.create("Tenant", {
    code: "COM",
    name: "Comoros",
    logo: null,
    description: "Tenant - Comoros (COM)",
    databaseName: "db_multitenant_comoros_(com)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Congo
  await context.create("Tenant", {
    code: "COG",
    name: "Congo",
    logo: null,
    description: "Tenant - Congo (COG)",
    databaseName: "db_multitenant_congo_(cog)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Congo, The Democratic Republic Of The
  await context.create("Tenant", {
    code: "COD",
    name: "Congo, The Democratic Republic Of The",
    logo: null,
    description: "Tenant - Congo, The Democratic Republic Of The (COD)",
    databaseName: "db_multitenant_congo_the_democratic_republic_of_the_(cod)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Cote D’Ivoire
  await context.create("Tenant", {
    code: "CIV",
    name: "Cote D’Ivoire",
    logo: null,
    description: "Tenant - Cote D’Ivoire (CIV)",
    databaseName: "db_multitenant_cote_d_ivoire_(civ)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Djibouti
  await context.create("Tenant", {
    code: "DJI",
    name: "Djibouti",
    logo: null,
    description: "Tenant - Djibouti (DJI)",
    databaseName: "db_multitenant_djibouti_(dji)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Egypt
  await context.create("Tenant", {
    code: "EGY",
    name: "Egypt",
    logo: null,
    description: "Tenant - Egypt (EGY)",
    databaseName: "db_multitenant_egypt_(egy)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Equatorial Guinea
  await context.create("Tenant", {
    code: "GNQ",
    name: "Equatorial Guinea",
    logo: null,
    description: "Tenant - Equatorial Guinea (GNQ)",
    databaseName: "db_multitenant_equatorial_guinea_(gnq)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Eritrea
  await context.create("Tenant", {
    code: "ERI",
    name: "Eritrea",
    logo: null,
    description: "Tenant - Eritrea (ERI)",
    databaseName: "db_multitenant_eritrea_(eri)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Ethiopia
  await context.create("Tenant", {
    code: "ETH",
    name: "Ethiopia",
    logo: null,
    description: "Tenant - Ethiopia (ETH)",
    databaseName: "db_multitenant_ethiopia_(eth)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Gabon
  await context.create("Tenant", {
    code: "GAB",
    name: "Gabon",
    logo: null,
    description: "Tenant - Gabon (GAB)",
    databaseName: "db_multitenant_gabon_(gab)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Gambia
  await context.create("Tenant", {
    code: "GMB",
    name: "Gambia",
    logo: null,
    description: "Tenant - Gambia (GMB)",
    databaseName: "db_multitenant_gambia_(gmb)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Ghana
  await context.create("Tenant", {
    code: "GHA",
    name: "Ghana",
    logo: null,
    description: "Tenant - Ghana (GHA)",
    databaseName: "db_multitenant_ghana_(gha)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Guinea
  await context.create("Tenant", {
    code: "GIN",
    name: "Guinea",
    logo: null,
    description: "Tenant - Guinea (GIN)",
    databaseName: "db_multitenant_guinea_(gin)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Guinea-Bissau
  await context.create("Tenant", {
    code: "GNB",
    name: "Guinea-Bissau",
    logo: null,
    description: "Tenant - Guinea-Bissau (GNB)",
    databaseName: "db_multitenant_guinea-bissau_(gnb)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Kenya
  await context.create("Tenant", {
    code: "KEN",
    name: "Kenya",
    logo: null,
    description: "Tenant - Kenya (KEN)",
    databaseName: "db_multitenant_kenya_(ken)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Lesotho
  await context.create("Tenant", {
    code: "LSO",
    name: "Lesotho",
    logo: null,
    description: "Tenant - Lesotho (LSO)",
    databaseName: "db_multitenant_lesotho_(lso)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Liberia
  await context.create("Tenant", {
    code: "LBR",
    name: "Liberia",
    logo: null,
    description: "Tenant - Liberia (LBR)",
    databaseName: "db_multitenant_liberia_(lbr)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Libyan Arab Jamahiriya
  await context.create("Tenant", {
    code: "LBY",
    name: "Libyan Arab Jamahiriya",
    logo: null,
    description: "Tenant - Libyan Arab Jamahiriya (LBY)",
    databaseName: "db_multitenant_libyan_arab_jamahiriya_(lby)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Madagascar
  await context.create("Tenant", {
    code: "MDG",
    name: "Madagascar",
    logo: null,
    description: "Tenant - Madagascar (MDG)",
    databaseName: "db_multitenant_madagascar_(mdg)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Mali
  await context.create("Tenant", {
    code: "MLI",
    name: "Mali",
    logo: null,
    description: "Tenant - Mali (MLI)",
    databaseName: "db_multitenant_mali_(mli)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Malawi
  await context.create("Tenant", {
    code: "MWI",
    name: "Malawi",
    logo: null,
    description: "Tenant - Malawi (MWI)",
    databaseName: "db_multitenant_malawi_(mwi)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Mauritania
  await context.create("Tenant", {
    code: "MRT",
    name: "Mauritania",
    logo: null,
    description: "Tenant - Mauritania (MRT)",
    databaseName: "db_multitenant_mauritania_(mrt)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Mauritius
  await context.create("Tenant", {
    code: "MUS",
    name: "Mauritius",
    logo: null,
    description: "Tenant - Mauritius (MUS)",
    databaseName: "db_multitenant_mauritius_(mus)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Mayotte
  await context.create("Tenant", {
    code: "MYT",
    name: "Mayotte",
    logo: null,
    description: "Tenant - Mayotte (MYT)",
    databaseName: "db_multitenant_mayotte_(myt)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Morocco
  await context.create("Tenant", {
    code: "MAR",
    name: "Morocco",
    logo: null,
    description: "Tenant - Morocco (MAR)",
    databaseName: "db_multitenant_morocco_(mar)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Mozambique
  await context.create("Tenant", {
    code: "MOZ",
    name: "Mozambique",
    logo: null,
    description: "Tenant - Mozambique (MOZ)",
    databaseName: "db_multitenant_mozambique_(moz)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Namibia
  await context.create("Tenant", {
    code: "NAM",
    name: "Namibia",
    logo: null,
    description: "Tenant - Namibia (NAM)",
    databaseName: "db_multitenant_namibia_(nam)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Niger
  await context.create("Tenant", {
    code: "NER",
    name: "Niger",
    logo: null,
    description: "Tenant - Niger (NER)",
    databaseName: "db_multitenant_niger_(ner)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Nigeria
  await context.create("Tenant", {
    code: "NGA",
    name: "Nigeria",
    logo: null,
    description: "Tenant - Nigeria (NGA)",
    databaseName: "db_multitenant_nigeria_(nga)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Reunion Island
  await context.create("Tenant", {
    code: "REU",
    name: "Reunion Island",
    logo: null,
    description: "Tenant - Reunion Island (REU)",
    databaseName: "db_multitenant_reunion_island_(reu)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Rwanda
  await context.create("Tenant", {
    code: "RWA",
    name: "Rwanda",
    logo: null,
    description: "Tenant - Rwanda (RWA)",
    databaseName: "db_multitenant_rwanda_(rwa)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Sao Tome And Principe
  await context.create("Tenant", {
    code: "STP",
    name: "Sao Tome And Principe",
    logo: null,
    description: "Tenant - Sao Tome And Principe (STP)",
    databaseName: "db_multitenant_sao_tome_and_principe_(stp)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Senegal
  await context.create("Tenant", {
    code: "SEN",
    name: "Senegal",
    logo: null,
    description: "Tenant - Senegal (SEN)",
    databaseName: "db_multitenant_senegal_(sen)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Seychelles
  await context.create("Tenant", {
    code: "SYC",
    name: "Seychelles",
    logo: null,
    description: "Tenant - Seychelles (SYC)",
    databaseName: "db_multitenant_seychelles_(syc)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Sierra Leone
  await context.create("Tenant", {
    code: "SLE",
    name: "Sierra Leone",
    logo: null,
    description: "Tenant - Sierra Leone (SLE)",
    databaseName: "db_multitenant_sierra_leone_(sle)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Somalia
  await context.create("Tenant", {
    code: "SOM",
    name: "Somalia",
    logo: null,
    description: "Tenant - Somalia (SOM)",
    databaseName: "db_multitenant_somalia_(som)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - South Africa
  await context.create("Tenant", {
    code: "ZAF",
    name: "South Africa",
    logo: null,
    description: "Tenant - South Africa (ZAF)",
    databaseName: "db_multitenant_south_africa_(zaf)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - South Sudan
  await context.create("Tenant", {
    code: "SSD",
    name: "South Sudan",
    logo: null,
    description: "Tenant - South Sudan (SSD)",
    databaseName: "db_multitenant_south_sudan_(ssd)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Sudan
  await context.create("Tenant", {
    code: "SDN",
    name: "Sudan",
    logo: null,
    description: "Tenant - Sudan (SDN)",
    databaseName: "db_multitenant_sudan_(sdn)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Swaziland
  await context.create("Tenant", {
    code: "SWZ",
    name: "Swaziland",
    logo: null,
    description: "Tenant - Swaziland (SWZ)",
    databaseName: "db_multitenant_swaziland_(swz)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Tanzania, United Republic Of
  await context.create("Tenant", {
    code: "TZA",
    name: "Tanzania, United Republic Of",
    logo: null,
    description: "Tenant - Tanzania, United Republic Of (TZA)",
    databaseName: "db_multitenant_tanzania_united_republic_of_(tza)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Togo
  await context.create("Tenant", {
    code: "TGO",
    name: "Togo",
    logo: null,
    description: "Tenant - Togo (TGO)",
    databaseName: "db_multitenant_togo_(tgo)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Tunisia
  await context.create("Tenant", {
    code: "TUN",
    name: "Tunisia",
    logo: null,
    description: "Tenant - Tunisia (TUN)",
    databaseName: "db_multitenant_tunisia_(tun)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Uganda
  await context.create("Tenant", {
    code: "UGA",
    name: "Uganda",
    logo: null,
    description: "Tenant - Uganda (UGA)",
    databaseName: "db_multitenant_uganda_(uga)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Western Sahara
  await context.create("Tenant", {
    code: "ESH",
    name: "Western Sahara",
    logo: null,
    description: "Tenant - Western Sahara (ESH)",
    databaseName: "db_multitenant_western_sahara_(esh)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Zambia
  await context.create("Tenant", {
    code: "ZMB",
    name: "Zambia",
    logo: null,
    description: "Tenant - Zambia (ZMB)",
    databaseName: "db_multitenant_zambia_(zmb)",
    createdBy: rootUser?._id,
    isActive: true,
  });
  // Tenant - Zimbabwe
  await context.create("Tenant", {
    code: "ZWE",
    name: "Zimbabwe",
    logo: null,
    description: "Tenant - Zimbabwe (ZWE)",
    databaseName: "db_multitenant_zimbabwe_(zwe)",
    createdBy: rootUser?._id,
    isActive: true,
  });

  /**************************************************************************************
   * Create db_multitenant_{TenantCode} database(s) and collection(s)
   **************************************************************************************
   */
  // Get Tenant(s)
  const tenants = await context.getAll("Tenant");
  // Close connection to the active {mongodb://localhost:27017/db_multitenant_admin} database
  connection?.close();
  // Create (initialise) each Tenant database and default collection(s)
  tenants?.forEach(async (tenant) => {
    await require("./../../middleware/database/connection/connection")(
      "Tenant",
      setDBConnectionString(
        DB_PROTOCOL,
        DB_HOST,
        DB_PORT,
        tenant.databaseName,
        DB_UID,
        DB_PWD
      ),
      DB_OPTIONS,
      log
    )
      .connect()
      .then(async (connection) => {
        const context =
          require("./../../middleware/database/context/db.context")(
            connection,
            log
          );
        /**************************************************************************************
         * User(s)
         **************************************************************************************
         */
        // Root user
        const rootUser = await context.create("User", {
          emailAddress: "root@multitenant.test",
          passwordHash: "passw0rd",
          userTypeId: "Root",
          isActive: true,
        });
        // Admin user
        await context.create("User", {
          emailAddress: "admin@multitenant.test",
          passwordHash: "passw0rd",
          userTypeId: "Admin",
          isActive: true,
          createdBy: rootUser?._id,
        });
        // Test user 1
        await context.create("User", {
          emailAddress: "test.user1@multitenant.test",
          passwordHash: "passw0rd",
          userTypeId: "User",
          isActive: true,
          createdBy: rootUser?._id,
        });
        // Close connection to the active {mongodb://localhost:27017/db_multitenant_{TenantCode}} database
        connection?.close();
      });
  });
}

run();
