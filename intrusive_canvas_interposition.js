// Interpose on calls to draw on a canvas, replacing the context object for the
// canvas.
// Return an object on which a user can override any method to interpose on the
// corresponding canvas method.

// This function takes a canvas object, and modifies the context object
// associated with it; this is intrusive but removes the need to track down
// references to cached contexts, by modifying the object at which they point.
//
function InterposeContextCalls(canvas, logCalls = false) {
    var ctx = canvas.getContext("2d");
    if ("__save" in ctx) {
        // This context has already been interposed on.
        return ctx;
    }

    // Overwrite functions and properties in the original context
    for (var property in ctx) {
        // Uncomment for internal debugging.
        // console.log(property);

        // Skip properties we added
        if (property.startsWith("__")) {
            continue;
        }
        if (typeof ctx[property] === 'function') {
            // Save the original function
            ctx["__" + property] = ctx[property];

            // Replace it
            ctx[property] = function(p) {return function() {
                if (logCalls) {
                    console.log("Invoked " + p + "(" +
                        Array.prototype.slice.call(arguments, 0).join(",") + ")");
                }
                return ctx["__" + p].apply(ctx, arguments);
            }; }(property);
        } else {
            // We also interpose on properties because this way we can disable
            // assignments or control what comes out of reads.

            // Save the original functions associated with the original property
            var protop = Object.getOwnPropertyDescriptor(ctx.__proto__, property);
            if (protop === undefined) {
                protop = Object.getOwnPropertyDescriptor(ctx, property);
            }
            Object.defineProperty(ctx, "__" + property, protop);

            Object.defineProperty(ctx, property, {
                "get" : function(p) { return function() {
                    if (logCalls) {
                        console.log("Got property " + p);
                    }
                    return ctx["__" + p];
                };}(property),
                "set" : function(p) {return function(value) {
                    if (logCalls) {
                        console.log("Set property " + p + " to value " + value);
                    }
                    ctx["__" + p] = value;
                };}(property)
            });
        }
    }

    return ctx;
}
interposer = InterposeContextCalls(document.getElementsByTagName("canvas")[0], true);
interposer = InterposeContextCalls(document.getElementById("canvas"), true);
interposer = InterposeContextCalls(document.getElementById("canvas"));
