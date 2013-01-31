/**
 	_mochi.GridList_ extends _enyo.GridList_ to add mochi styling 
*/

enyo.kind(
    {
        name: "mochi.GridList", 
        kind: "enyo.GridList", 
        classes: "mochi-gridlist",
        itemFixedSize: true
    }   
);

enyo.kind(
	{
    	name: "mochi.GridList.ImageItem",
    	kind: "enyo.GridList.ImageItem",
    	classes: "mochi-gridlist-imageitem"
    }
);