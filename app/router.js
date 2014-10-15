import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('installation');
  this.route('docs');
  this.route('news');
  this.resource('plugins', function() {
    // this.route('trending');
    // this.route('new');
    // this.route('updated');
    // this.route('popular');
    this.route('add');
  });
  this.route('search', { path: '/search/:query' });
  this.resource('plugin', { path: '/plugin/:plugin_slug' }, function() {
    this.route('edit');
  });
  this.resource('user', { path: '/user/:user_slug' }, function() {

  });
  this.route('keyword', { path: '/keyword/:keyword_id' });
});

export default Router;
