import Base from 'ember-validations/validators/base';

// This custom validator chechs for a given property to
// be true or false.
//
// Options:
//   - isTrue:  property name to be checked. If false, error.
//   - isFalse: property name to be checked. If true, error.
//   - message: message returned on error.
//
// You have to specify isTrue OR isFalse, not both.
// If you need a more complex property lookup, implement a
// computed property and use it with isTrue or isFalse.
var PropertyValidator = Base.extend({
  call: function() {
    var checkTrue  = this.options.isTrue !== undefined;
    var checkFalse = this.options.isFalse !== undefined;

    if (checkTrue) {
      // if the property for TRUE returns false, error
      if (!this.model.get(this.options.isTrue)){
        this.errors.pushObject(this.options.message);
      }
    } else if (checkFalse) {
      // if the property for FALSE returns true, error
      if (this.model.get(this.options.isFalse)){
        this.errors.pushObject(this.options.message);
      }
    }
  }
});

export default PropertyValidator;
