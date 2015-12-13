var mdast = require('mdast')
var expected = require('./expected')
var parse = mdast.parse
var stringify = mdast.stringify

module.exports = function (_table, _readme, position) {
  var table = parse(_table)
  var readme = parse(_readme)
  var elements = readme.children

  // Replace an existing size table, if possible.
  var existing = existingTable(elements)
  if (existing !== null) {
    readme.children = splice(elements, existing, 1, table)
    return stringify(readme)
  }

  // Otherwise add it before the last heading or, if no
  // heading exists, at the end of the readme file.
  var firstSubheading = null 
  elements.every(function (element, i) {
    if (element.type === 'heading') {
      if (element.depth > 1) {
        firstSubheading = i 
        return false
      }
    }
    return true
  })

  firstSubheading !== null ?
    elements = splice(elements, firstSubheading, 0, table) :
    elements.push(table)

  readme.children = elements

  return stringify(readme)
}

function existingTable (children) {
  var table = null 

  children.every(function (child, i) {
    if (!deepid(child)) {
      return true
    }

    table = i
    return false

  })

  return table
}

function deepid (table) {
  if (table.type !== 'table') {
    return false
  }

  // Get table header values 
  var headings = []
  table.children.every(function (header) {
    if (header.type !== 'tableHeader') {
      return false
    }

    header.children.forEach(function (cell) {
      cell.children.forEach(function (text) {
        if (text.type == 'text') {
          headings.push(text.value)
        }
      })
    })
    return true

  })

  var validHeadings = (
    headings[0] == expected.headings[0] &&
    headings[1] == expected.headings[1]
  )

  if (!validHeadings) {
    return false
  }

  // Get files and sizes 
  var files = []
  var sizes = []
  table.children.every(function (row) {
    if (row.type !== 'tableRow') {
      return true
    }

    row.children.forEach(function (cell, i) {
      cell.children.forEach(function (text) {
        if (text.type === 'text') {
          i === 0 ? 
            files.push(text.value) :
            sizes.push(text.value)
        }
      })
    })

    return true

  })

  var validFiles = true
  files.every(function (file) {
    if (!expected.compressionFormat.test(file)) {
      return validFiles = false
    }
    return true
  })

  var validSizes = true
  sizes.every(function (size) {
    if (!expected.sizeFormat.test(size)) {
      return validSizes = false
    }
    return true
  })

  return validFiles && validSizes
}

function splice (array, index, length, value) {
  var copy = array.slice()
  copy.splice(index, length, value)
  return copy
}
