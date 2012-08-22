/**
	A base style for buttons. Usually not directly called outside of specific tools
*/
enyo.kind({
	name: "mochi.ButtonBase",
	classes: "mochi-button-base",
	kind: "enyo.Button",
	published: {
		disabled: false,
	},
	create: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
	}
});