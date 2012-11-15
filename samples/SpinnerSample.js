enyo.kind({
	name: "mochi.sample.SpinnerSample",
	classes: "mochi mochi-sample",
	handlers: {
		onSelect: "itemSelected"
	},
	components: [
		{classes: "mochi-subheader", content: "Large Spinner (Dark)"},
		{style:"background:black; border-radius:5px; padding:15px", components: [
			{kind: "mochi.Spinner"}
		]},
		{tag: "br"},

		{classes: "mochi-subheader", content: "Small Spinner (Light)"},
		{style:"background:white; border-radius:5px; padding:15px", components: [
			{kind: "mochi.Spinner", classes: "mochi-light"}
		]},
		{tag: "br"},
		
		
		{classes: "mochi-subheader", content: "Large Spinner (Dark)"},
		{style:"background:black; border-radius:5px; padding:15px", components: [
			{kind: "mochi.Spinner", classes: "mochi-large"}
		]},
		{tag: "br"},
		
		{classes: "mochi-subheader", content: "Large Spinner (Light)"},
		{style:"background:white; border-radius:5px; padding:15px", components: [
			{kind: "mochi.Spinner", classes: "mochi-large mochi-light"}
		]}
	]
});