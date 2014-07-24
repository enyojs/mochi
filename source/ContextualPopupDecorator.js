(function (enyo, scope) {
	/**
	* A control that activates a <a href='#mochi.ContextualPopup'>mochi.ContextualPopup</a>. It loosely
	* couples the Popup with an activating control, which may be a button or any
	* other control with an _onActivate_ event. The decorator must surround both
	* the	activating control and the popup itself. When the control is activated,
	* the	popup shows itself in the correct position relative to the activator.
	*
	* ```
	* {kind: 'mochi.ContextualPopupDecorator', components: [
	* {content: 'Show Popup'},
	* {kind: 'mochi.ContextualPopup',
	* title:'Sample Popup',
	* actionButtons:[
	* {content:'Button 1', classes: 'mochi-button-warning'},
	* {content:'Button 2'}
	* ],
	* components: [
	* {content:'Sample component in popup'}
	* ]
	* }
	* ]}
	* ```
	*
	* @ui
	* @class mochi.Checkbox
	* @extends mochi.RadioButton
	* @public	
	*/
	enyo.kind(
		/** @lends enyo.Control.prototype */ {
			
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
		
		//* @protected
		// selection on ios prevents tap events, so avoid.
		/**
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
		* @private
		*/
		activated: function (inSender, inEvent) {
			this.requestHidePopup();
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
		* @private
		*/
		requestShowPopup: function () {
			this.waterfallDown('onRequestShowPopup', {activator: this.activator});
		},
		
		/**
		* @private
		*/
		requestHidePopup: function () {
			this.waterfallDown('onRequestHidePopup');
		}
	});

})(enyo, this);
