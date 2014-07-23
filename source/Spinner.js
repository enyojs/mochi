/**
	A control that displays a spinner animation to indicate that activity is
	taking place. By default, mochi.Spinner will display a light spinner,
	suitable for displaying against a dark background. To render a dark spinner
	to be shown on a lighter background, add the "mochi-light" class to the
	spinner:
	
		{kind: "mochi.Spinner", classes: "mochi-light"}
	
	Typically, a spinner is shown to indicate activity and hidden to indicate
	that the activity has ended. The spinner animation will automatically start
	when a spinner is shown. If you wish, you may control the animation directly
	by calling the *start*, *stop*, and *toggle* methods.
*/

/**
 * `mochi.Spinner` extends {@link enyo.Control}.
 *
 * A control that displays a spinner animation to indicate that activity is taking place. By default, `mochi.Spinner`
 * will display a light spinner, suitable for displaying against a dark background. To render a dark spinner
 * to be shown on a lighter background, add the "mochi-light" class to the spinner:
 *
 * {kind: "mochi.Spinner", classes: "mochi-light"}
 *
 * Typically, a spinner is shown to indicate activity and hidden to indicate that the activity has ended. The spinner
 * animation will automatically start when a spinner is shown. If you wish, you may control the animation directly
 * by calling the `start`, `stop`, and `toggle` methods.
 *
 * @class mochi.Spinner
 * @extends enyo.Control
 * @ui
 * @public
 */
	(function (enyo, scope) {
	enyo.kind(
		/** @lends mochi.Spinner.prototype */ {

		/**
		 * @private
		 */
		name: "mochi.Spinner",

		/**
		 * @private
		 */
		kind: 'enyo.Control',

		/**
		 * @private
		 */
		classes: "mochi-spinner",
		/**
		 * Stops the spinner animation.
		 *
		 * @public
		 */
		stop: function() {
			this.setShowing(false);
		},

		/**
		 * Starts the spinner animation.
		 *
		 * @public
		 */
		start: function() {
			this.setShowing(true);
		},

		/**
		 * Toggles the spinner animation on or off.
		 *
		 * @public
		 */
		toggle: function() {
			this.setShowing(!this.getShowing());
		}
	});

})(enyo, this);
