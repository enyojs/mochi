/**
	A mochi-styled Header control. This will display a single line of text,
	alongside an optional control.

		{kind: "mochi.Header", content: "This is a header", components: [
			{kind: "mochi.Button", content: "Button"}
		]}

	It is intended that only 1 optional control be used with a mochi.Header.
	However, multiple controls should align properly as inline-blocks.
*/
enyo.kind({
	name: "mochi.Header",
	classes: "mochi-header",
	published: {
		customClasses: ""
	},
	//* @protected
	contentComponents: [
		{name: "headerContentContainer", classes: "mochi-header-content-container", components: [
			{classes: "mochi-header-content-wrapper", components: [
				{name: "headerContent", classes: "mochi-header-content"}
			]}
		]}
	],
	controlComponents: [
		{name: "headerControls", classes: "mochi-header-controls"}
	],
	// Minimum px width allowed for content
	// 80px is generally enough to display 1 letter and ellipsis
	minContentWidth: 80,
	controlWidth: 0,
	initComponents: function() {
		this.moreComponents = ((this.components === undefined) || (this.components.length === 0)) ? null : this.components;
		this.components = null;
		this.inherited(arguments);
	},
	create: function() {
		this.inherited(arguments);
		this.initHeaderComponents();
		this.customClassesChanged();

	},
	initHeaderComponents: function() {
		this.createComponents(this.contentComponents);
		this.$.headerContent.setContent(this.content);
		
		if (this.moreComponents === null) {
			this.$.headerContentContainer.applyStyle("width", "100%");
		} else {
			this.$.headerContentContainer.applyStyle("float", "left");
			this.createComponents(this.controlComponents);
			this.$.headerControls.createComponents(this.moreComponents);
		}
	},
	customClassesChanged: function(inOld) {
		this.$.headerContent.removeClass(inOld);
		this.$.headerContent.addClass(this.customClasses);
	},
	contentChanged: function() {
		// this.$.headerContent will be undefined until the create method fires
		if (this.$.headerContent !== undefined) {
			this.$.headerContent.setContent(this.content);
		}
	},
	rendered: function() {
		this.inherited(arguments);
		this.adjustControls();
		this.adjustContent();
	},
	adjustControls: function() {
		if (this.moreComponents !== null) {
			var controlWidth = this.$.headerControls.getBounds().width;
			this.$.headerControls.applyStyle("width", controlWidth + "px");
			this.controlWidth = controlWidth;
		}
	},
	resizeHandler: function() {
		this.inherited(arguments);
		this.adjustContent();
	},
	adjustContent: function() {
		var padding = this.hasNode() ? enyo.dom.calcPaddingExtents(this.node) : {};
		var pw = padding.left + padding.right;

		if (this.moreComponents === null) {
			var contentWidth = this.getBounds().width - pw;
			var minWidth = this.minContentWidth;
		} else {
			var margin = this.$.headerControls.hasNode() ? enyo.dom.calcMarginExtents(this.$.headerControls.node) : {};
			var pm = pw + margin.left + margin.right;
			var controlWidth = this.controlWidth;
			var contentWidth = (this.getBounds().width - controlWidth) - pm;
			var minWidth = this.minContentWidth + controlWidth;

			contentWidth = Math.max(this.minContentWidth, contentWidth);
			this.$.headerContent.applyStyle("width", contentWidth + "px");
		}

		this.$.headerContent.applyStyle("max-width", contentWidth + "px");
		this.applyStyle("min-width", minWidth + "px");
	}
});
