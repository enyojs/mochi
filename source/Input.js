(function (enyo, scope) {
	/**
	* An mochi-styled input control. In addition to the features of
	* {@link enyo.Input}, mochi.Input has a `defaultFocus`
	* property that can be set to true to focus the input when it's rendered.
	* Only one input should be set as the `defaultFocus`.
	*
	* Typically, an mochi.Input is placed inside an
	* {@link mochi.InputDecorator}, which provides
	* styling, e.g.:
	*
	* ```javascript
	* {kind: 'mochi.InputDecorator', components: [
	* 	{kind: 'mochi.Input', placeholder: 'Enter some text...', onchange: 'inputChange'}
	* ]}
	* ```
	*
	* @ui
	* @class mochi.Input
	* @extends enyo.Input
	* @public
	*/
	enyo.kind(
		/** @lends mochi.Input.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.Input',

		/**
		* @private
		*/
		kind: 'enyo.Input',

		/**
		* @private
		*/
		classes: 'mochi-input'
	});

})(enyo, this);
