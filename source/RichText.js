(function (enyo, scope) {
	/**
	 * A mochi-styled `RichText` control. In addition to the features of {@link enyo.RichText}, mochi.RichText has a
	 * `defaultFocus` property that can be set to true to focus the RichText when it's rendered. Only one RichText
	 * should be set as the `defaultFocus`.
	 *
	 * Typically, a `mochi.RichText` is placed inside an {@link mochi.InputDecorator}, which provides styling, e.g.:
	 *
	 * ```
	 * {kind: 'mochi.InputDecorator', components: [
	 *	{kind: 'mochi.RichText', style: 'width: 100px;', onchange: 'inputChange'}
	 * ]}
	 * ```
	 *
	 * Note that RichTexts must be explicitly sized for width.  In addition, RichText is not supported on Android < 3.
	 *
	 * @class mochi.RichText
	 * @extends enyo.RichText
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.RichText.prototype */ {
	
		/**
		 * @private
		 */
		name: 'mochi.RichText',
	
		/**
		 * @private
		 */
		kind: 'enyo.RichText',
	
		/**
		 * @private
		 */
		classes: 'mochi-richtext'
	});

})(enyo, this);
