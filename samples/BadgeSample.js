enyo.kind({
	name: "mochi.sample.BadgeSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[

			{kind: "mochi.Subheader", content: "Stand-alone Badge"},
			{classes: "mochi-sample-tools", components: [
				{name: "badge", kind: "mochi.Badge", content: "25"},
				{
					content: "Change badge value", 
					components: [
						{name: "slider", kind: "mochi.Slider", value: 25, onChanging:"sliderChanging", onChange:"sliderChanged"}
					]
				}
			]},
			{tag: "br"},

			{kind: "mochi.Subheader", content: "Badge inside a button"},
			{classes: "mochi-sample-tools", components: [
				{
					kind: "mochi.Button", content: "Button", components: [
						{kind: "mochi.Badge", content: "56"},
					]
				}
			]},
			{tag: "br"},

			{kind: "mochi.Subheader", content: "Colorful Badges"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Badge", content: "6", background: "red"},
				{kind: "mochi.Badge", content: "88", background: "orange"},
				{kind: "mochi.Badge", content: "3", background: "green"}
			]},

			/*{kind: "mochi.Subheader", content: "Text Badges"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Badge", content: "Error! Please check your email address.", background: "red"},
				{tag: "br"},
				{kind: "mochi.Badge", content: "Warning! Please save your changes before proceeding.", background: "orange"},
				{tag: "br"},
				{kind: "mochi.Badge", content: "Success! Your changes have been saved.", background: "green"}
			]},
			*/
			
			{kind: "mochi.Subheader", content: "Badge with a large number"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Badge", content: "2012"}
			]}

		]}
	],
	sliderChanging: function(inSender, inEvent) {
		this.$.badge.setContent(Math.round(inSender.getValue()));
	},
	sliderChanged: function(inSender, inEvent) {
		this.$.badge.setContent(Math.round(inSender.getValue()));
	}
});