//this file gets all of the site data and parses it as json
var dictionary = {};
var eventsData = {};
var newsData = {};
var residenciesData = {};
var teamData = {};
var curriculum = {};
const apiKey = 'AIzaSyBuxNiPrjQ2IjNxBdXHLSNbjla2WWgYeSc';

//https://docs.google.com/spreadsheets/d/e/2PACX-1vS6WcCYyeMZGpRHogRLTwnL8xKYtsX5ti578ZRilDX2ZPiEipk8BPaUgG4d3Gxd3JaKUwA0T0A7sbOy/pubhtml

var sheetID = '1C6J5D7rLWc7Q7SRr_Lc1bM34nE28EvYKUJko3cb8JdI';
var pagesUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/pages?alt=json&key=' + apiKey;
var eventsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/events?alt=json&key=' + apiKey;
var residenciesUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/residencies?alt=json&key=' + apiKey;
var teamUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/people?alt=json&key=' + apiKey;
var newsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetID + '/values/news?alt=json&key=' + apiKey;


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

function toJSON(data)
// convert array of arrays to JSON

{
	const headers = data[0]
	const rows = data.slice(1, data.length)
	let jsonArr = []

	rows.forEach(row => {
		let obj = {}
		row.map( function(val, index){ obj[headers[index]] = val } )
		jsonArr.push(obj)
	})

	return jsonArr;
}

var getDictionary = new Promise( function(resolve, reject) {
    $.getJSON(pagesUrl, function(data){
    	console.log(data)
        // var entry = data.values
        var entry = toJSON(data.values)

        $(entry).each(function(index, value){
			dictionary[value.id] = value;
	        var img = [];
	        for(var i=0; i<6; i++){
	        	if(value[`image${i}`]){
		        	var image = {
		        	"location": value[`image${i}`],
		        	"caption-en": value[`imageCaption${i}-en`] ? value[`imageCaption${i}-en`] : '',
		        	"caption-ar": value[`imageCaption${i}-ar`] ? value[`imageCaption${i}-ar`] : '',
		        	}
	        	img[i] = image;
	        	}
	        }
	        dictionary[value.id].img = img;
        });
        resolve('Success, dictionary!');
    })
})

var getEvents = new Promise( function(resolve, reject) {
    $.getJSON(eventsUrl, function(data){
        // var entry = data.values
        var entry = toJSON(data.values)
        console.log('entry is', entry)

        $(entry).each(function(index, value){
        	eventsData[value.id] = value;
	        
	        var img = [];
	        for(var i=0; i<6; i++){
	        	if(value[`image${i}`]){
		        	var image = {
		        	"location": value[`image${i}`],
		        	"caption-en": value[`imageCaption${i}-en`] ? value[`imageCaption${i}-en`] : '',
		        	"caption-ar": value[`imageCaption${i}-ar`] ? value[`imageCaption${i}-ar`] : '',
		        	}
	        	img[i] = image;
	        	}
	        }
	        eventsData[value.id].img = img;
        });
        resolve('Success, events!'); 
    })  
})


var getResidencies = new Promise( function(resolve, reject) {
    $.getJSON(residenciesUrl, function(data){
        // var entry = data.values
        var entry = toJSON(data.values)
        console.log('in residencies, entry is', entry)

        $(entry).each(function(index, value){
        	residenciesData[value.id] = value
	        
	        var img = [];
	        for(var i=0; i<6; i++){
	        	if(value[`image${i}`]){
		        	var image = {
		        	"location": value[`image${i}`],
		        	"caption-en": value[`imageCaption${i}-en`] ? value[`imageCaption${i}-en`] : '',
		        	"caption-ar": value[`imageCaption${i}-ar`] ? value[`imageCaption${i}-ar`] : '',
		        	}
	        	img[i] = image;
	        	}
	        }
	        residenciesData[value.id].img = img;
        });
        resolve('Success, residencies!'); 
    })  
})

var getTeam = new Promise( function(resolve, reject) {
    $.getJSON(teamUrl, function(data){
        // var entry = data.values;
        var entry = toJSON(data.values)

        $(entry).each(function(index, value){
        	teamData[value.id] = value
        });
        resolve('Success, team!'); 
    })  
})

var getNews = new Promise( function(resolve, reject) {
    $.getJSON(newsUrl, function(data){
        // var entry = data.values;
        var entry = toJSON(data.values)

        $(entry).each(function(index, value){
        	newsData[value.id] = value
        });
        resolve('Success, news!');
        console.log(newsData);
    })  
})
