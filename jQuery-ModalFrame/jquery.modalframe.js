(function ($) {
    $.fn.modalframe = function (options) {

        var config = {
            debug : false,
            retValue : false,
            margin:20,
            onOpen:function(el){},
            onClose:function(el){},
            warningUnload:false,
            warningUnloadMessage:"",
            confirmClose:false,
            confirmCloseMessage:"Sure?"
        };

        if (options) { $.extend(config, options); }

        function Debug(msg) {
            if (config.debug) {
                console.log(msg);
            }
        }

        function getDocHeight() {
            var D = document;
            /*return Math.max(
                Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );*/
            /*return Math.min(
                $(document).width(),
                $(window).width(),
                document.documentElement.clientWidth
            );*/
            var docHeight = $(document.body).height();
            if(docHeight < $(window).height()){
                var diff = $(window).height() - docHeight;
                return diff;
            }
            return docHeight;
            return 600;
        }

        function getDocWidth() {
            var D = document;
            /*return Math.max(
                Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
                Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
                Math.max(D.body.clientWidth, D.documentElement.clientWidth)
            );*/
            /*return Math.min(
                $(document).height(),
                $(window).height(),
                document.documentElement.clientHeight
            );*/
            var docWidth = $(document.body).width();
            /* if(docHeight < $(window).height()){
             var diff = $(window).height() - docHeight;
             if (!$("#sticky-footer-push").length > 0) {
             $(footer).before('<div id="sticky-footer-push"></div>');
             }
             $("#sticky-footer-push").height(diff);
             }*/
            return docWidth;
            return 800;
        }

        var iframe;

        //$(window).resize(positionFrame);



        function positionFrame(){
            Debug("resize");
            iframe.width(getDocWidth() - 2* config.margin);
            iframe.height(getDocHeight() - 2* config.margin);
        }

        return this.each(function () {
            $(this).live("click",function(){
                var href = $(this).attr("href");
                var titleLink = $(this).attr("title");

                iframe = $('<iframe />', {
                    name: 'myFrame',
                    id:   'myFrame',
                    class: "iframeDialog",
                    src: href,
                    title: titleLink
                });//.appendTo('body');

                //var ifd = $("<div class='iframeDialog' />").prepend(iframe);

                iframe.dialog({
                    modal: false,
                    resizable: false,
                    draggable:false,
                    modal:true,
                    width: getDocWidth() - config.margin,
                    height: getDocHeight() - config.margin,
                    open: function(event,ui){
                            if(config.warningUnload){
                                $(window).bind('beforeunload', function(){
                                    return config.warningUnloadMessage;
                                });
                            }
                            Debug("Opening IFrame Dialog: '"+href+"'");
                            config.onOpen(href);
                          },
                    beforeClose:function(event, ui){
                                    if(config.confirmClose)
                                    {
                                        return confirm(config.confirmCloseMessage);
                                    }else
                                        return true;
                                },
                    close: function(event,ui){
                                if(config.warningUnload){
                                    $(window).unbind('beforeunload');
                                }
                                Debug("Closing IFrame Dialog: '"+href+"'");
                                config.onClose(href);
                            }
                    //,buttons: { "Ok": function() { $(this).dialog("close"); } }
                }).parent(".ui-dialog").addClass("iframeUIDialog");
                return config.retValue;

            });
        });
    }
})(jQuery);