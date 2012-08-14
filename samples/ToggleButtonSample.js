enyo.kind({
	name: "mochi.sample.ToggleButtonSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "enyo-fit mochi-sample-background"},
		{style: "position: absolute; padding-left:10%; padding-top:50px;", components: [
			{classes: "mochi-sample-divider", content: "Toggle Buttons"},
			{classes: "mochi-sample-tools", components: [
				{kind:"mochi.ToggleButton", onChange:"toggleChanged", value: true},
				{kind:"mochi.ToggleButton", onChange:"toggleChanged"},
				{kind:"mochi.ToggleButton", onChange:"toggleChanged"},
				{kind:"mochi.ToggleButton", onChange:"toggleChanged", value: true, disabled: true}
			]},
			{tag: "br"},
			{classes: "mochi-sample-divider", content: "Toggle Buttons Group"},
			{kind: "Group", classes: "mochi-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
				{kind:"mochi.ToggleButton"},
				{kind:"mochi.ToggleButton", value: true},
				{kind:"mochi.ToggleButton"}
			]}
			/*
			{tag: "br"},
			{kind: "mochi.Groupbox", classes:"mochi-sample-result-box", components: [
				{kind: "mochi.GroupboxHeader", content: "Result"},
				{name:"result", classes:"mochi-sample-result", content:"No button tapped yet."}
			]}
			*/
		]}
	],
	toggleChanged: function(inSender, inEvent) {
		//this.$.result.setContent(inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected."));
	},
	ordinals: ["1st", "2nd", "3rd"],
	groupActivated: function(inSender, inEvent) {
		/*
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.result.setContent("The " + this.ordinals[selected] + " toggle button in the group is selected.");
		}
		*/
	}
});
