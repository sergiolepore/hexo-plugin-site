import Ember from 'ember';
import _     from 'underscore';

export default Ember.Controller.extend({
  queryParams : ['type'], // query params from the ember route
  query       : '',
  plugins     : [],
  users       : [],
  keywords    : [],
  // noMore... are wordkarounds for the sails blueprints
  // not returning a "meta" key with the total records.
  // These properties will change if a find returns zero records.
  noMorePlugins   : false,
  noMoreUsers     : false,
  noMoreKeywords  : false,

  isPluginsNotEmpty: function() {
    return this.get('plugins').length > 0;
  }.property('plugins.[]'),

  isUsersNotEmpty: function() {
    return this.get('users').length > 0;
  }.property('users.[]'),

  isKeywordsNotEmpty: function() {
    return this.get('keywords').length > 0;
  }.property('keywords.[]'),

  isShortQuery: function() {
    return this.get('query').length < 3;
  }.property('query'),

  onQueryChange: function() {
    this.get('plugins').clear();
    this.get('users').clear();
    this.get('keywords').clear();
    this.set('noMorePlugins', false);
    this.set('noMoreUsers', false);
    this.set('noMoreKeywords', false);
  }.observes('query'),

  canLoadMorePlugins: function() {
    let isPluginsNotEmpty = this.get('isPluginsNotEmpty');
    let noMorePlugins     = this.get('noMorePlugins');

    return isPluginsNotEmpty && !noMorePlugins;
  }.property('noMorePlugins', 'isPluginsNotEmpty'),

  canLoadMoreUsers: function() {
    let isUsersNotEmpty = this.get('isUsersNotEmpty');
    let noMoreUsers     = this.get('noMoreUsers');

    return isUsersNotEmpty && !noMoreUsers;
  }.property('noMoreUsers', 'isUsersNotEmpty'),

  canLoadMoreKeywords: function() {
    let isKeywordsNotEmpty = this.get('isKeywordsNotEmpty');
    let noMoreKeywords     = this.get('noMoreKeywords');

    return isKeywordsNotEmpty && !noMoreKeywords;
  }.property('noMoreKeywords', 'isKeywordsNotEmpty'),

  actions: {

    searchPlugins() {
      let searchQuery = this.get('query');
      let queryParams = [];

      if (searchQuery.length < 3) {
        return;
      }

      searchQuery = '%' + searchQuery.replace(/\s+/, '%') + '%';

      queryParams.push({ name: { like: searchQuery }});
      queryParams.push({ packageName: { like: searchQuery }});
      queryParams.push({ description: { like: searchQuery }});
      queryParams.push({ keywordCache: { like: searchQuery }});
      queryParams.push({ readme: { like: searchQuery }});

      this.send('searchModels', {
        propertyName : 'plugins',
        modelName    : 'plugin',
        queryParams  : { or: queryParams }
      });
    },

    searchUsers() {
      let searchQuery = this.get('query');
      let queryParams = [];

      if (searchQuery.length < 3) {
        return;
      }

      searchQuery = '%' + searchQuery.replace(/\s+/, '%') + '%';

      queryParams.push({ username: { like: searchQuery }});

      this.send('searchModels', {
        propertyName : 'users',
        modelName    : 'user',
        queryParams  : { or: queryParams }
      });
    },

    searchKeywords() {
      let searchQuery = this.get('query');
      let queryParams = [];

      if (searchQuery.length < 3) {
        return;
      }

      searchQuery = '%' + searchQuery.replace(/\s+/, '%') + '%';

      queryParams.push({ name: { like: searchQuery }});

      this.send('searchModels', {
        propertyName : 'keywords',
        modelName    : 'keyword',
        queryParams  : { or: queryParams }
      });
    },

    searchModels(args) {
      let propertyName = args.propertyName;
      let modelName = args.modelName;
      let queryParams = args.queryParams;
      let skip = this.get(propertyName).length;

      this.store.findQuery(modelName, {
        where: queryParams,
        skip: skip
      }).then(foundRecords => {
        let foundRecordsArr = foundRecords.toArray();

        if (foundRecordsArr.length) {
          this.get(propertyName).pushObjects(foundRecords.toArray());
        } else {
          let noMoreProp = 'noMore' + _.str.capitalize(propertyName);
          this.set(noMoreProp, true);
        }
      });
    },

    /**
     * This can be called to clean all garbage in the controller.
     * If there are observers attached to this controller's properties,
     * they will be notified and the reset will propagate. Useful to clear the
     * query string when leaving the search route.
     */
    reset() {
      this.set('query', '');
    },

  }
});
