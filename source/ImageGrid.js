/*
 * mochi.ImageGrid extends enyo.GridList
 * 
 * @author: Surya Vakkalanka
 * @date: November 2012 
 * 
 * An Image Grid that's based on enyo.GridList, which in turn extends List to use a GridFlyweightRepeater to render items in the List. 
 * 
*/

enyo.kind(
	{
		name: "mochi.ImageGrid", 
		classes: "mochi", 
        fit: true,
		published: {
            //Setting fixedColumns = true 
                //maintains the specified number of columns, unless doing so would violate the itemMinWidth, 
                //in which case the number of columns is reduced until the itemMinWidth can be maintained. 
                //With the given number of columns then defined, Items are scaled to fill white space (excluding spacing) up to itemMaxWidth, 
                //at which point items no longer scale and additional spacing is added. 
                //All items have the same aspect ratio (determined by itemMinWidth/Height), so the determination of item size only occurs once per resize and is used for all items.
            //Setting fixedColumns = false 
                //fills each row with items whose size starts at the itemMinWidth/Height, with width and height proportionally scaled up 
                //to eliminate all white space except for the defined itemSpacing. 
                //All items have the same aspect ratio (determined by itemMinWidth/Height), so the determination of item size only occurs once per resize and is used for all items.
            fixedColumns: false,
            numColumns: 3,
            itemSource: '',
            itemCaption: '',
            itemSpacing: 0, //Spacing is in units (1 unit = 8px)
            itemWidth: 160,
            itemHeight: 160,
            showCaptions: false
    	},
        create: function() {
            this.inherited(arguments);
            this.$.gridlist.setItemFixedSize(true);
            this.$.gridlist.setNormalizeRows(false);
            this.itemSourceChanged();
            this.itemCaptionChanged();
            this.itemSpacingChanged();
            this.itemWidthChanged();
            this.itemHeightChanged();
        },
        itemSourceChanged: function() {
            this.$.tile.setSource(this.itemSource);
        },
        itemCaptionChanged: function() {
            if (!this.showCaptions) {
                this.$.tile.setCaption('');
                return;
            }
            this.$.tile.setCaption(this.itemCaption);
        },
        itemSpacingChanged: function() {
            this.$.gridlist.setItemSpacing(this.itemSpacing);
        },
        itemWidthChanged: function() {
            this.$.gridlist.setItemWidth(this.itemWidth);
        },
        itemHeightChanged: function() {
            this.$.gridlist.setItemHeight(this.itemHeight);
        },
        events: {
            /**
            Fires once per tile (GridList item) at render time.
            _inEvent.index_ contains the current tile index.
            */
            onSetupItem: ""
        },
        show: function(inCount) {
            this.$.gridlist.show(inCount);
        },
        setupItem: function(inSender, inEvent) {
            this.doSetupItem({index: inEvent.index, selected: inEvent.selected});
        },
        components: [
            {
                name: "gridlist", classes: "mochi-image-grid", kind: "enyo.GridList", fit:true, onSetupItem: "setupItem", 
                components: [
                    {name: "tile", kind: "mochi.ImageTile"}
                ]
            }
        ]
	}	
);

enyo.kind({
    name: "mochi.ImageTile",
    classes: "mochi-image-grid-tile",
    components:[
        {name: 'image', kind: 'enyo.Image', onload: 'onLoad'},
        {name: "caption", classes: "caption"}
    ],
    create: function() {
        this.inherited(arguments);
        this.sourceChanged();
    },
    published: {
        source: '',
        caption: ''
    },
    onLoad: function(oSender, oEvent) {
        this.log("DONE LOADING", oEvent);
        this.removeClass('loading');
    },
    sourceChanged: function() {
        if (!this.source || this.source == '') {
            return;
        }
        this.addClass('loading');
        this.$.image.setAttribute('src', this.source);
    },
    captionChanged: function() {
        if (!this.caption || this.caption == '') {
            this.$.caption.setContent(this.caption);
            this.$.caption.setShowing(false);
            return;
        }
        this.$.caption.setShowing(true);
        this.$.caption.setContent(this.caption);
    }
});