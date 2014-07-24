(function (enyo, scope) {
	/**
	 * A button that can be selected/unselected when clicked. The `onChange` event is fired when it is clicked. Use
	 * getValue() to fetch its status.
	 *
	 * ```
	 * {kind: "Group", classes: "mochi-sample-tools group", onActivate: "itemActivated", highlander: true, components: [
	 *	{kind: "mochi.RadioButton", checked: true},
	 *	{kind: "mochi.RadioButton"},
 	 *	{kind: "mochi.RadioButton"}
 	 * ]}
	 * ```
	 *
	 * @class mochi.RadioButton
	 * @extends enyo.Checkbox
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.RadioButton.prototype */ {

		/**
		 * @private
		 */
		name: "mochi.RadioButton",

		/**
		 * @private
		 */
		//classes: "mochi-radio-button",

		/**
		 * @private
		 */
		kind: "enyo.Checkbox",

		/**
		 * @private
		 */
		tag: "div",

		/**
		 * @private
		 */
		handlers: {
			ondown: "downHandler",
			// prevent double onchange bubble in IE
			onclick: ""
		},

		/**
		 * @private
		 */
		// FIXME: Experimental properties for dynamic color changing
		published: {
			/**
			 * Active button color
			 *
			 * @type {String}
			 * @default "#ffb80d"
			 * @public
			 */
			colorActive: "#ffb80d",

			/**
			 * Inactive button color
			 *
			 * @type {String}
			 * @default "#fff"
			 * @public
			 */
			colorInactive: "#fff",

			/**
			 * Disabled active button color
			 *
			 * @type {String}
			 * @default "#ffdb86"
			 * @public
			 */
			colorActiveDisabled: "#ffdb86",

			/**
			 * Inactive disabled active button color
			 *
			 * @type {String}
			 * @default "#ccc"
			 * @public
			 */
			colorInactiveDisabled: "#ccc",

			/**
			 * Use CSS to animate button.
			 *
			 * @type {Boolean}
			 * @default true
			 * @public
			 */
			canAnimate: true,

			/**
			 * Type of button.
			 *
			 * @type {String}
			 * @default "radio"
			 * @public
			 */
			type: "radio",

			/**
			 * CSS classes for button.
			 *
			 * @type {String}
			 * @default "mochi-radio-button"
			 * @public
			 */
			buttonClasses: "mochi-radio-button"
		},

		/**
		 * @private
		 */
		animateClass: "mochi-radio-button-animate",

		/**
		 * @private
		 */
		create: function() {
			this.inherited(arguments);
			this.addClass(this.buttonClasses);
		},

		/**
		 * @private
		 */
		rendered: function() {
			this.inherited(arguments);
			this.canAnimateChanged();
			this.disabledChanged();
		},

		/**
		 * @private
		 */
		checkedChanged: function() {
			this.setNodeProperty("checked", this.checked);
			if (this.checked) {
				this.setAttribute("checked", "checked");
				this.applyStyle("background-color", this.colorActive);
			} else {
				this.setAttribute("checked", "");
				this.applyStyle("background-color", this.colorInactive);
			}
			this.setActive(this.checked);
		},

		/**
		 * @private
		 */
		disabledChanged: function() {
			this.addRemoveClass("disabled", this.disabled);
			if (this.disabled) {
				this.applyStyle("background-color", (this.checked) ? this.colorActiveDisabled : this.colorInactiveDisabled);
			}
		},

		/**
		 * @private
		 */
		canAnimateChanged: function() {
			var className = (this.canAnimate) ? this.animateClass : "mochi-no-animate";
			this.addClass(className);
		},

		/**
		 * @private
		 */
		downHandler: function(inSender, e) {
			if (!this.disabled) {
				this.setChecked(!this.getChecked());
				this.bubble("onchange");
			}
			return true;
		},

		/**
		 * @private
		 */
		tap: function(inSender, e) {
			return !this.disabled;
		}
	});

})(enyo, this);

