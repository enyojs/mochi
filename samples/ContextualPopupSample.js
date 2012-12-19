enyo.kind({
	name: "mochi.sample.ContextualPopupSample",
	kind: "FittableRows",
	classes: "enyo-fit mochi mochi-sample enyo-fit",
	handlers: {
		ontap: "tapHandler"
	},	
	components: [
		{kind: "onyx.Toolbar", name:"topToolbar", classes: "onyx-menu-toolbar", style:"background-color:lightgray", components: [
			{kind:"FittableColumns", style:"width:100%;", components:[		
				{kind: "mochi.ContextualPopupDecorator", components: [
					{kind:onyx.IconButton, src: "assets/menu-icon-bookmark.png"},
					{kind: "mochi.ContextualPopup",
						title:"Toolbar Button",
						floating:true,					
						actionButtons:[
							{content:"test1", classes: "onyx-button-warning"},
							{content:"test2"}
						],
						components: [
							{content:"testing 1"},
							{content:"testing 2"}
						]
					}
				]},
				{kind: "mochi.ContextualPopupDecorator", fit:true, style:"position:absolute;right:0;", components: [
					{kind:onyx.IconButton, src: "assets/menu-icon-bookmark.png"},
					{kind: "mochi.ContextualPopup",
						title:"Toolbar Button",
						floating:true,					
						actionButtons:[
							{content:"test1", classes: "onyx-button-warning"},
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
				]}
			]}
		]},
		{kind: "Scroller", fit: true, thumb:false, components:[
			{name:"buttonContainer", kind:"FittableRows", classes:"mochi-contextualpopup-button-container enyo-fit", components:[
				//Top row of buttons
				{components:[
					{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block", components: [
						{content: "Average"},
						{kind: "mochi.ContextualPopup",
							title:"Average",
							floating:true,
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

					{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;float:right", components: [
						{content:"Small"},
						{kind: "mochi.ContextualPopup",
							title:"Small",
							floating:true
						}
					]}
				]},
				//Center row of buttons
				{fit:true, style:"padding-top:15%;padding-bottom:15%;", components:[
					{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;", components: [
						{content: "Wide"},
						{kind: "mochi.ContextualPopup",
							style:"width:200px",
							floating:true,
							actionButtons:[
								{content:"test1", classes: "onyx-button-warning"},
								{content:"test2"}
							],
							components: [
								{kind: "Scroller", style:"min-width:150px;", horizontal:"auto",  touch:true, thumb:false,  components:[							
									{content:"testing 1"},
									{content:"testing 2"}
								]}
							]
						}
					]},
					{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;float:right", components: [
						{content:"Long"},
						{kind: "mochi.ContextualPopup",
							maxHeight: "200",
							title:"Long",
							floating:true,
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
							]
						}
					]}
				]},
				//Bottom row of buttons
				{components:[
					{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;", components: [
						{content: "Press Me"},
						{kind: "mochi.ContextualPopup",
							title:"Press Me",
							floating:true,
							actionButtons:[
								{content:"test1", classes: "onyx-button-warning"},
								{content:"test2"}
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
								{content:"testing 10"}
							]
						}
					]},
					{kind: "mochi.ContextualPopupDecorator", style:"display:inline-block;float:right", components: [
						{content:"Try Me"},
						{kind: "mochi.ContextualPopup",
							title:"Try Me",
							floating:true,
							actionButtons:[
								{content:"Do Nothing", classes: "onyx-button-warning"},
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
					]}
				]}
			]},
		]},
		{kind: "onyx.Toolbar", name:"bottomToolbar", classes: "onyx-menu-toolbar", style:"background-color:lightgray", components: [
			{kind:"FittableColumns", style:"width:100%;", components:[			
				{kind: "mochi.ContextualPopupDecorator", components: [
					{kind:onyx.IconButton, src: "assets/menu-icon-bookmark.png"},
					{kind: "mochi.ContextualPopup",
						title:"Toolbar Button",
						floating:true,					
						actionButtons:[
							{content:"test1", classes: "onyx-button-warning"},
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
				{kind: "mochi.ContextualPopupDecorator", fit:true, style:"position:absolute;right:0;", components: [
					{kind:onyx.IconButton, src: "assets/menu-icon-bookmark.png"},
					{kind: "mochi.ContextualPopup", name:"facebook",
						title:"Toolbar Button",
						floating:true,					
						actionButtons:[
							{content:"test1", classes: "onyx-button-warning"},
							{content:"Dismiss", name:"dismiss_button"}
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
				]}
			]}
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