;(function ($) {
    var fn = $.fn || {};

    fn.DogPedigreeControl = function (method) {
        var that = this,
            settingsDataKey = 'DogPedigreeControl',
            settings = that.data(settingsDataKey) || {
                    loading: false,
                    that: that

                },
            methods = {
                init: function () {
                    that.find('button.btn-azure').each(function (i, e) {
                        $(e).on('click', function () {
                            methods._btnShowAncestors(e);
                        })
                    });
                }
                , _btnShowAncestors: function (e) {

                    // clicked button
                    var btn = $(e),
                        parent_li = btn.parent('.ancestors-wrap').parent('li'),
                        parent_ul = parent_li.parent('ul'),
                        child_ul = parent_li.find('>ul'),
                        child_ul_li = child_ul.find('>li');

                    // set hidden all ul and li in chain from top
                    settings.that.find('ul').each(function (i, e) {
                        $(e).addClass('hidden');
                        $(e).find('li').addClass('hidden');
                    });

                    parent_ul.find('>li').each(function (i, e) {
                        $(e).addClass('hidden');
                    });

                    parent_li.removeClass('hidden');
                    child_ul.removeClass('hidden');
                    child_ul_li.removeClass('hidden');

                    function getButton(li) {
                        return $(li).find('>div>button.btn-azure').first();
                    }

                    // remove hidden from parent chain ul and li elements to top
                    function onParentUlChain(ul) {

                        var parent_li = $(ul).parent('li'),
                            parent_ul = parent_li.parent('ul');

                        if (btn.parent().hasClass('ancestors-current-dog')) {
                            btn.addClass('hidden')
                        } else {
                            settings.that.find('.ancestors-current-dog').find('>button.generation-current').removeClass('hidden');
                        }

                        parent_ul.removeClass('hidden');
                        parent_li.removeClass('hidden');

                        if (parent_ul.length) {
                            onParentUlChain(parent_ul);
                        }

                        $(ul).removeClass('hidden');
                    }

                    onParentUlChain(parent_ul);
                    getButton(child_ul_li).removeClass('hidden');
                    btn.addClass('hidden');

                    // check no hidden on first level, else on first level
                    if (settings.that.find('>ul').hasClass('hidden')) {
                        var top_ul = settings.that.find('>ul');
                        top_ul.removeClass('hidden');
                        top_ul.find('>li').each(function (i, e) {
                            $(e).removeClass('hidden');
                            getButton(e).removeClass('hidden');
                        });
                    }


                }
                // , _btnShowAncestors: function (e) {
                //
                //     //todo: дописат обработку кнопки показать предков на первом уровне
                //
                //     var btn = $(e),
                //         li = btn.parent('.ancestors-wrap').parent('li'),
                //         ul = li.parent('ul')
                //         ;
                //
                //     // set hidden all ul and li in chain from top
                //     settings.that.find('ul').each(function(i,e){
                //         $(e).addClass('hidden');
                //         $(e).find('li').addClass('hidden');
                //     });
                //
                //     // remove hidden from parent ul of clicked button
                //     li.removeClass('hidden');
                //
                //     // remove hidden from bottom 1 level ul and li
                //     li.find('>ul').each(function (i, e) {
                //         $(e).removeClass('hidden');
                //         $(e).find('>li').removeClass('hidden');
                //     });
                //
                //     // method to toggle visibility of button
                //     function toggleShowGeneration(li, action){
                //
                //         var btn = $(li).find('>button.btn-azure');
                //
                //         console.log(li, btn);
                //
                //         if(!action){
                //             if(btn.hasClass('hidden')){ action = 'on'; }
                //                 else { action = 'off'; }
                //         }
                //
                //         switch(action){
                //             case 'on':
                //                 btn.removeClass('hidden');
                //                 break;
                //             case 'off':
                //                 btn.addClass('hidden');
                //                 break;
                //         }
                //     }
                //
                //     // remove hidden from parent chain ul and li elements to top
                //     function onParentUlChain(e){
                //         console.log(e);
                //         var li = $(e).parent('li'),
                //             ul = li.parent('ul');
                //
                //         if(btn.parent().hasClass('ancestors-current-dog')){
                //             btn.addClass('hidden')
                //         } else {
                //             settings.that.find('.ancestors-current-dog').find('>button.generation-current').removeClass('hidden');
                //         }
                //
                //         ul.removeClass('hidden');
                //         li.removeClass('hidden');
                //
                //         toggleShowGeneration(li, 'off');
                //
                //         if(ul.length){
                //             onParentUlChain(ul);
                //         }
                //
                //         $(e).removeClass('hidden');
                //     }
                //
                //     onParentUlChain(ul);
                //
                //     // hidden clicked button
                //     $(e).addClass('hidden');
                //
                //     // check no hidden on first level, else on first level
                //     if(settings.that.find('>ul').hasClass('hidden')){
                //         settings.that.find('>ul').removeClass('hidden');
                //         settings.that.find('>ul').each(function (i, e) {
                //             $(e).find('>li').each(function(i,e){
                //                 $(e).removeClass('hidden');
                //                 toggleShowGeneration(e, 'on');
                //             });
                //         });
                //     }
                //
                // }
            }
        ;

        if (methods[method]) {
            // return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            // return methods.init.apply( this, arguments );
            methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для ' + settingsDataKey);
        }

        that.data(settingsDataKey, settings);
    };

    $.fn = fn;

    $('#ancestors').DogPedigreeControl();

}(jQuery));