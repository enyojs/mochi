/**
	A mochi-styled Subheader control. This will display a single line of text.

		{kind: "mochi.Subeader", content: "This is a subheader"}

*/
enyo.kind({
	name: "mochi.Subheader",
	classes: "mochi-header",
	//* @protected
	contentComponents: [
		{name: "subheaderContentContainer", classes: "mochi-subheader-content-container", components: [
			{classes: "mochi-header-content-wrapper", components: [
				{name: "subheaderContent", classes: "mochi-subheader-content"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.initHeaderComponents();
	},
	initHeaderComponents: function() {
		this.createComponents(this.contentComponents);
		this.$.subheaderContent.setContent(this.content);
	},
	contentChanged: function() {
		// this.$.subheaderContent will be undefined until the create method fires
		if (this.$.subheaderContent !== undefined) {
			this.$.subheaderContent.setContent(this.content);
		}
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
