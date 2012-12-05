/**
	A control designed to display a group of stacked items, typically used in
	lists. Items are displayed with small guide lines between them; by default,
	they are highlighted when tapped. Set *tapHighlight* to false to prevent the
	highlighting.

		{kind: "mochi.ListItem", tapHighlight: false}
*/
enyo.kind({
	name: "mochi.ListItem",
	classes: "mochi-list-item",
	//* When true, the item will automatically highlight (by application of the mochi-highlight 
	//* CSS class) when tapped. Set to false to disable this behavior.
	tapHighlight: true,
	//* @protected
	handlers: {
		onhold: "hold",
		onrelease: "release"
	},
	topBorder: [
		{name:"topBorder", kind:"mochi.ListItemBorder", top:true, showing:false}
	],
	initComponents: function() {
		this.createChrome(this.topBorder);
		this.inherited(arguments);	
	},
	create: function(){
		this.inherited(arguments);
		this.createComponent({name: "bottomBorder", kind:"mochi.ListItemBorder", top:false, showing:false})
	},
	//* @public
	hold: function(inSender, inEvent) {
		if (this.tapHighlight) {
			mochi.ListItem.addFlyweightClass(this.controlParent || this, "mochi-highlight", inEvent);
		}
	},
	release: function(inSender, inEvent) {
		if (this.tapHighlight) {
			mochi.ListItem.removeFlyweightClass(this.controlParent || this, "mochi-highlight", inEvent);
		}
	},
	//* @protected
	statics: {
		addFlyweightClass: function(inControl, inClass, inEvent, inIndex) {
			var flyweight = inEvent.flyweight;
			if (flyweight) {
				var index = inIndex !== undefined ? inIndex : inEvent.index;
				flyweight.performOnRow(index, function() {
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
		removeFlyweightClass: function(inControl, inClass, inEvent, inIndex) {
			var flyweight = inEvent.flyweight;
			if (flyweight) {
				var index = inIndex !== undefined ? inIndex : inEvent.index;
				flyweight.performOnRow(index, function() {
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


enyo.kind({
	name: "mochi.ListItemBorder",
	classes: "mochi-highlight-border",
	published: {
		top:true,
		width:0,
		marginTop:0
	},
	edgeWidths: 224, //total width of left and right fade edges
	largeEdgeWidths: 640, //total width of left and right fade edges for wide list	
	create: function(){
		this.inherited(arguments);
		this.topChanged();
	},
	showBorder: function(width,marginTop){
		this.setMarginTop(marginTop);
		this.width = width;
		this.widthChanged();
		this.show();
	},
	topChanged: function(){
		this.addClass(this.top ? "top" : "bottom");
	},
	widthChanged: function(){
		if (this.width < this.largeEdgeWidths) {
			this.removeClass("large");
		}
		else {
			this.addClass("large"); 		
		}
		
		//do not include the edges in the total width, those are applied using css pseudoclasses
		this.setStyle("width:"+ (this.width - ((this.width < this.largeEdgeWidths) ? this.edgeWidths : this.largeEdgeWidths)) + 
					  "px;margin-top:" + this.marginTop);
		this.render(); //re-render to ensure styles/classes are applied
	}
});