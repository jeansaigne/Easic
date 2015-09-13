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

