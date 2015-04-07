var diskAdapter = require('sails-disk');

module.exports = {

  adapters: {
    default: diskAdapter,
    disk: diskAdapter
  },

  connections: {
    myLocalDisk: {
      adapter: 'disk',
      filePath: 'db/'
    },
  },

  defaults: {
    migrate: 'safe'
  }

};