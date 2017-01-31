(function( $ ) {
    // получаем список плагинов jQuery или создаем объект с плагинами
    var fn = $.fn || {};

    // Menu Plugin
    fn.clubokMenu = function(_action, data){
        var action = _action || 'init',
            // настройки
            options = {
                activeDivClass: 'active-nav',
                activeLiClass: 'active',
                // ulId: 'owl-carousel-2',
                ulId: $(this).attr('id'),
                containerPaddingOnSmall: 100
            },
            // объект UL со списком элементов меню
            menu = $('#' + options.ulId),
            // текуший объект с которого вызвали плагин
            obj = this;
            // расчет отсутпов у контейнера с элементами
            // menu_padding = menu.parent('section').width() - menu.width();

        // ** functions **
        this.clearActive = function(){
            menu.children('div.menu-item').each(function(i, e){
                $(e).removeClass(options.activeDivClass);
                $('li', e).removeClass(options.activeLiClass);
            });
        };
        this.CountSizes = function(){
            var w = menu.width(),
                items_min_sizes = {};
            menu.width(1);
            menu.children('div.menu-item').each(function(i, e){ items_min_sizes[i] = $(e).width(); } );
            menu.width(w);
            return items_min_sizes;
        };
        this.switchOffItems = function(){ menu.children('div').each(function(i, e){ $(e).hide(); }); };
        this.navigationButtons = function () {

                // состояние элементов
            var itemsState = {},
                // первый отображаемый
                first_on = null,
                // последний отображаемый
                last_on = null,
                // панель навигации
                nav = $('div.owl-nav', menu);

            menu.children('div.menu-item').each(function(i, e){
                itemsState[i] = $(e).is(":visible") ? 1 : 0;
                if(itemsState[i] == 1 && first_on === null){ first_on = i; }
                if(itemsState[i] == 0 && first_on !== null && last_on === null){ last_on = i-1; }
            });

            // если последний элемент также включен
            if(last_on === null){ last_on = Object.keys(itemsState).length - 1; }

            if(first_on === 0 && last_on === (Object.keys(itemsState).length - 1)){
                nav.hide();
                menu.removeAttr( 'style' );
            } else {
                $('div.owl-prev', nav).attr('arrows-counter', first_on);
                $('div.owl-next', nav).attr('arrows-counter', Object.keys(itemsState).length - 1 - last_on);
                nav.show();
                menu.css('width', '100%');
                menu.css('padding-left', 50);
                menu.css('padding-right', 50);
            }

        };

        // *** INIT ***
        this.Init = function () {

            // add navigation
            menu.append('<div class="owl-nav"><div class="owl-prev" arrows-counter="0"></div><div class="owl-next" arrows-counter="0"></div></div>');

            // add action for navigation buttons
            $('div.owl-prev', menu).on('click', function(){ menu.clubokMenu('navigate', 'prev');});
            $('div.owl-next', menu).on('click', function(){ menu.clubokMenu('navigate', 'next');});

            menu.show();

            menu.data('central_element', 0);
            // add action onClick and div over li
            menu.children('li').each(function(i, e){
                $(e).on('click', function(e){ $(e).clubokMenu('click', this); });
                $(e).wrap($('<div>', {'class':'menu-item'}));
                if($(e).hasClass('active')){
                    $(e).parent('div').addClass(options.activeDivClass);
                    menu.data('central_element', i);
                }
            });

            // count sizes
            menu.data('items-min-sizes', obj.CountSizes());
            // set central element
            obj.ResizeWindow();
        };


        // // *** CLICK ***
        this.ClickItem = function () {
            this.clearActive();
            $(data).addClass(options.activeLiClass);
            $(data).parent('div.menu-item').addClass(options.activeDivClass).siblings('.'+options.activeDivClass).removeClass(options.activeDivClass).children().removeClass(options.activeLiClass);
            menu.children('div.menu-item').each(function(i, e){
                if($(e).children('li').hasClass(options.activeLiClass)){
                    menu.data('central_element', i);
                }
            });
        };

        // *** RESIZE ***
        this.ResizeWindow = function () {
            var central_element = menu.data('central_element') || 0,
                // с какой стороны добавить следующий элемент
                next_add = 'left',
                // смещение влево
                left_offset_from_central = central_element,
                // смещение вправо
                right_offset_from_central = central_element,
                // надо еще добавить элементов
                add_more = true,
                // суммарный размер отрисованных блоков
                cnt_size = 0,
                // минимальные размеры элементов меню
                items = menu.data('items-min-sizes'),
                // список элементов для отрисовки
                items_exists = {},
                // текущий размер контейнера, в который надо вписать меню
                container_width = $('.wrapper').width()-options.containerPaddingOnSmall
                ;

            obj.switchOffItems();
            menu.css('width', '100%');

            var getNextItem = function(){

                var _item = null;

                if(Object.keys(items_exists).length == 0){
                    _item = central_element;
                } else {
                    switch(next_add){
                        case 'left': case 'leftOnly':
                            if(left_offset_from_central <= 0){
                                next_add = 'end';
                                if(right_offset_from_central < Object.keys(items).length-1) {
                                    next_add = 'rightOnly';
                                    _item = getNextItem();
                                }
                            } else {
                                left_offset_from_central--;
                                _item = left_offset_from_central;
                                if(next_add != 'leftOnly'){ next_add = 'right'; }
                            }
                            break;
                        case 'right':case 'rightOnly':
                            if(right_offset_from_central >= Object.keys(items).length-1){
                                next_add = 'end';
                                if(left_offset_from_central > 0){
                                    next_add = 'leftOnly';
                                    _item = getNextItem();
                                }
                            } else {
                                right_offset_from_central++;
                                _item = right_offset_from_central;
                                if(next_add != 'rightOnly'){ next_add = 'left'; }
                            }
                            break;
                    }
                }

                return _item;

            };

            while(add_more){
                var item = getNextItem();
                if(item == null){ add_more = false; }
                else {
                    items_exists[item] = item;
                    cnt_size += items[item];
                    if (cnt_size < container_width) {
                        menu.children('div:eq( ' + item + ' )').show();
                    } else {
                        delete items_exists[item];
                        add_more = false;
                    }
                }

                // если все элементы показаны
                if(Object.keys(items_exists).length == Object.keys(items).length){ add_more = false; }
                // если размер элементов превысил размер контейнера
                if(cnt_size >= container_width){ add_more = false; }
            }

            obj.navigationButtons();
        };

        // *** Navigate ***
        this.Navigate = function(direction) {

            var items = menu.data('items-min-sizes'),
                itemsState = {},
                first_on = null,
                last_on = null;

            menu.children('div.menu-item').each(function(i, e){
                itemsState[i] = $(e).is(":visible") ? 1 : 0;
                if(itemsState[i] == 1 && first_on === null){ first_on = i; }
                if(itemsState[i] == 0 && first_on !== null && last_on === null){ last_on = i-1; }
            });

            // если последний элемент также включен
            if(last_on === null){ last_on = Object.keys(itemsState).length - 1; }

            if(first_on !== null && last_on !== null){
                switch (direction) {
                    case 'prev':
                        first_on--;
                        if(first_on > -1){
                            itemsState[first_on] = 1;
                            itemsState[last_on] = 0;
                        }
                        break;
                    case 'next':
                        last_on++;
                        if(last_on < Object.keys(items).length){
                            itemsState[first_on] = 0;
                            itemsState[last_on] = 1;
                        }
                        break;
                }

                menu.children('div.menu-item').each(function(i, e){
                    switch(itemsState[i]){
                        case 1:
                            $(e).show();
                            break;
                        default:
                            $(e).hide();
                    }
                });
            }

            obj.navigationButtons();

        };

        // *** Check action for plugin
        switch (action){
            case 'init':
                this.Init();
                break;
            case 'click':
                this.ClickItem();
                break;
            case 'navigate':
                this.Navigate(data);
                break;
        }

        $( window ).resize($.debounce( 100, this.ResizeWindow) );
        
    };

    // вносим изменения в список плагинов jQuery
    $.fn = fn;
})(jQuery);

(function(){
    $('#owl-carousel-1').clubokMenu();
    $('#owl-carousel-2').clubokMenu();
})(jQuery);