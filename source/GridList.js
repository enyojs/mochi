(function (enyo, scope) {
	/**
	* _mochi.GridList_ extends _enyo.GridList_ to add mochi styling
	*
	* @ui
	* @class mochi.Checkbox
	* @extends mochi.RadioButton
	* @public	
	*/

	enyo.kind(
	 	/** @lends enyo.Control.prototype */ {
			
			/**
			* @private
			*/
			name: 'mochi.GridList',
			
			/**
			* @private
			*/ 
			kind: 'enyo.GridList', 
			
			/**
			* @private
			*/
			classes: 'mochi-gridlist',
			
			/**
			* @private
			*/
			itemFixedSize: true
		}
	);
	
	/**
	* _mochi.GridList_ extends _enyo.GridList_ to add mochi styling
	*
	* @ui
	* @class mochi.Checkbox
	* @extends mochi.RadioButton
	* @public	
	*/	

	enyo.kind (
		/** @lends enyo.Control.prototype */ {
			
			/**
			* @private
			*/
			name: 'mochi.GridList.ImageItem',
			
			/**
			* @private
			*/
			kind: 'enyo.GridList.ImageItem',
			
			/**
			* @private
			*/
			classes: 'mochi-gridlist-imageitem'
		}
	);

})(enyo, this);
