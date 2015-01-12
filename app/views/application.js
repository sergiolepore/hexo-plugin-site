import Ember from 'ember';

export default Ember.View.extend({

  afterRenderEvent() {
    this.$(window).bind("load resize", function() {
      let topOffset = 50;
      let width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

      if (width < 768) {
        this.$('div.navbar-collapse').addClass('collapse');
        topOffset = 100; // 2-row-menu
      } else {
        this.$('div.navbar-collapse').removeClass('collapse');
      }

      let height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
      height = height - topOffset;

      if (height < 1) {
        height = 1;
      }

      if (height > topOffset) {
        this.$("#page-wrapper").css("min-height", (height) + "px");
      }
    });
  },

});
