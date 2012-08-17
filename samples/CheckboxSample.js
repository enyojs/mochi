enyo.kind({
	name: "mochi.sample.CheckboxSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "mochi-subheader", content: "Checkboxes"},
		{classes: "mochi-sample-tools", components: [
			{kind:"mochi.Checkbox", onchange:"checkboxChanged", checked: true},
			{kind:"mochi.Checkbox", onchange:"checkboxChanged"},
			{kind:"mochi.Checkbox", onchange:"checkboxChanged", colorActive: "#69cdff", colorInactive: "#000", checked: true}
		]},
		{tag: "br"},
		{classes: "mochi-subheader", content: "Checkboxes Group"},
		{kind: "Group", classes: "mochi-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
			{kind:"mochi.Checkbox", checked: true},
			{kind:"mochi.Checkbox"},
			{kind:"mochi.Checkbox"}
		]}
		/*
		{tag: "br"},
		{kind: "mochi.Groupbox", classes:"mochi-sample-result-box", components: [
			{kind: "mochi.GroupboxHeader", content: "Result"},
			{name:"result", classes:"mochi-sample-result", content:"No button tapped yet."}
		]}
		*/
	],
	checkboxChanged: function(inSender, inEvent) {
		//this.$.result.setContent(inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected."));
	},
	ordinals: ["1st", "2nd", "3rd"],
	groupActivated: function(inSender, inEvent) {
		/*
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.result.setContent("The " + this.ordinals[selected] + " checkbox in the group is selected.");
		}
		*/
	}
});
