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
  this.route('search', {
    path: '/search/:query'
  });

  this.route('keyword', {
    path: '/keyword/:keyword_id'
  });

  this.route('sessions', {
    path: '/login'
  });

  this.resource('plugins', function() {
    // this.route('trending');
    // this.route('new');
    // this.route('updated');
    // this.route('popular');
    this.route('add');
  });

  this.resource('plugin', { path: '/plugin/:plugin_slug' }, function() {
    this.route('edit');
  });

  this.resource('users', { path: 'devs' }, function() {
    this.route('new', { path: '/signup' });

    this.route('user', {
      path: '/dev/:user_slug'
    });

    this.route('current', {
      path: '/me'
    });

    this.route('resetpassword', {
      path: '/resetpassword/:token'
    });
  });
});

export default Router;
