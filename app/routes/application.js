import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
  title: function(tokens) {
    return tokens.join(' - ') + ' | Hexo Plugin Manager';
  }
});

export default ApplicationRoute;
