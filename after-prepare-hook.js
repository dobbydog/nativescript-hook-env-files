const path = require('path');
const fs = require('fs');
const { detectTargets, escapeRegExp } = require('./utils')

module.exports = function (logger, platformsData, projectData, hookArgs) {
  return new Promise((resolve, reject) => {

    const projectDir = projectData.projectDir;
    const platform = hookArgs.platform.toLowerCase();

    const platformData = platformsData.getPlatformData(platform);
    const platformOutDir = platformData.appDestinationDirectoryPath;
    const platformAppDir = path.join(platformOutDir, 'app');

    const env = process.env.NODE_ENV || 'development';

    try {
      walkSync(platformAppDir, env, logger);
    } catch(e){
      logger.warn(e);
      logger.warn('nativescript-hook-env-files failed');
    }

    resolve();
  });
};


function walkSync(dir, env, logger) {
  const targets = detectTargets(dir, env);

  targets.forEach(stat => {
    const files = fs.readdirSync(stat.dir);
    const targetPattern = new RegExp(`^${escapeRegExp(stat.name)}\\.([^.]+)\\.${escapeRegExp(stat.ext)}$`);

    files.forEach(file => {
      const match = file.match(targetPattern);

      if (match) {
        if (match[1] === env) {
          try {
            fs.unlinkSync(path.join(dir, `${stat.name}.${stat.ext}`));
          } catch(e) {}
          fs.renameSync(path.join(dir, file), path.join(dir, `${stat.name}.${stat.ext}`));
        } else {
          fs.unlinkSync(path.join(dir, file));
        }
      }
    });
  });
}
