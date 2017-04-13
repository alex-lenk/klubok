function activeItemLogic(itemsSelector, activeClassName) {
    var items = $(itemsSelector);
    items.on('click', function () {
        if ($(this).hasClass(activeClassName) == false) {
            items.filter('.' + activeClassName).removeClass(activeClassName);
            $(this).addClass(activeClassName);
        }
    });
}

var headerModule = {
    profileMinWidth: 0,
    profileInfoMinwidth: 0,
    profileImgMax: 260,
    profileImgMin: 100,
    init: function () {
        $(".name").css('white-space', 'nowrap');
        $(".name").css('display', 'block');
        this.profileMinWidth = $('.profile-info').width() + $('.profile-actions').width();
        this.profileInfoMinwidth = $(".profile-info").width() + 20;
        $(".name").removeAttr('style');
        this.resizeHeader();
    },
    resizeHeader: function () {
        var windowWidth = $(window).width();
        $(".header-middle").removeClass("header-middle-small");
        $('.header-media-content').removeAttr('style');
        $(".header-media").removeClass('header-media-small');

        if (windowWidth < this.profileInfoMinwidth + this.profileImgMin) {
            $(".header-media").addClass('header-media-small');
            $(".header-middle").addClass("header-middle-small");
        } else if (windowWidth < this.profileMinWidth + this.profileImgMax + 30) {
            $(".header-middle").addClass("header-middle-small");
            $('.header-media-content').css('min-width', this.profileInfoMinwidth + 'px');
        }
        this.updateImageBorderWidth();
    },
    updateImageBorderWidth: function () {
        var profileImg = $(".profile-img");
        var uploadProfileImg = $(".upload-profile-img");
        var borderWidth = ~~( ( profileImg.width() - 45 ) / 35 ) + 1;

        profileImg.removeAttr('style');
        uploadProfileImg.removeAttr('style');

        profileImg.css('border', borderWidth + 'px solid #fff');
        uploadProfileImg.css('margin', borderWidth + 'px');
    }
};

$(window).on('load', function () {
    $("select").click(
        function () {
            var e = $(this);
            e.addClass("chose-select");
        }
    );

    $(".option-hide").click(
        function () {
            var e = $(this);
            e.removeClass("option-hide");
        }
    );

    $(".loader_inner").fadeOut();
    $(".loader").delay(300).fadeOut("slow");


    $('[data-toggle="tooltip"]').tooltip({
        //'delay': {show: 500, hide: 100}
    });

    $(".login-options__item").click(function () {
        $(this).toggleClass("login-options-active");
    });

    activeItemLogic('.language>a', 'active-language');

    headerModule.init();

    $(window).on("resize", function () {
        headerModule.resizeHeader();
    });
});

$("[data-fancybox]").fancybox({});

$(function () {
    var $image = $('#image');
    var cropBoxData;
    var canvasData;

    $('#addPhotoProfile').on('shown.bs.modal', function () {
        $image.cropper({
            autoCropArea: 0.5,
            ready: function () {
                $image.cropper('setCanvasData', canvasData);
                $image.cropper('setCropBoxData', cropBoxData);
            }
        });
    }).on('hidden.bs.modal', function () {
        cropBoxData = $image.cropper('getCropBoxData');
        canvasData = $image.cropper('getCanvasData');
        $image.cropper('destroy');
    });
});

$(document).ready(function () {

    $(".post-edit").click(
        function () {
            var e = $(this).parent().find('.post-edit-nav');
            var b = $(this).parent().find('.post-edit');
            e.toggleClass("post-edit-close");
            b.toggleClass("post-edit-top");
        }
    );

    $(".post-meta-open-form").click(
        function () {
            var e = $(this).parent().parent().find('.comment-form');
            e.toggleClass("close-form-comment");
        }
    );

    $(".post-reply-third").click(
        function () {
            var e = $(this).parent('.post-comment-reply');
            e.toggleClass("post-comment-reply__open");
        }
    );

    $('.single-item').slick({
        dots: true,
        arrows: false,
        prevArrow: '<button type="button" data-role="none" class="icon-prev" aria-label="Previous" tabindex="0" role="button"></button>',
        nextArrow: '<button type="button" data-role="none" class="icon-next" aria-label="Next" tabindex="0" role="button"></button>'
    });


/*    $('textarea').keyup(function () {
        $(this).height(0);
        $(this).height(this.scrollHeight);
        if ($(this).val().length <= 0) $(this).height(0);
    });*/
});