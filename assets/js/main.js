//this file gets all of the site data and parses it as json
var dictionary = {};
var eventsData = {};
var residenciesData = {};
var teamData = {};
var curriculum = {};

var sheetID = '1C6J5D7rLWc7Q7SRr_Lc1bM34nE28EvYKUJko3cb8JdI';
var pagesUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/1/public/values?alt=json';
var eventsUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/2/public/values?alt=json';
var residenciesUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/3/public/values?alt=json';
var teamUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/4/public/values?alt=json';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openFile(location) {
	console.log('opening', location)
	var redirectWindow = window.open(location, '_blank');
    redirectWindow.location;
}

function getEntries(array, entrytype, val) {
    var entries = {};

    for (j=0; j<Object.keys(array).length; j++){
        var key = Object.keys(array)[j];
        if(array[key][entrytype.toString()] === val){
            entries[key] = array[key];
        }
    }

    return entries;
}

function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            curriculum = xmlHttp.responseText;
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


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


var getResidencies = new Promise( function(resolve, reject) {
    $.getJSON(residenciesUrl, function(data){
        var entry = data.feed.entry

        $(entry).each(function(){
	       var key = this["gsx$id"]["$t"];
	       residenciesData[key] = {
	        	"type": this["gsx$type"]["$t"],	
	        	"group": this["gsx$group"]["$t"],
	        	"heading-ar": this["gsx$heading-ar"]["$t"],
	        	"heading-en": this["gsx$heading-en"]["$t"],
	        	"contents-ar": this["gsx$contents-ar"]["$t"] ? this["gsx$contents-ar"]["$t"] : null,
	        	"contents-en": this["gsx$contents-en"]["$t"] ? this["gsx$contents-en"]["$t"] : null,
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
	        residenciesData[key].img = img;
        });
        resolve('Success, residencies!'); 
    })  
})

var getTeam = new Promise( function(resolve, reject) {
    $.getJSON(teamUrl, function(data){
        var entry = data.feed.entry;
        $(entry).each(function(){
	       var key = this["gsx$id"]["$t"];
	       teamData[key] = {
	        	"type": this["gsx$type"]["$t"],	
	        	"name-ar": this["gsx$name-ar"]["$t"],
	        	"name-en": this["gsx$name-en"]["$t"],
	        	"title-ar": this["gsx$title-ar"]["$t"],
	        	"title-en": this["gsx$title-en"]["$t"],
	        	"bio-ar": this["gsx$bio-ar"]["$t"] ? this["gsx$bio-ar"]["$t"] : null,
	        	"bio-en": this["gsx$bio-en"]["$t"] ? this["gsx$bio-en"]["$t"] : null,	        	
	        }
	        
        });
        resolve('Success, team!'); 
    })  
})
