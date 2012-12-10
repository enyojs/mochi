/**
	An icon that acts like a button. The icon image is specified by setting the
	*src* property to a URL.

		{kind: "mochi.IconButton", src: "images/search.png", ontap: "buttonTap"}

	The image associated with the *src* property of the IconButton is assumed
	to be 24x48-pixel strip with the top half showing the button's normal state
	and the bottom half showing its state when hovered-over or active.
*/
enyo.kind({
	name: "mochi.IconButton",
	tag: "button",
	classes: "enyo-tool-decorator mochi-icon-button",
	published: {
		active: false,
		disabled: false,
		// url path specifying the icon image
		src: "",
		active: false,
		disabled: false,
		barClasses: ""
	},
	handlers: {
		ontap: "tapHandler"
	},
	components: [
		{kind: "mochi.Icon"},
		{name: "bar", classes: "mochi-button-bar mochi-icon-button-bar"}
	],
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
		this.srcChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.calcBarValue();
		this.activeChanged();
	},
	barClassesChanged: function(inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},
	updateBarPosition: function(bounds) {
		// icons given are 24px wide, containing a 1px padding - thus 22px bar desired
		this.$.bar.applyStyle("width", (bounds.width-2) + "px");
		this.$.bar.applyStyle("left", (bounds.left+1) + "px");
	},
	calcBarValue: function() {
		var bounds = this.$.icon.getBounds();
		this.updateBarPosition(bounds);
	},
	srcChanged: function() {
		this.$.icon.setSrc(this.src);
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
		this.addRemoveClass("disabled", this.disabled);
	},
	activeChanged: function() {
		this.addRemoveClass("active", this.active);
	},
	tapHandler: function() {
		if (this.disabled) {
			return true;
		}
	}
});



enyo.kind({
	name: "mochi.IconButtonItem",
	kind: "enyo.Button",
	published: {
		active: false,
		disabled: false,
		// url path specifying the icon image
		src: ""
	},
	handlers: {
		onActivate: "activate"
	},
	classes: "mochi-icon-button-item",
	
	components: [
		{kind: "mochi.Icon"}
	],
	
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
		this.$.icon.setSrc(this.src);
	},
	rendered: function() {
		this.inherited(arguments);
		this.activeChanged();
	},
	activeChanged: function() {
		if (!this.disabled) {
			this.bubble("onActivate");
			this.addRemoveClass("active", this.active);
		}
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
		this.addRemoveClass("disabled", this.disabled);
	}
	
});
