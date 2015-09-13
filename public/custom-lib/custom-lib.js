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
    var contentOverlay = $(event.target).find('.home-feature-overlay').first();
    var cssToApply = {};
    console.log(g, h, d, b);
    if (g < 15) {
        console.log("show gauche");
        cssToApply.left = '-100%';
        cssToApply.top = 0;
        cssToApply.transform = 'translateX(100%)';
        contentOverlay.data('x',100);
        contentOverlay.data('y',0);
    }
    if (d < 15) {
        console.log("show droite");
        cssToApply.left = '100%';
        cssToApply.top = 0;
        cssToApply.transform = 'translateX(-100%)';
        contentOverlay.data('x',-100);
        contentOverlay.data('y',0);
    }
    if (h < 15) {
        console.log("show haut");
        cssToApply.left = 0;
        cssToApply.top = '-100%';
        cssToApply.transform = 'translateY(100%)';
        contentOverlay.data('y',100);
        contentOverlay.data('x',0);
    }
    if (b < 15) {
        console.log("show bas");
        cssToApply.left = 0;
        cssToApply.top = '100%';
        cssToApply.transform = 'translateY(-100%)';
        contentOverlay.data('y',-100);
        contentOverlay.data('x',0);
    }
    if (typeof(g) != 'undefined' && !isNaN(g)) {
        contentOverlay.show().css(cssToApply);
    }
}

function hideOverlay(event) {
    console.log(event);
    var g = event.layerX;
    var d = $(event.target).width() - event.layerX;
    var h = event.layerY;
    var b = $(event.target).height() - event.layerY;
    var contentOverlay = $(event.target).find('.home-feature-overlay').first();
    var cssToApply = {};
    if (g<15) {
        console.log("hide gauche");
        cssToApply.transform = 'translate3d('+(contentOverlay.data('x')-100)+'%, '+contentOverlay.data('y')+'%,0)';
    }
    if (d<15) {
        console.log("hide droite");
        cssToApply.transform = 'translate3d('+(contentOverlay.data('x')+100)+'%,'+contentOverlay.data('y')+'%,0)';
    }
    if (h<15) {
        console.log("hide haut");
        cssToApply.transform = 'translateY('+(contentOverlay.data('x'))+'%,'+(contentOverlay.data('y')-100)+'%,0)';
    }
    if (b<15) {
        console.log("hide bas");
        cssToApply.transform = 'translateY('+(contentOverlay.data('x'))+'%,'+(contentOverlay.data('y')+100)+'%,0)';
    }
    contentOverlay.css(cssToApply);
    setTimeout(function() {
        contentOverlay.removeClass('animated-rapier-transform').css({
            display:'none',
            top:'100%',
            left: 0,
            '-webkit-transform': 'none'
        }).addClass('animated-rapier-transform');
    },400);
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
