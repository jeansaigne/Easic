/**
 * Created by lardtiste on 12/09/15.
 */

function showContentInfo(event) {
    if (!$(".content-info:visible").first().hasClass("content-info-"+event.target.dataset.contentinfo)) {
        var squares = $(".home-feature-square");
        squares.unbind("mouseenter");
        var classeToFind = ".content-info-" + event.target.dataset.contentinfo;
        var divToShow = $(classeToFind);
        var divToHide = $(".content-info:not("+classeToFind+")");
        divToHide.slideUp();
        divToShow.slideDown();
        squares.bind("mouseenter", showContentInfo);
    }
}

function blurHomePage(){
    jQuery('#homeSection').addClass('opacity50');

}

function unBlurHomePage(){
    $('#homeSection').removeClass('opacity50');
}

function toggleAllMenu() {
//		$('#lecteurMinimizedView').removeClass('viewItemFull').addClass('displayNone').addClass('').removeClass('displayBlock');
//		$('#rechercheMinimizedView').removeClass('viewItemFull').addClass('displayNone').addClass('').removeClass('displayBlock');
//		$('#playlistMinimizedView').removeClass('viewItemFull').addClass('displayNone').addClass('').removeClass('displayBlock'),
//				$('#gestionPlaylist').addClass('displayNone').removeClass('item50pourcent'),
//				$('#fileDeLectureContent').removeClass('item50pourcent'), $('#realTimePlaylistListMinimized').removeClass('scrollable');
//		$('#salonMinimizedView').removeClass('viewItemFull').addClass('displayNone').addClass('').removeClass('displayBlock');
}
