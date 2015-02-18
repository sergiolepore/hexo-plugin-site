import Ember  from 'ember';
import moment from 'moment';
import ENV    from 'hexo-plugin-site/config/environment';

export default Ember.ObjectController.extend({
  trending : [],
  newest   : [],
  updated  : [],
  popular  : [],

  actions: {

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `trending plugins` will be
     * pushed to the `trending` property and the index template will show them.
     */
    loadTrending() {
      let m       = moment();
      let today   = m.toISOString();
      let daysAgo = m.subtract(15, 'days').toISOString();

      // trending in the last 15 days
      let trendingQuery = {
        where: {
          '>=': {
            createdAt: daysAgo
          },
          '<=': {
            createdAt: today
          }
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
      let trendingUrl = ENV.APP.apiBaseEndpoint + '/plugins/trending';

      Ember.$.getJSON(trendingUrl, trendingQuery).then(json => {
        let plugins = json.plugins.map(attrs => {
          return this.store.push('plugin', attrs);
        });

        this.get('trending').pushObjects(plugins);
      });
    },

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `newest plugins` will be
     * pushed to the `newest` property and the index template will show them.
     */
    loadNewest() {
      let newQuery = {
        sort: 'createdAt DESC',
        limit: 10
      };

      this.store.findQuery('plugin', newQuery).then(foundRecords => {
        this.get('newest').pushObjects(foundRecords.toArray());
      });
    },

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `updated plugins` will be
     * pushed to the `updated` property and the index template will show them.
     */
    loadUpdated() {
      let updatedQuery = {
        sort: 'lastModified DESC',
        limit: 10
      };

      this.store.findQuery('plugin', updatedQuery).then(foundRecords => {
        this.get('updated').pushObjects(foundRecords.toArray());
      });
    },

    /**
     * This action will load the trending plugins by querying the server.
     * When the AJAX call receives a response, the `popular plugins` will be
     * pushed to the `popular` property and the index template will show them.
     */
    loadPopular() {
      let popularQuery = {
        where: {
          '>': {
            installationCount: 0
          }
        },
        sort: 'installationCount DESC',
        limit: 10
      };

      this.store.findQuery('plugin', popularQuery).then(foundRecords => {
        this.get('popular').pushObjects(foundRecords.toArray());
      });
    },

    /**
     * Clears the controller properties
     */
    reset() {
      this.get('trending').clear();
      this.get('newest').clear();
      this.get('updated').clear();
      this.get('popular').clear();
    }
  },

});
