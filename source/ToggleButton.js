/**
	A control that looks like a switch with labels for two states. Each time a ToggleButton is tapped,
	it switches its value and fires an onChange event.
	
		{kind: "mochi.ToggleButton", onChange: "buttonToggle"}
	
		buttonToggle: function(inSender, inEvent) {
			this.log("Toggled to value " + inEvent.value);
		}
	
	To find out the value of the button, use getValue:
	
		queryToggleValue: function() {
			return this.$.toggleButton.getValue();
		}
		
	The color of the toggle button can be customized by applying a background color:
	
		{kind: "mochi.ToggleButton", style: "background-color: #35A8EE;"}
*/
enyo.kind({
	name: "mochi.ToggleButton",
	classes: "mochi-toggle-button",
	published: {
		active: false,
		value: false,
		disabled: false,
		canAnimate: true,
		colorActive: "#ffb80d",
		colorInactive: "#646464"
	},
	events: {
		/**
			The onChange event fires when the user changes the value of the toggle button, 
			but not when the value is changed programmatically.
		*/
		onChange: ""
	},
	//* @protected
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish"
	},
	lastKnobPos: 0,
	onXPos: 0,
	_canAnimate: false,
	components: [
		{name: "toggleKnob", classes: "mochi-toggle-button-knob"},
		{kind: "enyo.Animator", onStep: "animatorStep", onEnd: "animatorEnd"}
	],
	create: function() {
		this.inherited(arguments);
		this.value = Boolean(this.value || this.active);
		this.disabledChanged();
		this.supressAnimation();
	},
	rendered: function() {
		this.inherited(arguments);
		this.calcKnob();
		this.valueChanged();
		this.init();
	},
	supressAnimation: function() {
		this._canAnimate = this.canAnimate;
		this.canAnimate = false;
	},
	init: function() {
		this.setCanAnimate(this._canAnimate);
	},
	/*
	// We can add a class here to animate the background also
	canAnimateChanged: function() {
		if (this.canAnimate) {
			var toggleClass = "mochi-toggle-animate";
		} else {
			var toggleClass = "mochi-no-animate";
		}
		this.addClass(toggleClass);
	},
	*/
	animatorStep: function(inSender) {
		this.updateKnobPosition(inSender.value);
	},
	updateKnobPosition: function(inValue) {
		var xPos = inValue + "px";
		var inControl = this.$.toggleKnob;
		if (enyo.dom.canTransform()) {
			enyo.dom.transform(inControl, {translateX: xPos});
		} else {
			inControl.applyStyle("left", xPos);
		}
	},
	calcKnob: function() {
		this.onXPos = (this.getBounds().width - this.$.toggleKnob.getBounds().width) - (parseInt(enyo.dom.getComputedStyleValue(this.$.toggleKnob.hasNode(), "margin-left")) * 2);
	},
	valueChanged: function() {
		this.applyStyle("background-color", this.value ? this.colorActive : this.colorInactive);
		this.setActive(this.value);
		this.doChange({value: this.value});

		var xPos = (this.value) ? this.onXPos : 0;

		if (this.canAnimate) {
			this.$.animator.play({
				startValue: this.lastKnobPos,
				endValue: xPos,
				node: this.$.toggleKnob.hasNode()
			});
		} else {
			this.updateKnobPosition(xPos);
		}
		this.lastKnobPos = xPos;
		
	},
	activeChanged: function() {
		this.setValue(this.active);
		this.bubble("onActivate");
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},
	updateValue: function(inValue) {
		if (!this.disabled) {
			this.setValue(inValue);
		}
	},
	tap: function() {
		this.updateValue(!this.value);
	},
	dragstart: function(inSender, inEvent) {
		if (inEvent.horizontal) {
			inEvent.preventDefault();
			this.dragging = true;
			this.dragged = false;
			return true;
		}
	},
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var d = inEvent.dx;
			if (Math.abs(d) > 10) {
				this.updateValue(d > 0);
				this.dragged = true;
			}
			return true;
		}
	},
	dragfinish: function(inSender, inEvent) {
		this.dragging = false;
		if (this.dragged) {
			inEvent.preventTap();
		}
	},
	resizeHandler: function() {
		this.inherited(arguments);
		this.calcKnob();
	}
})
