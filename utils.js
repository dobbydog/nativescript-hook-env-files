const path = require('path');
const fs = require('fs');

function detectTargets(dir, env) {
  const pattern = new RegExp(`^(.+)\\.${escapeRegExp(env)}\\.([^.]+)$`);
  const files = fs.readdirSync(dir);

  return files.reduce((acc, file) => {
    const stat = fs.statSync(path.join(dir , file));

    if (stat.isDirectory() && file !== 'tns_modules') {
			acc = acc.concat(detectTargets(path.join(dir, file), env));
    } else {
      const match = file.match(pattern);
      if (match) {
        acc.push({dir, name: match[1], ext: match[2]});
      }
    }
    return acc;
  }, []);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]\$/g, '\\$&');
}

module.exports = {detectTargets, escapeRegExp};
