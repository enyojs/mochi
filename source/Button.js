/**
	A button in the mochi style. The active state of the button may be customized by
	applying a custom style.

		{kind: "mochi.Button", content: "Button"},
*/
enyo.kind({
	name: "mochi.Button",
	tag: "button",
	classes: "enyo-tool-decorator mochi-button",
	published: {
		disabled: false,
		active: false,
		content: "",
		barClasses: "",
		decoratorLeft: "(",
		decoratorRight: ")"
	},
	tools: [
		{kind: "mochi.ButtonDecoratorLeft"},
		{kind: "enyo.Button", name: "button", tag: "div", classes: "mochi-button-base"},
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
		this.activeChanged();
		this.disabledChanged();
		this.decoratorLeftChanged();
		this.decoratorRightChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.calcBarValue();
		this.barClassesChanged();
	},
	decoratorLeftChanged: function() {
		this.$.buttonDecoratorLeft.setContent(this.decoratorLeft);
	},
	decoratorRightChanged: function() {
		this.$.buttonDecoratorRight.setContent(this.decoratorRight);
	},
	activeChanged: function() {
		this.addRemoveClass("active", this.active);
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
	}
});