var sizeist = require('sizeist')
var pretty = require('pretty-bytes')
var table = require('markdown-table')
var expected = require('./expected')

module.exports = function (stream, name, cb) {
  var data = [expected.headings]
  var file = name || 'bundle'

  sizeist(stream)
    .on('size', row('.js'))
    .on('size:uglify', row('.min.js'))
    .on('size:uglify:gzip', row('.min.js.gz'))
    .on('error', cb)
    .on('finish', function () {
      cb(null, table(data, {
        align: ['l', 'r']
      }))
    })

  function row (ext) {
    return function (bytes) {
      data.push([file + ext, pretty(bytes)])
    }
  }
}
