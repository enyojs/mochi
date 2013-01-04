enyo.kind({
	name: "mochi.sample.PanelsSample",
	kind: "FittableRows",
	classes: "mochi mochi-sample enyo-unselectable enyo-fit",
	components: [
		{kind: "mochi.Header", content: "Mochi Panels", components: [
			{kind: "mochi.Button", content: "Previous", ontap: "prevPanel"},
			{kind: "mochi.Button", content: "Next", ontap: "nextPanel"},
			{kind: "mochi.InputDecorator", style: "width: 60px;", components: [
				{kind: "mochi.Input", value: 0, onchange: "gotoPanel"}
			]},
			{kind: "mochi.Button", content: "Go", ontap: "gotoPanel"},
			{kind: "mochi.Button", content: "Add", ontap: "addPanel"},
			{kind: "mochi.Button", content: "Delete", ontap: "deletePanel"}
		]},
		{kind: "mochi.Panels", name:"samplePanels", fit: true, components: [
			{components: [{kind: "mochi.Subheader", content: "Panel 0 - This panel is static"}]},
			{components: [{kind: "mochi.Subheader", content: "Panel 1 - additional filler text to test overlap"}]},
			{components: [{kind: "mochi.Subheader", content: "Panel 2 - additional filler text to test overlap"}]},
			{components: [{kind: "mochi.Subheader", content: "Panel 3 - additional filler text to test overlap"}]},
			{style: "width:840px;", components: [{kind: "mochi.Subheader", content: "Panel 4 - additional filler text to test overlap"}]},
			{components: [{kind: "mochi.Subheader", content: "Panel 5 - additional filler text to test overlap"}]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.panelCount = this.$.samplePanels.getPanels().length;
	},
	prevPanel: function() {
		this.$.samplePanels.previous();
		this.$.input.setValue(this.$.samplePanels.index);
	},
	nextPanel: function() {
		this.$.samplePanels.next();
		this.$.input.setValue(this.$.samplePanels.index);
	},
	gotoPanel: function() {
		this.$.samplePanels.setIndex(this.$.input.getValue());
	},
	panelCount: 0,
	addPanel: function() {
		var sp = this.$.samplePanels;
		var i = this.panelCount++;
		var p = sp.createComponent({
			components: [{kind: "mochi.Subheader", content: "Panel " + i}]
		});
		p.render();
		sp.reflow();
		sp.setIndex(i);
	},
	deletePanel: function() {
		var p = this.$.samplePanels.getActive();
		if (p) {
			p.destroy();
		}
	}
});
