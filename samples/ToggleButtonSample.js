enyo.kind({
	name: "mochi.sample.ToggleButtonSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "mochi-subheader", content: "Toggle Buttons: Default"},
		{classes: "mochi-sample-tools", components: [
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", value: true},
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", value: true},
			{kind: "mochi.ToggleButton", onChange: "toggleChanged"}
		]},
		
		{tag: "br"},
		{classes: "mochi-subheader", content: "Toggle Buttons: Disabled"},
		{classes: "mochi-sample-tools", components: [
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", disabled: true},
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", value: true, disabled: true}
		]},
		{tag: "br"},

		{classes: "mochi-subheader", content: "Toggle Buttons: Custom"},
		{classes: "mochi-sample-tools", components: [
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", colorActive: "#69cdff", colorInactive: "#ff4a4a"},
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", colorActive: "#69cdff", colorInactive: "#ff4a4a", value: true},
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", canAnimate: false, value: true},
			{kind: "mochi.ToggleButton", onChange: "toggleChanged", style: "width: 200px;"}
		]},
		{tag: "br"},
		
		{classes: "mochi-subheader", content: "Toggle Buttons Group"},
		{kind: "Group", classes: "mochi-sample-tools group", onActivate: "groupActivated", highlander: true, components: [
			{kind: "mochi.ToggleButton"},
			{kind: "mochi.ToggleButton", value: true},
			{kind: "mochi.ToggleButton"}
		]},
		{tag: "br"},
		
		{name: "result", classes: "mochi-sample-content", content: "No button tapped yet."}
		
	],
	toggleChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected."));
	},
	ordinals: ["1st", "2nd", "3rd"],
	groupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.result.setContent("The " + this.ordinals[selected] + " toggle button in the group is selected.");
		}
	}
});
