var lang = 'en';
window.lang = lang;

function translateText() {
	lang = (lang === 'ar') ? 'en' : 'ar';

	for(i = 0; i< Object.keys(dictionary).length; i++){

		key = Object.keys(dictionary)[i];
		
		if(dictionary[key].type === 'heading'){
			if(lang === 'ar')
				$('#'+key).html(dictionary[key].ar).css({direction: 'rtl'}).attr({lang: 'ar'})

			else
				$('#'+key).html(dictionary[key].en).css({direction: 'ltr'}).attr({lang: 'en'})
		}

		else {
			if(lang === 'ar'){
				$('#'+key+'Title').html(dictionary[key].ar.title).css({direction: 'rtl'}).attr({lang: 'ar'})
				$('#'+key).html(dictionary[key].ar.contents).css({direction: 'rtl'}).attr({lang: 'ar'})
			}
			else{
				$('#'+key+'Title').html(dictionary[key].en.title).css({direction: 'ltr'}).attr({lang: 'en'})
				$('#'+key).html(dictionary[key].en.contents).css({direction: 'ltr'}).attr({lang: 'en'})
			}
		}
	}

	$('#translate').attr("lang") === 'en' ? $('#translate').attr({lang: 'ar'}) : $('#translate').attr({lang: 'en'}) 

	window.lang = lang;


	if(window.desktop === true){
		drawTree();
	}
}