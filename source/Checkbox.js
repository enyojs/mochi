(function (enyo, scope) {	
	/**
	* A box that shows or hides a check mark when clicked.
	* The {@link mochi.RadioButtononChange event is fired when it is clicked. Use getValue() to fetch
	* the checked status.
	*
	* ```
	* {kind: 'mochi.Checkbox', onchange: 'checkboxClicked'}
	* 
	* checkboxClicked: function (inSender) {
	* 	if (inSender.getValue()) {
	* 		this.log('I've been checked!');
	* 	}
	* }
	* ```
	*
	* @ui
	* @class mochi.Checkbox
	* @extends mochi.RadioButton
	* @public
	*/
	enyo.kind(
		/** @lends mochi.Checkbox.prototype */ {
			
		/**
		* @private
		*/
		name: 'mochi.Checkbox',
		
		/**
		* @private
		*/
		kind: 'mochi.RadioButton',
		
		// FIXME: Experimental properties for dynamic color changing
		/**
		* @private
		* @lends mochi.Checkbox.prototype
		*/
		published: {
			
			/**
			* Background color when checked
			*
			* @type {String}
			* @default '#ffb80d'
			* @public
			*/			
			colorActive: '#ffb80d',
			
			/**
			* Background color when unchecked
			*
			* @type {String}
			* @default '#fff'
			* @public
			*/
			colorInactive: '#fff',
			
			/**
			* Background color when checked and disabled
			*
			* @type {String}
			* @default '#ffb80d'
			* @public
			*/
			colorActiveDisabled: '#ffb80d',
			
			/**
			* Background color when unchecked and disabled
			*
			* @type {String}
			* @default '#fff'
			* @public
			*/
			colorInactiveDisabled: '#fff',
			
			/**
			* Whether to animate between checked and unchecked
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			canAnimate: true,
			
			/**
			* Type of control
			*
			* @type {String}
			* @default 'checkbox'
			* @public
			*/
			type: 'checkbox',
			
			/**
			* Css classes which add button styling
			*
			* @type {String}
			* @default 'mochi-checkbox'
			* @public
			*/
			buttonClasses: 'mochi-checkbox'
		},
		
		/**
		* @private
		*/
		animateClass: 'mochi-checkbox-animate'
	});

})(enyo, this);
