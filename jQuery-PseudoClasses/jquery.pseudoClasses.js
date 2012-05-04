(function ($) {
    $.fn.pseudoClasses = function (options) {

        var config = {
            debug : false,
            firstClass:"first",
            lastClass:"last",
            oddClass:"odd",
            evenClass:"even",
            recursive:false
        };

        if (options) { $.extend(config, options); }

        function Debug(msg) {
            if (config.debug) {
                console.log(msg);
            }
        }

        function addClasses($element)
        {
            $element.children().filter(":first").addClass(config.firstClass);
            $element.children().filter(":last").addClass(config.lastClass);
            $element.children().filter(":odd").addClass(config.oddClass);
            $element.children().filter(":even").addClass(config.evenClass);
        }

        function recurse($element)
        {
            $element.children().each(function(){
                addClasses($(this));
                recurse($(this));
            });
        }

        return this.each(function () {
            var $self = $(this);
            addClasses($self);
            if(config.recursive)
            {
               recurse($self);
            }
        });
    }
})(jQuery);