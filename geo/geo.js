var op;
// var min_accuracy = 150;
var prev_lat;
var prev_long;
// var max_speed = 0;
// var min_speed = 0;
// var max_altitude = 0;
// var min_altitude = 0;
var first_lat;
var first_lon;

function distance(lat1, lon1, lat2, lon2) {
	var R = 6371;
	var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;
	return R * 2 * Math.asin(Math.sqrt(a));
}

function geo_success(position) {
	
	/*
	if (position.coords.accuracy <= min_accuracy) {
		
		if (prev_lat != position.coords.latitude || prev_long != position.coords.longitude) {
			
			if (position.coords.speed > max_speed) {
				
				max_speed = position.coords.speed;
				
			} else if (position.coords.speed < min_speed) {
				
				min_speed = position.coords.speed;
				
			}
				
			if (position.coords.altitude > max_altitude) {
				
				max_altitude = position.coords.altitude;
				
			} else if (position.coords.altitude < min_altitude) {
				
				min_altitude = position.coords.altitude;
				
			}
			
		}
		
	}
	*/
	
	if ( ! first_lat) first_lat = position.coords.latitude;
	if ( ! first_lon) first_lon = position.coords.longitude;
	
	prev_lat = position.coords.latitude;
	prev_lon = position.coords.longitude;
	
	op.innerHTML = [
		(first_lat * first_lon) - (prev_lat * prev_lon)
	].join('\n');
	
}

function geo_error(error) {
	
	switch(error.code) {
		
		case error.TIMEOUT:
			
			op.innerHTML = 'Timeout!';
			
			break;
		
	};
	
}

window.onload = function() {
	
	op = document.getElementById('output');
	op.innerHTML = 'Hello world!';
	
	// https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
	navigator.geolocation.watchPosition(geo_success, geo_error, {
		enableHighAccuracy: true,
		//timeout: 27000
		maximumAge: 0,
	});
	
};

/*
var start_stop_btn, wpid=false, map, z, op, prev_lat, prev_long, min_speed=0, max_speed=0, min_altitude=0, max_altitude=0, distance_travelled=0, min_accuracy=150, date_pos_updated="", info_string="";

// This function just adds a leading "0" to time/date components which are <10 (because there is no cross-browser way I know of to do this using the date object)
function format_time_component(time_component)
{
	if(time_component<10)
		time_component="0"+time_component;
	else if(time_component.length<2)
		time_component=time_component+"0";
		
	return time_component;
}

// This is the function which is called each time the Geo location position is updated
function geo_success(position)
{
	start_stop_btn.innerHTML="Stop"; // Set the label on the start/stop button to "Stop"
	
	info_string="";
	var d=new Date(); // Date object, used below for output messahe
	var h=d.getHours();
	var m=d.getMinutes();
	var s=d.getSeconds();
		
	var current_datetime=format_time_component(h)+":"+format_time_component(m)+":"+format_time_component(s);
		
	// Check that the accuracy of our Geo location is sufficient for our needs
	if(position.coords.accuracy<=min_accuracy)
	{
		// We don't want to action anything if our position hasn't changed - we need this because on IPhone Safari at least, we get repeated readings of the same location with 
		// different accuracy which seems to count as a different reading - maybe it's just a very slightly different reading or maybe altitude, accuracy etc has changed
		if(prev_lat!=position.coords.latitude || prev_long!=position.coords.longitude)
		{
			if(position.coords.speed>max_speed)
				max_speed=position.coords.speed;
			else if(position.coords.speed<min_speed)
				min_speed=position.coords.speed;
				
			if(position.coords.altitude>max_altitude)
				max_altitude=position.coords.altitude;
			else if(position.coords.altitude<min_altitude)
				min_altitude=position.coords.altitude;
			
			
			prev_lat=position.coords.latitude;
			prev_long=position.coords.longitude;
			
			
			info_string="Current positon: lat="+position.coords.latitude+", long="+position.coords.longitude+" (accuracy "+Math.round(position.coords.accuracy, 1)+"m)<br />Speed: min="+(min_speed?min_speed:"Not recorded/0")+"m/s, max="+(max_speed?max_speed:"Not recorded/0")+"m/s<br />Altitude: min="+(min_altitude?min_altitude:"Not recorded/0")+"m, max="+(max_altitude?max_altitude:"Not recorded/0")+"m (accuracy "+Math.round(position.coords.altitudeAccuracy,1)+"m)<br />last reading taken at: "+current_datetime;
		}
	}
	else
		info_string="Accuracy not sufficient ("+Math.round(position.coords.accuracy, 1)+"m vs "+min_accuracy+"m) - last reading taken at: "+current_datetime;

	if(info_string)
		op.innerHTML=info_string;
}

// This function is called each time navigator.geolocation.watchPosition() generates an error (i.e. cannot get a Geo location reading)
function geo_error(error)
{
	switch(error.code)
	{
		case error.TIMEOUT:
			op.innerHTML="Timeout!";
		break;
	};
}


function get_pos()
{
	// Set up a watchPosition to constantly monitor the geo location provided by the browser - NOTE: !! forces a boolean response
	// We  use watchPosition rather than getPosition since it more easily allows (on IPhone at least) the browser/device to refine the geo location rather than simply taking the first available position
	// Full spec for navigator.geolocation can be foud here: http://dev.w3.org/geo/api/spec-source.html#geolocation_interface
	
	// First, check that the Browser is capable
	if(!!navigator.geolocation)
		wpid=navigator.geolocation.watchPosition(geo_success, geo_error, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
	else
		op.innerHTML="ERROR: Your Browser doesnt support the Geo Location API";
}


// Initialiser: This will find the output message div and set up the actions on the start/stop button
function init_geo()
{
	op=document.getElementById("output"); // Note the op is defined in global space and is therefore globally available
	
	if(op)
	{
		start_stop_btn=document.getElementById("geo_start_stop");
		
		if(start_stop_btn)
		{
			start_stop_btn.onclick=function()
			{
				if(wpid) // If we already have a wpid which is the ID returned by navigator.geolocation.watchPosition()
				{
					start_stop_btn.innerHTML="Start";
					navigator.geolocation.clearWatch(wpid);
					wpid=false;
				}
				else // Else...We should only ever get here right at the start of the process
				{
					start_stop_btn.innerHTML="Aquiring Geo Location...";
					get_pos();
				}
			}
			
			
		}
		else
			op.innerHTML="ERROR: Couldn't find the start/stop button";
	}
}

// Initialise the whole system (above)
window.onload=init_geo;
*/