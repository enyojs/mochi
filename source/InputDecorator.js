/**
	_mochi.InputDecorator_ is a control that provides input styling. Any controls
	in the InputDecorator will appear to be inside an area styled as an	input.
	Usually, an InputDecorator surrounds an	<a href="#mochi.Input">mochi.Input</a>.

		{kind: "mochi.InputDecorator", components: [
			{kind: "mochi.Input"}
		]}

	Other controls, such as buttons, may be placed to the right or left of the
	input control, e.g.:

		{kind: "mochi.InputDecorator", components: [
			{kind: "mochi.IconButton", src: "search.png"},
			{kind: "mochi.Input"},
			{kind: "mochi.IconButton", src: "cancel.png"}
		]}

	Note that the InputDecorator fits around the content inside it. If the
	decorator is sized, then its contents will likely need to be sized as well.

		{kind: "mochi.InputDecorator", style: "width: 500px;", components: [
			{kind: "mochi.Input", style: "width: 100%;"}
		]}
*/
enyo.kind({
	name: "mochi.InputDecorator",
	kind: "enyo.ToolDecorator",
	tag: "label",
	classes: "mochi-input-decorator",
	//* @protected
	handlers: {
		onDisabledChange: "disabledChange",
		onfocus: "receiveFocus",
		onblur: "receiveBlur"
	},
	receiveFocus: function() {
		this.addClass("mochi-focused");
	},
	receiveBlur: function() {
		this.removeClass("mochi-focused");
	},
	disabledChange: function(inSender, inEvent) {
		this.addRemoveClass("mochi-disabled", inEvent.originator.disabled);
	}
});