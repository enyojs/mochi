(function (enyo, scope) {

	enyo.kind(
		{
		
		/**
		* @private
		*/	
		name: 'mochi.List',
		
		/**
		* @private
		*/	
		kind: 'enyo.List',
		
		/**
		* @private
		*/	
		scrollFade: [
			{name: 'scrollFade', kind:'mochi.ScrollFade'}
		],	
		
		/**
		* @private
		*/	
		handlers:{
			ondrag: 'dragHandler',
			onScrollStart: 'scrollStartHandler',
			onScrollStop: 'scrollStopHandler'
		},
		
		//* @protected
		// Sets touch to true in inherited Scroller kind for touch-based scrolling strategy, required for ScrollStart events on desktop
		/**
		* @private
		*/	
		touch:true,
		
		/**
		* @private
		*/	
		horizontal:'hidden',
		
		/**
		* @private
		*/	
		thumb:false,
		
		/**
		* @private
		*/	
		yVals:[], //consecutive y-axis scroll values used to determine average scroll direction
		
		/**
		* @private
		*/	
		scrollEventsReq: 10, //number of scroll values to collect to determine average scroll direction
		
		/**
		* @private
		*/	
		yDirection: undefined, //vertical direction list is moving
		
		/**
		* @private
		*/	
		initComponents: function () {
			this.createChrome(this.scrollFade);
			this.inherited(arguments);			
		},
		
		//use drag events on available platforms to determine scroll direction
		/**
		* @private
		*/	
		dragHandler:function (inSender,inEvent){
			this.updateScrollFade(inEvent.yDirection);
			enyo.job.stop('hideFade');
		},
		
		//&/or use scroll start events (except iOS) to determine scroll direction
		/**
		* @private
		*/	
		scrollStartHandler: function (inSender, inEvent) {
			//do not use on iOS
			if (enyo.platform.ios) {
				return;
			}
		
			//if we've collected enough scroll values to determine the scroll direction then update the fade
			if (this.yVals.length == this.scrollEventsReq) {
				this.updateScrollFade(this.yVals[this.scrollEventsReq-1] - this.yVals[0])
				this.yVals = [];
			} else {
				this.yVals.push(inEvent.originator.y);
			}
			enyo.job.stop('hideFade'); //cancel hiding the scroll fade if we're scrolling
		},
		
		/**
		* @private
		*/	
		scrollStopHandler: function (inSender, inEvent) {
			//hide the fade in 100ms - gives enough time to cancel the hide if this isn't an intended scroll stop event
			enyo.job('hideFade', enyo.bind(this.$.scrollFade, this.$.scrollFade.hideFade), 100);			
		},
		
		//show/hide the scroll fade based on the scrolling direction
		/**
		* @private
		*/	
		updateScrollFade: function (direction) {
			if (direction < 0) {
				//they switched directions, hide the showing fade now			
				if (this.yDirection > 0){
					this.$.scrollFade.hideFade();
				}
				this.$.scrollFade.fade('top');
				this.yDirection = -1;
			} else {
				//they switched directions, hide the showing fade now			
				if (this.yDirection < 0){
					this.$.scrollFade.hideFade();
				}
				this.$.scrollFade.fade('bottom');
				this.yDirection = 1;
			}
		}
	})

	enyo.kind(
		{
		
		/**
		* @private
		*/	
		name: 'mochi.ScrollFade',
		
		/**
		* @private
		*/	
		classes: 'mochi-list-scroll-fade',
		
		/**
		* @private
		*/	
		components:[
			{name:'top', showing:false, components: [
				{classes:'mochi-list-scroll-fade-row row-1'},
				{classes:'mochi-list-scroll-fade-row row-2'},
				{classes:'mochi-list-scroll-fade-row row-3'},
				{classes:'mochi-list-scroll-fade-row row-4'}
			]},
			{name:'bottom', showing:false, components: [
				{classes:'mochi-list-scroll-fade-row row-4'},
				{classes:'mochi-list-scroll-fade-row row-3'},
				{classes:'mochi-list-scroll-fade-row row-2'},
				{classes:'mochi-list-scroll-fade-row row-1'}
			]}
		],
		
		/**
		* @private
		*/	
		fade: function (position) {
			if (!this.fadeLocked){
				this.fadeLocked = true;
				this.addClass(position);
				this.$[position].show();
				this.show();
			}
		},
		
		/**
		* @private
		*/	
		hideFade: function () {
			this.$.top.hide();		
			this.$.bottom.hide();
			this.removeClass('top');				
			this.removeClass('bottom');		
			this.hide();	
			this.fadeLocked = false;		
		}
		
	});

})(enyo, this);
