//this file gets all of the site data and parses it as json
var dictionary = {};
var eventsData = {};


var sheetID = '1C6J5D7rLWc7Q7SRr_Lc1bM34nE28EvYKUJko3cb8JdI';
var pagesUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/1/public/values?alt=json';
var eventsUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/2/public/values?alt=json';


var getDictionary = new Promise( function(resolve, reject) {
    $.getJSON(pagesUrl, function(data){
        var entry = data.feed.entry

        $(entry).each(function(){
	       var key = this["gsx$id"]["$t"];
	       dictionary[key] = {
	        	"type": this["gsx$type"]["$t"],
	        	"heading-ar": this["gsx$heading-ar"]["$t"],
	        	"heading-en": this["gsx$heading-en"]["$t"],
	        	"contents-ar": this["gsx$contents-ar"]["$t"] ? this["gsx$contents-ar"]["$t"] : null,
	        	"contents-en": this["gsx$contents-en"]["$t"] ? this["gsx$contents-en"]["$t"] : null,
	        	"link": this["gsx$link"]["$t"] ? this["gsx$link"]["$t"] : null,        	
	        }

	        var img = [];
	        for(var i=0; i<5; i++){
	        	var image = {
	        	"location": this[`gsx$image${i}`]["$t"] ? this[`gsx$image${i}`]["$t"] : null,
	        	"caption-en": this[`gsx$imagecaption${i}-en`]["$t"] ? this[`gsx$imagecaption${i}-en`]["$t"] : null,
	        	"caption-ar": this[`gsx$imagecaption${i}-ar`]["$t"] ? this[`gsx$imagecaption${i}-ar`]["$t"] : null,
	        	}
	        	
	        	img[i] = image;
	        }
	        dictionary[key].img = img;
        });
        resolve('Success, dictionary!');
    })
})

var getEvents = new Promise( function(resolve, reject) {
    $.getJSON(eventsUrl, function(data){
        var entry = data.feed.entry

        $(entry).each(function(){
	       var key = this["gsx$id"]["$t"];
	       eventsData[key] = {
	        	"type": this["gsx$type"]["$t"],
	        	"date": Date(this["gsx$date"]["$t"]),
	        	"organisers-ar": this["gsx$organisers-ar"]["$t"],
	        	"organisers-en": this["gsx$organisers-en"]["$t"],
	        	"location-ar": this["gsx$location-ar"]["$t"],
	        	"location-en": this["gsx$location-en"]["$t"],	        	
	        	"heading-ar": this["gsx$heading-ar"]["$t"],
	        	"heading-en": this["gsx$heading-en"]["$t"],
	        	"contents-ar": this["gsx$contents-ar"]["$t"] ? this["gsx$contents-ar"]["$t"] : null,
	        	"contents-en": this["gsx$contents-en"]["$t"] ? this["gsx$contents-en"]["$t"] : null,
	        	"poster": this["gsx$poster"]["$t"] ? this["gsx$poster"]["$t"] : null,  
	        }
	        
	        var img = [];
	        for(var i=0; i<5; i++){
	        	var image = {
	        	"location": this[`gsx$image${i}`]["$t"] ? this[`gsx$image${i}`]["$t"] : null,
	        	"caption-en": this[`gsx$imagecaption${i}-en`]["$t"] ? this[`gsx$imagecaption${i}-en`]["$t"] : null,
	        	"caption-ar": this[`gsx$imagecaption${i}-ar`]["$t"] ? this[`gsx$imagecaption${i}-ar`]["$t"] : null,
	        	}
	        	
	        	img[i] = image;
	        }
	        eventsData[key].img = img;
        });
        resolve('Success, events!'); 
    })  
})
