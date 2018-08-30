// Interpose on calls to draw on a canvas, log and forward them.
// Return an object that allows querying for the logs.
function CanvasInterposer(canvas) {
    this.oldGetContext = canvas.getContext.bind(canvas);
    this.canvas = canvas;
    this.ctx = null; // Will be initialized when getContext is called on the canvas so we know the arguments.

    canvas.getContext = function() {
        this.ctx = this.oldGetContext.apply(this.canvas, arguments);
        return this;
    }.bind(this);

    this.clearRect = function() {
        return this.ctx.clearRect.apply(this.ctx, arguments);
    };
    this.save = function() {
        return this.ctx.save.apply(this.ctx, arguments);
    }
    this.fillRect = function() {
        return this.ctx.fillRect.apply(this.ctx, arguments);
    };
    this.strokeRect = function() {
        return this.ctx.strokeRect.apply(this.ctx, arguments);
    };
    this.fillText = function() {
        return this.ctx.fillText.apply(this.ctx, arguments);
    };
    this.strokeText = function() {
        return this.ctx.strokeText.apply(this.ctx, arguments);
    };
    this.measureText = function() {
        return this.ctx.measureText.apply(this.ctx, arguments);
    };
    this.getLineDash = function() {
        return this.ctx.getLineDash.apply(this.ctx, arguments);
    };
    this.setLineDash = function() {
        return this.ctx.setLineDash.apply(this.ctx, arguments);
    };
    this.createLinearGradient = function() {
        return this.ctx.createLinearGradient.apply(this.ctx, arguments);
    };
    this.createRadialGradient = function() {
        return this.ctx.createRadialGradient.apply(this.ctx, arguments);
    };
    this.createPattern = function() {
        return this.ctx.createPattern.apply(this.ctx, arguments);
    };
    this.beginPath = function() {
        return this.ctx.beginPath.apply(this.ctx, arguments);
    };
    this.closePath = function() {
        return this.ctx.closePath.apply(this.ctx, arguments);
    };
    this.moveTo = function() {
        return this.ctx.moveTo.apply(this.ctx, arguments);
    };
    this.lineTo = function() {
        return this.ctx.lineTo.apply(this.ctx, arguments);
    };
    this.bezierCurveTo = function() {
        return this.ctx.bezierCurveTo.apply(this.ctx, arguments);
    };
    this.quadraticCurveTo = function() {
        return this.ctx.quadraticCurveTo.apply(this.ctx, arguments);
    };
    this.arc = function() {
        return this.ctx.arc.apply(this.ctx, arguments);
    };
    this.arcTo = function() {
        return this.ctx.arcTo.apply(this.ctx, arguments);
    };
    this.ellipse = function() {
        return this.ctx.ellipse.apply(this.ctx, arguments);
    };
    this.rect = function() {
        return this.ctx.rect.apply(this.ctx, arguments);
    };
    this.fill = function() {
        return this.ctx.fill.apply(this.ctx, arguments);
    };
    this.stroke = function() {
        return this.ctx.stroke.apply(this.ctx, arguments);
    };
    this.drawFocusIfNeeded = function() {
        return this.ctx.drawFocusIfNeeded.apply(this.ctx, arguments);
    };
    this.scrollPathIntoView = function() {
        return this.ctx.scrollPathIntoView.apply(this.ctx, arguments);
    };
    this.clip = function() {
        return this.ctx.clip.apply(this.ctx, arguments);
    };
    this.isPointInPath = function() {
        return this.ctx.isPointInPath.apply(this.ctx, arguments);
    };
    this.isPointInStroke = function() {
        return this.ctx.isPointInStroke.apply(this.ctx, arguments);
    };
    this.rotate = function() {
        return this.ctx.rotate.apply(this.ctx, arguments);
    };
    this.scale = function() {
        return this.ctx.scale.apply(this.ctx, arguments);
    };
    this.translate = function() {
        return this.ctx.translate.apply(this.ctx, arguments);
    };
    this.transform = function() {
        return this.ctx.transform.apply(this.ctx, arguments);
    };
    this.setTransform = function() {
        return this.ctx.setTransform.apply(this.ctx, arguments);
    };
    this.resetTransform = function() {
        return this.ctx.resetTransform.apply(this.ctx, arguments);
    };
    this.drawImage = function() {
        return this.ctx.drawImage.apply(this.ctx, arguments);
    };
    this.createImageData = function() {
        return this.ctx.createImageData.apply(this.ctx, arguments);
    };
    this.getImageData = function() {
        return this.ctx.getImageData.apply(this.ctx, arguments);
    };
    this.putImageData = function() {
        return this.ctx.putImageData.apply(this.ctx, arguments);
    };
    this.restore = function() {
        return this.ctx.restore.apply(this.ctx, arguments);
    };
    this.addHitRegion = function() {
        return this.ctx.addHitRegion.apply(this.ctx, arguments);
    };
    this.removeHitRegion = function() {
        return this.ctx.removeHitRegion.apply(this.ctx, arguments);
    };
    this.clearHitRegions = function() {
        return this.ctx.clearHitRegions.apply(this.ctx, arguments);
    };
    // Properties, not functions.
    Object.defineProperties(this, {
        "lineWidth" : {
            "get": function() { return this.ctx.lineWidth; },
            "set": function(value) { this.ctx.lineWidth = value; }
        },
        "lineCap" : {
            "get": function() { return this.ctx.lineCap; },
            "set": function(value) { this.ctx.lineCap = value; }
        },
        "lineJoin" : {
            "get": function() { return this.ctx.lineJoin; },
            "set": function(value) { this.ctx.lineJoin = value; }
        },
        "miterLimit" : {
            "get": function() { return this.ctx.miterLimit; },
            "set": function(value) { this.ctx.miterLimit = value; }
        },
        "lineDashOffset" : {
            "get": function() { return this.ctx.lineDashOffset; },
            "set": function(value) { this.ctx.lineDashOffset = value; }
        },
        "font" : {
            "get": function() { return this.ctx.font; },
            "set": function(value) { this.ctx.font = value; }
        },
        "textAlign" : {
            "get": function() { return this.ctx.textAlign; },
            "set": function(value) { this.ctx.textAlign = value; }
        },
        "textBaseline" : {
            "get": function() { return this.ctx.textBaseline; },
            "set": function(value) { this.ctx.textBaseline = value; }
        },
        "direction" : {
            "get": function() { return this.ctx.direction; },
            "set": function(value) { this.ctx.direction = value; }
        },
        "fillStyle" : {
            "get": function() { return this.ctx.fillStyle; },
            "set": function(value) { this.ctx.fillStyle = value; }
        },
        "strokeStyle" : {
            "get": function() { return this.ctx.strokeStyle; },
            "set": function(value) { this.ctx.strokeStyle = value; }
        },
        "shadowBlur" : {
            "get": function() { return this.ctx.shadowBlur; },
            "set": function(value) { this.ctx.shadowBlur = value; }
        },
        "shadowColor" : {
            "get": function() { return this.ctx.shadowColor; },
            "set": function(value) { this.ctx.shadowColor = value; }
        },
        "shadowOffsetX" : {
            "get": function() { return this.ctx.shadowOffsetX; },
            "set": function(value) { this.ctx.shadowOffsetX = value; }
        },
        "shadowOffsetY" : {
            "get": function() { return this.ctx.shadowOffsetY; },
            "set": function(value) { this.ctx.shadowOffsetY = value; }
        },
        "currentTransform" : {
            "get": function() { return this.ctx.currentTransform; },
            "set": function(value) { this.ctx.currentTransform = value; }
        },
        "globalAlpha" : {
            "get": function() { return this.ctx.globalAlpha; },
            "set": function(value) { this.ctx.globalAlpha = value; }
        },
        "globalCompositeOperation" : {
            "get": function() { return this.ctx.globalCompositeOperation; },
            "set": function(value) { this.ctx.globalCompositeOperation = value; }
        },
        "imageSmoothingEnabled" : {
            "get": function() { return this.ctx.imageSmoothingEnabled; },
            "set": function(value) { this.ctx.imageSmoothingEnabled = value; }
        },
        "imageSmoothingQuality" : {
            "get": function() { return this.ctx.imageSmoothingQuality; },
            "set": function(value) { this.ctx.imageSmoothingQuality = value; }
        },
        "filter" : {
            "get": function() { return this.ctx.filter; },
            "set": function(value) { this.ctx.filter = value; }
        }
    });
}
interposer = new CanvasInterposer(document.getElementById("canvas"));
