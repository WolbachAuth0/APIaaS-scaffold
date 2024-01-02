const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
// replace the /node_modules/vuetify/src/style/elements/_code.sass file
// with the one in this directory BEFORE running the vue-cli build command.

// This is necessary to get the styles for highlight.js to override the 
// vuetify theme styles for the code element.

const source = path.join(__dirname, '_code.sass')
const destination = path.join(__dirname, '../node_modules/vuetify/src/styles/elements/_code.sass')
const copyFile = promisify(fs.copyFile)

doReplacement()

async function doReplacement () {
  try {
    await copyFile(source, destination)
    console.log('replaced /node_modules/vuetify/src/styles/elements/_code.sass')
  } catch (error) {
    console.log('failed to replace _code.sass file in vuetify. Your stylesheet will override the highlightjs styles.')
    console.error(error)
  }
}