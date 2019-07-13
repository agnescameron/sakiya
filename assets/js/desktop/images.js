window.showImage = showImage;
window.galleryMode = false;

function closeImage() {
	window.galleryMode = false;
	$('.imageDisplay').remove();
}

function showImage(imageID) {
	window.galleryMode = true;
	var parentPage = imageID.slice(0, -6);
	var imageNumber = imageID.slice(-1);

	var caption = (lang === 'en') ? dictionary[parentPage].img[imageNumber]["caption-en"] 
				: dictionary[parentPage].img[imageNumber]["caption-ar"]

	$display =  $('<div/>', {
        id: imageID + 'display',
        class: 'imageDisplay',
    }).prepend(`<img id=${imageID} class=displayImage src=${dictionary[parentPage].img[imageNumber].location} />`)
    .appendTo( 'body' );

    $('<div/>', {
        id: 'closeImage',
        click: (function(){ closeImage() } ),
    }).appendTo( $display );

    $displayCaption = $('<div/>', {
    	id: imageID + 'Caption',
        class: 'displayCaption',
        click: (function(){ closeImage() } ),
    }).html(`<p>${caption}</p>`)
    .appendTo( $display );

    (lang === 'en') ? $displayCaption.css({direction: 'ltr'}) : $displayCaption.css({direction: 'rtl'})

}