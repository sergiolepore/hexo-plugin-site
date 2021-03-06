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

  this.route('sessions', {
    path: '/login'
  });

  // TODO: To be implemented in a future release
  // this.resource('plugins', function() {
    // this.route('trending');
    // this.route('new');
    // this.route('updated');
    // this.route('popular');
    // this.route('add');
  // });

  this.route('plugin', { path: '/plugin/:plugin_slug' });

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
