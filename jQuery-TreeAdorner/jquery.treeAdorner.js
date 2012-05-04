(function ($) {
    $.fn.treeAdorner = function (options) {

        var config = {
            debug : false,
            skipOnEmpty:true,
            handle: "<span class='handle'>&nbsp;</span>",
            addTo:"li"
        };

        if (options) { $.extend(config, options); }

        function Debug(msg) {
            if (config.debug) {
                console.log(msg);
            }
        }

        return this.each(function () {
            var $self = $(this);

            var handle = config.handle;

            if(config.skipOnEmpty==true){
                $self.find(config.addTo).each(function(){
                    if($(this).find("ul").size()>0){
                        $(this).prepend($(handle));
                    }
                });
            }else{
                $self.find(config.addTo).prepend($(handle));
            }
        });
    }
})(jQuery);