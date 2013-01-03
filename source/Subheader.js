/**
	A mochi-styled Subheader control. This will display a single line of text.

		{kind: "mochi.Subeader", content: "This is a subheader"}

*/
enyo.kind({
	name: "mochi.Subheader",
	classes: "mochi-subheader",
	//* @protected
	components: [
		{name: "subheaderContent", classes: "mochi-subheader-content"},
	],
	contentChanged: function() {
		this.$.subheaderContent.setContent(this.content);
	},
	resizeHandler: function() {
		this.inherited(arguments);
		this.adjustContent();
	},
	adjustContent: function() {
		var padding = this.hasNode() ? enyo.dom.calcPaddingExtents(this.node) : {};
		var pw = padding.left + padding.right;
		var contentWidth = this.getBounds().width - pw;

		this.$.subheaderContent.applyStyle("max-width", contentWidth + "px");
	}
});
