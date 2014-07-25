(function (enyo, scope) {
	/**
		A control that displays an icon. The icon image is specified by setting the
		*src* property to a URL.

		In mochi, icons have a size of 32x32 pixels. Since the icon image is applied
		as a CSS background, the height and width of an icon must be set if an image
		of a different size is used.

			{kind: 'mochi.Icon', src: 'images/search.png'}

		When an icon should act like a button, use an <a href='#mochi.IconButton'>mochi.IconButton</a>.

	*/
	enyo.kind(
		{
			
		/**
		* @private
		*/
		name: 'mochi.Icon',
		
		/**
		* @private
		*/
		published: {
			// url path specifying the icon image
			src: ''
		},
		
		/**
		* @private
		*/
		classes: 'mochi-icon',
		
		//* @protected
		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			if (this.src) {
				this.srcChanged();
			}
		},
		
		/**
		* @private
		*/
		srcChanged: function () {
			this.applyStyle('background-image', 'url(' + enyo.path.rewrite(this.src) + ')');
		}
	});

})(enyo, this);
