var lang = 'en';
window.lang = lang;

function translateText() {
	lang = (lang === 'ar') ? 'en' : 'ar';

	console.log('lang is now', lang)

	for(i = 0; i< Object.keys(dictionary).length; i++){

		key = Object.keys(dictionary)[i];
		
		if(lang === 'ar')
			$('#'+key).html(`<bdi dir=rtl lang=ar> ${dictionary[key].ar } </bdi>`)
			.css({direction: 'rtl'})
			.attr({lang: 'ar', dir: 'rtl'})

		else
			$('#'+key).html(dictionary[key].en).css({direction: 'ltr', lang: 'en'})
		//replace contents with arabic
		window.lang = lang;
	}

	drawTree();
}