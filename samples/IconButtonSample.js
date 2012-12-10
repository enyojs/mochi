enyo.kind({
	name: "mochi.sample.IconButtonSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Icon Button: Default/Disabled"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.IconButton", src: "assets/sample-calendar-icon.png", ontap: "iconTapped"},
				{kind: "mochi.IconButton", src: "assets/sample-calendar-icon.png", ontap: "iconTapped", disabled: true}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Icon Button: Active Default/Active Disabled"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.IconButton", src: "assets/sample-calendar-icon.png", ontap: "iconTapped", active: true},
				{kind: "mochi.IconButton", src: "assets/sample-calendar-icon.png", ontap: "iconTapped", active: true, disabled: true}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Icon Button: Custom Buttons"},
			{classes: "mochi-sample-tools", components: [
				//{kind: "mochi.IconButton", src: "assets/sample-calendar-icon.png", ontap: "iconTapped", barClasses: "mochi-sample-progress-red"},
				{kind: "mochi.IconButton", src: "assets/sample-calendar-icon.png", ontap:"iconTapped", decoratorLeft: "[", decoratorRight: "]" }
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Icon Button: View Select Group"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"},
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png", active: true},
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"},
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png", disabled: true},
					{kind: "mochi.IconButtonItem", src: "assets/sample-calendar-icon-custom.png"}
				]}
			]},
			{tag: "br"},
			{classes: "mochi-sample-tools", components: [
				{name: "result", classes: "mochi-sample-content", content: "result"}
			]}
		]}
	],
	iconTapped: function(inSender, inEvent) {
		this.$.result.setContent("The \"" + inSender.name + "\" icon button was tapped.");
	},
	ordinals: ["1st", "2nd", "3rd"],
	iconGroupActivated: function(inSender, inEvent) {
		/*
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.result.setContent("The " + this.ordinals[selected] + " icon button in the group is selected.");
		}
		*/
	},
	buttonActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			this.$.result.setContent("The \"" + inEvent.originator.name + "\" button is selected.");
		}
	}
});
