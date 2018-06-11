const path = require('path');
const { detectTargets } = require('./utils');

function getReplacementPaths(dir, env) {
  const targets = detectTargets(dir, env);
  const paths = {};

  targets.forEach(stat => {
    const source = path.join(stat.dir, `${stat.name}.${stat.ext}`);
    const target = path.join(stat.dir, `${stat.name}.${env}.${stat.ext}`);
    paths[source] = target;
  });

  return paths;
}

module.exports = {getReplacementPaths};
