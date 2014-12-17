(function (enyo, scope) {
	/**
	 * Fires when progress bar finishes animating to a position.
	 *
	 * @event mochi.ProgressBar#onAnimateProgressFinish
	 * @type {Object}
	 * @property {Object} sender - The [component]{@link enyo.Component} that most recently
	 *	propagated the [event]{@link external:event}.
	 * @property {enyo.Scroller~ScrollEvent} event - An [object]{@link external:Object} containing
	 *	[event]{@link external:event} information.
	 * @public
	 */

	/**
	 * _mochi.ProgressBar_ is a  control that shows the current progress of a
	 * process in a horizontal bar.
	 *
	 * ```
	 * {kind: 'mochi.ProgressBar', progress: 10}
	 * ```
	 *
	 * To animate progress changes, call the {@link mochi.ProgressBar#animateProgressTo} method:
	 *
	 * ```
	 * this.$.progressBar.animateProgressTo(50);
	 * ```
	 *
	 * You may customize the color of the bar by applying a style via the
	 * {@link mochi.ProgressBar#barClasses} property, e.g.:
	 *
	 * ```
	 * {kind: 'mochi.ProgressBar', barClasses: 'class-name'}
	 * ```
	 *
	 * @ui
	 * @class mochi.ProgressBar
	 * @extends enyo.Control
	 * @public
	 */
	enyo.kind(
		/** @lends mochi.ProgressBar.prototype */ {

		/**
		 * @private
		 */
		name: "mochi.ProgressBar",

		/**
		 * @private
		 */
		kind: 'enyo.Control',

		/**
		 * @private
		 */
		classes: "mochi-progress-bar",

		/**
		 * @private
		 */
		published: /** @lends mochi.ProgressBar.prototype */ {
			/**
			 * Current position of progress bar
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			progress: 0,

			/**
			 * Minimum progress value (i.e., no progress made)
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			min: 0,

			/**
			 * Maximum progress value (i.e., process complete)
			 *
			 * @type {Number}
			 * @default 100
			 * @public
			 */
			max: 100,

			/**
			 * CSS classes to apply to progress bar
			 *
			 * @type {String}
			 * @default 'mochi-progress-bar-bar'
			 * @public
			 */
			barClasses: "",
			/**
			 * Increment value (value by which slider increments upon move)
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			increment: 0

		},

		/**
		 * @private
		 */
		events: {
			/**
			 * {@link mochi.ProgressBar#event:onAnimateProgressFinish}
			 */
			onAnimateProgressFinish: ""
		},

		/**
		 * @private
		 */
		components: [
			{name: "progressAnimator", kind: "Animator", onStep: "progressAnimatorStep", onEnd: "progressAnimatorComplete"},
			{name: "bar", classes: "mochi-progress-bar-bar"}
		],

		/**
		 * @private
		 */
		create: function() {
			this.inherited(arguments);
			this.progressChanged();
			this.barClassesChanged();
		},

		/**
		 * @private
		 */
		barClassesChanged: function(inOld) {
			this.$.bar.removeClass(inOld);
			this.$.bar.addClass(this.barClasses);
		},

		/**
		 * @private
		 */
		progressChanged: function() {
			this.progress = this.clampValue(this.min, this.max, this.progress);
			var p = this.calcPercent(this.progress);
			this.updateBarPosition(p);
		},

		/**
		 * @private
		 */
		clampValue: function(inMin, inMax, inValue) {
			return Math.max(inMin, Math.min(inValue, inMax));
		},

		/**
		 * @private
		 */
		calcRatio: function(inValue) {
			return (inValue - this.min) / (this.max - this.min);
		},

		/**
		 * @private
		 */
		calcPercent: function(inValue) {
			return this.calcRatio(inValue) * 100;
		},

		/**
		 * @private
		 */
		updateBarPosition: function(inPercent) {
			this.$.bar.applyStyle("width", inPercent + "%");
		},

		/**
		 * Animates progress to the passed-in value.
		 *
		 * @param {Number} inValue  The destination number
		 * @public
		 */
		animateProgressTo: function(inValue) {
			this.$.progressAnimator.play({
				startValue: this.progress,
				endValue: inValue,
				node: this.hasNode()
			});
		},

		/**
		 * @private
		 */
		progressAnimatorStep: function(inSender) {
			this.setProgress(inSender.value);
			return true;
		},

		/**
		 * @private
		 */
		progressAnimatorComplete: function(inSender) {
			this.doAnimateProgressFinish(inSender);
			return true;
		}
	});

})(enyo, this);