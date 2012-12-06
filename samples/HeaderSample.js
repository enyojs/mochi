enyo.kind({
	name: "mochi.sample.HeaderSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[

			{kind: "mochi.Header", content: "This is a simple header"},
			{kind: "mochi.Subheader", content: "This is a simple subheader"},
			{tag: "br"},{tag: "hr", style: "margin:0;"},

			{kind: "mochi.Header", content: "This header is loooooooooooooooooooooooooooooooooong"},
			{tag: "br"},{tag: "hr", style: "margin:0;"},

			{kind: "mochi.Header", content: "Header with control", components: [{kind: "mochi.Button", content: "Button"}]},
			{tag: "br"},{tag: "hr", style: "margin:0;"},

			{kind: "mochi.Header", content: "Fixed-width with control", style: "width:800px;", components: [{kind: "mochi.ToggleButton"}]},
			{tag: "br"},{tag: "hr", style: "margin:0;"},

			{kind: "mochi.Header", content: "Header using custom CSS class", customClasses: "mochi-sample-orange"},
			{tag: "br"},{tag: "hr", style: "margin:0;"}
		]}
	]
});
