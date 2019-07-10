//this file gets all of the site data and parses it as json
var page1Data = [];
var page2Data = [];


async function getJSON() {
    var sheetID = '1C6J5D7rLWc7Q7SRr_Lc1bM34nE28EvYKUJko3cb8JdI';
    var pagesUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/1/public/values?alt=json';
    var eventsUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/2/public/values?alt=json';

    $.getJSON(pagesUrl, function(data){
        var entry = data.feed.entry

        $(entry).each(function(){
	        page1Data.push(
	        {
	        	"id": this["gsx$id"]["$t"],
	        	"type": this["gsx$type"]["$t"],
	        	"heading-ar": this["gsx$heading-ar"]["$t"],
	        	"heading-en": this["gsx$heading-en"]["$t"],
	        	"contents-ar": this["gsx$contents-ar"]["$t"] ? this["gsx$contents-ar"]["$t"] : null,
	        	"contents-en": this["gsx$contents-en"]["$t"] ? this["gsx$contents-en"]["$t"] : null,
	        	"images": this["gsx$images"]["$t"] ? this["gsx$images"]["$t"] : null,
	        })
        });
        console.log(page1Data)
    })



    $.getJSON(eventsUrl, function(data){
        var entry = data.feed.entry

        $(entry).each(function(){
	        page2Data.push(
	        {
	        	"id": this["gsx$events"]["$t"],
	        	"type": this["gsx$eeeeee"]["$t"],
	        	"heading-ar": this["gsx$heading-ar"]["$t"],
	        	"heading-en": this["gsx$heading-en"]["$t"],
	        	"contents-ar": this["gsx$contents-ar"]["$t"] ? this["gsx$contents-ar"]["$t"] : null,
	        	"contents-en": this["gsx$contents-en"]["$t"] ? this["gsx$contents-en"]["$t"] : null,
	        	"images": this["gsx$images"]["$t"] ? this["gsx$images"]["$t"] : null,
	        })
        });
        console.log(page2Data)
    })    
}
