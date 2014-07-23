/**
 * The onChange event fires when the user changes the value of the toggle button, but not when the value is
 * changed programmatically.
 *
 * @event mochi.ToggleButton#onChange
 * @type {Object}
 * @property {Boolean} value - The on/off value of the toggle button.
 * @public
 */


/**
 * `mochi.ToggleButton` extends {@link enyo.Control} and is a control that looks like a switch with labels for two
 * states. Each time a `mochi.ToggleButton` is tapped, it switches its value and fires an onChange event.
 *
 *	 ```
 *	 {kind: 'mochi.ToggleButton', onChange: 'buttonToggle'}
 *
 *	 buttonToggle: function (inSender, inEvent) {
 *				this.log('Toggled to value ' + inEvent.value);
 *			}
 * 	```
 *
 * To find out the value of the button, use getValue:
 *
 *	```
 *	 queryToggleValue: function () {
 *				return this.$.toggleButton.getValue();
 *			}
 *	```
 *
 * The color of the toggle button can be customized by applying a background color:
 *
 * 	```
 * 	{kind: 'mochi.ToggleButton', style: 'background-color: #35A8EE;'}
 * 	```
 *
 * @class mochi.ToggleButton
 * @extends enyo.Control
 * @ui
 * @public
 */
(function (enyo, scope) {
	enyo.kind(
		/** @lends mochi.ToggleButton.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.ToggleButton',

		/**
		 * @private
		 */
		kind: 'enyo.Control',

		/**
		 * @private
		 */
		classes: 'mochi-toggle-button',

		/**
		 * @private
		 */
		published: {
			/**
			 * Boolean indicating whether toggle button is currently the active item in a group
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			active: false,

			/**
			 * Boolean indicating whether toggle button is currently in the 'on' state
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			value: false,

			/**
			 * Boolean indicating whether toggle button is disabled and does not generate tap events
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			disabled: false,

			/**
			 * Boolean indicating whether toggle transitions should be animated
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			canAnimate: true,

			/**
			 * CSS background-color property indicating active state
			 *
			 * @type {String}
			 * @default '#ffb80d'
			 * @public
			 */
			colorActive: '#ffb80d',

			/**
			 * CSS background-color property indicating inactive state
			 *
			 * @type {String}
			 * @default '#646464'
			 * @public
			 */
			colorInactive: '#646464'
		},


		/**
		 * @private
		 */
		events: {
			onChange: ''
		},

		/**
		 * @private
		 */
		handlers: {
			ondragstart: 'dragstart',
			ondrag: 'drag',
			ondragfinish: 'dragfinish'
		},

		/**
		 * @private
		 */
		lastKnobPos: 0,

		/**
		 * @private
		 */
		onXPos: 0,

		/**
		 * @private
		 */
		_canAnimate: false,

		/**
		 * @private
		 */
		components: [
			{name: 'toggleKnob', classes: 'mochi-toggle-button-knob'},
			{kind: 'enyo.Animator', onStep: 'animatorStep', onEnd: 'animatorEnd'}
		],

		/**
		 * @private
		 */
		create: function () {
			this.inherited(arguments);
			this.value = Boolean(this.value || this.active);
			this.disabledChanged();
			this.supressAnimation();
		},

		/**
		 * @private
		 */
		rendered: function () {
			this.inherited(arguments);
			this.calcKnob();
			this.valueChanged();
			this.init();
		},

		/**
		 * @private
		 */
		supressAnimation: function () {
			this._canAnimate = this.canAnimate;
			this.canAnimate = false;
		},

		/**
		 * @private
		 */
		init: function () {
			this.setCanAnimate(this._canAnimate);
		},

		/*
		// We can add a class here to animate the background also
		canAnimateChanged: function () {
			if (this.canAnimate) {
				var toggleClass = 'mochi-toggle-animate';
			} else {
				var toggleClass = 'mochi-no-animate';
			}
			this.addClass(toggleClass);
		},
		*/

		/**
		 * @private
		 */
		animatorStep: function (inSender) {
			this.updateKnobPosition(inSender.value);
		},

		/**
		 * @private
		 */
		updateKnobPosition: function (inValue) {
			var xPos = inValue + 'px';
			var inControl = this.$.toggleKnob;
			if (enyo.dom.canTransform()) {
				enyo.dom.transform(inControl, {translateX: xPos});
			} else {
				inControl.applyStyle('left', xPos);
			}
		},

		/**
		 * @private
		 */
		calcKnob: function () {
			this.onXPos = (this.getBounds().width - this.$.toggleKnob.getBounds().width) - (parseInt(enyo.dom.getComputedStyleValue(this.$.toggleKnob.hasNode(), 'margin-left')) * 2);
		},

		/**
		 * @private
		 */
		valueChanged: function () {
			this.applyStyle('background-color', this.value ? this.colorActive : this.colorInactive);
			this.setActive(this.value);
			this.doChange({value: this.value});

			var xPos = (this.value) ? this.onXPos : 0;

			if (this.canAnimate) {
				this.$.animator.play({
					startValue: this.lastKnobPos,
					endValue: xPos,
					node: this.$.toggleKnob.hasNode()
				});
			} else {
				this.updateKnobPosition(xPos);
			}
			this.lastKnobPos = xPos;

		},

		/**
		 * @private
		 */
		activeChanged: function () {
			this.setValue(this.active);
			this.bubble('onActivate');
		},

		/**
		 * @private
		 */
		disabledChanged: function () {
			this.addRemoveClass('disabled', this.disabled);
		},

		/**
		 * @private
		 */
		updateValue: function (inValue) {
			if (!this.disabled) {
				this.setValue(inValue);
			}
		},

		/**
		 * @private
		 */
		tap: function () {
			this.updateValue(!this.value);
		},

		/**
		 * @private
		 */
		dragstart: function (inSender, inEvent) {
			if (inEvent.horizontal) {
				inEvent.preventDefault();
				this.dragging = true;
				this.dragged = false;
				return true;
			}
		},

		/**
		 * @private
		 */
		drag: function (inSender, inEvent) {
			if (this.dragging) {
				var d = inEvent.dx;
				if (Math.abs(d) > 10) {
					this.updateValue(d > 0);
					this.dragged = true;
				}
				return true;
			}
		},

		/**
		 * @private
		 */
		dragfinish: function (inSender, inEvent) {
			this.dragging = false;
			if (this.dragged) {
				inEvent.preventTap();
			}
		},

		/**
		 * @private
		 */
		resizeHandler: function () {
			this.inherited(arguments);
			this.calcKnob();
		}
	})

})(enyo, this);
