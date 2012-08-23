enyo.kind({
	name: "mochi.sample.ViewSelectButtonSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "mochi-subheader", content: "View Select Button: Default"},
		{kind: "mochi.ViewSelector", onActivate: "buttonActivated", components: [
			{content: "Cats"},
			{content: "Dogs"},
			{content: "Bears"}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "View Select Button: Button 1 Active"},
		{kind: "mochi.ViewSelector", onActivate: "buttonActivated", components: [
			{content: "Earth", active: true},
			{content: "Wind"},
			{content: "Fire"}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "View Select Button: Button 2 Disabled"},
		{kind: "mochi.ViewSelector", onActivate: "buttonActivated", components: [
			{content: "Mac", active: true},
			{content: "PC", disabled: true},
			{content: "Linux"}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "View Select Button: Custom Bar Color"},
		{kind: "mochi.ViewSelector", onActivate: "buttonActivated", barClasses: "mochi-sample-progress-red", components: [
			{content: "Long", active: true},
			{content: "button"},
			{content: "is looooooooong "}
		]},
		{tag: "br"},
		{tag: "br"},
		{name: "result", classes: "mochi-sample-content", content: "result"}
	],
	buttonActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			this.$.result.setContent("The \"" + inEvent.originator.getContent() + "\" button is selected.");
		}
	}
});
