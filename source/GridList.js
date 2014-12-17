(function (enyo, scope) {
	/**
	* `mochi.GridList` extends `enyo.GridList` to add mochi styling
	*
	* @ui
	* @class mochi.GridList
	* @extends enyo.GridList
	* @public
	*/

	enyo.kind(
	 	/** @lends mochi.GridList.prototype */ {

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
	* @ui
	* @class mochi.GridList.ImageItem
	* @extends enyo.GridList.ImageItem
	* @public
	*/
	enyo.kind (
		/** @lends mochi.GridList.ImageItem */ {

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
