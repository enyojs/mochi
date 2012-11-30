enyo.kind({
	name: "mochi.sample.ContextualPopupSample",
	classes: "mochi mochi-sample",
	kind:"FittableRows",
	handlers: {
		ontap: "tapHandler"
	},
	components: [
		{kind: "onyx.Toolbar", classes: "onyx-menu-toolbar", style:"background-color:lightgray", components: [
			{kind: "mochi.ContextualPopupDecorator", components: [
				{kind:mochi.Button, content:"Back"},
				{kind: "mochi.ContextualPopup", 
					title:"Back", 
					actionButtons:[
						{content:"test1", classes: "mochi-button-warning"},
						{content:"test2"},					
					], 
					components: [
						{content:"testing 1"},
						{content:"testing 6"}
					]
				}
			]},
							
			{kind: "mochi.ContextualPopupDecorator", style:"float:right;", components: [
			{kind:mochi.Button, content:"Facebook +"},
				{kind: "mochi.ContextualPopup", 
					title:"Facebook +", 
					actionButtons:[
						{content:"test1", classes: "mochi-button-warning"},
						{content:"test2"}
					], 
					components: [
						{content:"testing 1"},
						{content:"testing 2"},
						{content:"testing 3"},
						{content:"testing 4"},
						{content:"testing 5"},
						{content:"testing 6"}
					]
				}
			]},
		]},
		
		/*These are the movable buttons/popups to test anywhere on screen. Note that these are for testing only and not
		  intended to be used as an example use of ContextualPopups.
		*/
		{kind: "mochi.ContextualPopupDecorator", style: "position: absolute;z-index: 20;left:100px;", components: [
			{kind:"MovableButton", content:"Average"},
			{kind: "mochi.ContextualPopup", 
				title:"Average", 
				actionButtons:[
					{content:"Press Me"}
				], 
				components: [
					{content:"Item 1"},
					{content:"Item 2"},
					{content:"Item 3"},
					{content:"Item 4"},
					{content:"Item 5"}										
				]
			}
		]},
		{kind: "mochi.ContextualPopupDecorator", style: "position: absolute;z-index: 20;left:200px;",components: [
			{kind:"MovableButton", content:"Small"},
			{kind: "mochi.ContextualPopup", 
				title:"Small", 
			}
		]},		
		{kind: "mochi.ContextualPopupDecorator", style: "position: relative;z-index: 20;left:100px;top:100px;", components: [
			{kind:"MovableButton", content:"Wide"},
			{kind: "mochi.ContextualPopup", 
				title:"Wide", 
				actionButtons:[
					{content:"test1", classes: "mochi-button-warning"},
					{content:"test2"},
					{content:"test2"},							
					{content:"test3"}							
				], 
				components: [
					{content:"testing 1"},
					{content:"testing 2"},
					{content:"testing 3"},
					{content:"testing 4"},
					{content:"testing 5"},
					{content:"testing 6"}
				],
			}
		]},
		{kind: "mochi.ContextualPopupDecorator", style: "position: absolute;z-index: 20;left:200px;top:175px;", components: [
			{kind:"MovableButton", content:"Long"},
			{kind: "mochi.ContextualPopup", 
				maxHeight: "300",
				title:"Long", 
				actionButtons:[
					{content:"Press Me"}
				], 
				components: [
					{content:"testing 1"},
					{content:"testing 2"},
					{content:"testing 3"},
					{content:"testing 4"},
					{content:"testing 5"},
					{content:"testing 6"},
					{content:"testing 7"},
					{content:"testing 9"},
					{content:"testing 10"},
					{content:"testing 11"},
					{content:"testing 12"},
					{content:"testing 13"},
					{content:"testing 14"},
					{content:"testing 15"},
					{content:"testing 16"},
					{content:"testing 17"},
					{content:"testing 18"},
					{content:"testing 19"},
					{content:"testing 20"},
					{content:"testing 21"},
					{content:"testing 22"},
					{content:"testing 23"},
					{content:"testing 24"},
					{content:"testing 25"},
					{content:"testing 26"},
					{content:"testing 27"},
					{content:"testing 28"},
					{content:"testing 29"},
					{content:"testing 30"}
				],
			}
		]},
		{kind: "mochi.ContextualPopupDecorator", style: "position: absolute;z-index: 20;left:100px;top:300px;", components: [
			{kind:"MovableButton", content:"Modal"},
			{kind: "mochi.ContextualPopup", 
				style:"width:250px",
				title:"Modal", 
				autoDismiss: false,
				actionButtons:[
					{content:"Do Nothing", classes: "mochi-button-warning"},
					{content:"Dismiss", name:"dismiss_button"}
				],
				components: [
					{content:"Item 1"},
					{content:"Item 2"},
					{content:"Item 3"},
					{content:"Item 4"},
					{content:"Item 5"}										
				]
			}
		]},
		/*End of movable buttons/popups */
		
		{fit:true, kind:"FittableRows", components:[
			//Top row of buttons
			{components:[
				{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block", components: [
					{content: "Top Left"},
					{kind: "mochi.ContextualPopup", 
						title:"Top Left", 
						floating: true,
						actionButtons:[
							{content:"test1"}
						], 
						components: [
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 5"},
							{content:"testing 6"}
						],
					}
				]},

				{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;float:right", components: [
					{content: "Top Right"},
					{kind: "mochi.ContextualPopup", 
						title:"Top Right", 
						floating: true,
						actionButtons:[
							{content:"test1", classes: "mochi-button-warning"},
							{content:"test2"}
						], 
						components: [
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 5"},
							{content:"testing 6"}
						],
					}
				]}
			]},

			//Center row of buttons
			{fit:true, style:"padding-top:30%;", components:[
				{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;", components: [
					{content: "Center Left"},
					{kind: "mochi.ContextualPopup", 
						title:"Center Left", 
						floating: true,
						actionButtons:[
							{content:"test1", classes: "mochi-button-warning"},
							{content:"test2"}
						], 
						components: [
							{content:"testing 4"},
							{content:"testing 5"},
							{content:"testing 6"}
						],
					}
				]},

				{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;float:right", components: [
					{content: "Center Right"},
					{kind: "mochi.ContextualPopup", 
						title:"Center Right", 
						floating: true,
						actionButtons:[
							{content:"test1", classes: "mochi-button-warning"},
							{content:"test2"}
						], 
						components: [
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 5"},
							{content:"testing 6"}
						],
					}
				]}
			]},
			
			//Bottom row of buttons			
			{components:[
				{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;", components: [
					{content: "Bottom Left"},
					{kind: "mochi.ContextualPopup", 
						title:"Bottom Left", 
						actionButtons:[
							{content:"test1", classes: "mochi-button-warning"},
							{content:"test2"}
						], 
						components: [
							{content:"This"},
							{content:"popup"},							
							{content:"needs"},
							{content:"to"},
							{content:"be"},
							{content:"floated!"}
						],
					}
				]},

				{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;float:right", components: [
					{content: "Bottom Right"},
					{kind: "mochi.ContextualPopup", 
						title:"Bottom Right", 
						floating: true,
						actionButtons:[
							{content:"test1", classes: "mochi-button-warning"},
							{content:"test2"}
						], 
						components: [
							{content:"testing 1"},
							{content:"testing 2"},
							
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 1"},
							{content:"testing 2"},																					
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 5"},							
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 1"},
							{content:"testing 2"},																					
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 5"},							
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 1"},
							{content:"testing 2"},
							{content:"testing 1"},
							{content:"testing 2"},																					
							{content:"testing 3"},
							{content:"testing 4"},
							{content:"testing 5"},
							{content:"testing 6"}
						],
					}
				]}
			]}			
		]},
		{kind: "onyx.Toolbar", classes: "onyx-menu-toolbar", style:"background-color:lightgray", components: [
			{kind: "mochi.ContextualPopupDecorator", components: [
				{content:"Back"},
				{kind: "mochi.ContextualPopup", 
					title:"Back", 
					actionButtons:[
						{content:"test1", classes: "mochi-button-warning"},
						{content:"test2"}
					], 
					components: [
						{content:"testing 1"},
						{content:"testing 2"},
						{content:"testing 3"},
						{content:"testing 4"},
						{content:"testing 5"},
						{content:"testing 6"}
					]
				}
			]},
						
			{kind: "mochi.ContextualPopupDecorator", style:"float:right;", components: [
			{kind:mochi.Button, content:"Facebook +"},
				{kind: "mochi.ContextualPopup", name:"facebook",
					title:"Facebook +",
					autoDismiss: false,
					actionButtons:[
						{content:"test1", classes: "mochi-button-warning"},
						{content:"Dismiss", name:"dismiss_button"}
					], 
					components: [
						{content:"This"},
						{content:"popup"},
						{content:"has"},
						{content:"autoDismiss"},
						{content:"set"},
						{content:"to"},
						{content:"true."},
						{content:"Press Dismiss!"}
					]
				}
			]},
		]}
	],
	tapHandler: function(inSender, inEvent) {
		if (inEvent.actionButton) {
			enyo.log(inEvent.popup);	//info about popup it's coming from
			enyo.log("action button index: " + inEvent.originator.index); //index of action button			
			enyo.log("action button name: " + inEvent.originator.name); //name of action button (you can set this - see example use below)			
			
			if (inEvent.originator.name == "dismiss_button"){
				inEvent.popup.hide();
			}
		}
	}
});

/*This kind is implemented to allow for movable decorators/activator buttons & their corresponding popup so we can test
  all positions on the screen*/
enyo.kind({
	name: "MovableButton",
	kind:"enyo.Button",
	handlers: {
		ondrag:"drag"
	},
	applyPosition: function(inRect) {
		var s = ""
		for (n in inRect) {
			s += (n + ":" + inRect[n] + (isNaN(inRect[n]) ? "; " : "px; "));
		}
		this.parent.addStyles(s);
	},
	drag: function(inSender, inEvent) {
		var clientRect = this.hasNode().getBoundingClientRect();		
		this.applyPosition({top: inEvent.pageY, left:inEvent.pageX});
	}
});