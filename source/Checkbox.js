/**
	A box that shows or hides a check mark when clicked.
	The onChange event is fired when it is clicked. Use getValue() to fetch
	the checked status.
	
		{kind: "mochi.Checkbox", onchange: "checkboxClicked"}
	
		checkboxClicked: function(inSender) {
			if (inSender.getValue()) {
				 this.log("I've been checked!");
			}
		}
*/
enyo.kind({
	name: "mochi.Checkbox",
	//* @protected
	kind: "mochi.RadioButton",
	// FIXME: Experimental properties for dynamic color changing
	published: {
		colorActive: "#ffb80d",
		colorInactive: "#fff",
		colorActiveDisabled: "#ffb80d",
		colorInactiveDisabled: "#fff",
		canAnimate: true,
		//* @protected
		type: "checkbox",
		buttonClasses: "mochi-checkbox"
	},
	animateClass: "mochi-checkbox-animate"
});
