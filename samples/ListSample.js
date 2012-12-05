enyo.kind({
	name: "mochi.sample.ListSample",
	classes: "mochi mochi-sample enyo-fit",
	kind: "FittableRows",
	components: [
		{name: "list", kind: "mochi.List", count: 20000, multiSelect: false, classes: "enyo-fit list-sample-list", onSetupItem: "setupItem", components: [
			{name: "item", kind:"mochi.ListItem", components: [
				{name: "index", classes: "list-sample-index"},
				{name: "name"}
			]}
		]}
	],
	names: [],
	setupItem: function(inSender, inEvent) {
		// this is the row we're setting up
		var i = inEvent.index;
		// make some mock data if we have none for this row
		if (!this.names[i]) {
			this.names[i] = makeName(5, 10, '', '');
		}
		var n = this.names[i];
		var ni = ("00000000" + i).slice(-7);
		this.$.name.setContent(n);
		this.$.index.setContent(ni);
	}
});

// Licensed under Creative Commons Attribution 3.0 License
// attributed to: http://leapon.net/en/random-name-generator-javascript
function rnd(minv, maxv) {
	if (maxv < minv) return 0;
	return Math.floor(Math.random()*(maxv-minv+1)) + minv;
}

function makeName(minlength, maxlength, prefix, suffix) {
	prefix = prefix || '';
	suffix = suffix || '';
	// these weird character sets are intended to cope with the nature of English (e.g. char 'x' pops up less frequently than char 's')
	// note: 'h' appears as consonants and vocals
	var vocals = 'aeiouyh' + 'aeiou' + 'aeiou';
	var cons = 'bcdfghjklmnpqrstvwxz' + 'bcdfgjklmnprstvw' + 'bcdfgjklmnprst';
	var allchars = vocals + cons;
	var length = rnd(minlength, maxlength) - prefix.length - suffix.length;
	if (length < 1) length = 1;
	var consnum = 0;
	if (prefix.length > 0) {
		for (var i = 0; i < prefix.length; i++) {
			if (consnum == 2) consnum = 0;
			if (cons.indexOf(prefix[i]) != -1) {
				consnum++;
			}
		}
	}
	else {
		consnum = 1;
	}
	var name = prefix;
	for (var i = 0; i < length; i++)
	{
		//if we have used 2 consonants, the next char must be vocal.
		if (consnum == 2)
		{
			touse = vocals;
			consnum = 0;
		}
		else touse = allchars;
		//pick a random character from the set we are goin to use.
		c = touse.charAt(rnd(0, touse.length - 1));
		name = name + c;
		if (cons.indexOf(c) != -1) consnum++;
	}
	name = name.charAt(0).toUpperCase() + name.substring(1, name.length) + suffix;
	return name;
}