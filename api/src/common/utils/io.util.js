/*
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
| Author        : Thabang Mogano
| Description   : IO utility (extension / helper) class
| Dependencies  :
|   > fs
|   > path
|--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const {
  appendFile,
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
} = require("fs");
const { join, parse } = require("path");

/**
 * Creates a new IOUtil instance
 */
const IOUtil = () => {
  const getDirectoryFilesRecursive = (path) => {
    let files = [];
    const items = readdirSync(path, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        files = [
          ...files,
          ...getDirectoryFilesRecursive(join(path, item.name)),
        ];
      } else {
        files.push(join(path, item.name));
      }
    }
    return files;
  };
  const getFileNameWithExtension = (path) => {
    return String(path)
      ?.split(/(\\|\/)/g)
      .pop();
  };
  const getFileNameWithoutExtension = (path) => {
    return parse(String(path)).name;
  };
  const getFileExtension = (path) => {
    return parse(String(path)).ext;
  };
  const createDirectory = (path) => {
    try {
      if (!existsSync(path)) {
        mkdirSync(path);
      }
    } catch (exception) {
      throw exception;
    }
  };
  return {
    getDirectoryFilesRecursive,
    getFileNameWithExtension,
    getFileNameWithoutExtension,
    getFileExtension,
    createDirectory,
  };
};
module.exports = IOUtil;
