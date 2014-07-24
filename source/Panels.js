(function (enyo, scope) {
	/**
	 * `mochi.Panels` is a mochi-styled {@link enyo.Panels} control.
	 *
	 * ```
	 * {kind: "mochi.Panels", components: [
	 *	{content: "Panel 0"},
	 *	{content: "Panel 1"}
	 * ]}
	 * ```
	 *
	 * @class mochi.Panels
	 * @extends enyo.Panels
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.Panels.prototype */ {

		/**
		 * @private
		 */
		name: "mochi.Panels",

		/**
		 * @private
		 */
		kind: "enyo.Panels",

		/**
		 * @private
		 */
		classes:"mochi-panels mochi-base-panel",

		/**
		 * @private
		 */
		arrangerKind: "DockRightArranger",

		/**
		 * @private
		 */
		basePanel: true,

		/**
		 * @private
		 */
		overlap: 45,

		/**
		 * @private
		 */
		layoutWidth: 800
	});

})(enyo, this);
