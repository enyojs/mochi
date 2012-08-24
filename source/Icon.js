/**
	A control that displays an icon. The icon image is specified by setting the
	*src* property to a URL.

	In mochi, icons have a size of 32x32 pixels. Since the icon image is applied
	as a CSS background, the height and width of an icon must be set if an image
	of a different size is used.

		{kind: "mochi.Icon", src: "images/search.png"}

	When an icon should act like a button, use an <a href="#mochi.IconButton">mochi.IconButton</a>.

*/
enyo.kind({
	name: "mochi.Icon",
	published: {
		// url path specifying the icon image
		src: ""
	},
	classes: "mochi-icon",
	//* @protected
	create: function() {
		this.inherited(arguments);
		if (this.src) {
			this.srcChanged();
		}
	},
	srcChanged: function() {
		this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
	}
});