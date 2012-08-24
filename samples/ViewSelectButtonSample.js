enyo.kind({
	name: "mochi.sample.ViewSelectButtonSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "mochi-subheader", content: "View Select Button: Default"},
		{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
			{content: "Cats"},
			{content: "Dogs"},
			{content: "Bears"}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "View Select Button: Button 1 Active"},
		{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
			{content: "Earth", active: true},
			{content: "Wind"},
			{content: "Fire"}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "View Select Button: Button 2 Disabled"},
		{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
			{content: "Mac", active: true},
			{content: "PC", disabled: true},
			{content: "Linux"}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "View Select Button: Custom Bar Color"},
		{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", barClasses: "mochi-sample-progress-red", components: [
			{content: "Long", active: true},
			{content: "button"},
			{content: "is looooooooong "}
		]},
		{tag: "br"},
		{tag: "br"},
		{classes: "mochi-subheader", content: "Mixed-bag: View Select & Icon Buttons"},
		{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", barClasses: "mochi-sample-progress-red", components: [
			{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"},
			{content: "Alpha", active: true},
			{content: "Beta"},
			{kind: "mochi.IconButtonItem", disabled: true, src: "assets/sample-calendar-icon-custom.png"},
			{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"}
		]},
		{tag: "br"},
		{tag: "br"},
		{name: "result", classes: "mochi-sample-content", content: "result"}
	],
	buttonActivated: function(inSender, inEvent) {
		if ((inEvent.originator.getActive()) && (inEvent.originator.kind === "mochi.ViewSelectButtonItem")) {
			this.$.result.setContent("The \"" + inEvent.originator.getContent() + "\" button is selected.");
		} else {
			this.$.result.setContent("The \"" + inEvent.originator.name + "\" button is selected.");
		}
	},
	rendered: function() {
		this.inherited(arguments);
		this.$.result.setContent("");
	}
});
