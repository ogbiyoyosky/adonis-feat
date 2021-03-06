'use strict'
const Helpers = use('Helpers')
const path = require('path')
const _ = require('lodash')

const {
  Command
} = require('@adonisjs/ace')

class Feature extends Command {
  static get signature() {
    return `make:feature 
    { name : Name of the feature }
   `
  }
  /**
   * @method _getFilePath -Get the location for the file path
   * @return {void}
   */
  async _getFilePath() {
    return path.join(process.cwd(), 'app/', 'Features')
  }


  async _generateFeature(testPath, name) {

    const template = await this.readFile(path.join(__dirname, './templates/feature.mustache'), 'utf-8')
    await this.generateFile(testPath, template, {
      name: name
    })
  }


  static get description() {
    return 'Make a new Feature'
  }
  async _ensureInProjectRoot() {
    const acePath = path.join(process.cwd(), 'ace')
    const exists = await this.pathExists(acePath)

    if (!exists) {
      throw new Error('Make sure you are inside an Adonisjs app to run make:test command')
    }
  }

  async handle({
    name
  }) {
    const basePath = await this._getFilePath()
    let featurePath
    if (name.toLowerCase().includes('feature'.toLowerCase())) {
      featurePath = path.join(basePath, `${_.camelCase(name).charAt(0).toUpperCase() + name.substring(1)}.js`)
    } else {
      featurePath = path.join(basePath, `${_.camelCase(name).charAt(0).toUpperCase() + name.substring(1)}Feature.js`)
    }

    const incrementalPath = featurePath.replace(process.cwd(), '').replace(path.sep, '')
    const className = name.split('/')


    const lastNameIdx = className[className.length - 1]

    let newClassName

    if (lastNameIdx.toLowerCase().includes('feature'.toLowerCase())) {
      newClassName = lastNameIdx
    } else {
      newClassName = lastNameIdx + "Feature"
    }


    try {
      await this._ensureInProjectRoot()
      await this._generateFeature(featurePath, newClassName)
      this.completed('create', incrementalPath)

      /**
       * Return testPath if command executed programatically
       */
      if (!this.viaAce) {
        return featurePath
      }
    } catch (error) {
      /**
       * Throw error if command executed programatically
       */
      if (!this.viaAce) {
        throw error
      }
      this.error(error.message)
    }

  }
}

module.exports = Feature