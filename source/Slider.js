/**
	A control that presents a range of selection options in the form of a
	horizontal slider with a control knob.  The knob may be tapped and dragged
	to the desired location.
	
		{kind: "mochi.Slider", value: 30}
	
	The *onChanging* event is fired when dragging the control knob.
	The *onChange* event is fired when the position is set, either by finishing
	a drag or by tapping the bar.
*/
enyo.kind({
	name: "mochi.Slider",
	kind: "mochi.ProgressBar",
	classes: "mochi-slider",
	published: {
		value: 0,
		lockBar: true,
		tappable: true,
		customClasses: ""
	},
	events: {
		onChange: "",
		onChanging: "",
		onAnimateFinish: ""
	},
	showStripes: false,
	//* @protected
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish"
	},
	moreComponents: [
		{kind: "Animator", onStep: "animatorStep", onEnd: "animatorComplete"},
		{classes: "mochi-slider-taparea"},
		{name: "knob", ondown: "showKnobStatus", onup: "hideKnobStatus", classes: "mochi-slider-knob"},
		{kind: "mochi.Popup", name: "popup", classes: "mochi-slider-popup above", components: [
			{tag: "canvas", name: "drawing", attributes: { width: 62, height: 36 }},
			{name: "popupLabel", classes: "mochi-slider-popup-label"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.createComponents(this.moreComponents);
		this.valueChanged();
		this.customClassesChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.drawToCanvas(this.controlColor);
		this.adjustPopupPosition(false);
	},
	valueChanged: function() {
		this.value = this.clampValue(this.min, this.max, this.value);
		var p = this.calcPercent(this.value);
		this.updateKnobPosition(p);
		if (this.lockBar) {
			this.setProgress(this.value);
		}
	},
	customClassesChanged: function(inOld) {
		this.$.knob.removeClass(inOld);
		this.$.knob.addClass(this.customClasses);

		this.barClasses = this.customClasses;
		this.barClassesChanged();
	},
	updateKnobPosition: function(inPercent) {
		this.$.knob.applyStyle("left", inPercent + "%");
		this.$.popup.applyStyle("left", inPercent + "%");
		this.$.popupLabel.setContent( Math.round(inPercent) + "%" );
	},
	calcKnobPosition: function(inEvent) {
		var x = inEvent.clientX - this.hasNode().getBoundingClientRect().left;
		return (x / this.getBounds().width) * (this.max - this.min) + this.min;
	},
	adjustPopupPosition: function() {

		var inControl = this.$.popup;
		
		// popup bounds
		var pb = inControl.hasNode().getBoundingClientRect();
		// container bounds
		var cb = this.container.hasNode().getBoundingClientRect();
		// knob bounds
		var kb = this.$.knob.hasNode().getBoundingClientRect();

		// FIXME: What do we do when the popup's top goes above the window height?
		// Adding "above" class directly to classes property for now
		/*
		// IE8 doesn't return window.page{X/Y}Offset
		var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
		//when the popup's top goes above the container's top, move popup below the decorator
		if ((pb.top + pb.height) < pageYOffset) {
			inControl.addRemoveClass("above", false);
			inControl.addRemoveClass("below", true);
		} else 	{
			inControl.addRemoveClass("above", true);
			inControl.addRemoveClass("below", false);
		}
		*/

		// when the popup's right edge is out of the window, adjust to the left
		if ( (pb.width + pb.left) > cb.right ) {
			inControl.applyStyle("left", (kb.left - cb.left - pb.width) + "px");
		}
	},
	showKnobStatus: function(inSender, inEvent) {
		this.$.popup.setShowing(true);
	},
	hideKnobStatus: function(inSender, inEvent) {
		this.$.popup.setShowing(false);
	},
	dragstart: function(inSender, inEvent) {
		if (inEvent.horizontal) {
			inEvent.preventDefault();
			this.dragging = true;
			this.$.knob.addClass("active");
			this.showKnobStatus();
			return true;
		}
	},
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var v = this.calcKnobPosition(inEvent);
			this.setValue(v);
			this.doChanging({value: this.value});
			this.adjustPopupPosition(inEvent);
			return true;
		}
	},
	dragfinish: function(inSender, inEvent) {
		this.dragging = false;
		inEvent.preventTap();
		this.doChange({value: this.value});
		this.$.knob.removeClass("active");
		this.$.popup.setShowing(false);
		return true;
	},
	tap: function(inSender, inEvent) {
		if (this.tappable) {
			var v = this.calcKnobPosition(inEvent);
			this.tapped = true;
			this.animateTo(v);
			return true;
		}
	},
	//* @public
	//* Animates to the given value.
	animateTo: function(inValue) {
		this.$.animator.play({
			startValue: this.value,
			endValue: inValue,
			node: this.hasNode()
		});
	},
	//* @protected
	animatorStep: function(inSender) {
		this.setValue(inSender.value);
		return true;
	},
	animatorComplete: function(inSender) {
		if (this.tapped) {
			this.tapped = false;
			this.doChange({value: this.value});
		}
		this.doAnimateFinish(inSender);
		return true;
	},
	drawToCanvas: function(bgColor) {
		var ctx = this.$.drawing.hasNode().getContext("2d");

		// Set styles
    	ctx.fillStyle = enyo.dom.getComputedStyleValue(this.$.knob.hasNode(), "background-color");

    	// Draw shape with arrow on bottom-left
        ctx.moveTo(1, 37);
    	ctx.arcTo(1, 33, 12, 33, 4);
    	ctx.lineTo(46, 33);
		ctx.arcTo(61, 33, 61, 17, 16);
		ctx.moveTo(61, 17); // This is needed on IE9 for some reason
		ctx.arcTo(61, 1, 46, 1, 16);
		ctx.lineTo(16, 1);
    	ctx.arcTo(1, 1, 1, 17, 16);
    	ctx.lineTo(1, 37);
        ctx.fill();
	}
});