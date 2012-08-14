/**
	An mochi-styled RichText control. In addition to the features of
	<a href="#enyo.RichText">enyo.RichText</a>, mochi.RichText has a
	*defaultFocus* property that can be set to true to focus the RichText when
	it's rendered. Only one RichText should be set as the *defaultFocus*.

	Typically, an mochi.RichText is placed inside an
	<a href="#mochi.InputDecorator">mochi.InputDecorator</a>, which provides
	styling, e.g.:

		{kind: "mochi.InputDecorator", components: [
			{kind: "mochi.RichText", style: "width: 100px;", onchange: "inputChange"}
		]}

	Note that RichTexts must be explicitly sized for width.  In addition,
	RichText is not supported on Android < 3.
*/
enyo.kind({
	name: "mochi.RichText",
	kind: "enyo.RichText",
	classes: "mochi-richtext"
});
