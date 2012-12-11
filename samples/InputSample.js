enyo.kind({
	name: "mochi.sample.InputSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Inputs"},
			{classes: "mochi-sample-tools mochi-sample-textarea-tools", components: [
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.Input", placeholder: "Enter text here", onchange:"inputChanged"}
				]},
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.Input", placeholder: "Search term", onchange:"inputChanged"},
					{kind: "Image", src: "assets/search-input-search.png"}
				]},
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.Input", type:"password", placeholder: "Enter password", onchange:"inputChanged"}
				]},
				{tag: "br"},
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.Input", disabled: true, value: "Disabled input"}
				]}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Right-aligned Input"},
			{classes: "mochi-sample-tools mochi-sample-textarea-tools", components: [
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.Input", style: "text-align:right;", placeholder: "", onchange:"inputChanged"}
				]}
			]},	
			{tag: "br"},
			{kind: "mochi.Subheader", content: "RichTexts"},
			{classes: "mochi-sample-tools mochi-sample-textarea-tools", components: [
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.RichText", style: "width: 200px;", placeholder: "Enter text here", onchange:"inputChanged"}
				]},
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.RichText", style: "width: 200px;", placeholder: "Search term", onchange:"inputChanged"},
					{kind: "Image", src: "assets/search-input-search.png"}
				]}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "TextAreas"},
			{classes: "mochi-sample-tools mochi-sample-textarea-tools", components: [
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.TextArea", placeholder: "Enter text here", onchange:"inputChanged"}
				]},
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.TextArea", placeholder: "Search term", onchange:"inputChanged"},
					{kind: "Image", src: "assets/search-input-search.png"}
				]},
				{kind: "mochi.InputDecorator", components: [
					{kind: "mochi.TextArea", placeholder: "Disabled TextArea", onchange:"inputChanged", disabled: true}
				]},
			]},
			{tag: "br"},
			//replace this with the groupbox below once it's available
			{classes: "mochi-sample-tools mochi-sample-textarea-tools", components: [			
				{name:"result", classes:"mochi-sample-content", content:"No input entered yet."}
			]}
			/*
			{kind: "mochi.Groupbox", classes:"mochi-sample-result-box", components: [
				{kind: "mochi.GroupboxHeader", content: "Result"},
				{name:"result", classes:"mochi-sample-result", content:"No input entered yet."}
			]}
			*/
		]}
	],
	inputChanged: function(inSender, inEvent) {console.log('ok ok')
		this.$.result.setContent("Input: " + inSender.getValue());
	}
});
