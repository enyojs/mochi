(function (enyo, scope) {
	/**
	* `mochi.InputDecorator` is a control that provides input styling. Any controls
	* in the InputDecorator will appear to be inside an area styled as an input.
	* Usually, an InputDecorator surrounds an	{@link mochi.Input}.
	*
	* ```javascript
	* {kind: 'mochi.InputDecorator', components: [
	* 	{kind: 'mochi.Input'}
	* ]}
	* ```
	*
	* Other controls, such as buttons, may be placed to the right or left of the
	* input control, e.g.:
	*
	* ```javascript
	* {kind: 'mochi.InputDecorator', components: [
	* 	{kind: 'mochi.IconButton', src: 'search.png'},
	* 	{kind: 'mochi.Input'},
	* 	{kind: 'mochi.IconButton', src: 'cancel.png'}
	* ]}
	* ```
	*
	* Note that the InputDecorator fits around the content inside it. If the
	* decorator is sized, then its contents will likely need to be sized as well.
	*
	* ```javascript
	* {kind: 'mochi.InputDecorator', style: 'width: 500px;', components: [
	* 	{kind: 'mochi.Input', style: 'width: 100%;'}
	* ]}
	* ```
	*
	* @ui
	* @class mochi.InputDecorator
	* @extends enyo.ToolDecorator
	* @public
	*/
	enyo.kind(
		/** @lends mochi.InputDecorator.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.InputDecorator',

		/**
		* @private
		*/
		kind: 'enyo.ToolDecorator',

		/**
		* @private
		*/
		tag: 'label',

		/**
		* @private
		*/
		classes: 'mochi-input-decorator',

		/**
		* @private
		*/
		handlers: {
			onDisabledChange: 'disabledChange',
			onfocus: 'receiveFocus',
			onblur: 'receiveBlur'
		},

		/**
		* @private
		* @lends mochi.InputDecorator.prototype
		*/
		published: {

			/**
			* whether to animate changes
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			canAnimate: true
		},

		/**
		* @private
		*/
		rendered: function () {
			this.inherited(arguments);
			this.canAnimateChanged();
		},

		/**
		* @private
		*/
		canAnimateChanged: function () {
			var className = (this.canAnimate) ? 'mochi-input-animate' : 'mochi-no-animate';
			this.addClass(className);
		},

		/**
		* @private
		*/
		receiveFocus: function () {
			this.addClass('mochi-focused');
		},

		/**
		* @private
		*/
		receiveBlur: function () {
			this.removeClass('mochi-focused');
		},

		/**
		* @private
		*/
		disabledChange: function (inSender, inEvent) {
			this.addRemoveClass('mochi-disabled', inEvent.originator.disabled);
		}
	});

})(enyo, this);
