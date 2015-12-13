var fs = require('fs')
var path = require('path')

module.exports = function (cwd) {
  var filename = path.join(cwd, 'package.json')
  return fs.existsSync(filename) ?
    JSON.parse(fs.readFileSync(filename, 'utf8')) :
    {}
}
