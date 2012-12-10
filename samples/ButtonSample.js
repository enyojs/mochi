enyo.kind({
	name: "mochi.sample.ButtonSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{kind: "enyo.Scroller", fit: true, components:[
			{kind: "mochi.Subheader", content: "Buttons"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Button", content: "Button"},
				{kind: "mochi.Button", content: "Disabled Button", disabled: true},
				{kind: "mochi.Button", content: "Active Button", active: true},
				{kind: "mochi.Button", content: "Active Disabled Button", active: true, disabled: true},
				{kind: "mochi.Button", content: "Warning Button", classes: "mochi-button-warning"},
				{kind: "mochi.Button", content: "Active Warning Button", classes: "mochi-button-warning", active: true}
			]},
			{tag: "br"},
			{tag: "br"},
			{kind: "mochi.Subheader", content: "Custom Buttons"},
			{classes: "mochi-sample-tools", components: [
				{kind: "mochi.Button", content: "Custom Bar Color", barClasses: "mochi-sample-orange"},
				{kind: "mochi.Button", content: "Custom End-Caps", decoratorLeft: "<", decoratorRight: ">"}
			]}
			/*	
			{kind: "mochi.Groupbox", classes:"mochi-sample-result-box", components: [
				{kind: "mochi.GroupboxHeader", content: "Result"},
				{name:"result", classes:"mochi-sample-result", content:"No button tapped yet."}
			]}
			*/
		]}
	],
	buttonTapped: function(inSender, inEvent) {
		/*
		if (inSender.content){
			this.$.result.setContent("The \"" + inSender.getContent() + "\" button was tapped");			
		} else {
			this.$.result.setContent("The \"" + inSender.getName() + "\" button was tapped");						
		}
		*/
	}
});
