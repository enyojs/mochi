/**
	A decoration style for buttons. Usually not directly called outside of specific tools
*/
enyo.kind({
	name: "mochi.ButtonDecorator",
	classes: "enyo-unselectable mochi-button-decorator",
	components: [
		{name: "endCap", classes: "mochi-button-decorator-bookened"}
	]
});

enyo.kind({
	name: "mochi.ButtonDecoratorLeft",
	kind: "mochi.ButtonDecorator",
	classes: "mochi-button-decorator-left",
	published: {
		content: "("
	},
	create: function() {
		this.inherited(arguments);
		this.$.endCap.setContent(this.content);
	},
	contentChanged: function() {
		this.$.endCap.setContent(this.content);
	}
});

enyo.kind({
	name: "mochi.ButtonDecoratorRight",
	kind: "mochi.ButtonDecorator",
	classes: "mochi-button-decorator-right",
	published: {
		content: ")"
	},
	create: function() {
		this.inherited(arguments);
		this.$.endCap.setContent(this.content);
	},
	contentChanged: function() {
		this.$.endCap.setContent(this.content);
	}
});
