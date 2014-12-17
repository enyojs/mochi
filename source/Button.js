(function (enyo, scope) {
	/**
	* A button in the mochi style. The active state of the button may be customized by
	* applying a custom style.
	*
	* ```javascript
	* {kind: 'mochi.Button', content: 'Button'},
	* ```
	*
	* @ui
	* @class mochi.Button
	* @extends enyo.GroupItem
	* @public
	*/
	enyo.kind(
		/** @lends mochi.Button.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.Button',

		/**
		* @private
		*/
		kind: 'enyo.GroupItem',

		/**
		* @private
		*/
		tag: 'button',

		/**
		* @private
		*/
		classes: 'enyo-tool-decorator mochi-button',

		/**
		* @private
		* @lends mochi.Button.prototype
		*/
		published: {

			/**
			* When `true`, the [button]{@glossary button} is shown as disabled and does not
			* generate tap [events]{@glossary event}.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			disabled: false,

			/**
			* The button text
			*
			* @type {String}
			* @default ''
			* @public
			*/
			content: '',

			/**
			* CSS classes applied to the underline bar. If '', the default is used
			*
			* @type {String}
			* @default ''
			* @public
			*/
			barClasses: '',

			/**
			* The character to the left of the button text
			*
			* @type {String}
			* @default '('
			* @public
			*/
			decoratorLeft: '(',

			/**
			* The character to the right of the button text
			*
			* @type {String}
			* @default ')'
			* @public
			*/
			decoratorRight: ')'
		},

		/**
		* @private
		*/
		tools: [
			{kind: 'mochi.ButtonDecoratorLeft'},
			{name: 'button', classes: 'mochi-button-base'},
			{name: 'client'},
			{kind: 'mochi.ButtonDecoratorRight'},
			{name: 'bar', classes: 'mochi-button-bar'}
		],

		/**
		* @private
		*/
		initComponents: function () {
			this.createChrome(this.tools);
			this.inherited(arguments);
		},

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.disabledChanged();
			this.decoratorLeftChanged();
			this.decoratorRightChanged();
		},

		/**
		* @private
		*/
		rendered: function () {
			this.inherited(arguments);
			this.activeChanged();
			this.calcBarValue();
			this.barClassesChanged();
		},

		/**
		* @private
		*/
		decoratorLeftChanged: function () {
			this.$.buttonDecoratorLeft.setContent(this.decoratorLeft);
		},

		/**
		* @private
		*/
		decoratorRightChanged: function () {
			this.$.buttonDecoratorRight.setContent(this.decoratorRight);
		},

		/**
		* @private
		*/
		disabledChanged: function () {
			this.setAttribute('disabled', this.disabled);
			this.addRemoveClass('disabled', this.disabled);
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
		updateBarPosition: function (bounds) {
			this.$.bar.applyStyle('width', bounds.width + 'px');
			this.$.bar.applyStyle('left', bounds.left + 'px');
		},

		/**
		* @private
		*/
		calcBarValue: function () {
			var bounds = this.$.button.getBounds();
			this.updateBarPosition(bounds);
		},

		/**
		* @private
		*/
		contentChanged: function () {
			this.$.button.setContent(this.content);
			this.calcBarValue();
		},

		/**
		* @private
		*/
		tap: function () {
			if (this.disabled) {
				// work around for platforms like Chrome on Android or Opera that send
				// mouseup to disabled form controls
				return true;
			} else {
				this.setActive(true);
			}
		}
	});

})(enyo, this);
