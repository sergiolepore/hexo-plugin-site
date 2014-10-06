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
    this.route('trending');
    this.route('new');
    this.route('updated');
    this.route('popular');
  });
});

export default Router;
