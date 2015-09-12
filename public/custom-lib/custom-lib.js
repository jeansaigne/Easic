/**
 * Created by lardtiste on 12/09/15.
 */




function showContentInfo(event) {
    event.stopPropagation();
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
    showOverlay(event);
}

function showOverlay(event) {
    var g = event.layerX;
    var d = $(event.target).width() - event.layerX;
    var h = event.layerY;
    var b = $(event.target).height() - event.layerY;
    console.log(g,h,d,b);
    if (g<15) {
        console.log("show gauche");
        $(event.target).find('.home-feature-overlay').first().css({
            left: '-100%' ,
            top:'0',
            transform: 'translateX(100%)'
        });
    }
    if (d<15) {
        console.log("show droite");
        $(event.target).find('.home-feature-overlay').first().css({
            left: '100%' ,
            top:0,
            transform: 'translateX(-100%)'
        });
    }
    if (h<15) {
        console.log("show haut");
        $(event.target).find('.home-feature-overlay').first().css({
            top: '-100%' ,
            left:0,
            transform: 'translateY(100%)'
        });
    }
    if (b<15) {
        console.log("show bas");
        $(event.target).find('.home-feature-overlay').first().css({
            top: '100%' ,
            left: 0,
            transform: 'translateY(-100%)'
        });
    }
}

function hideOverlay(event) {
    console.log(event);
    var g = event.layerX;
    var d = $(event.target).width() - event.layerX;
    var h = event.layerY;
    var b = $(event.target).height() - event.layerY;
    if (g<15) {
        console.log("hide gauche");
        $(event.target).find('.home-feature-overlay').first().css({
            transform: 'translateX(-100%)'
        });
    }
    if (d<15) {
        console.log("hide droite");
        $(event.target).find('.home-feature-overlay').first().css({
            //left: '0' ,
            transform: 'translateX(100%)'
        });
    }
    if (h<15) {
        console.log("hide haut");
        $(event.target).find('.home-feature-overlay').first().css({
            top: '0' ,
            transform: 'translateY(-100%)'
        });
    }
    if (b<15) {
        console.log("hide bas");
        $(event.target).find('.home-feature-overlay').first().css({
            transform: 'translateY(100%)'
        });
    }

    setTimeout(function() {
        $(event.target).find('.home-feature-overlay').first().css({
            top:'100%',
            left: 0,
            transform: 'none'
        })
    },500);
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
