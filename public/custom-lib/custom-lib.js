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
    } else return false;
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
}

function showViewMinified(event) {
    if (typeof(event)!='undefined') {
        blurHomePage();
        $('#' + event.target.dataset.viewName + 'View').removeClass('hiddenView').addClass('minifiedView');
    }
}
function hideViewMinified(event){
    if (typeof(event)!='undefined') {
        unBlurHomePage();
        $('#' + event.target.dataset.viewName + 'View').addClass('hiddenView').removeClass('minifiedView');
    }
}
function toggleView(event){
    event.stopPropagation();
    console.log(event);
    console.log(event.target.dataset.viewName);
    console.log($('#' + event.target.dataset.viewName + 'View').hasClass('minifiedView'));
    if (typeof(event)!='undefined') {
        blurHomePage();
        if($('#' + event.target.dataset.viewName + 'View').hasClass('minifiedView')){
            showView(event);
            hideAllOtherView(event);
        }else{
            hideView(event);
        }
    }
}
function showView(event){
    $('#' + event.target.dataset.viewName + 'View').removeClass('animated-rapier');
    $('#' + event.target.dataset.viewName + 'View').addClass('maximisedView');
    $('#' + event.target.dataset.viewName + 'View').removeClass('hiddenView');
    $('#' + event.target.dataset.viewName + 'View').removeClass('minifiedView');
    $(event.target).parent().addClass('borderBottomGrey');
    console.log($(event.target).parent()[0].onmouseleave);
    $(event.target).parent()[0].onmouseleave = function(){return false;}
    $(event.target).parent()[0].onmouseenter = function(){return false;}
}
function hideView(event){
    $(event.target).parent().removeClass('borderBottomGrey');
    $('#' + event.target.dataset.viewName + 'View').removeClass('maximisedView');
    $('#' + event.target.dataset.viewName + 'View').removeClass('hiddenView');
    $('#' + event.target.dataset.viewName + 'View').addClass('minifiedView');

    $(event.target).parent()[0].onmouseleave = hideViewMinified;
    $(event.target).parent()[0].onmouseenter = showViewMinified;
    setTimeout(function(){
        $('#' + event.target.dataset.viewName + 'View').addClass('animated-rapier');
    }, 400);
}

function hideAllOtherView(event){
    switch(event.target.dataset.viewName){
        case 'explore':
            hidePlayerView();
            hidePlaylistView();
            hideSalonView();
            break;
        case 'player':
            hideExploreView();
            hidePlaylistView();
            hideSalonView();
            break;
        case 'playlist':
            hideExploreView();
            hidePlayerView();
            hideSalonView();
            break;
        case 'salon':
            hideExploreView();
            hidePlayerView();
            hidePlaylistView();
            break;
        default:
            break;
    }
}
function hideExploreView(){
    if($('#exploreView').hasClass('maximisedView')){
        $('#menuItemExplore').removeClass('borderBottomGrey');
        $('#exploreView').removeClass('maximisedView');
        //$('#exploreView').removeClass('minifiedView');
        $('#exploreView').addClass('hiddenView');
        $('#menuItemExplore')[0].onmouseleave = hideViewMinified;
        $('#menuItemExplore')[0].onmouseenter = showViewMinified;
        setTimeout(function(){
            $('#exploreView').addClass('animated-rapier');
        }, 400);
    }
}
function hidePlayerView(){
    if($('#playerView').hasClass('maximisedView')){
        $('#menuItemPlayer').removeClass('borderBottomGrey');
        $('#playerView').removeClass('maximisedView');
        //$('#playerView').removeClass('minifiedView');
        $('#playerView').addClass('hiddenView');
        $('#menuItemPlayer')[0].onmouseleave = hideViewMinified;
        $('#menuItemPlayer')[0].onmouseenter = showViewMinified;
        setTimeout(function(){
            $('#playerView').addClass('animated-rapier');
        }, 400);
    }
}
function hidePlaylistView(){
    if($('#playlistView').hasClass('maximisedView')){
        $('#menuItemPlaylist').removeClass('borderBottomGrey');
        $('#playlistView').removeClass('maximisedView');
        //$('#playlistView').removeClass('minifiedView');
        $('#playlistView').addClass('hiddenView');
        $('#menuItemPlaylist')[0].onmouseleave = hideViewMinified;
        $('#menuItemPlaylist')[0].onmouseenter = showViewMinified;
        setTimeout(function(){
            $('#playlistView').addClass('animated-rapier');
        }, 400);
    }
}
function hideSalonView(){
    if($('#salonView').hasClass('maximisedView')){
        $('#menuItemSalon').removeClass('borderBottomGrey');
        $('#salonView').removeClass('maximisedView');
        //$('#salonView').removeClass('minifiedView');
        $('#salonView').addClass('hiddenView');
        $('#menuItemSalon')[0].onmouseleave = hideViewMinified;
        $('#menuItemSalon')[0].onmouseenter = showViewMinified;
        setTimeout(function(){
            $('#salonView').addClass('animated-rapier');
        }, 400);
    }
}


