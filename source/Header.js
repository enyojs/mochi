/**
	A mochi-styled Header control. This will display a single line of text,
	alongside an optional control.

		{kind: "mochi.Header", content: "This is a header", components: [
			{kind: "mochi.Button", content: "Button"}
		]}

	It is intended that only 1 control be used with a mochi.Header.
	However, multiple controls should align properly as inline-blocks.
*/
enyo.kind({
	name: "mochi.Header",
	classes: "mochi-header",
	published: {
		customClasses: ""
	},
	//* @protected
	tools: [
		{name: "headerContent", classes: "mochi-header-content"},
		{name: "client", classes: "mochi-header-controls"}
	],
	initComponents: function() {
		this.createChrome(this.tools);
		this.inherited(arguments);
	},
	// Minimum px width allowed for content
	// 80px is generally enough to display 1 letter and ellipsis
	minContentWidth: 80,
	customClassesChanged: function(inOld) {
		this.$.headerContent.removeClass(inOld);
		this.$.headerContent.addClass(this.customClasses);
	},
	contentChanged: function() {
		this.$.headerContent.setContent(this.content);
	},
	rendered: function() {
		this.inherited(arguments);
		this.customClassesChanged();
		this.adjustControls();
		this.adjustContent();
	},
	resizeHandler: function() {
		this.inherited(arguments);
		this.adjustContent();
	},
	adjustControls: function() {
		var controls = this.getClientControls();
		var len = controls.length;

		if (len > 0) {
			this.$.client.addClass("mochi-header-controls-first");
		}
	},
	adjustContent: function() {
		var padding = this.hasNode() ? enyo.dom.calcPaddingExtents(this.node) : {};
		var pw = padding.left + padding.right;
		var controls = this.getClientControls();
		var len = controls.length;

		if (len === 0) {
			var contentWidth = this.getBounds().width - pw;
		} else {
			var controlWidth = this.$.client.getBounds().width;
			var contentWidth = Math.max(this.minContentWidth, ((this.getBounds().width - controlWidth) - pw) );

			this.$.headerContent.applyStyle("max-width", contentWidth + "px");
		}
		this.$.headerContent.applyStyle("width", contentWidth + "px");
	}
});
