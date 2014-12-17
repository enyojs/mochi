(function (enyo, scope) {
	/**
	 * `mochi.ViewSelectButtonItem' extends {@link enyo.Button}, and is intended to be used only within
	 * a {@link mochi.ViewSelectButton}.
	 *
	 * @class mochi.ViewSelectButtonItem
	 * @extends enyo.Button
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.ViewSelectButtonItem.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.ViewSelectButtonItem',

		/**
		 * @private
		 */
		kind: 'enyo.Button',

		/**
		 * @private
		 */
		classes: 'mochi-button-base',

		/**
		 * @private
		 */
		contentWidth: 0,

		/**
		 * @private
		 */
		rendered: function () {
			this.inherited(arguments);
			this.recalcContentWidth();

			// Resize the button to fit ViewSelectButtonItem kerning state
			// (current-width + ((string-length + arbitrary padding) * size-of-letter-spacing))
			if (this.contentWidth!=0){
				this.applyStyle("width", (this.contentWidth + ((this.content.length + 2) * 2) ) + "px");
			}
		},

		recalcContentWidth: function(){
			this.contentWidth = this.getBounds().width;
		}
	});

	/**
	 * `mochi.ViewSelectButton' extends {@link enyo.Group}.
	 *
	 * A group of {@link mochi.ViewSelectButtonItem} objects laid out horizontally, with {@link mochi.ButtonDecorator}
	 * end-caps. Within the same button group, tapping on one button will release any previously tapped button.
	 *
	 * ```
	 * {kind: 'mochi.ViewSelectButton', onActivate: 'buttonActivated', components: [
	 *	{content: 'Cats', active: true},
	 *	{content: 'Dogs'},
	 *	{content: 'Bears'}
	 * ]}
	 * ```
	 *
	 * @class mochi.ViewSelectButton
	 * @extends enyo.Group
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.ViewSelectButton.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.ViewSelectButton',

		/**
		 * @private
		 */
		kind: 'enyo.Group',

		/**
		 * @private
		 */
		defaultKind: 'mochi.ViewSelectButtonItem',

		/**
		 * @private
		 */
		classes: 'enyo-tool-decorator mochi-view-select-button',

		/**
		 * @private
		 * @lends moon.ViewSelectButton.prototype
		 */
		published: {
			/**
			 * CSS Classes for indicator bar of selected item.
			 *
			 * @type {String}
			 * @default ''
			 * @public
			 */
			barClasses: '',
			/**
			 * Left sided decorator.
			 *
			 * @type {String}
			 * @default ''
			 * @public
			 */
			decoratorLeft: "(",
			/**
			 * Right sided decorator.
			 *
			 * @type {String}
			 * @default ''
			 * @public
			 */
			decoratorRight: ")",
			/**
			 * CSS Classes for decorators of selected item.
			 *
			 * @type {String}
			 * @default ''
			 * @public
			 */
			decoratorClasses:""
		},

		/**
		 * @private
		 */
		handlers: {
			onActivate: 'activate'
		},

		/**
		 * @private
		 */
		moreComponents: [
			//{kind: 'mochi.ButtonDecoratorLeft', prepend: true},
			{kind: 'mochi.ButtonDecoratorLeft', addBefore: null},
			{kind: 'mochi.ButtonDecoratorRight'},
			{kind: 'enyo.Control', name: 'bar', classes: 'mochi-button-bar'},
			{kind: 'enyo.Animator', onStep: 'animatorStep', onEnd: 'animatorEnd'}
		],

		/**
		 * @private
		 */
		componentsRendered: false,

		/**
		 * @private
		 */
		lastBarPos: 0,

		/**
		 * @private
		 */
		create: function () {
			this.inherited(arguments);
			this.createComponents(this.moreComponents);
			this.decoratorLeftChanged();
			this.decoratorRightChanged();
		},

		/**
		 * @private
		 */
		rendered: function () {
			this.inherited(arguments);
			this.barClassesChanged();
			this.decoratorClassesChanged();
			this.init();
		},

		/**
		 * @private
		 */
		init: function () {
			this.componentsRendered = true;
			this.calcBarValue(this.active);
		},

		/**
		 * @private
		 */
		decoratorLeftChanged: function() {
			this.$.buttonDecoratorLeft.setContent(this.decoratorLeft);
		},
		/**
		 * @private
		 */
		decoratorRightChanged: function() {
			this.$.buttonDecoratorRight.setContent(this.decoratorRight);
		},

		/**
		 * @private
		 */
		barClassesChanged: function(inOld) {
			if (this.$.bar){
				this.$.bar.removeClass(inOld);
				this.$.bar.addClass(this.barClasses);
			}
		},
		/**
		 * @private
		 */
		decoratorClassesChanged: function(inOld) {
			if (this.$.buttonDecoratorLeft){
				this.$.buttonDecoratorLeft.removeClass(inOld);
				this.$.buttonDecoratorLeft.addClass(this.decoratorClasses);
			}
			if (this.$.buttonDecoratorRight){
				this.$.buttonDecoratorRight.removeClass(inOld);
				this.$.buttonDecoratorRight.addClass(this.decoratorClasses);
			}
		},

		/**
		 * @private
		 */
		animatorStep: function (inSender) {
			this.updateBarPosition(this.$.bar, inSender.value);
		},

		/**
		 * @private
		 */
		updateBarPosition: function (inControl, inValue) {
			var xPos = inValue + 'px';
			if (enyo.dom.canTransform()) {
				enyo.dom.transform(inControl, {translateX: xPos});
			} else {
				inControl.applyStyle('left', xPos);
			}
		},

		/**
		 * @private
		 */
		calcBarValue: function (activeItem) {
			if ((this.active) && (this.componentsRendered)) {

				if (this.active.kind === 'mochi.ViewSelectButtonItem') {
					activeItem.recalcContentWidth();
					this.$.bar.applyStyle('width', activeItem.contentWidth + 'px');

					// IE8 doesn't return getBoundingClientRect().width, so we calculate from right/left. Who cares ... it's IE8 ... I know
					//var differential = activeItem.hasNode().getBoundingClientRect().width - activeItem.contentWidth;
					var differential = (activeItem.hasNode().getBoundingClientRect().right - activeItem.hasNode().getBoundingClientRect().left) - (activeItem.contentWidth-5);
					var xPos = this.getCSSProperty(activeItem, "offsetLeft", false);// + (differential / 2);

				} else if (this.active.kind === 'mochi.IconButtonItem') {
					this.$.bar.applyStyle('width', 25 + 'px');
					var xPos = this.getCSSProperty(activeItem, 'offsetLeft', false) + 5;
				}

				this.$.animator.play({
					startValue: this.lastBarPos,
					endValue: xPos,
					node: this.$.bar.hasNode()
				});
				this.lastBarPos = xPos;
			}
		},

		/**
		 * @private
		 */
		activate: function (inSender, inEvent) {
			if (this.highlander) {
				// deactivation messages are ignored unless it's an attempt
				// to deactivate the highlander
				if (!inEvent.originator.active) {
					// this clause prevents deactivating a grouped item once it's been active.
					// the only proper way to deactivate a grouped item is to choose a new
					// highlander.
					if (inEvent.originator === this.active) {
						this.active.setActive(true);
					}
				} else {
					this.setActive(inEvent.originator);
					this.calcBarValue(inEvent.originator);
				}
			}
		},

		/**
		 * @private
		 */
		getCSSProperty: function (target, property, style) {
			if (target.hasNode()) return (style) ? target.node.style[property] : target.node[property];
		}
	});

})(enyo, this);