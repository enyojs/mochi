enyo.kind({
	name: "mochi.sample.CheckboxSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Checkbox: Default"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Checkbox", onchange: "sample1Changed", checked: true},
				{kind: "mochi.Checkbox", onchange: "sample1Changed"},
				{kind: "mochi.Checkbox", onchange: "sample1Changed"},
				{name: "sample1Result", classes:"mochi-sample-content", content:"No button tapped yet."}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Checkboxes: Disabled"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Checkbox", checked: true, disabled: true},
				{kind: "mochi.Checkbox", disabled: true},
				{kind: "mochi.Checkbox", disabled: true}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Checkboxes: Custom Styles"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Checkbox", onchange: "sample2Changed", colorActive: "#8c3037", colorInactive: "#d9d4ba", checked: true},
				{kind: "mochi.Checkbox", onchange: "sample2Changed", colorActive: "#E75533", colorInactive: "#fafafa", checked: true},
				{kind: "mochi.Checkbox", onchange: "sample2Changed", colorActive: "#364b57", colorInactive: "#fafafa", checked: true},
				{name: "sample2Result", classes:"mochi-sample-content", content:"No button tapped yet."}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Checkbox Group"},
			{kind: "Group", classes: "mochi-sample-tools group", onActivate: "sample3Activated", highlander: true, components: [
				{kind: "mochi.Checkbox", checked: true},
				{kind: "mochi.Checkbox"},
				{kind: "mochi.Checkbox"}
			]},
			{classes: "mochi-sample-tools", components: [
				{name: "sample3Result", classes: "mochi-sample-content", content: "No button tapped yet."}
			]}
		]}
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
			this.$.sample3Result.setContent("The " + this.ordinals[selected] + " checkbox in the group is selected.");
		}
	}
});
