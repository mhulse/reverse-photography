$(function() {
	
	// Use $ for object vars:
	var image = {};
	var device = {};
	var grid = {};
	var position = [];
	var clips = [];
	var $picture = $('<div />', { 'class': 'picture' })
		.hide()
		.appendTo('body');
	var $shutter = $('<div />', { 'class': 'shutter' })
		.appendTo('body');
	var count = 0;
	var $audio1 = $('<audio />')
		.append('<source src="beep1.mp3" type="audio/mpeg">')
		.append('<source src="beep1.ogg" type="audio/ogg">')
		.appendTo('body');
	var $audio2 = $('<audio />')
		.append('<source src="beep2.mp3" type="audio/mpeg">')
		.append('<source src="beep2.ogg" type="audio/ogg">')
		.appendTo('body');
	var begin = function() {
		
		$('<img />', {
			src: 'test.jpg'
		})
		.one('load', function() {
			
			var $this = $(this);
			var i;
			var x;
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
					
					console.log('what', x, grid.cols)
					
					clips.push($audio1);
					
				}
				
				$.merge(position, temp);
				
				temp = []; // Reset temp.
				
				if (i > 0) {
					
					clips.pop();
					
				}
				
				clips.push($audio2);
				
			}
			
			console.log('foo', position.length, clips.length, clips);
			
			$picture.show();
			
			(function timeout() {
				
				$picture
					.css({
						backgroundPosition: position[count]
					})
				
				console.log('clips count', count);
				
				clips[count].trigger('play');
				
				count++; // Skip `-0px -0px` as that's default.
				
				console.log(count, grid.total);
				
				$shutter
					.delay(2500)
					.hide(0)
					.delay(400)
					.show(0);
				
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
		
	};
	
	$(document).one('touchstart click', function() {
		
		console.log('Go!');
		
		$audio1
			.trigger('play')
			.trigger('pause');
		
		$audio2
			.trigger('play')
			.trigger('pause');
		
		begin();
		
	});
	
});
