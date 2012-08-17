/**
	A control that shows the current progress of a process in a horizontal bar.
	
		{kind: "mochi.ProgressBar", progress: 10}
	
	To animate progress changes, call the *animateProgressTo* method:
	
		this.$.progressBar.animateProgressTo(50);
		
	You may customize the color of the bar by applying a style via the
	*barClasses* property, e.g.:
	
		{kind: "mochi.ProgressBar", barClasses: "mochi-dark"}
	
*/
enyo.kind({
	name: "mochi.ProgressText",
	classes: "mochi-progress-text",
	published: {
		progress: 0,
		min: 0,
		max: 100,
		barClasses: ""
	},
	events: {
		onAnimateProgressFinish: ""
	},
	components: [
		{name: "progressAnimator", kind: "Animator", onStep: "progressAnimatorStep", onEnd: "progressAnimatorComplete"},
		{name: "barContainer", classes: "mochi-progress-text-box", components: [
			{name: "barBackground", classes: "mochi-progress-text-underwear", content: "100% Downloaded"},
			{name: "bar", classes: "mochi-progress-text-outerwear", content: "100% Downloaded"},
		]}

	],
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.barClassesChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.progressChanged();
	},
	barClassesChanged: function(inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},
	progressChanged: function() {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		var p = this.calcPercent(this.progress);
		this.updateBarPosition(p);
	},
	clampValue: function(inMin, inMax, inValue) {
		return Math.max(inMin, Math.min(inValue, inMax));
	},
	calcRatio: function(inValue) {
		return (inValue - this.min) / (this.max - this.min);
	},
	calcPercent: function(inValue) {
		return parseInt(this.calcRatio(inValue) * 100);
	},
	updateBarPosition: function(inPercent) {
		var label = inPercent + "% Downloaded";
		this.$.barBackground.setContent(label);
		this.$.bar.setContent(label);

		var w = parseInt((this.$.barBackground.getBounds().width / 100) * inPercent);
		this.$.bar.applyStyle("width", w + "px");
	},
	//* @public
	//* Animates progress to the given value.
	animateProgressTo: function(inValue) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: inValue,
			node: this.hasNode()
		});
	},
	//* @protected
	progressAnimatorStep: function(inSender) {
		this.setProgress(inSender.value);
		return true;
	},
	progressAnimatorComplete: function(inSender) {
		this.doAnimateProgressFinish(inSender);
		return true;
	}
});