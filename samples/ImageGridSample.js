enyo.kind({
	name: "mochi.sample.ImageGridSample",
	classes: "mochi mochi-sample",
	kind: "FittableRows",
	components: [
		{classes: "mochi-subheader", content: "Image Grid"},
		{
			name: "imagegrid", kind: "mochi.ImageGrid", onSetupItem: "setupItem", 
			itemWidth: 120, itemHeight: 120, itemSpacing: 3
	    }
	],
	rendered: function() {
		this.inherited(arguments);
		this.search();
	},
	search: function() {
		var searchText = "Hurricane";
		var params = {
			method: "flickr.photos.search",
			format: "json",
			api_key: '2a21b46e58d207e4888e1ece0cb149a5',
			per_page: 200,
			page: 0,
			text: searchText,
			sort: 'date-posted-desc',
			extras: 'url_s'
		};
		new enyo.JsonpRequest({url: "http://api.flickr.com/services/rest/", callbackName: "jsoncallback"}).response(this, "processResults").go(params);
	},
	processResults: function(inRequest, inResponse) {
		this.results = inResponse.photos.photo;
		this.$.imagegrid.show(this.results.length);
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.results[i];
		this.$.imagegrid.setItemSource(item.url_s);
		this.$.imagegrid.setItemCaption(item.title);
	}
});