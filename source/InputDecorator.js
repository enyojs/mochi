(function (enyo, scope) {

	/**
		_mochi.InputDecorator_ is a control that provides input styling. Any controls
		in the InputDecorator will appear to be inside an area styled as an	input.
		Usually, an InputDecorator surrounds an	<a href='#mochi.Input'>mochi.Input</a>.

			{kind: 'mochi.InputDecorator', components: [
				{kind: 'mochi.Input'}
			]}

		Other controls, such as buttons, may be placed to the right or left of the
		input control, e.g.:

			{kind: 'mochi.InputDecorator', components: [
				{kind: 'mochi.IconButton', src: 'search.png'},
				{kind: 'mochi.Input'},
				{kind: 'mochi.IconButton', src: 'cancel.png'}
			]}

		Note that the InputDecorator fits around the content inside it. If the
		decorator is sized, then its contents will likely need to be sized as well.

			{kind: 'mochi.InputDecorator', style: 'width: 500px;', components: [
				{kind: 'mochi.Input', style: 'width: 100%;'}
			]}
	*/
	enyo.kind(
		{
			
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
		
		//* @protected
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
		*/	
		published: {
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
