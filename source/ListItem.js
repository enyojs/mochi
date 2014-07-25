(function (enyo, scope) {
	/**
	* A control designed to display a group of stacked items, typically used in
	* lists. Items are displayed with small guide lines between them; by default,
	* they are highlighted when tapped. Set *tapHighlight* to false to prevent the
	* highlighting.
	*
	* {kind: 'mochi.ListItem', tapHighlight: false}
	*
	* @ui
	* @class mochi.ListItem
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends mochi.ListItem.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ListItem',

		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		*/
		classes: 'mochi-list-item',

		/**
		* When true, the item will automatically highlight (by application of the mochi-highlight
		* CSS class) when tapped. Set to false to disable this behavior.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		tapHighlight: true,

		/**
		* @private
		*/
		handlers: {
			onhold: 'hold',
			onrelease: 'release'
		},

		/**
		* @private
		*/
		topBorder: [
			{name:'topBorder', kind:'mochi.ListItemBorder', top:true, showing:false}
		],

		/**
		* @private
		*/
		initComponents: function () {
			this.createChrome(this.topBorder);
			this.inherited(arguments);
		},

		/**
		* @private
		*/
		create: function (){
			this.inherited(arguments);
			this.createComponent({name: 'bottomBorder', kind:'mochi.ListItemBorder', top:false, showing:false})
		},

		/**
		* @param {Object} sender - reference to sender of event
		* @param {Object} event - event object
		* @public
		*/
		hold: function (sender, event) {
			if (this.tapHighlight) {
				mochi.ListItem.addFlyweightClass(this.controlParent || this, 'mochi-highlight', event);
			}
		},

		/**
		* @param {Object} sender - reference to sender of event
		* @param {Object} event - event object
		* public
		*/
		release: function (sender, event) {
			if (this.tapHighlight) {
				mochi.ListItem.removeFlyweightClass(this.controlParent || this, 'mochi-highlight', event);
			}
		},

		/**
		* @private
		* @lends mochi.ListItem.prototype
		*/
		statics: {

			/**
			* @param {Object} inControl - control in list item to add class to
			* @param {Object} inClass - CSS class to add
			* @param {Object} inEvent - event object which contains a reference to flyweight
			* @param {Number} inIndex - index of the list item
			* public
			*/
			addFlyweightClass: function (inControl, inClass, inEvent, inIndex) {
				var flyweight = inEvent.flyweight;
				if (flyweight) {
					var index = inIndex !== undefined ? inIndex : inEvent.index;
					flyweight.performOnRow(index, function () {
						//show the borders
						var width = inControl.node.getBoundingClientRect().width;
						inControl.$.topBorder.showBorder(width,0);
						inControl.$.bottomBorder.showBorder(width,inControl.getComputedStyleValue('padding-bottom'));

						if (!inControl.hasClass(inClass)) {
							inControl.addClass(inClass);
						} else {
							inControl.setClassAttribute(inControl.getClassAttribute());
						}
					});
					inControl.removeClass(inClass);
				}
			},

			/**
			* @param {Object} inControl - control in list item to add class to
			* @param {Object} inClass - CSS class to remove
			* @param {Object} inEvent - event object which contains a reference to flyweight
			* @param {Number} inIndex - index of the list item
			* @public
			*/
			removeFlyweightClass: function (inControl, inClass, inEvent, inIndex) {
				var flyweight = inEvent.flyweight;
				if (flyweight) {
					var index = inIndex !== undefined ? inIndex : inEvent.index;
					flyweight.performOnRow(index, function () {
						inControl.$.topBorder.hide();
						inControl.$.bottomBorder.hide();
						if (!inControl.hasClass(inClass)) {
							inControl.setClassAttribute(inControl.getClassAttribute());
						} else {
							inControl.removeClass(inClass);
						}
					});
				}
			}

		}
	});

	/**
	* @ui
	* @class mochi.ListItemBorder
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends mochi.ListItemBorder.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ListItemBorder',

		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		*/
		classes: 'mochi-highlight-border',

		/**
		* @private
		* @lends mochi.ListItemBorder.prototype
		*/
		published: {

			/**
			* whether to add a `top` or `bottom` CSS class
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			top: true,

			/**
			* total width of list item
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			width: 0,

			/**
			* margin at top of list item
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			marginTop: 0
		},

		/**
		* total width of left and right fade edges
		*
		* @private
		*/
		edgeWidths: 224,

		/**
		* total width of left and right fade edges for wide list
		*
		* @private
		*/
		largeEdgeWidths: 640,

		/**
		* @private
		*/
		create: function (){
			this.inherited(arguments);
			this.topChanged();
		},

		/**
		* @private
		*/
		showBorder: function (width,marginTop){
			this.setMarginTop(marginTop);
			this.width = width;
			this.widthChanged();
			this.show();
		},

		/**
		* @private
		*/
		topChanged: function (){
			this.addClass(this.top ? 'top' : 'bottom');
		},

		/**
		* @private
		*/
		widthChanged: function (){
			if (this.width < this.largeEdgeWidths) {
				this.removeClass('large');
			}
			else {
				this.addClass('large');
			}

			//do not include the edges in the total width, those are applied using css pseudoclasses
			this.setStyle('width:'+ (this.width - ((this.width < this.largeEdgeWidths) ? this.edgeWidths : this.largeEdgeWidths)) +
						  'px;margin-top:' + this.marginTop);
			this.render(); //re-render to ensure styles/classes are applied
		}

	});

})(enyo, this);
