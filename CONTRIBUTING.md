# Contributions

Contributions are welcome for Enyo and its associated libraries.  The Mochi UI library
is currently community-managed by Herman van Hazendonk (@Herrie82) and Tom King (@ka6sox).

Please see [Contributing to Enyo](http://enyojs.com/community/contribute/) for details
on our contribution policy and guidelines for use of the Enyo-DCO-1.1-Signed-off-by
line in your commits and pull requests.

If you're interested in introducing new kinds, you might also consider hosting your own repo
and contributing to the [Enyo community gallery](http://enyojs.com/gallery).

## Modifications to CSS

Mochi CSS is defined using parameterized LESS files.  Whenever you make changes to LESS files in mochi, you'll also need to re-generate and check-in the top-level .css file as well, to maintain backward-compatibility for environments that don't wish to use LESS.

You can re-generate the top-level mochi.css file as follows:

    cd lib/mochi/css
    ../../../enyo/tools/lessc.sh ./package.js

NOTE: Since LESS generates relative URLs, it's important to run the `lessc.sh` script from the mochi css folder.

Also note you only need to generate the .css file when you're ready to check in your changes.  During development, you can do all your testing modifying just LESS files if you include "less-xyz.min.js" in your app's debug.html file, which compiles the LESS client-side during loading:

    <script src="enyo/tools/minifier/node_modules/less/dist/less-1.3.0.min.js"></script>
    
Alternatively, there is also a "watch" mode for `lessc.sh`, which will automatically re-compile CSS based on any LESS dependency changes:

    cd lib/mochi/css
    ../../../enyo/tools/lessc.sh -w ./package.js

Additionally, any new controls contributed should follow this basic pattern to ensure proper themability support:

* Place control's .js file(s) in `lib/mochi/source` and add to `lib/mochi/source/package.js`
* Place control's .less file(s) in `lib/mochi/css`
* @import .less file(s) into [`lib/mochi/css/mochi-rules.less`](https://github.com/enyojs/mochi/blob/master/css/mochi-rules.less)
* Use existing variables from [`lib/mochi/css/mochi-variables.less`](https://github.com/enyojs/mochi/blob/master/css/mochi-variables.less) in your control's LESS files when available, add any new variables your particular control needs along with their default definitions to mochi-variables.less.

Refer to the [UI Theming Guide](https://github.com/enyojs/enyo/wiki/UI-Theming) for more details.

## Samples

Every new control should be accompanied by at least one sample in the [Enyo 2 Sampler](http://enyojs.com/sampler).  Read the [Sampler readme](https://github.com/enyojs/sampler) for details on how to go about adding new samples to the Sampler. 

Guidelines for samples:

* Samples should live in a folder named `samples`, as a peer to the source
* Be sure to exercise useful API's and events of the control in the sample
* When one or more significantly different or interesting configurations of the control are available, include more than one instance in the sample to exhibit use of the different API's
