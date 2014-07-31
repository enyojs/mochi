(function (enyo, scope) {
	/**
	 * `mochi.Popup` extends {@link enyo.Popup}
	 *
	 * An enhanced popup with built-in scrim and z-index handling. To avoid obscuring popup contents, scrims require
	 * the dialog to be floating; otherwise, they won't render. Modal popups get a transparent scrim by
	 * default, unless the modal popup isn't floating. To get a translucent scrim when modal, specify `scrim: true` and
	 * `scrimWhenModal: false`.
	 *
	 * @class mochi.Popup
	 * @extends enyo.Popup
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.Popup.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.Popup',

		/**
		 * @private
		 */
		kind: 'enyo.Popup',

		/**
		 * @private
		 */
		classes: 'mochi-popup',

		/**
		 * @private
		 */
		published: /** @lends mochi.Popup.prototype */ {
			/**
			 * Determines whether a scrim will appear when the dialog is modal. Note that modal scrims are
			 * transparent, so you won't see them.
			 *
			 * @type {Boolean}
			 * @default true
			 * @public
			 */
			scrimWhenModal: true,

			/**
			 * Determines whether or not to display a scrim. Only displays scrims when floating.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			scrim: false,

			/**
			 *Optional class name to apply to the scrim. Be aware that the scrim is a singleton and you will be
			 * modifying the scrim instance used for other popups.
			 *
			 * @type {String}
			 * @default ''
			 * @public
			 */
			scrimClassName: ''
		},

		/**
		 * @private
		 */
		statics: { count: 0 },

		/**
		 * @private
		 */
		defaultZ: 120,

		/**
		 * @private
		 */
		showingChanged: function () {
			if(this.showing) {
				mochi.Popup.count++;
				this.applyZIndex();
			}
			else {
				if(mochi.Popup.count > 0) {
					mochi.Popup.count--;
				}
			}
			this.showHideScrim(this.showing);
			this.inherited(arguments);
		},

		/**
		 * @private
		 */
		showHideScrim: function (inShow) {
			if (this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
				var scrim = this.getScrim();
				if (inShow) {
					// move scrim to just under the popup to obscure rest of screen
					var i = this.getScrimZIndex();
					this._scrimZ = i;
					scrim.showAtZIndex(i);
				} else {
					scrim.hideAtZIndex(this._scrimZ);
				}
				enyo.call(scrim, 'addRemoveClass', [this.scrimClassName, scrim.showing]);
			}
		},

		/**
		 * @private
		 */
		getScrimZIndex: function () {
			// Position scrim directly below popup
			return this.findZIndex()-1;
		},

		/**
		 * @private
		 */
		getScrim: function () {
			// show a transparent scrim for modal popups if scrimWhenModal is true
			// if scrim is true, then show a regular scrim.
			if (this.modal && this.scrimWhenModal && !this.scrim) {
				return mochi.scrimTransparent.make();
			}
			return mochi.scrim.make();
		},

		/**
		 * @private
		 */
		applyZIndex: function () {
			// Adjust the zIndex so that popups will properly stack on each other.
			this._zIndex = mochi.Popup.count * 2 + this.findZIndex() + 1;
			// leave room for scrim
			this.applyStyle('z-index', this._zIndex);
		},

		/**
		 * @private
		 */
		findZIndex: function () {
			// a default z value
			var z = this.defaultZ;
			if (this._zIndex) {
				z = this._zIndex;
			} else if (this.hasNode()) {
				// Re-use existing zIndex if it has one
				z = Number(enyo.dom.getComputedStyleValue(this.node, 'z-index')) || z;
			}
			return (this._zIndex = z);
		}
	});

})(enyo, this);
