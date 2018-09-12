// Interpose on calls to draw on a canvas, replacing the context object for the
// canvas.
// Return an object on which a user can override any method to interpose on the
// corresponding canvas method.

// This constructor takes ether a canvas object or a context object.
// A reference to a canvas is sufficient if the host JS calls getContext() on
// every frame.
// However, if the context object is being cached by the host's JS, we must pass the
// cached context to this constructor and replace the cached context with a
// reference to this object.
function CanvasInterposer(canvasOrContext) {
    console.log(canvasOrContext);
    this.generateFunctionsAndProperties = function() {
        if (this.__alreadyGenerated) {
            return;
        }
        this.__alreadyGenerated = true;

        for (var property in this.ctx) {
            console.log(property);
            if (typeof this.ctx[property] === 'function') {
                this[property] = function(p) {return function() {
                    console.log("Invoked " + p + "(" + Array.prototype.slice.call(arguments, 0).join(",") + ")");
                    return this.ctx[p].apply(this.ctx, arguments);
                }; }(property);
            } else {
                // Make everything else a property
                Object.defineProperty(this, property, {
                    "get" : function(p) { return function() {
                        console.log("Got property " + p);
                        return this.ctx[p];
                    };}(property),
                    "set" : function(p) {return function(value) {
                        console.log("Set property " + p + " to value " + value);
                        this.ctx[p] = value;
                    };}(property)
                });
            }
        }
    }
    if ("attributes" in canvasOrContext) {
        console.log("A canvas was passed.");
        var canvas = canvasOrContext;
        this.oldGetContext = canvas.getContext.bind(canvas);
        this.canvas = canvas;
        // Assumed 2D
        this.ctx = null;
        canvas.getContext = function() {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log("getContext " + args.join(","));
            this.ctx = this.oldGetContext.apply(this.canvas, arguments);
            this.generateFunctionsAndProperties();
            return this;
        }.bind(this);
    } else {
        // Assume context is passed in
        console.log("A context was passed.");
        this.ctx = canvasOrContext;
        this.canvas = this.ctx.canvas;
        this.generateFunctionsAndProperties();
    }
}
interposer = new CanvasInterposer(document.getElementById("canvas"));
interposer = new CanvasInterposer(document.getElementById("canvas").getContext('2d'));
