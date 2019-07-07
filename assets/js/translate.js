var lang = 'en'

function translateText() {
	lang = (lang === 'ar') ? 'en' : 'ar';

	console.log('lang is now', lang)

	for(i = 0; i< Object.keys(dictionary).length; i++){

		key = Object.keys(dictionary)[i];
		
		if(lang === 'ar')
			$('#'+key).html(dictionary[key].ar)

		else
			$('#'+key).html(dictionary[key].en)
		//replace contents with arabic
	}

	drawTree();
}