(function (enyo, scope) {
	
	/**
		An icon that acts like a button. The icon image is specified by setting the
		*src* property to a URL.

			{kind: 'mochi.IconButton', src: 'images/search.png', ontap: 'buttonTap'}

		The image associated with the *src* property of the IconButton is assumed
		to be 24x48-pixel strip with the top half showing the button's normal state
		and the bottom half showing its state when hovered-over or active.
	*/
	enyo.kind(
		{
			
		/**
		* @private
		*/
		name: 'mochi.IconButton',
		
		/**
		* @private
		*/
		tag: 'button',
		
		/**
		* @private
		*/
		classes: 'enyo-tool-decorator mochi-icon-button',
		
		/**
		* @private
		*/
		published: {
			active: false,
			disabled: false,
			// url path specifying the icon image
			src: '',
			active: false,
			disabled: false,
			barClasses: ''
		},
		
		/**
		* @private
		*/
		handlers: {
			ontap: 'tapHandler'
		},
		
		/**
		* @private
		*/
		components: [
			{kind: 'mochi.Icon'},
			{name: 'bar', classes: 'mochi-button-bar mochi-icon-button-bar'}
		],
		
		//* @protected
		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.disabledChanged();
			this.srcChanged();
		},
		
		/**
		* @private
		*/
		rendered: function () {
			this.inherited(arguments);
			this.calcBarValue();
			this.activeChanged();
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
			// icons given are 24px wide, containing a 1px padding - thus 22px bar desired
			this.$.bar.applyStyle('width', (bounds.width-2) + 'px');
			this.$.bar.applyStyle('left', (bounds.left+1) + 'px');
		},
		
		/**
		* @private
		*/
		calcBarValue: function () {
			var bounds = this.$.icon.getBounds();
			this.updateBarPosition(bounds);
		},
		
		/**
		* @private
		*/
		srcChanged: function () {
			this.$.icon.setSrc(this.src);
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
		activeChanged: function () {
			this.addRemoveClass('active', this.active);
		},
		
		/**
		* @private
		*/
		tapHandler: function () {
			if (this.disabled) {
				return true;
			}
		}
	});



	enyo.kind(
		{
		
		/**
		* @private
		*/	
		name: 'mochi.IconButtonItem',
		
		/**
		* @private
		*/
		kind: 'enyo.Button',
		
		/**
		* @private
		*/
		published: {
			active: false,
			disabled: false,
			// url path specifying the icon image
			src: ''
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
		classes: 'mochi-icon-button-item',
		
		/**
		* @private
		*/
		components: [
			{kind: 'mochi.Icon'}
		],
	
		//* @protected
		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.disabledChanged();
			this.$.icon.setSrc(this.src);
		},
		
		/**
		* @private
		*/
		rendered: function () {
			this.inherited(arguments);
			this.activeChanged();
		},
		
		/**
		* @private
		*/
		activeChanged: function () {
			if (!this.disabled) {
				this.bubble('onActivate');
				this.addRemoveClass('active', this.active);
			}
		},
		
		/**
		* @private
		*/
		disabledChanged: function () {
			this.setAttribute('disabled', this.disabled);
			this.addRemoveClass('disabled', this.disabled);
		}
	
	});

})(enyo, this);
