var lang = 'en';
window.lang = lang;

function translateText() {
	lang = (lang === 'ar') ? 'en' : 'ar';

	for(i = 0; i< Object.keys(dictionary).length; i++){

		key = Object.keys(dictionary)[i];
		
		if(lang === 'ar')
			$('#'+key).html(dictionary[key].ar).css({direction: 'rtl'})

		else
			$('#'+key).html(dictionary[key].en).css({direction: 'ltr', lang: 'en'})

		window.lang = lang;
	}

	if(window.desktop === true){
		drawTree();
	}
}