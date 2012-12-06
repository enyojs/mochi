enyo.kind({
	name: "mochi.sample.SpinnerSample",
	classes: "mochi mochi-sample enyo-unselectable enyo-fit",
	kind: "FittableRows",
	handlers: {
		onSelect: "itemSelected"
	},
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Large Spinner (Dark)"},
			{classes: "mochi-sample-tools", components: [
				{style:"background:black; border-radius:5px; padding:15px", components: [
					{kind: "mochi.Spinner"}
				]}
			]},
			{tag: "br"},

			{kind: "mochi.Subheader", content: "Small Spinner (Light)"},
			{classes: "mochi-sample-tools", components: [
				{style:"background:white; border-radius:5px; padding:15px", components: [
					{kind: "mochi.Spinner", classes: "mochi-light"}
				]}
			]},
			{tag: "br"},
			
			{kind: "mochi.Subheader", content: "Large Spinner (Dark)"},
			{classes: "mochi-sample-tools", components: [
				{style:"background:black; border-radius:5px; padding:15px", components: [
					{kind: "mochi.Spinner", classes: "mochi-large"}
				]}
			]},
			{tag: "br"},
			
			{kind: "mochi.Subheader", content: "Large Spinner (Light)"},
			{classes: "mochi-sample-tools", components: [
				{style:"background:white; border-radius:5px; padding:15px", components: [
					{kind: "mochi.Spinner", classes: "mochi-large mochi-light"}
				]}
			]}
		]}
	]
});