/**
	A badge in the mochi style. 

		{kind: "mochi.Badge", content: "5"},
*/
enyo.kind({
	name: "mochi.Badge",
	classes: "enyo-tool-decorator mochi-badge",
	published: {
		background: '#69cdff',
		color: '#ffffff'
	},
	components: [
		{name: "inner", classes: "mochi-badge-inner"}
	],
	create: function() {
		this._origBackground = this.background;
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		this.contentChanged();
		this.backgroundChanged();
		this.colorChanged();
	},
	contentChanged: function() {
		if (this.content == '') {
			this.setBackground("transparent");
			this.$.inner.setContent('');
			return;
		} 
		this.setShowing(true);
		this.setBackground(this._origBackground);
		this.$.inner.setContent(this.content);
		if (this.content.toString().length > 2) {
			//Use an oval instead of a circle
			this.$.inner.removeClass("round");
			this.$.inner.addClass("oval");
		} else {
			//Revert back to a circle
			this.$.inner.removeClass("oval");
			this.$.inner.addClass("round");
		}
	},
	backgroundChanged: function() {
		this.$.inner.addStyles("background: " + this.background + ";");
	},
	colorChanged: function() {
		this.$.inner.addStyles("color: " + this.color + ";");
	}
});