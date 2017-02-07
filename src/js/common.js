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

$(window).on('load', function() {

    $('a').on('click', function (e) {
        e.preventDefault();
    });

    $("select").click(
        function () {
            var e = $( this );
            e.addClass("chose-select");
        }
    );

    $(".option-hide").click(
        function () {
            var e = $( this );
            e.removeClass("option-hide");
        }
    );

    $(".loader_inner").fadeOut();
    $(".loader").delay(300).fadeOut("slow");


    $('[data-toggle="tooltip"]').tooltip({
        'delay': {show: 500, hide: 100}
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

$("[data-fancybox]").fancybox({
    // Options will go here
});
