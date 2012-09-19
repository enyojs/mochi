/**
	A button that can be selected/unselected when clicked.
	The onChange event is fired when it is clicked. Use getValue() to fetch
	its status.
	
		{kind: "Group", classes: "mochi-sample-tools group", onActivate: "itemActivated", highlander: true, components: [
			{kind: "mochi.RadioButton", checked: true},
			{kind: "mochi.RadioButton"},
			{kind: "mochi.RadioButton"}
		]}
*/
enyo.kind({
	name: "mochi.RadioButton",
	//classes: "mochi-radio-button",
	//* @protected
	kind: enyo.Checkbox,
	tag: "div",
	handlers: {
		ondown: "downHandler",
		// prevent double onchange bubble in IE
		onclick: ""
	},
	// FIXME: Experimental properties for dynamic color changing
	published: {
		colorActive: "#ffb80d",
		colorInactive: "#fff",
		colorActiveDisabled: "#ffdb86",
		colorInactiveDisabled: "#ccc",
		canAnimate: true,
		//* @protected
		type: "radio",
		buttonClasses: "mochi-radio-button"
	},
	animateClass: "mochi-radio-button-animate",
	create: function() {
		this.inherited(arguments);
		this.addClass(this.buttonClasses);
	},
	rendered: function() {
		this.inherited(arguments);
		this.canAnimateChanged();
		this.disabledChanged();
	},
	checkedChanged: function() {
		this.setNodeProperty("checked", this.checked);
		if (this.checked) {
			this.setAttribute("checked", "checked");
			this.applyStyle("background-color", this.colorActive);
		} else {
			this.setAttribute("checked", "");
			this.applyStyle("background-color", this.colorInactive);
		}
		this.setActive(this.checked);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
		if (this.disabled) {
			this.applyStyle("background-color", (this.checked) ? this.colorActiveDisabled : this.colorInactiveDisabled);
		}
	},
	canAnimateChanged: function() {
		var className = (this.canAnimate) ? this.animateClass : "mochi-no-animate";
		this.addClass(className);
	},
	downHandler: function(inSender, e) {
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble("onchange");
		}
		return true;
	},
	tap: function(inSender, e) {
		return !this.disabled;
	}
});
