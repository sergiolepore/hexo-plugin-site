import Ember from 'ember';
import moment from 'moment';
import ENV from 'hexo-plugin-site/config/environment';

var IndexController = Ember.ObjectController.extend({
  trending: [],
  newest: [],
  updated: [],
  popular: [],

  actions: {

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `trending plugins` will be
     * pushed to the `trending` property and the index template will show them.
     */
    loadTrending: function() {
      var _this = this;
      var m = moment();
      var today = m.toISOString();
      var daysAgo = m.subtract(15, 'days').toISOString();

      // trending in the last 15 days
      var trendingQuery = {
        where: {
          createdAt: { '>=': daysAgo, '<=': today }
        },
        limit: 10
      };

      // we need to make an AJAX call without using the `store` because the
      // `trending plugins` endpoint is http://example.com/v1/plugins/trending
      // and it's not `ember-data compliant`.
      // If you have a better way to find the trending plugins, please, fork
      // these repositories and implement your improvements:
      //    - https://github.com/sergiolepore/hexo-plugin-site (Client / Ember-CLI)
      //    - https://github.com/sergiolepore/hexo-plugin-api  (Server / Sails.js)
      // --------------
      var trendingUrl =
        ENV.APP.apiHost +
        '/' +
        ENV.APP.apiNamespace +
        '/plugins/trending'
      ;

      Ember.$.getJSON(trendingUrl, trendingQuery).then(function(json) {
        var plugins = json.plugins.map(function(attrs) {
          return _this.store.push('plugin', attrs);
        });

        _this.get('trending').pushObjects(plugins);
      });
    },

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `newest plugins` will be
     * pushed to the `newest` property and the index template will show them.
     */
    loadNewest: function() {
      var _this = this;
      var newQuery = {
        sort: 'createdAt DESC',
        limit: 10
      };

      this.store.find('plugin', newQuery).then(function(foundRecords) {
        _this.get('newest').pushObjects(foundRecords.toArray());
      });
    },

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `updated plugins` will be
     * pushed to the `updated` property and the index template will show them.
     */
    loadUpdated: function() {
      var _this = this;
      var updatedQuery = {
        sort: 'lastModified DESC',
        limit: 10
      };

      this.store.find('plugin', updatedQuery).then(function(foundRecords) {
        _this.get('updated').pushObjects(foundRecords.toArray());
      });
    },

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `popular plugins` will be
     * pushed to the `popular` property and the index template will show them.
     */
    loadPopular: function() {
      var _this = this;
      var popularQuery = {
        where: {
          installationCount: {
            '>': 0
          }
        },
        sort: 'installationCount DESC',
        limit: 10
      };

      this.store.find('plugin', popularQuery).then(function(foundRecords) {
        _this.get('popular').pushObjects(foundRecords.toArray());
      });
    }
  },

});

export default IndexController;
