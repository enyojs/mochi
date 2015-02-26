(function (enyo, scope) {
	/**
	* A control that activates a {@link mochi.ContextualPopup}. It loosely
	* couples the Popup with an activating control, which may be a button or any
	* other control with an `onActivate` event. The decorator must surround both
	* the	activating control and the popup itself. When the control is activated,
	* the	popup shows itself in the correct position relative to the activator.
	*
	* ```javascript
	* {kind: 'mochi.ContextualPopupDecorator', components: [
	* 	{content: 'Show Popup'},
	* 	{
	*		kind: 'mochi.ContextualPopup',
	* 		title:'Sample Popup',
	* 		actionButtons:[
	* 			{content:'Button 1', classes: 'mochi-button-warning'},
	* 			{content:'Button 2'}
	* 		],
	* 		components: [
	* 			{content:'Sample component in popup'}
	* 		]
	* 	}
	* ]}
	* ```
	*
	* @ui
	* @class mochi.ContextualPopupDecorator
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends mochi.ContextualPopupDecorator.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ContextualPopupDecorator',

		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		*/
		defaultKind: 'mochi.Button',

		/**
		* selection on ios prevents tap events, so avoid.
		*
		* @private
		*/
		classes: 'mochi-contextual-popup-decorator enyo-unselectable',

		/**
		* @private
		*/
		handlers: {
			onActivate: 'activated',
			onHide: 'popupHidden'
		},

		/**
		* @fires enyo.Control#event:onActivate
		* @private
		*/
		activated: function (inSender, inEvent) {
			//this.requestHidePopup();
			if (inEvent.originator.active) {
				this.popupActive = true;
				this.activator = inEvent.originator;
				this.activator.addClass('active');
				this.requestShowPopup();
			}
		},

		/**
		* @private
		*/
		popupHidden: function () {
			this.popupActive = false;
			if (this.activator) {
				this.activator.setActive(false);
				this.activator.removeClass('active');
			}
		},

		/**
		* event waterfalls down
		* @fires mochi.ContextualPopup#event:onRequestShowPopup
		* @private
		*/
		requestShowPopup: function () {
			this.waterfallDown('onRequestShowPopup', {activator: this.activator});
		},

		/**
		* event waterfalls down
		* @fires moon.ContextualPopup#event:onRequestHidePopup
		* @private
		*/
		requestHidePopup: function () {
			this.waterfallDown('onRequestHidePopup');
		}
	});

})(enyo, this);