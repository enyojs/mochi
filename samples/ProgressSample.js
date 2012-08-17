enyo.kind({
	name: "mochi.sample.ProgressSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "mochi-subheader", content: "Progress Text"},
		{kind: "mochi.ProgressText", progress: 25},
		{kind: "mochi.ProgressText", barClasses: "mochi-sample-progress-text-red", progress: 50},
		{kind: "mochi.ProgressText", progress: 75},
		{tag: "br"},
		{classes: "mochi-subheader", content: "Progress Bar"},
		{kind: "mochi.ProgressBar", classes: "mochi-sample-progress-bar", progress: 25},
		{kind: "mochi.ProgressBar", classes: "mochi-sample-progress-bar", barClasses: "mochi-sample-progress-red", progress: 50},
		{kind: "mochi.ProgressBar", classes: "mochi-sample-progress-bar", progress: 75},
		{tag: "br"},
		/*
		{classes: "mochi-sample-divider", content: "Progress Buttons"},
		{kind: "mochi.ProgressButton", progress: 25, onCancel:"clearValue", components: [
			{content: "0"},
			{content: "100", style: "float: right;"}
		]},
		{kind: "mochi.ProgressButton", barClasses: "mochi-dark", progress: 50, onCancel:"clearValue"},
		{kind: "mochi.ProgressButton", progress: 75, onCancel:"clearValue"},
		{tag: "br"},
		*/
		{kind: "mochi.InputDecorator", style:"margin-right:10px;", components: [
			{kind: "mochi.Input", placeholder: "Value", style:"width:50px;"}
		]},
		{kind: "Button", content:"Set", classes:"mochi-sample-spaced-button", ontap:"changeValue"},
		{kind: "Button", content:"-", classes:"mochi-sample-spaced-button", ontap:"decValue"},
		{kind: "Button", content:"+", classes:"mochi-sample-spaced-button", ontap:"incValue"},
		{tag: "br"},
		{tag: "br"},
		{kind: "mochi.Checkbox", name:"animateSetting", value:true},
		{content:"Animated", classes:"enyo-inline mochi-sample-animate-label"}
		
	],
	changeValue: function(inSender, inEvent) {
		for (var i in this.$) {
			if (this.$[i].kind == "mochi.ProgressBar" || this.$[i].kind == "mochi.ProgressButton" || this.$[i].kind == "mochi.ProgressText") {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateProgressTo(this.$.input.getValue());
				} else {
					this.$[i].setProgress(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0) - 10, 0));
		this.changeValue();
	},
	clearValue: function(inSender, inEvent) {
		inSender.setProgress(0);
	}
});
