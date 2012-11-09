enyo.kind({
	name: "mochi.sample.BadgeSample",
	classes: "mochi mochi-sample",
	components: [
		{classes: "mochi-subheader", content: "Stand-alone Badge"},
		{name: "badge", kind: "mochi.Badge", content: "25"},
		{
			content: "Change badge value", 
			components: [
				{name: "slider", kind: "mochi.Slider", value: 25, onChanging:"sliderChanging", onChange:"sliderChanged"}
			]
		},
		{tag: "br"},

		{classes: "mochi-subheader", content: "Badge inside a button"},
		{
			kind: "mochi.Button", content: "Button", components: [
				{kind: "mochi.Badge", content: "56"},
			]
		},
		{tag: "br"},

		{classes: "mochi-subheader", content: "Badge inside a toolbar"},
		{
			kind: "onyx.Toolbar", components: [
				{content: "Toolbar"},
				{kind: "mochi.Badge", content: "11"},
			]
		},
		{tag: "br"},


		{classes: "mochi-subheader", content: "Colorful Badges"},
		{kind: "mochi.Badge", content: "6", background: "red"},
		{kind: "mochi.Badge", content: "88", background: "orange"},
		{kind: "mochi.Badge", content: "3", background: "green"},

		{classes: "mochi-subheader", content: "Text Badges"},
		{kind: "mochi.Badge", content: "Error! Please check your email address.", background: "red"},
		{tag: "br"},
		{kind: "mochi.Badge", content: "Warning! Please save your changes before proceeding.", background: "orange"},
		{tag: "br"},
		{kind: "mochi.Badge", content: "Success! Your changes have been saved.", background: "green"},

		{classes: "mochi-subheader", content: "Badge with a large number"},
		{kind: "mochi.Badge", content: "2012"}
	],
	sliderChanging: function(inSender, inEvent) {
		this.$.badge.setContent(Math.round(inSender.getValue()));
	},
	sliderChanged: function(inSender, inEvent) {
		this.$.badge.setContent(Math.round(inSender.getValue()));
	}
});