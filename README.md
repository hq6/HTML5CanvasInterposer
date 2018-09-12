# Canvas Interposition

The goal of this code is to allow interposition on the calls to HTML5Canvas
getContext.

It should be easy to modify, log, or deny calls based on the interposition.

The hope is that this will be useful both for unit testing of canvas-based
applications and also for understanding existing canvas-based applications.

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
