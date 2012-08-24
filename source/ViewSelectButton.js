/**
	A modified "enyo.Button" control intended to be used
	only within a "mochi.ViewSelectButton".
	
*/
enyo.kind({
	name: "mochi.ViewSelectButtonItem",
	kind: "enyo.Button",
	classes: "mochi-button-base",
	contentWidth: 0,
	rendered: function() {
		this.inherited(arguments);

		this.contentWidth = this.getBounds().width;
		// Resize the button to fit ViewSelectButtonItem kerning state
		// (current-width + ((string-length + arbitrary padding) * size-of-letter-spacing))
		this.applyStyle("width", (this.contentWidth + ((this.content.length + 2) * 2) ) + "px");
	}
});

/**
	A group of "mochi.ViewSelectButtonItem" objects laid out horizontally, 
	with "mochi.ButtonDecorator" end-caps. Within the same button group, 
	tapping on one button will release any previously tapped button.
	
		{kind: "mochi.ViewSelectButton", onActivate: "buttonActivated", components: [
			{content: "Cats", active: true},
			{content: "Dogs"},
			{content: "Bears"}
		]}
*/
enyo.kind({
	name: "mochi.ViewSelectButton",
	kind: "enyo.Group",
	defaultKind: "mochi.ViewSelectButtonItem",
	classes: "enyo-tool-decorator mochi-view-select-button",
	published: {
		barClasses: ""
	},
	handlers: {
		onActivate: "activate"
	},
	moreComponents: [
		{kind: "mochi.ButtonDecoratorLeft", prepend: true},
		{kind: "mochi.ButtonDecoratorRight"},
		{kind: "enyo.Control", name: "bar", classes: "mochi-button-bar"},
		{kind: "enyo.Animator", onStep: "animatorStep", onEnd: "animatorEnd"}
	],
	componentsRendered: false,
	lastBarPos: 0,
	create: function() {
		this.inherited(arguments);
		this.createComponents(this.moreComponents);
	},
	rendered: function() {
		this.inherited(arguments);
		this.barClassesChanged();
		this.init();
	},
	init: function() {
		this.componentsRendered = true;
		this.calcBarValue(this.active);
	},
	barClassesChanged: function(inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},
	animatorStep: function(inSender) {
		this.updateBarPosition(this.$.bar, inSender.value);
	},
	updateBarPosition: function(inControl, inValue) {
		var xPos = inValue + "px";
		if (enyo.dom.canTransform()) {
			enyo.dom.transform(inControl, {translateX: xPos});
		} else {
			inControl.applyStyle("left", xPos);
		}
	},
	calcBarValue: function(activeItem) {
		if ((this.active) && (this.componentsRendered)) {

			if (this.active.kind === "mochi.ViewSelectButtonItem") {
				this.$.bar.applyStyle("width", activeItem.contentWidth + "px");

				// IE8 doesn't return getBoundingClientRect().width, so we calculate from right/left. Who cares ... it's IE8 ... I know
				//var differential = activeItem.hasNode().getBoundingClientRect().width - activeItem.contentWidth;
				var differential = (activeItem.hasNode().getBoundingClientRect().right - activeItem.hasNode().getBoundingClientRect().left) - activeItem.contentWidth;
				var xPos = this.getCSSProperty(activeItem, "offsetLeft", false) + (differential / 2);

			} else if (this.active.kind === "mochi.IconButtonItem") {
				this.$.bar.applyStyle("width", 25 + "px");
				var xPos = this.getCSSProperty(activeItem, "offsetLeft", false) + 5;
			}
			
			this.$.animator.play({
				startValue: this.lastBarPos,
				endValue: xPos,
				node: this.$.bar.hasNode()
			});
			this.lastBarPos = xPos;
		}
	},
	activate: function(inSender, inEvent) {
		if (this.highlander) {
			// deactivation messages are ignored unless it's an attempt
			// to deactivate the highlander
			if (!inEvent.originator.active) {
				// this clause prevents deactivating a grouped item once it's been active.
				// the only proper way to deactivate a grouped item is to choose a new
				// highlander.
				if (inEvent.originator === this.active) {
					this.active.setActive(true);
				}
			} else {
				this.setActive(inEvent.originator);
				this.calcBarValue(inEvent.originator);
			}
		}
	},
	getCSSProperty: function(target, property, style) {
		if (target.hasNode()) return (style) ? target.node.style[property] : target.node[property];
	}
});
