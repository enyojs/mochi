(function (enyo, scope) {
	/**
	 * A mochi-styled TextArea control. In addition to the features of {@link enyo.TextArea}, `mochi.TextArea` has a
	 * `defaultFocus` property that can be set to true to focus the TextArea when it is rendered. Only one `mochi.TextArea`
	 * should be set as the `defaultFocus`.
	 *
	 * Typically, a `mochi.TextArea` is placed inside a {@link mochi.InputDecorator}, which provides styling, e.g.:
	 *
	 * ```
	 * {kind: 'mochi.InputDecorator', components: [
	 *	{kind: 'mochi.TextArea', onchange: 'inputChange'}
	 * ]}
	 * ```
	 *
	 * @class mochi.TextArea
	 * @extends enyo.TextArea
	 * @ui
	 * @public
	 */
	enyo.kind(
		/** @lends mochi.TextArea.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.TextArea',

		/**
		 * @private
		 */
		kind: 'enyo.TextArea',

		/**
		 * @private
		 */
		classes: 'mochi-textarea'
	});

})(enyo, this);
