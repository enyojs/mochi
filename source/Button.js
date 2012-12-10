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
	componentsRendered: false,
	initComponents: function() {
		this.moreComponents = ((this.components === undefined) || (this.components.length === 0)) ? null : this.components;
		this.components = null;
		this.inherited(arguments);
	},
	create: function() {
		this.inherited(arguments);
		this.buildButton();
		this.activeChanged();
		this.disabledChanged();
		this.decoratorLeftChanged();
		this.decoratorRightChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.componentsRendered = true;
		this.calcBarValue();
		this.barClassesChanged();
	},
	buildButton: function() {
		// Button components
		var bc = [{kind: "mochi.ButtonDecoratorLeft"}, {kind: "enyo.Button", name: "button", tag: "div", classes: "mochi-button-base"}];
		if (this.moreComponents !== null) {
			var len = this.moreComponents.length;
			for (var i=0; i<len; i++) {
				bc.push(this.moreComponents[i]);
			}
		}
		bc.push({kind: "mochi.ButtonDecoratorRight"}, {name: "bar", classes: "mochi-button-bar"});
		this.createComponents(bc);
		this.$.button.setContent(this.content);
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
		bounds.left += 4;
		this.updateBarPosition(bounds);
	},
	contentChanged: function() {
		if (this.componentsRendered) {
			this.$.button.setContent(this.content);
			this.calcBarValue();
		}
	}
});