$(function() {
	
	// Use $ for object vars:
	var image = {};
	var upload;
	var device = {};
	var grid = {};
	var position = [];
	var clips = [];
	var pause = 3000;
	var exposure = 400;
	var scale = 1;
	var $form;
	var $picture = $('<div />', { 'id': 'picture' })
		.hide()
		.appendTo('body');
	var $shutter = $('<div />', { 'id': 'shutter' })
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
			src: upload
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
			
			$picture
				.css({
					backgroundImage: 'url(' + upload + ')'
				})
				.show();
			
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
					
					// Restart:
					// $(document).one('touchstart click', function() {
					// 	begin(file);
					// });
					
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
	
	//$(document).one('touchstart click', function() {
	$('form').one('click', 'button', function($e) {
	//var init = function(file) {
		
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
		
		$form
			.fadeOut(function() {
				
				begin();
				
			});
		
	//};
	});
	
	if (window.File || window.FileReader || window.FileList || window.Blob) {
		
		$form = $('form');
		
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
								
								//init(reader.result);
								
								//alert(reader.result);
								
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
