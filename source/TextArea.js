/**
	An mochi-styled TextArea control. In addition to the features of
	<a href="#enyo.TextArea">enyo.TextArea</a>, mochi.TextArea has a
	*defaultFocus* property that can be set to true to focus the TextArea when
	it's rendered. Only one TextArea should be set as the *defaultFocus*.

	Typically, an mochi.TextArea is placed inside an
	<a href="#mochi.InputDecorator">mochi.InputDecorator</a>, which provides
	styling, e.g.:

		{kind: "mochi.InputDecorator", components: [
			{kind: "mochi.TextArea", onchange: "inputChange"}
		]}
*/
enyo.kind({
	name: "mochi.TextArea",
	kind: "enyo.TextArea",
	classes: "mochi-textarea"
});
