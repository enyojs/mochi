enyo.kind({
	name: "mochi.sample.SliderSample",
	classes: "mochi mochi-sample enyo-unselectable enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Slider: Default"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Slider", value: 50, onChanging:"sliderChanging", onChange:"sliderChanged"}
			]},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Slider: Custom Color"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Slider", value: 75, onChanging:"sliderChanging", onChange:"sliderChanged", customClasses: "mochi-background-orange"}
			]},
			{tag: "br"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.InputDecorator", style:"margin-right:10px;", components: [
					{kind: "mochi.Input", placeholder: "Value", style:"width:50px;"}
				]},
				{kind: "mochi.Button", content:"Set", classes:"mochi-sample-spaced-button", ontap:"changeValue"},
				{kind: "mochi.Button", content:"-", classes:"mochi-sample-spaced-button", ontap:"decValue"},
				{kind: "mochi.Button", content:"+", classes:"mochi-sample-spaced-button", ontap:"incValue"},
				{tag: "br"},
				{tag: "br"},
				{kind: "mochi.Checkbox", name:"animateSetting", value:true},
				{content:"Animated", classes:"enyo-inline mochi-sample-content"},
				{tag: "br"},
				{tag: "br"},
				{name:"result", classes:"mochi-sample-content", content:"No slider moved yet."}
			]}
		]}
	],
	changeValue: function(inSender, inEvent) {
		for (var i in this.$) {
			if (this.$[i].kind == "mochi.Slider") {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateTo(this.$.input.getValue());
				} else {
					this.$[i].setValue(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0) - 10, 0));
		this.changeValue();
	},
	sliderChanging: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changing: " + Math.round(inSender.getValue()));
	},
	sliderChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changed to " + Math.round(inSender.getValue()) + ".");
	}
});
