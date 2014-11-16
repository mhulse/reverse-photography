$(function() {
	
	var image = {};
	var device = {};
	var grid = {};
	
	$('<img />', {
		src: 'test.jpg'
	})
	.one('load', function() {
		
		var $this = $(this);
		var i;
		var x;
		var audio;
		
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
			
			console.warn('row', i + 1, !((i + 1) % 2))
			
			for (x = 0; x < grid.cols; x++) {
				
				console.log((x * device.width), (i * device.height));
				
				$('<div />', { 'class': 'box' })
					.css({
						width: device.width,
						height: device.height,
						backgroundPosition: ('-' + (x * device.width) + 'px -' + (i * device.height) + 'px')
					})
					.hide()
					.appendTo('body');
				
			}
			
		}
		
		$audio = $('<audio />')
			.append('<source src="beep.ogg" type="audio/ogg">')
			.append('<source src="beep.mp3" type="audio/mpeg">')
			.appendTo('body');
		
		$('div:first').show();
		
		setInterval(function() {
			$('div:first')
				.hide()
				.next()
				.show(0, '', function() {
					$audio[0].play();
				})
				.end()
				.appendTo('body');
		}, 3000);
		
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