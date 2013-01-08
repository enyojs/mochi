/**
	A button in the mochi style. The active state of the button may be customized by
	applying a custom style.

		{kind: "mochi.Button", content: "Button"},
*/
enyo.kind({
	name: "mochi.Button",
	kind: "enyo.GroupItem",
	tag: "button",
	classes: "enyo-tool-decorator mochi-button",
	published: {
		disabled: false,
		content: "",
		barClasses: "",
		decoratorLeft: "(",
		decoratorRight: ")"
	},
	tools: [
		{kind: "mochi.ButtonDecoratorLeft"},
		{name: "button", classes: "mochi-button-base"},
		{name: "client"},
		{kind: "mochi.ButtonDecoratorRight"},
		{name: "bar", classes: "mochi-button-bar"}
	],
	initComponents: function() {
		this.createChrome(this.tools);
		this.inherited(arguments);
	},
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
		this.decoratorLeftChanged();
		this.decoratorRightChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.activeChanged();
		this.calcBarValue();
		this.barClassesChanged();
	},
	decoratorLeftChanged: function() {
		this.$.buttonDecoratorLeft.setContent(this.decoratorLeft);
	},
	decoratorRightChanged: function() {
		this.$.buttonDecoratorRight.setContent(this.decoratorRight);
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
		this.addRemoveClass("disabled", this.disabled);
	},
	barClassesChanged: function(inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},
	updateBarPosition: function(bounds) {
		this.$.bar.applyStyle("width", bounds.width + "px");
		this.$.bar.applyStyle("left", bounds.left + "px");
	},
	calcBarValue: function() {
		var bounds = this.$.button.getBounds();
		this.updateBarPosition(bounds);
	},
	contentChanged: function() {
		this.$.button.setContent(this.content);
		this.calcBarValue();
	},
	tap: function() {
		if (this.disabled) {
			// work around for platforms like Chrome on Android or Opera that send
			// mouseup to disabled form controls
			return true;
		} else {
			this.setActive(true);
		}
	}
});