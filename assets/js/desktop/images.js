window.showImage = showImage;
window.galleryMode = false;

function closeImage() {
	window.galleryMode = false;
	$('.galleryContainer').remove();
}

function showImage(imageID, images, pageArray) {
	window.galleryMode = true;

//	var imageNumber = imageID.slice(-1);

    $galleryContainer =  $('<div/>', {
        class: 'galleryContainer',
    })
    .appendTo( '#mainContainer' );

    $gallery = $('<div/>', {
        class: 'gallery',
    })
    .appendTo( $galleryContainer );

        $('<div/>', {
            class: 'galleryBackButton',
            click: (function(){ closeImage() } ),
        }).appendTo( $gallery );

    for (i=0; i<images.length; i++){

        $imageBox = $(`<div/>`, {
            class: 'imageBox'
        }).prepend(`<img id=img${i} class='galleryImage' src=${images[i].location} />`)

        $imageBox.appendTo( $gallery );

        var caption = (lang === 'en') ? images[i]["caption-en"] 
                : images[i]["caption-ar"]

        console.log('width is ', $imageBox.width())

        $displayCaption = $('<div/>', {
        	id: imageID + 'Caption',
            class: 'imageCaption',
            lang: lang,
        })
        .css({'width': $imageBox.width()})
        .html(`<p>${caption}</p>`)
        .appendTo( $imageBox );


    //(lang === 'en') ? $displayCaption.css({direction: 'ltr'}) : $displayCaption.css({direction: 'rtl'})
    }
}