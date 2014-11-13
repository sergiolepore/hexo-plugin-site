import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('datetime-span', 'DatetimeSpanComponent', {
  needs: ['component:datetime-span', 'helper:format-date-ago']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
