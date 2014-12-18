$(function() {
	
	// Use $ for object vars:
	var image = {};
	var device = {};
	var grid = {};
	var position = [];
	var $box = $('<div />', { 'class': 'box' })
		.hide()
		.appendTo('body');
	var count = 0;
	
	$('<img />', {
		src: 'test.jpg'
	})
	.one('load', function() {
		
		var $this = $(this);
		var i;
		var x;
		var audio;
		var func;
		var temp = [];
		var timer = 0;
		
		console.log('Success!', $this);
		
		image.width = this.width;
		image.height = this.height;
		
		console.log('Image:', image.width, image.height);
		
		device.width = ((window.innerWidth > 0) ? window.innerWidth : screen.width);
		device.height = ((window.innerHeight > 0) ? window.innerHeight : screen.height);
		
		console.log('Device:', device.width, device.height);
		
		grid.cols = Math.ceil(this.width / device.width); // Make image.width
		grid.rows = Math.ceil(this.height / device.height);
		grid.total = (grid.cols * grid.rows);
		
		console.log('Grid:', grid.cols, grid.rows, grid.total);
		
		for (i = 0; i < grid.rows; i++) {
			
			console.warn('row', i + 1, ( ! ((i + 1) % 2)))
			
			for (x = 0; x < grid.cols; x++) {
				
				func = (( ! ((i + 1) % 2)) ? 'unshift' : 'push');
				
				console.log(func);
				
				console.log((x * device.width), (i * device.height));
				
				temp[func]('-' + (x * device.width) + 'px -' + (i * device.height) + 'px');
				
				console.log('temp', temp);
				
			}
			
			$.merge(position, temp);
			temp = []; // Reset temp.
			
		}
		
		console.log('foo', position);
		
		$audio = $('<audio />')
			.append('<source src="beep.ogg" type="audio/ogg">')
			.append('<source src="beep.mp3" type="audio/mpeg">')
			.appendTo('body');
		
		$box.show();
		
		(function timeout() {
			
			$box
				.css({
					backgroundPosition: position[count]
				})
			
			$audio[0].play();
			
			count++; // Skip `-0px -0px` as that's default.
			
			console.log(count, grid.total);
			
			if (count == grid.total) {
				
				clearTimeout(timer);
				
			} else {
				
				timer = setTimeout(timeout, 3000);
				
			}
			
		})();
		
	})
	.one('error', function() {
		
		console.log('Could not load image.');
		
	})
	.each(function() {
		
		if (this.complete) {
			
			$(this).load();
			
		} else if (this.error) {
			
			$(this).error();
			
		}
		
	});
	
});
