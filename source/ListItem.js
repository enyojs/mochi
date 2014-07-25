(function (enyo, scope) {

	/**
		A control designed to display a group of stacked items, typically used in
		lists. Items are displayed with small guide lines between them; by default,
		they are highlighted when tapped. Set *tapHighlight* to false to prevent the
		highlighting.

			{kind: 'mochi.ListItem', tapHighlight: false}
	*/
	enyo.kind(
		{
			
		/**
		* @private
		*/	
		name: 'mochi.ListItem',
		
		/**
		* @private
		*/
		classes: 'mochi-list-item',
		
		//* When true, the item will automatically highlight (by application of the mochi-highlight 
		//* CSS class) when tapped. Set to false to disable this behavior.
		/**
		* @private
		*/
		tapHighlight: true,
		
		//* @protected
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
		
		//* @public
		/**
		* @private
		*/
		hold: function (inSender, inEvent) {
			if (this.tapHighlight) {
				mochi.ListItem.addFlyweightClass(this.controlParent || this, 'mochi-highlight', inEvent);
			}
		},
		
		/**
		* @private
		*/
		release: function (inSender, inEvent) {
			if (this.tapHighlight) {
				mochi.ListItem.removeFlyweightClass(this.controlParent || this, 'mochi-highlight', inEvent);
			}
		},
		
		//* @protected
		/**
		* @private
		*/
		statics: {
			
			/**
			* @private
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
			* @private
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


	enyo.kind(
		{
			
		/**
		* @private
		*/
		name: 'mochi.ListItemBorder',
		
		/**
		* @private
		*/
		classes: 'mochi-highlight-border',
		
		/**
		* @private
		*/
		published: {
			top:true,
			width:0,
			marginTop:0
		},
		
		/**
		* @private
		*/
		edgeWidths: 224, //total width of left and right fade edges
		
		/**
		* @private
		*/
		largeEdgeWidths: 640, //total width of left and right fade edges for wide list
		
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
