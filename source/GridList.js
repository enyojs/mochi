/**
 	_mochi.GridList_ extends _enyo.GridList_ to add mochi styling 
*/

enyo.kind(
    {
        name: "mochi.GridList", 
        kind: "enyo.GridList", 
        itemFixedSize: true,
        classes: "mochi-gridlist"
    }   
);

enyo.kind(
	{
    	name: "mochi.GridList.ImageItem",
    	kind: "enyo.GridList.ImageItem",
    	classes: "mochi-gridlist-imageitem"
    }
);