(function (enyo, scope) {
	/**
	* A decoration style for buttons. Usually not directly called outside of specific tools
	*
	* @ui
	* @class mochi.ButtonDecorator
	* @extends enyo.Control
	* @oublic
	*/
	enyo.kind(
		/** @lends mochi.ButtonDecorator.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ButtonDecorator',

		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		*/
		classes: 'enyo-unselectable mochi-button-decorator',

		/**
		* @private
		*/
		components: [
			{name: 'endCap', classes: 'mochi-button-decorator-bookened'}
		]
	});

	/**
	* @ui
	* @class mochi.ButtonDecoratorLeft
	* @extends mochi.ButtonDecorator
	* @public
	*/
	enyo.kind(
		/** @lends mochi.ButtonDecoratorLeft.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ButtonDecoratorLeft',

		/**
		* @private
		*/
		kind: 'mochi.ButtonDecorator',

		/**
		* @private
		*/
		classes: 'mochi-button-decorator-left',

		/**
		* @private
		* @lends mochi.ButtonDecoratorLeft.prototype
		*/
		published: {

			/**
			* The character to the left of the button text
			*
			* @type {String}
			* @default '('
			* @public
			*/
			content: '('
		},

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.$.endCap.setContent(this.content);
		},

		/**
		* @private
		*/
		contentChanged: function () {
			this.$.endCap.setContent(this.content);
		}

	});

	/**
	* @ui
	* @class mochi.ButtonDecoratorRight
	* @extends mochi.ButtonDecorator
	* @public
	*/
	enyo.kind(
		/** @lends mochi.ButtonDecoratorRight.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ButtonDecoratorRight',

		/**
		* @private
		*/
		kind: 'mochi.ButtonDecorator',

		/**
		* @private
		*/
		classes: 'mochi-button-decorator-right',

		/**
		* @private
		* @lends mochi.ButtonDecoratorRight.prototype
		*/
		published: {

			/**
			* The character to the right of the button text
			*
			* @type {String}
			* @default ')'
			* @public
			*/
			content: ')'
		},

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.$.endCap.setContent(this.content);
		},

		/**
		* @private
		*/
		contentChanged: function () {
			this.$.endCap.setContent(this.content);
		}
	});

})(enyo, this);
