{
	var Requiem = function(canvasID, bufferID) {

			this.canvas = document.getElementById(canvasID);
			this.buffer = document.getElementById(bufferID);
			
			if(this.buffer.getContext) {
				this.ctxB = this.buffer.getContext('2d');
			
				if(this.canvas.getContext) {
				  this.ctx = this.canvas.getContext('2d');
				  this.w = this.canvas.width;
				  this.h = this.canvas.height;
				  
				this.ctxB.font = this.ctx.font = "bolder 12px 'Trebuchet MS'";
				this.ctxB.fillStyle = this.ctx.fillStyle = "rgba(0,0,255,1)";
				this.ctxB.strokeStyle = this.ctx.strokeStyle = this.ctxStrokeStyle =  "rgba(0,0,0,1)";  
				this.ctxB.lineWidth = this.ctx.lineWidth = this.ctxLineWidth = 1;
				this.ctxB.lineCap = this.ctx.lineCap = this.ctxLineCap = "round";
				this.ctxB.lineJoin = this.ctx.lineJoin = this.ctxLineJoin = "round";
				
				this.layerSelected = 0;
				  
				  this.layers = new Array();
				  this.layers.push(this.ctx.getImageData(0,0,this.w,this.h));
				  
				  return this;
				  
				} else {
				  this.canvas.innerHTML = "unable to get canvas 2d context!";
				  // TBD - error dialog here!!
				  return undefined;
				}
			} else {
				return undefined;
			}
		//return this;
	},

	  
	rqp = Requiem.prototype = {
		
		canvas:'',
		buffer:'',
		ctx:'',
		ctxB:'',
		w: 0,
		h: 0,
		layers: new Array(),
		
		ctxStrokeStyle: "rgba(0,0,0,1)",
		ctxLineWidth: 1,
		ctxLineCap: "round", // "butt", "round", "square" (default "butt")
		ctxLineJoin: "round", // "round", "bevel", "miter" (default "miter")
		layerSelected: 0,

		/* draw functions start here */
		
		// start to draw to buffer
		drawStart: function(clear) {
			// clear buffer if needed
			if(clear) {
				this.ctxB.clearRect(0,0,this.w,this.h);
				this.ctxB.putImageData(this.layers[this.layerSelected],0,0,this.w,this.h);
			}
			
			// get the current selected layer data and store it in
			
			
			// ready to draw on buffer
		},
		
		// draw a line to buffer
		drawLine: function(x1,y1,x2,y2) {
			this.ctxB.beginPath();
			this.ctxB.moveTo(x1,y1);
			this.ctxB.lineTo(x2,y2);
			this.ctxB.stroke();
		},
		
		// draws to main layer
		drawEnd: function() {
			// save undoState
			
			// copy buffer to selected layer
			this.layers[this.layerSelected] = this.ctxB.getImageData(0,0,this.w,this.h);

			this.ctxB.clearRect(0,0,this.w,this.h);
			// draw Layers in Order 0 to n			
			for(var i=0; i< this.layers.length; i++) {
				this.ctx.putImageData(this.layers[i],0,0,this.w,this.h);
			}

		},
		
		layerNew: function() {
			this.layerSelected = layers.length;
			this.layers.push(this.ctx.createImageData(this.w,this.h));
		}

	};

}