import Ember from 'ember';
import _ from 'underscore';

var SearchController = Ember.Controller.extend({
  query: '',
  plugins: [],
  users: [],
  keywords: [],
  // noMore... are wordkarounds for the sails blueprints
  // not returning a "meta" key with the total records.
  // These properties will change if a find returns zero records.
  noMorePlugins: false,
  noMoreUsers: false,
  noMoreKeywords: false,

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
    var isPluginsNotEmpty = this.get('isPluginsNotEmpty');
    var noMorePlugins = this.get('noMorePlugins');

    return isPluginsNotEmpty && !noMorePlugins;
  }.property('noMorePlugins', 'isPluginsNotEmpty'),

  canLoadMoreUsers: function() {
    var isUsersNotEmpty = this.get('isUsersNotEmpty');
    var noMoreUsers = this.get('noMoreUsers');

    return isUsersNotEmpty && !noMoreUsers;
  }.property('noMoreUsers', 'isUsersNotEmpty'),

  canLoadMoreKeywords: function() {
    var isKeywordsNotEmpty = this.get('isKeywordsNotEmpty');
    var noMoreKeywords = this.get('noMoreKeywords');

    return isKeywordsNotEmpty && !noMoreKeywords;
  }.property('noMoreKeywords', 'isKeywordsNotEmpty'),

  actions: {
    searchPlugins: function() {
      var searchQuery = this.get('query');
      var queryParams = [];

      searchQuery = '%' + searchQuery.replace(/\s+/, '%') + '%';

      queryParams.push({ name: { like: searchQuery }});
      queryParams.push({ packageName: { like: searchQuery }});
      queryParams.push({ description: { like: searchQuery }});
      queryParams.push({ keywordCache: { like: searchQuery }});
      queryParams.push({ readme: { like: searchQuery }});

      this.send('searchModels', {
        propertyName: 'plugins',
        modelName: 'plugin',
        queryParams: { or: queryParams }
      });
    },

    searchUsers: function() {
      var searchQuery = this.get('query');
      var queryParams = [];

      searchQuery = '%' + searchQuery.replace(/\s+/, '%') + '%';

      queryParams.push({ name: { like: searchQuery }});

      this.send('searchModels', {
        propertyName: 'users',
        modelName: 'user',
        queryParams: { or: queryParams }
      });
    },

    searchKeywords: function() {
      var searchQuery = this.get('query');
      var queryParams = [];

      searchQuery = '%' + searchQuery.replace(/\s+/, '%') + '%';

      queryParams.push({ name: { like: searchQuery }});

      this.send('searchModels', {
        propertyName: 'keywords',
        modelName: 'keyword',
        queryParams: { or: queryParams }
      });
    },

    searchModels: function(args) {
      var propertyName = args.propertyName;
      var modelName = args.modelName;
      var queryParams = args.queryParams;
      var skip = this.get(propertyName).length;
      var _this = this;

      this.store.find(modelName, {
        where: queryParams,
        skip: skip
      }).then(function(foundRecords) {
        var foundRecordsArr = foundRecords.toArray();

        if (foundRecordsArr.length) {
          _this.get(propertyName).pushObjects(foundRecords.toArray());
        } else {
          var noMoreProp = 'noMore' + _.str.capitalize(propertyName);
          _this.set(noMoreProp, true);
        }
      });
    },

    /**
     * This can be called to clean all garbage in the controller.
     * If there are observers attached to this controller's properties,
     * they will be notified and the reset will propagate. Useful to clear the
     * query string when leaving the search route.
     */
    reset: function() {
      this.set('query', '');
    },

  }
});

export default SearchController;
