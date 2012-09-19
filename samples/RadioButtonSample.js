enyo.kind({
	name: "mochi.sample.RadioButtonSample",
	classes: "mochi mochi-sample enyo-unselectable enyo-fit",
	components: [
		{classes: "mochi-subheader", content: "RadioButtons: Default"},
		{classes: "mochi-sample-tools", components: [
			{kind: "mochi.RadioButton", onchange: "sample1Changed", checked: true},
			{kind: "mochi.RadioButton", onchange: "sample1Changed"},
			{kind: "mochi.RadioButton", onchange: "sample1Changed"},
			{name: "sample1Result", classes: "mochi-sample-content", content: "No button tapped yet."}
		]},
		{tag: "br"},
		{classes: "mochi-subheader", content: "RadioButtons: Disabled"},
		{classes: "mochi-sample-tools", components: [
			{kind: "mochi.RadioButton", onchange: "sample2Changed", disabled: true},
			{kind: "mochi.RadioButton", onchange: "sample2Changed", disabled: true, checked: true},
			{name: "sample2Result", classes: "mochi-sample-content", content: "No button tapped yet."}
		]},
		{tag: "br"},
		{classes: "mochi-subheader", content: "RadioButton Group"},
		{kind: "Group", classes: "mochi-sample-tools group", onActivate: "sample3Activated", highlander: true, components: [
			{kind: "mochi.RadioButton", checked: true},
			{kind: "mochi.RadioButton"},
			{kind: "mochi.RadioButton"}
		]},
		{name: "sample3Result", classes: "mochi-sample-content", content: "No button tapped yet."}
		
	],
	sample1Changed: function(inSender, inEvent) {
		this.$.sample1Result.setContent(inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected."));
	},
	sample2Changed: function(inSender, inEvent) {
		this.$.sample2Result.setContent(inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected."));
	},
	ordinals: ["1st", "2nd", "3rd"],
	sample3Activated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.sample3Result.setContent("The " + this.ordinals[selected] + " radio button in the group is selected.");
		}
	}
});
