(function (enyo, scope) {
	/**
	* @ui
	* @class mochi.CollapsableHeader
	* @extends enyo.Control
	* @public
	*/	
	
	enyo.kind(
		/** @lends mochi.CollapsableHeader.prototype */ {
			
		/**
		* @private
		*/
		name: 'mochi.CollapsableHeader',
		
		/**
		* @private
		*/
		kind: 'enyo.Control',
		
		/**
		* @private
		*/
		classes: 'mochi-collapsable-header'
	});

	/**
	* @ui
	* @class mochi.CollapsableItem
	* @extends enyo.Control
	* @public
	*/	
	enyo.kind(
		/** @lends mochi.CollapsableItem.prototype */ {
			
		/**
		* @private
		*/
		name: 'mochi.CollapsableItem',
		
		/**
		* @private
		*/
		kind: 'enyo.Control',
		
		/**
		* @private
		*/
		classes: 'mochi-collapsable-item'
	});

	/**
	* @ui
	* @class mochi.CollapsableFooter
	* @extends enyo.Control
	* @public
	*/	
	enyo.kind(
		/** @lends enyo.Control.prototype */ {
			
		/**
		* @private
		*/
		name: 'mochi.CollapsableFooter',
		
		/**
		* @private
		*/
		kind: 'enyo.Control',
		
		/**
		* @private
		*/
		classes: 'mochi-collapsable-footer'
	})

})(enyo, this);
