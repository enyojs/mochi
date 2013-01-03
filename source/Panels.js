/**
	_mochi.Panels_ is a mochi-styled _enyo.Panels_ control.

		{kind: "mochi.Panels", components: [
			{content: "Panel 0"},
			{content: "Panel 1"}
		]}

*/
enyo.kind({
	name: "mochi.Panels",
	kind: "enyo.Panels",
	classes:"mochi-panels mochi-base-panel",
	arrangerKind: "DockRightArranger",
	basePanel: true,
	overlap: 45,
	layoutWidth: 800
});
