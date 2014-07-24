(function (enyo, scope) {
	/**
	* A badge in the mochi style. 
	* ```
	* {kind: 'mochi.Badge', content: '5'},
	* ```
	*
	* @ui
	* @class mochi.Badge
	* @extends enyo.Control
	* @public	
	*/
	enyo.kind(
		/** @lends mochi.Badge.prototype */ {
			
		/**
		* @private
		*/
		name: 'mochi.Badge',
		
		/**
		* @private
		*/
		kind: 'enyo.Control',
		
		/**
		* @private
		*/
		classes: 'enyo-tool-decorator mochi-badge',
		
		/**
		* @private
		* @lends mochi.Badge.prototype
		*/
		published: {
			
			/**
			* style string for css background property.
			*
			* @type {String}
			* @default '#69cdff'
			* @public
			*/
			background: '#69cdff',
			
			/**
			* style string for css color property.
			*
			* @type {String}
			* @default '#ffffff'
			* @public
			*/
			color: '#ffffff'
		},
		
		/**
		* @private
		*/
		components: [
			{name: 'inner', classes: 'mochi-badge-inner'}
		],
		
		/**
		* @private
		*/
		create: function () {
			this._origBackground = this.background;
			this.inherited(arguments);
		},
		
		/**
		* @private
		*/
		rendered: function () {
			this.inherited(arguments);
			this.contentChanged();
			this.backgroundChanged();
			this.colorChanged();
		},
		
		/**
		* @private
		*/
		contentChanged: function () {
			if (this.content == '') {
				this.setBackground('transparent');
				this.$.inner.setContent('');
				return;
			} 
			this.setShowing(true);
			this.setBackground(this._origBackground);
			this.$.inner.setContent(this.content);
			if (this.content.toString().length > 2) {
				//Use an oval instead of a circle
				this.$.inner.removeClass('round');
				this.$.inner.addClass('oval');
			} else {
				//Revert back to a circle
				this.$.inner.removeClass('oval');
				this.$.inner.addClass('round');
			}
		},
		
		/**
		* @private
		*/
		backgroundChanged: function () {
			this.$.inner.addStyles('background: ' + this.background + ';');
		},
		
		/**
		* @private
		*/
		colorChanged: function () {
			this.$.inner.addStyles('color: ' + this.color + ';');
		}
	});

})(enyo, this);
