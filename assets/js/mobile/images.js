window.showMobileImage = showMobileImage;

function showMobileImage(containerID, title) {
    console.log('mobile image container', $('#'+containerID).attr('class'))

    $('#'+containerID).parent()
    .addClass('textPageExpandedGallery').removeClass('textPageImageBox')

    $('#'+containerID).css({'background-color': '#309937'})
    //$('#'+title).css({'height': '0'})
}