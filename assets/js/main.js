//this file gets all of the site data and parses it as json
var dictionary = {};
var eventsData = {};


async function getJSON() {
    var sheetID = '1C6J5D7rLWc7Q7SRr_Lc1bM34nE28EvYKUJko3cb8JdI';
    var pagesUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/1/public/values?alt=json';
    var eventsUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/2/public/values?alt=json';

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
        console.log(dictionary)
    })



    $.getJSON(eventsUrl, function(data){
        var entry = data.feed.entry

        $(entry).each(function(){
	       var key = this["gsx$id"]["$t"];
	       eventsData[key] = {
	        	"type": this["gsx$eeeeee"]["$t"],
	        	"heading-ar": this["gsx$heading-ar"]["$t"],
	        	"heading-en": this["gsx$heading-en"]["$t"],
	        	"contents-ar": this["gsx$contents-ar"]["$t"] ? this["gsx$contents-ar"]["$t"] : null,
	        	"contents-en": this["gsx$contents-en"]["$t"] ? this["gsx$contents-en"]["$t"] : null,
	        	"images": this["gsx$images"]["$t"] ? this["gsx$images"]["$t"] : null,
	        }
        });
        console.log(eventsData)
    })    
}
