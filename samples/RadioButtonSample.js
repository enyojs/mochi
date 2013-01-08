enyo.kind({
	name: "mochi.sample.RadioButtonSample",
	classes: "mochi mochi-sample enyo-unselectable enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "RadioButton Group"},
			{kind: "Group", classes: "mochi-sample-tools group", onActivate: "sample1Activated", highlander: true, components: [
				{kind: "mochi.RadioButton", checked: true},
				{kind: "mochi.RadioButton"},
				{kind: "mochi.RadioButton"}
			]},
			{classes: "mochi-sample-tools", components: [
				{name: "sample1Result", classes: "mochi-sample-content", content: "No button tapped yet."}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "RadioButton Group: Disabled"},
			{kind: "Group", classes: "mochi-sample-tools group", onActivate: "sample2Activated", highlander: true, components: [
				{kind: "mochi.RadioButton", checked: true, disabled: true},
				{kind: "mochi.RadioButton", disabled: true},
				{kind: "mochi.RadioButton", disabled: true}
			]},
			{classes: "mochi-sample-tools", components: [
				{name: "sample2Result", classes: "mochi-sample-content", content: "No button tapped yet."}
			]}
		]}
	],
	ordinals: ["1st", "2nd", "3rd"],
	sample1Activated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.sample1Result.setContent("The " + this.ordinals[selected] + " radio button in the group is selected.");
		}
	},
	sample2Activated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.sample2Result.setContent("The " + this.ordinals[selected] + " radio button in the group is selected.");
		}
	}
});
