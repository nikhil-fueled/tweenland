var Site={
    init:function(){
        this.tabs();
    },
    tabs : function(){
        var tabs=$('#secondary > .tabs'),
        uls=tabs.find('>ul'),
        tabHeadings=tabs.prev('#tabHeadings');

      //hide everything but first
     // uls.not(':first')
     // .hide();
     tabHeadings
            .delegate('li', 'click', function(e){
                var li=$(this),
                    hash;
            li
                    .siblings()
                        .removeClass('selected')
                        .end()
                        .addClass('selected');

        hash=li.children('a').attr('href');
        uls.hide().filter(hash).show();

        });
}}
Site.init();
