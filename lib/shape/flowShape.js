function FlowShape(startX, startY, endX, endY, startHeight, endHeight)
{
		var FIRST_CURVE_RATIO = 0.3;
		var SECOND_CURVE_RATIO = 0.7;

		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.startHeight = startHeight;
		this.endHeight = endHeight;
		
		this.getPathData = function()
		{
			return this.drawFirstLine(this.startX, this.startY, this.startHeight) + this.drawFlow(this.startX, this.startY, this.endX, this.endY) + this.drawSecondLine(this.endX, this.endY, this.endHeight) + this.drawFlow(this.endX, this.endY + this.endHeight, this.startX, this.startY + this.startHeight);
		};
		
		this.drawFlow = function(startX, startY, endX, endY)
		{
			var path_data = "";
							
			var middleX	= ((endX - startX) / 2.0) + startX;
			var middleY	= ((endY - startY) / 2.0)+ startY;
			
			var firstCurveX = ((middleX - startX) * FIRST_CURVE_RATIO) + startX;
			var firstCurveY	=  startY;
			
			var upperMiddleX = ((middleX - firstCurveX) / 2.0) + firstCurveX;
			var upperMiddleY = startY;
			
			var secondCurveX = ((endX - middleX) * SECOND_CURVE_RATIO) + middleX;
			var secondCurveY = endY;
			
			var downMiddleX = ((secondCurveX - middleX) / 2.0) + middleX;
			var downMiddleY	= endY;
						
			path_data = " C " 	+ firstCurveX 	+ " " + firstCurveY +
						" " 	+ upperMiddleX + " " + upperMiddleY +
						" " 	+ middleX 		+ " " + middleY +
						" C " 	+ downMiddleX 	+ " " + downMiddleY +
						" " 	+ secondCurveX + " " + secondCurveY +
						" " 	+ endX + " " + endY;
			
			return path_data;		
		};
		
		this.drawFirstLine = function(startX, startY, height)
		{
			var path_data = "M " + startX + " " + (startY + height)+ " L " + startX + " " + startY;
			
			return path_data;		
		};
		
		this.drawSecondLine = function(endX, endY, height)
		{
			var path_data = " L " + endX + " " + (endY + height);
			
			return path_data;	
		};
}