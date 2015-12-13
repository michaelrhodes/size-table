var fs = require('fs')
var path = require('path')
var options = require('readme-filenames')

module.exports = function (cwd) {
  var readme = false

  options.map(function (basename) {
    return path.join(cwd, basename)
  })
  .every(function (filename) {
    if (fs.existsSync(filename)) {
      readme = filename
      return false
    }
    return true
  })

  return readme
}
