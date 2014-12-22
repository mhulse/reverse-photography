$(function() {
	
	// Use $ for object vars:
	var image = {};
	var upload;
	var device = {};
	var grid = {};
	var position = [];
	var clips = [];
	var pause = 3000; // Must not be lower than `exposure` value.
	var exposure = 400;
	var scale = 1;
	var $form = $('form');
	var $button = $('form').find('button');
	var $picture = $('<div />', { 'id': 'picture' })
		.hide()
		.appendTo('body');
	var $shutter = $('<div />', { 'id': 'shutter' })
		.appendTo('body');
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
			src: upload
		})
		.one('load', function() {
			
			var $this = $(this);
			var i;
			var x;
			var func;
			var temp = [];
			var timer = 0;
			var count = 0;
			
			console.log('Success!', $this);
			
			image.width = (this.width * scale);
			image.height = (this.height * scale);
			
			console.log('Image:', image.width, image.height);
			
			device.width = ((window.innerWidth > 0) ? window.innerWidth : screen.width);
			device.height = ((window.innerHeight > 0) ? window.innerHeight : screen.height);
			
			console.log('Device:', device.width, device.height);
			
			grid.cols = Math.ceil(image.width / device.width);
			grid.rows = Math.ceil(image.height / device.height);
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
			
			console.log('position', position.length, position);
			
			console.log('clips', clips.length, clips);
			
			$picture
				.css({
					backgroundImage: 'url(' + upload + ')',
					backgroundSize: image.width + 'px ' + image.height + 'px'
				})
				.show();
			
			(function timeout() {
				
				console.log(position[count]);
				
				$picture
					.css({
						backgroundPosition: position[count]
					})
				
				console.log('clips count', count);
				
				count++; // Skip `-0px -0px` as that's default.
				
				if (count > 1) {
					
					console.log('audio play:', clips[count]);
					
					clips[count].trigger('play');
					
				}
				
				console.log('count and grid total:', count, grid.total);
				
				$shutter
					.delay(pause - exposure)
					.hide(0)
					.delay(exposure)
					.show(0);
				
				if (count == grid.total) {
					
					clearTimeout(timer);
					
					$('body').addClass('finger');
					
					// Restart:
					$(document).one('touchstart click', function() {
						
						$('body').removeClass('finger');
						
						begin(file);
						
					});
					
				} else {
					
					console.log('TIMER', pause + exposure + 100)
					
					timer = setTimeout(timeout, (pause + exposure + 100)); // `100` = Fudge factor (i.e., extra time to prevent timing discrepancies between `setTimeout and `delay()`).
					
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
	
	var values = function() {
		
		pause = parseInt($('#pause').val(), 10);
		exposure = parseInt($('#exposure').val(), 10);
		scale = parseInt($('#scale').val(), 10);
		
		console.log('pause:', pause, 'exposure:', exposure, 'scale:', scale)
		
	};
	
	$button.click(function($e) {
		
		//var $this = $(this);
		
		console.log('Go!');
		
		$e.preventDefault();
		
		// Hack to enable audio on iOS:
		$audio1
			.trigger('play')
			.trigger('pause');
		
		$audio2
			.trigger('play')
			.trigger('pause');
		
		values();
		
		$form
			.fadeOut(function() {
				
				begin();
				
			});
		
	});
	
	if (window.File || window.FileReader || window.FileList || window.Blob) {
		
		$form[0].reset();
		
		$form.fadeIn();
		
		$('input[type="file"]')
			.change(function() {
				
				var $this = $(this);
				var files;
				var reader;
					
				if ($this.length) {
					
					files = $this[0].files;
					
					if (files) {
						
						file = files[0];
						
						if (file) {
							
							reader = new FileReader();
							reader.onload = function($e) {
								
								console.log('reader.onload', reader.result);
								
								upload = reader.result;
								
								$button.fadeIn();
								
							};
							reader.onerror = function ($e) {
								
								alert('error ' + $e.target.error.code + "\n\n" + 'iPhone iOS8 Permissions Error!');
								
							};
							reader.readAsDataURL(file);
							
						} else {
							
							console.log('Please select a file before clicking "Load"');
							
						}
						
					} else {
						
						console.log('This browser doesn not seem to support the `files` property of file inputs.')
						
					}
					
				} else {
					
					console.log('Could not find the file `input` element.');
					
				}
				
			});
		
	} else {
		
		console.log('The File APIs are not fully supported in this browser.');
		
	}
	
});
