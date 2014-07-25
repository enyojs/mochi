(function (enyo, scope) {
	/**
	* A control that displays an icon. The icon image is specified by setting the
	* `src` property to a URL.
	*
	* In mochi, icons have a size of 32x32 pixels. Since the icon image is applied
	* as a CSS background, the height and width of an icon must be set if an image
	* of a different size is used.
	*
	* ```javascript
	* {kind: 'mochi.Icon', src: 'images/search.png'}
	* ```
	*
	* When an icon should act like a button, use an {@link mochi.IconButton}.
	*
	* @ui
	* @class mochi.Icon
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends mochi.Icon.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.Icon',

		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		* @lends mochi.Icon.prototype
		*/
		published: {

			/**
			* url path specifying the icon image
			*
			* @type {String}
			* @default ''
			* @public
			*/
			src: ''
		},

		/**
		* @private
		*/
		classes: 'mochi-icon',

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
