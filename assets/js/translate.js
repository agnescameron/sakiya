var lang = 'en';
window.lang = lang;

function translateText() {
	lang = (lang === 'ar') ? 'en' : 'ar';

	//deal with the marquee
	if(lang === 'ar'){
		$('#marquee').remove();

		$marquee = $('<div/>', {
            id: 'marquee',
            class: 'marquee',
        })
        
        $span = $('<span/>', {
			lang:'ar',
			id: 'marqueeText',
        })
        .html(`${dictionary['marquee']["heading-ar"]}`)
        .css({direction: 'rtl'})
        // .html(`${dictionary['marquee']["heading-ar"]}`)

        $marquee.appendTo('#marqueeContainer')
        $span.appendTo('#marquee')

		//$('#marquee').css({direction: 'rtl'}).attr({lang: 'ar', direction: 'right'});
	}

	else{
		$('#marqueeText').remove();

		$('<span/>', {
            id: 'marqueeText',
            lang: 'en',
        })
        .html(`${dictionary['marquee']["heading-en"]}`)
        .css({direction: 'ltr'})
        .appendTo('#marquee')


		//$('#marquee').css({direction: 'ltr'}).attr({lang: 'en', direction: 'left'})
	}

	for(i = 0; i< Object.keys(dictionary).length; i++){

		key = Object.keys(dictionary)[i];
		
		if(dictionary[key].type === 'heading'){
			console.log('translating', key)
			if(lang === 'ar'){
				$(`[id=${key}]`).html(dictionary[key]["heading-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
			}

			else{
				$(`[id=${key}]`).html(dictionary[key]["heading-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
			}
		}

		else {
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


	if(	window.pageMode === true) {

		if(lang === 'ar'){
			$('.backButton').css({'float': 'left'});
			$('.sideImage').css({'margin-left': '30px'});
			$('#mainMenuContainer').addClass('mainMenuContainer-ar').removeClass('mainMenuContainer-en');
			$('#subMenuContainer').addClass('subMenuContainer-ar').removeClass('subMenuContainer-en');
			$('#imageContainer').addClass('imageContainer-ar').removeClass('imageContainer-en');
			$('#eventPageContainer').addClass('eventPageContainer-ar').removeClass('eventPageContainer-en');		
		}

		else{
			$('.backButton').css({'float': 'right'});
			$('.sideImage').css({'margin-left': '30px'});
			$('#mainMenuContainer').addClass('mainMenuContainer-en').removeClass('mainMenuContainer-ar');
			$('#subMenuContainer').addClass('subMenuContainer-en').removeClass('subMenuContainer-ar');
			$('#imageContainer').addClass('imageContainer-en').removeClass('imageContainer-ar');			
			$('#eventPageContainer').addClass('eventPageContainer-en').removeClass('eventPageContainer-ar');	
		}

		$('.eventBox').attr({lang: lang})

		var mainOffset = $("#mainMenuContainer").offset().left + 20;
    	var subOffset = $("#subMenuContainer").offset().left;

		for(i=0; i<menus["main"].contents.length; i++){
			var mainMenuItem = menus["main"].contents[i].replace(/\s/g, '');			
		    $( '#' + mainMenuItem).parent().animate({'left': mainOffset+'px'}, 1000);   
		    (lang === 'en') ? $( '#' + mainMenuItem).animate({'left': '10px'}, 800) : $( '#' + mainMenuItem).animate({'right': '100px'}, 800)

		}

	    var i = 0;
	    $(`.subframe:visible`).each(function() {

	        var topOffset = 110 + 70*parentFrame;
	        $div = $('#' + $(this).attr('id'))
	        $div.children().attr('id')

	        $div.css({'left': subOffset + 'px'})
	        $div.css({'top': topOffset + 50*i + 'px'})   

	        $div.show()
	        $div.children().show()

	        if(lang === 'en')
	            $div.children().css({'left': '35px', 'right': ''}, 800)

	        else
	            $div.children().css({ 'left': '', 'right': '10px'}, 800)

	        i++;
	    });
	}

	for(i = 0; i< Object.keys(eventsData).length; i++){
		key = Object.keys(eventsData)[i];

		if(lang === 'ar'){
			$('#'+key+'Title').html(eventsData[key]["heading-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
			$('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'})			
			$('#'+key+'Contents').html(eventsData[key]["contents-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
		    $(`.eventBackButton`).css({'float': 'left'}) 
		}
		else{
			$('#'+key+'Title').html(eventsData[key]["heading-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
			$('#'+key+'Date').css({direction: 'ltr'}).attr({lang: 'en'})			
			$('#'+key+'Contents').html(eventsData[key]["contents-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
		    $(`.eventBackButton`).css({'float': 'right'})
		}
	}

	for(i = 0; i< Object.keys(residenciesData).length; i++){
		key = Object.keys(residenciesData)[i];

		if(lang === 'ar'){
			$('#'+key+'Title').html(residenciesData[key]["heading-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
			$('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'})			
			$('#'+key).html(residenciesData[key]["contents-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
		    $(`.eventBackButton`).css({'float': 'left'}) 
		}
		else{
			$('#'+key+'Title').html(residenciesData[key]["heading-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
			$('#'+key+'Date').css({direction: 'ltr'}).attr({lang: 'en'})			
			$('#'+key).html(residenciesData[key]["contents-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
		    $(`.eventBackButton`).css({'float': 'right'})
		}
	}

	for(i = 0; i< Object.keys(teamData).length; i++){
		key = Object.keys(teamData)[i];

		if(lang === 'ar'){
			$('#'+key+'Name').html(teamData[key]["name-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})
			$('#'+key+'Title').html(teamData[key]["title-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})		
			$('#'+key+'Bio').html(teamData[key]["bio-ar"]).css({direction: 'rtl'}).attr({lang: 'ar'})	
		    $(`.backButton`).css({'float': 'left'}) 
		}
		else{
			$('#'+key+'Name').html(teamData[key]["name-en"]).css({direction: 'ltr'}).attr({lang: 'en'})
			$('#'+key+'Title').html(teamData[key]["title-en"]).css({direction: 'ltr'}).attr({lang: 'en'})		
			$('#'+key+'Bio').html(teamData[key]["bio-en"]).css({direction: 'ltr'}).attr({lang: 'en'})	
		    $(`.backButton`).css({'float': 'right'}) 
		}
	}


	$('#translate').attr("lang") === 'en' ? $('#translate').attr({lang: 'ar'}) : $('#translate').attr({lang: 'en'}) 

	window.lang = lang;


	if(window.desktop === true){
		drawTree();
	}
}