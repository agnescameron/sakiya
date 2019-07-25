window.showImage = showImage;
window.galleryMode = false;

function closeImage() {
	window.galleryMode = false;
	$('.galleryContainer').remove();
}

function showImage(imageID, images, pageArray) {
	window.galleryMode = true;

	var parentPage = imageID.slice(0, -6);
	var imageNumber = imageID.slice(-1);

	var caption = (lang === 'en') ? pageArray[parentPage].img[imageNumber]["caption-en"] 
				: pageArray[parentPage].img[imageNumber]["caption-ar"]

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

    console.log('images length is', images.length)
    for (i=0; i<images.length; i++){

        $imageBox = $(`<div/>`, {
            class: 'imageBox'
        }).prepend(`<img class='galleryImage' src=${pageArray[parentPage].img[i].location} />`)

        $imageBox.appendTo( $gallery );
        
        // $displayCaption = $('<div/>', {
        // 	id: imageID + 'Caption',
        //     class: 'displayCaption',
        //     click: (function(){ closeImage() } ),
        // }).html(`<p>${caption}</p>`)
        // .appendTo( $gallery );

    //(lang === 'en') ? $displayCaption.css({direction: 'ltr'}) : $displayCaption.css({direction: 'rtl'})
    }
}