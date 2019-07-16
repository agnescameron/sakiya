var lang = 'en';
window.lang = lang;

function translateText() {
	lang = (lang === 'ar') ? 'en' : 'ar';

	//deal with the marquee
	if(lang === 'ar'){
		$('#marquee').remove();

		$('<marquee/>', {
            id: 'marquee',
            lang: 'ar',
            direction: 'right'
        })
        .html(`<div>${dictionary['marquee']["heading-ar"]}</div>`)
        .appendTo('#marqueeContainer')

		//$('#marquee').css({direction: 'rtl'}).attr({lang: 'ar', direction: 'right'});
	}

	else{
		$('#marquee').remove();

		$('<marquee/>', {
            id: 'marquee',
            lang: 'en',
            direction: 'left',

        })
        .css({direction: 'ltr'})
        .html(dictionary['marquee']["heading-en"])
        .appendTo('#marqueeContainer')


		//$('#marquee').css({direction: 'ltr'}).attr({lang: 'en', direction: 'left'})
	}

	for(i = 0; i< Object.keys(dictionary).length; i++){

		key = Object.keys(dictionary)[i];
		
		if(dictionary[key].type === 'heading'){
			if(lang === 'ar'){
				$('#'+key).html(dictionary[key]["heading-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
			}

			else{
				$('#'+key).html(dictionary[key]["heading-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
			}
		}

		else if (dictionary[key].type === 'page') {
			if(lang === 'ar'){
				$('#'+key+'Title').html(dictionary[key]["heading-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
				$('#'+key).html(dictionary[key]["contents-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
			}
			else{
				$('#'+key+'Title').html(dictionary[key]["heading-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
				$('#'+key).html(dictionary[key]["contents-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
			}
		}
	}

	if(	window.galleryMode === true ){
		console.log('woooooo in the gallery')
		//gets the caption div, 
		$(".displayCaption").each(function() {
	    	
			imageID = this.id.slice(0, -7);
			console.log(this)

			var parentPage = imageID.slice(0, -6);
			var imageNumber = imageID.slice(-1);

			if(lang==='ar')
	    		$(this).css({"margin-left": '30%'})
	    		.html('<p>' + dictionary[parentPage].img[imageNumber]["caption-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'} + '</p>')

			else
	    		$(this).css({"margin-left": '20%'})
	    		.html('<p>' + dictionary[parentPage].img[imageNumber]["caption-en"] ).css({direction: 'ltr'}).attr({lang: 'en'} + '</p>')	    	

		});
	}


	$('#translate').attr("lang") === 'en' ? $('#translate').attr({lang: 'ar'}) : $('#translate').attr({lang: 'en'}) 

	window.lang = lang;


	if(window.desktop === true){
		drawTree();
	}
}