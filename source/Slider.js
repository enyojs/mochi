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
		{name: "knob", ondown: "showKnobStatus", classes: "mochi-slider-knob"},
		{kind: "mochi.Popup", name: "popup", classes: "mochi-slider-popup", components: [
			{tag: "canvas", name: "drawing", attributes: { width: 62, height: 34 }},
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
	applyPosition: function(inRect, inControl) {
		var s = ""
		for (n in inRect) {
			s += (n + ":" + inRect[n] + (isNaN(inRect[n]) ? "; " : "px; "));
		}
		inControl.addStyles(s);
	},
	adjustPopupPosition: function(inControl, belowActivator) {
		var inControl = this.$.popup;
		if (inControl.hasNode()) {
			var b = inControl.node.getBoundingClientRect();

			//FIXME: when the tooltip bottom goes below the window height move it above the decorator
			if ((b.top + b.height) > window.innerHeight) {
				//inControl.addRemoveClass("below", false);
				//inControl.addRemoveClass("above", true);	
			} else 	{
				//inControl.addRemoveClass("above", false);
				//inControl.addRemoveClass("below", true);
				inControl.applyStyle("top", -56 + "px");
			}

			// when popup's right edge is out of the window, align its right edge with the decorator left edge
			if ((b.left + b.width) > window.innerWidth){
				this.applyPosition({'margin-left': -b.width, bottom: "auto"}, inControl);					
			} else if (b.left < 0) {
				this.applyPosition({'margin-left': 0}, inControl);
			}
		}
	},
	showKnobStatus: function(inSender, inEvent) {
		this.$.popup.setShowing(true);
	},
	dragstart: function(inSender, inEvent) {
		if (inEvent.horizontal) {
			inEvent.preventDefault();
			this.dragging = true;
			this.$.knob.addClass("active");
			return true;
		}
	},
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var v = this.calcKnobPosition(inEvent);
			this.setValue(v);
			this.doChanging({value: this.value});
			this.adjustPopupPosition(false);
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
    	ctx.moveTo(1, 35);
    	ctx.arcTo(1, 31, 12, 31, 4);
    	ctx.lineTo(46, 31);
		ctx.arcTo(61, 31, 61, 16, 15);
		ctx.moveTo(61, 16); // This is needed on IE9 for some reason
		ctx.arcTo(61, 1, 46, 1, 15);
		ctx.lineTo(16, 1);
    	ctx.arcTo(1, 1, 1, 16, 15);
    	ctx.lineTo(1, 35);
        ctx.fill();
	}
});