# Canvas Interposition

The goal of this code is to allow interposition on the calls to HTML5Canvas
getContext.

It should be easy to modify, or deny calls based on the interposition, rather
than merely log that they are happening.

## Usage

```
// Get an instance of the interposer
interposer = new CanvasInterposer(document.getElementById("myCanvasId"));

// Modify whichever canvas methods or properties you wish to override, being
// sure to call `this.ctx.methodYouOverwrote` at the end if we wish to forward the
// call to the real context.
interposer.clearRect = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log("clearRect " + args.join(","));
    this.ctx.clearRect.apply(this.ctx, arguments);
}

```
