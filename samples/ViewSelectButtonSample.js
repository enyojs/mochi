enyo.kind({
	name: "mochi.sample.ViewSelectButtonSample",
	classes: "mochi mochi-sample enyo-unselectable enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "View Select Button: Default"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
					{content: "Cats"},
					{content: "Dogs"},
					{content: "Bears"}
				]}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "View Select Button: Button 1 Active"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
					{content: "Earth", active: true},
					{content: "Wind"},
					{content: "Fire"}
				]}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "View Select Button: Button 2 Disabled"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
					{content: "Mac", active: true},
					{content: "PC", disabled: true},
					{content: "Linux"}
				]}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "View Select Button: Custom Bar Color"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", barClasses: "mochi-sample-progress-red", components: [
					{content: "Long", active: true},
					{content: "button"},
					{content: "is looooooooong "}
				]}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Mixed-bag: View Select & Icon Buttons"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", barClasses: "mochi-sample-progress-red", components: [
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"},
					{content: "Alpha", active: true},
					{content: "Beta"},
					{kind: "mochi.IconButtonItem", disabled: true, src: "assets/sample-calendar-icon-custom.png"},
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"}
				]}
			]},
			{tag: "br"},
			{classes: "mochi-sample-tools", components: [
				{name: "result", classes: "mochi-sample-content", content: "result"}
			]}
		]}
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
