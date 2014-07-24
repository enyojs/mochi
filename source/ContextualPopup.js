(function (enyo, scope) {
   /**
	* Fires in response to a tap of an action button
	*
	* @event mochi.ContextualPopup#onTap
	* @type {Object}
	* @property {Object} originator - the action button which was tapped
	* @property {Boolean} actionButton - whether tap event comes from an action button
	* @property {Object} popup - reference to the Contextual Popup
	* @public
	*/

	/**
	* @event mochi.ContextualPopup#event:onRequestShowPopup
	* @type {Object}
	* @property {Object} activator - contains a reference to the activating object
	* @public
	*/

	/**
	* @event mochi.ContextualPopup#event:onRequestHidePopup
	* @type {Object}
	* @public
	*/

	/**
	* `mochi.ContextualPopup` is a subkind of {@link enyo.Popup}.
	* Contextual pop-ups serve as child windows that appear near the point of initiation.
	* Use them for:
	*
	* - Selection from a discreet set of values
	* - Quick, single step interactions where context should be maintained
	* - Simple views (such as previews)
	*
	* They are meant to be used in conjunction with a
	* {@link mochi.ContextualPopupDecorator}. The decorator
	* couples the popup with an activating control, which may be a button or any other
	* control with an `onActivate` event. When the control is activated, the popup
	* shows itself in the correct position relative to the activator. Note that by default
	* the popup is not floating, so toolbars & high z-index controls may obscure it. You may
	* set floating to true to have the popup always on top, however the popup will not be in the
	* containing document flow and will not scroll with the document.
	*
	* ```javascript
	* {kind: 'mochi.ContextualPopupDecorator', components: [
	* 	{content: 'Show Popup'},
	* 	{
	*		kind: 'mochi.ContextualPopup',
	* 		title:'Sample Popup',
	* 		actionButtons:[
	* 			{content:'Button 1', classes: 'mochi-button-warning'},
	* 			{content:'Button 2'}
	* 		],
	* 		components: [
	* 			{content:'Sample component in popup'}
	* 		]
	* 	}
	* ]}
	* ```
	*
	* @ui
	* @class mochi.ContextualPopup
	* @extends enyo.Popup
	* @public
	*/

	enyo.kind(
		/** @lends mochi.ContextualPopup.prototype */ {

		/**
		* @private
		*/
		name: 'mochi.ContextualPopup',

		/**
		* @private
		*/
		kind: 'enyo.Popup',

		/**
		* @private
		*/
		modal: true,

		/**
		* @private
		*/
		autoDismiss: true,

		/**
		* @private
		*/
		floating:false,

		/**
		* @private
		*/
		classes: 'mochi-contextual-popup enyo-unselectable',

		/**
		* @private
		* @lends mochi.ContextualPopup.prototype
		*/
		published: {

			/**
			* Maximum height of the menu
			*
			* @type {Number}
			* @default 100
			* @public
			*/
			maxHeight: 100,

			/**
			* Toggle scrolling
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			scrolling: true,

			/**
			* Popup title content
			*
			* @type {String}
			* @default undefined
			* @public
			*/
			title: undefined,

			/**
			* Buttons at bottom of popup
			*
			* @type {Object[]}
			* @default []
			* @public
			*/
			actionButtons: []
		},

		//layout parameters
		/**
		* vertical flush layout margin
		*
		* @private
		*/
		vertFlushMargin:100,

		/**
		* horizontal flush layout margin
		*
		* @private
		*/
		horizFlushMargin:100,

		/**
		* popups wider than this value are considered wide (for layout purposes)
		*
		* @private
		*/
		widePopup:200,

		/**
		* popups longer than this value are considered long (for layout purposes)
		*
		* @private
		*/
		longPopup:200,

		/**
		* do not allow horizontal flush popups past spec'd amount of buffer space on left/right
		* screen edge
		*
		* @private
		*/
		horizBuffer:16,

		/**
		* @private
		*/
		events: {

			/**
			* {@link mochi.ContextualPopup#event:onTap}
			*/
			onTap: ''
		},

		/**
		* @private
		*/
		handlers: {
			onRequestShowPopup: 'requestShow',
			onRequestHidePopup: 'requestHide'
		},

		/**
		* @private
		*/
		components: [
			{name:'title', classes:'mochi-contextual-popup-title'},
			{classes:'mochi-contextual-popup-scroller', components:[
				{name:'client', kind: 'enyo.Scroller', vertical:'auto', classes:'enyo-unselectable', thumb:false, strategyKind: 'TouchScrollStrategy'}
			]},
			{name:'actionButtons', classes:'mochi-contextual-popup-action-buttons'}
		],

		/**
		* @private
		*/
		scrollerName: 'client',

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
		    this.maxHeightChanged();
			this.titleChanged();
			this.actionButtonsChanged();
		},

		/**
		* @private
		*/
		getScroller: function () {
			return this.$[this.scrollerName];
		},

		/**
		* @private
		*/
		titleChanged: function (){
			this.$.title.setContent(this.title);
		},

		/**
		* @private
		*/
		actionButtonsChanged: function (){
			for (var i=0;i<this.actionButtons.length;i++){
				this.$.actionButtons.createComponent({
					kind:'mochi.Button',
					content:this.actionButtons[i].content,
					classes: this.actionButtons[i].classes,
					name: this.actionButtons[i].name ? this.actionButtons[i].name : 'ActionButton'+i,
					index: i,
					tap: enyo.bind(this,this.tapHandler)
				})
			}
		},

		/**
		* @private
		*/
		tapHandler: function (inSender, inEvent){
			//The action button tap event appears to come from an enyo.button,
			//make it come from the action button directly
			inEvent.originator = inEvent.originator.owner;
			inEvent.actionButton = true;
			inEvent.popup = this;
			this.bubble('ontap',inEvent);
			return true;
		},

		/**
		* @private
		*/
		maxHeightChanged: function () {
		    this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + 'px') : enyo.nop;
		},

		/**
		* @private
		*/
		showingChanged: function () {
			this.inherited(arguments);
			this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop;
			this.adjustPosition();
		},

		/**
		* @private
		*/
		requestShow: function (inSender, inEvent) {
			var n;
			//if it's a mochi button then get the wrapping decorator as the activator for proper positioning
			if (inEvent.activator && inEvent.activator.parent.kind == 'mochi.Button'){
				n = inEvent.activator.parent.parent.hasNode();
			} else {
				n = inEvent.activator.hasNode();
			}

			if (n) {
				this.activatorOffset = this.getPageOffset(n);
			}
			this.show();
			return true;
		},

		/**
		* @private
		*/
		applyPosition: function (inRect) {
			var s = ''
			for (n in inRect) {
				s += (n + ':' + inRect[n] + (isNaN(inRect[n]) ? '; ' : 'px; '));
			}
			this.addStyles(s);
		},

		/**
		* @private
		*/
		getPageOffset: function (inNode) {
			var r = this.getBoundingRect(inNode);

			var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
			var pageXOffset = (window.pageXOffset === undefined) ? document.documentElement.scrollLeft : window.pageXOffset;
			var rHeight = (r.height === undefined) ? (r.bottom - r.top) : r.height;
			var rWidth = (r.width === undefined) ? (r.right - r.left) : r.width;

			return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth};
		},

		/**
		* Adjusts the popup position + nub location & direction
		*
		* ContextualPopup positioning rules:
		* 	1. Activator Location:
		* 		a. If activator is located in a corner then position using a flush style.
		* 			i.  Attempt vertical first.
		* 			ii. Horizontal if vertical doesn't fit.
		* 		b. If not in a corner then check if the activator is located in one of the 4 'edges' of the
		* 			view & position the following way if so:
		* 				i.   Activator is in top edge, position popup below it.
		* 				ii.  Activator is in bottom edge, position popup above it.
		* 				iii. Activator is in left edge, position popup to the right of it.
		* 				iv.  Activator is in right edge, position popup to the left of it.
		*
		* 	2. Screen Size - the pop-up should generally extend in the direction where there’s room
		* 		for it. Note: no specific logic below for this rule since it is built into the positioning
		* 		functions, ie we attempt to never position a popup where there isn't enough room for it.
		*
		* 	3. Popup Size:
		* 		i.  If popup content is wide, use top or bottom positioning.
		* 		ii. If popup content is long, use horizontal positioning.
		*
		* 	4. Favor top or bottom:
		* 		If all the above rules have been followed and location can still vary then favor top or
		* 		bottom positioning.
		*
		* 	5. If top or bottom will work, favor bottom.
		* 		Note: no specific logic below for this rule since it is built into the vertical position
		* 		functions, ie we attempt to use a bottom position for the popup as much possible.
		* 		Additionally within the vetical position function we center the popup if the activator
		* 		is at the vertical center of the view.
		*
		* @private
		*/
		adjustPosition: function () {
			if (this.showing && this.hasNode()) {
				this.resetPositioning();
				var innerWidth = this.getViewWidth();
				var innerHeight = this.getViewHeight();

				//These are the view 'flush boundaries'
				var topFlushPt = this.vertFlushMargin;
				var bottomFlushPt = innerHeight - this.vertFlushMargin;
				var leftFlushPt = this.horizFlushMargin;
				var rightFlushPt = innerWidth - this.horizFlushMargin;

				//Rule 1 - Activator Location based positioning
				//if the activator is in the top or bottom edges of the view, check if the popup needs flush positioning
				if ((this.activatorOffset.top + this.activatorOffset.height) < topFlushPt || this.activatorOffset.top > bottomFlushPt) {
					//check/try vertical flush positioning	(rule 1.a.i)
					if (this.applyVerticalFlushPositioning(leftFlushPt, rightFlushPt)) {
						return;
					}

					//if vertical doesn't fit then check/try horizontal flush (rule 1.a.ii)
					if (this.applyHorizontalFlushPositioning(leftFlushPt, rightFlushPt)) {
						return;
					}

					//if flush positioning didn't work then try just positioning vertically (rule 1.b.i & rule 1.b.ii)
					if (this.applyVerticalPositioning()){
						return;
					}
				//otherwise check if the activator is in the left or right edges of the view & if so try horizontal positioning
				} else if ((this.activatorOffset.left + this.activatorOffset.width) < leftFlushPt || this.activatorOffset.left > rightFlushPt) {
					//if flush positioning didn't work then try just positioning horizontally (rule 1.b.iii & rule 1.b.iv)
					if (this.applyHorizontalPositioning()){
						return;
					}
				}

				//Rule 2 - no specific logic below for this rule since it is inheritent to the positioning functions, ie we attempt to never
				//		   position a popup where there isn't enough room for it.

				//Rule 3 - Popup Size based positioning
				var clientRect = this.getBoundingRect(this.node);

				//if the popup is wide then use vertical positioning
				if (clientRect.width > this.widePopup) {
					if (this.applyVerticalPositioning()){
						return;
					}
				}
				//if the popup is long then use horizontal positioning
				else if (clientRect.height > this.longPopup) {
					if (this.applyHorizontalPositioning()){
						return;
					}
				}

				//Rule 4 - Favor top or bottom positioning
				if (this.applyVerticalPositioning()) {
					return;
				}
				//but if thats not possible try horizontal
				else if (this.applyHorizontalPositioning()){
					return;
				}

				//Rule 5 - no specific logic below for this rule since it is built into the vertical position functions, ie we attempt to
				//         use a bottom position for the popup as much possible.
			}
		},

		/**
		* move the popup below or above the activator & verify that it fits on screen
		*
		* @private
		*/
		initVerticalPositioning: function () {
			this.resetPositioning();
			this.addClass('vertical');

			var clientRect = this.getBoundingRect(this.node);
			var innerHeight = this.getViewHeight();

			if (this.floating){
				if (this.activatorOffset.top < (innerHeight / 2)) {
					this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height, bottom: 'auto'});
					this.addClass('below');
				} else {
					this.applyPosition({top: this.activatorOffset.top - clientRect.height, bottom: 'auto'});
					this.addClass('above');
				}
			} else {
				//if the popup's bottom goes off the screen then put it on the top of the invoking control
				if ((clientRect.top + clientRect.height > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))){
					this.addClass('above');
				} else {
					this.addClass('below');
				}
			}

			//if moving the popup above or below the activator puts it past the edge of the screen then vertical doesn't work
			clientRect = this.getBoundingRect(this.node);
			if ((clientRect.top + clientRect.height) > innerHeight || clientRect.top < 0){
				return false;
			}

			return true;
		},

		/**
		* @private
		*/
		applyVerticalPositioning: function () {
			//if we can't fit the popup above or below the activator then forget vertical positioning
			if (!this.initVerticalPositioning()) {
				return false;
			}

			var clientRect = this.getBoundingRect(this.node);
			var innerWidth = this.getViewWidth();

			if (this.floating){
				//Get the left edge delta to horizontally center the popup
				var centeredLeft = this.activatorOffset.left + this.activatorOffset.width/2 - clientRect.width/2;
				if (centeredLeft + clientRect.width > innerWidth) {//popup goes off right edge of the screen if centered
					this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.width});
					this.addClass('left');
				} else if (centeredLeft < 0) {//popup goes off left edge of the screen if centered
					this.applyPosition({left:this.activatorOffset.left});
					this.addClass('right');
				} else {//center the popup
					this.applyPosition({left: centeredLeft});
				}

			} else {
				//Get the left edge delta to horizontally center the popup
				var centeredLeftDelta = this.activatorOffset.left + this.activatorOffset.width/2 - clientRect.left - clientRect.width/2;
				if (clientRect.right + centeredLeftDelta > innerWidth) {//popup goes off right edge of the screen if centered
					this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.right});
					this.addRemoveClass('left', true);
				} else if (clientRect.left + centeredLeftDelta < 0) {//popup goes off left edge of the screen if centered
					this.addRemoveClass('right', true);
				} else {//center the popup
					this.applyPosition({left: centeredLeftDelta});
				}
			}

			return true;
		},

		/**
		* @private
		*/
		applyVerticalFlushPositioning: function (leftFlushPt, rightFlushPt) {
			//if we can't fit the popup above or below the activator then forget vertical positioning
			if (!this.initVerticalPositioning()) {
				return false;
			}

			var clientRect = this.getBoundingRect(this.node);
			var innerWidth = this.getViewWidth();

			//If the activator's right side is within our left side cut off use flush positioning
			if ((this.activatorOffset.left + this.activatorOffset.width/2) < leftFlushPt){
				//if the activator's left edge is too close or past the screen left edge
				if (this.activatorOffset.left + this.activatorOffset.width/2 < this.horizBuffer){
					this.applyPosition({left:this.horizBuffer + (this.floating ? 0 : -clientRect.left)});
				} else {
					this.applyPosition({left:this.activatorOffset.width/2  + (this.floating ? this.activatorOffset.left : 0)});
				}

				this.addClass('right');
				this.addClass('corner');
				return true;
			}
			//If the activator's left side is within our right side cut off use flush positioning
			else if (this.activatorOffset.left + this.activatorOffset.width/2 > rightFlushPt) {
				if ((this.activatorOffset.left+this.activatorOffset.width/2) > (innerWidth-this.horizBuffer)){
					this.applyPosition({left:innerWidth - this.horizBuffer - clientRect.right});
				} else {
					this.applyPosition({left: (this.activatorOffset.left + this.activatorOffset.width/2) - clientRect.right});
				}
				this.addClass('left');
				this.addClass('corner');
				return true;
			}

			return false;
		},

		/**
		* move the popup left or right of the activator & verify that it fits on screen
		*
		* @private
		*/
		initHorizontalPositioning: function () {
			this.resetPositioning();

			var clientRect = this.getBoundingRect(this.node);
			var innerWidth = this.getViewWidth();

			//adjust horizontal positioning of the popup & nub vertical positioning
			if (this.floating){
				if ((this.activatorOffset.left + this.activatorOffset.width) < innerWidth/2) {
					this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width});
					this.addRemoveClass('left', true)
				} else {
					this.applyPosition({left: this.activatorOffset.left - clientRect.width});
					this.addRemoveClass('right', true);
				}
			} else {
				if (this.activatorOffset.left - clientRect.width > 0) {
					this.applyPosition({left: this.activatorOffset.left - clientRect.left - clientRect.width});
					this.addRemoveClass('right', true);
				} else {
					this.applyPosition({left: this.activatorOffset.width});
					this.addRemoveClass('left', true);
				}
			}
			this.addRemoveClass('horizontal', true);

			//if moving the popup left or right of the activator puts it past the edge of the screen then horizontal won't work
			clientRect = this.getBoundingRect(this.node);
			if (clientRect.left < 0 || (clientRect.left + clientRect.width) > innerWidth){
				return false;
			}
			return true;

		},

		/**
		* @private
		*/
		applyHorizontalPositioning: function () {
			//if we can't fit the popup left or right of the activator then forget horizontal positioning
			if (!this.initHorizontalPositioning()) {
				return false;
			}

			var clientRect = this.getBoundingRect(this.node);
			var innerHeight = this.getViewHeight();
			var activatorCenter = this.activatorOffset.top + this.activatorOffset.height/2;

			if (this.floating){
				//if the activator's center is within 10% of the center of the view, vertically center the popup
				if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
					this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height/2 - clientRect.height/2, bottom: 'auto'});
				} else if (this.activatorOffset.top + this.activatorOffset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
					this.applyPosition({top: this.activatorOffset.top - this.activatorOffset.height, bottom: 'auto'});
					this.addRemoveClass('high', true);
				} else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
					this.applyPosition({top: this.activatorOffset.top - clientRect.height + this.activatorOffset.height*2, bottom: 'auto'});
					this.addRemoveClass('low', true);
				}
			} else {
				//if the activator's center is within 10% of the center of the view, vertically center the popup
				if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
					this.applyPosition({top: (this.activatorOffset.height - clientRect.height)/2});
				} else if (this.activatorOffset.top + this.activatorOffset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
					this.applyPosition({top: -this.activatorOffset.height});
					this.addRemoveClass('high', true);
				} else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
					this.applyPosition({top: clientRect.top - clientRect.height - this.activatorOffset.top + this.activatorOffset.height});
					this.addRemoveClass('low', true);
				}
			}
			return true;
		},

		/**
		* @private
		*/
		applyHorizontalFlushPositioning: function (leftFlushPt, rightFlushPt) {
			//if we can't fit the popup left or right of the activator then forget vertical positioning
			if (!this.initHorizontalPositioning()) {
				return false;
			}

			var clientRect = this.getBoundingRect(this.node);
			var innerWidth = this.getViewWidth();

			//adjust vertical positioning (high or low nub & popup position)
			if (this.floating){
				if (this.activatorOffset.top < (innerHeight/2)){
					this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height/2});
					this.addRemoveClass('high', true);
				} else {
					this.applyPosition({top:this.activatorOffset.top + this.activatorOffset.height/2 - clientRect.height});
					this.addRemoveClass('low', true);
				}
			} else {
				if (((clientRect.top + clientRect.height) > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))) {
					this.applyPosition({top: clientRect.top - clientRect.height - this.activatorOffset.top - this.activatorOffset.height/2});
					this.addRemoveClass('low', true);
				} else {
					this.applyPosition({top: this.activatorOffset.height/2});
					this.addRemoveClass('high', true);
				}
			}

			//If the activator's right side is within our left side cut off use flush positioning
			if ((this.activatorOffset.left + this.activatorOffset.width) < leftFlushPt){
				this.addClass('left');
				this.addClass('corner');
				return true;
			}
			//If the activator's left side is within our right side cut off use flush positioning
			else if (this.activatorOffset.left > rightFlushPt) {
				this.addClass('right');
				this.addClass('corner');
				return true;
			}

			return false;
		},

		/**
		* @private
		*/
		getBoundingRect:  function (inNode){
			// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
			var o = inNode.getBoundingClientRect();
			if (!o.width || !o.height) {
				return {
					left: o.left,
					right: o.right,
					top: o.top,
					bottom: o.bottom,
					width: o.right - o.left,
					height: o.bottom - o.top
				};
			}
			return o;
		},

		/**
		* @private
		*/
		getViewHeight: function () {
			return (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
		},

		/**
		* @private
		*/
		getViewWidth: function () {
			return (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;
		},

		/**
		* @private
		*/
		resetPositioning: function () {
			this.removeClass('right');
			this.removeClass('left');
			this.removeClass('high');
			this.removeClass('low');
			this.removeClass('corner');
			this.removeClass('below');
			this.removeClass('above');
			this.removeClass('vertical');
			this.removeClass('horizontal');

			this.applyPosition({left: 'auto'});
			this.applyPosition({top: 'auto'});
		},

		/**
		* @private
		*/
		resizeHandler: function () {
			this.inherited(arguments);
			this.adjustPosition();
		},

		/**
		* @private
		*/
		requestHide: function (){
			this.setShowing(false);
		}
	});

})(enyo, this);
