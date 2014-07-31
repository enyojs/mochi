enyo.kind({
	name: "mochi.sample.ProgressSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Progress Text"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ProgressText", progress: 25, label: ''},
				{kind: "mochi.ProgressText", barClasses: "mochi-sample-progress-text-red", progress: 50},
				{kind: "mochi.ProgressText", progress: 75, label: 'Downloaded'}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Progress Bar"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ProgressBar", classes: "mochi-sample-progress-bar", progress: 25},
				{kind: "mochi.ProgressBar", classes: "mochi-sample-progress-bar", barClasses: "mochi-sample-progress-red", progress: 50},
				{kind: "mochi.ProgressBar", classes: "mochi-sample-progress-bar", progress: 75}
			]},
			{tag: "br"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.InputDecorator", style: "margin-right:10px;", components: [
					{kind: "mochi.Input", placeholder: "Value", style: "width:50px;"}
				]},
				{kind: "mochi.Button", content:"Set", ontap: "changeValue"},
				{kind: "mochi.Button", content:"-", ontap: "decValue"},
				{kind: "mochi.Button", content:"+", ontap: "incValue"},
				{tag: "br"},
				{tag: "br"},
				{kind: "mochi.Checkbox", name: "animateSetting", value: true},
				{content: "Animated", classes: "enyo-inline mochi-sample-content"}
			]}
		]}
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
