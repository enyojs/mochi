(function (enyo, scope) {

	/**
		An mochi-styled input control. In addition to the features of
		<a href='#enyo.Input'>enyo.Input</a>, mochi.Input has a *defaultFocus*
		property that can be set to true to	focus the input when it's rendered.
		Only one input should be set as the *defaultFocus*.

		Typically, an mochi.Input is placed inside an
		<a href='#mochi.InputDecorator'>mochi.InputDecorator</a>, which provides
		styling, e.g.:

			{kind: 'mochi.InputDecorator', components: [
				{kind: 'mochi.Input', placeholder: 'Enter some text...', onchange: 'inputChange'}
			]}

	*/
	enyo.kind(
		{
			
		/**
		* @private
		*/	
		name: 'mochi.Input',
		
		/**
		* @private
		*/
		kind: 'enyo.Input',
		
		/**
		* @private
		*/	
		classes: 'mochi-input'
	});

})(enyo, this);
