(function (enyo, scope) {
	/**
	 * Fires when progress bar finishes animating to a position.
	 *
	 * @event mochi.Progresstext#onAnimateProgressFinish
	 * @type {Object}
	 * @property {Object} sender - The [component]{@link enyo.Component} that most recently
	 *	propagated the [event]{@link external:event}.
	 * @property {enyo.Scroller~ScrollEvent} event - An [object]{@link external:Object} containing
	 *	[event]{@link external:event} information.
	 * @public
	 */

	/**
	 * A control that shows the current progress of a process in a horizontal bar superimposed on text.
	 *
	 * ```
	 * {kind: 'mochi.ProgressText', progress: 10}
	 * ```
	 *
	 * To animate progress changes, call the `{@link mochi.ProgressText#animateProgressTo} method:
	 *
	 * ```
	 * this.$.progressBar.animateProgressTo(50);
	 * ```
	 *
	 * You may customize the color of the bar by applying a style via the {@link mochi.ProgressText#barClasses} property, e.g.:
	 *
	 * ```
	 * {kind: 'mochi.ProgressText', barClasses: 'mochi-dark'}
	 * ```
	 *
	 * @class mochi.ProgressText
	 * @extends enyo.Control
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.ProgressText.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.ProgressText',

		/**
		 * @private
		 */
		kind: 'enyo.Control',

		/**
		 * @private
		 */
		classes: 'mochi-progress-text',

		/**
		 * @private
		 */
		published: /** @lends mochi.ProgressText.prototype */ {
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
			 * @default 'mochi-progress-text-outerwear'
			 * @public
			 */
			barClasses: '',

			/**
			 * Number of decimal places to show in the numerical representation of the progress.
			 *
			 * @type {Number}
			 * @default 0
			 * @public
			 */
			decimalPlaces: 0,


			/**
			 * Text to display after percentage completed
			 *
			 * @type {String}
			 * @default 'Completed'
			 * @public
			 */
			label: 'Completed'
		},

		/**
		 * @private
		 */
		events: {
			/**
			 * {@link mochi.ProgressText#event:onAnimateProgressFinish}
			 */
			onAnimateProgressFinish: ''
		},

		/**
		 * @private
		 */
		components: [
			{name: 'progressAnimator', kind: 'Animator', onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
			{name: 'barContainer', classes: 'mochi-progress-text-box', components: [
				{name: 'barBackground', classes: 'mochi-progress-text-underwear', content: '100% Completed'},
				{name: 'bar', classes: 'mochi-progress-text-outerwear', content: '100% Completed'}
			]}

		],

		/**
		 * @private
		 */
		create: function () {
			this.inherited(arguments);
			this.barClassesChanged();
		},

		/**
		 * @private
		 */
		rendered: function () {
			this.inherited(arguments);
			this.progressChanged();
		},

		/**
		 * @private
		 */
		barClassesChanged: function (inOld) {
			this.$.bar.removeClass(inOld);
			this.$.bar.addClass(this.barClasses);
		},

		/**
		 * @private
		 */
		progressChanged: function () {
			this.progress = this.clampValue(this.min, this.max, this.progress);
			var p = this.calcPercent(this.progress);
			this.updateBarPosition(p);
		},


		/**
		 * @private
		 */
		labelChanged: function () {
			this.progressChanged();
		},

		/**
		 * @private
		 */
		clampValue: function (inMin, inMax, inValue) {
			return Math.max(inMin, Math.min(inValue, inMax));
		},

		/**
		 * @private
		 */
		calcRatio: function (inValue) {
			return (inValue - this.min) / (this.max - this.min);
		},

		/**
		 * @private
		 */
		calcPercent: function (inValue) {
			return (this.calcRatio(inValue) * 100).toFixed(this.decimalPlaces);
		},

		/**
		 * @private
		 */
		updateBarPosition: function (inPercent) {
			var label = inPercent + (this.label.length ? '% ' + this.label : '%');
			this.$.barBackground.setContent(label);
			this.$.bar.setContent(label);

			var w = (this.$.barBackground.getBounds().width / 100) * inPercent;
			this.$.bar.applyStyle('width', w + 'px');
		},

		/**
		 * Animates progress to the passed-in value.
		 *
		 * @param {Number} inValue  The destination number
		 * @public
		 */
		animateProgressTo: function (inValue) {
			this.$.progressAnimator.play({
				startValue: this.progress,
				endValue: inValue,
				node: this.hasNode()
			});
		},

		/**
		 * @private
		 */
		progressAnimatorStep: function (inSender) {
			this.setProgress(inSender.value);
			return true;
		},

		/**
		 * @private
		 */
		progressAnimatorComplete: function (inSender) {
			this.doAnimateProgressFinish(inSender);
			return true;
		}
	});

})(enyo, this);
