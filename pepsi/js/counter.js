function addComma(value){
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
}
function counter_start(a){
    a.Simple_Counter({
        end: a.text().replace(/[^0-9]/g, ""),
        duration: load_animate_duration,
        easing: load_animate_easing
    });
}
(function($) {
    $.fn.Simple_Counter = function( options ) {
        let settings = $.extend({
            start:  0,
            end:    100,
            easing: 'swing',
            duration: 400,
            complete: ''
        }, options );

        const thisElement = $(this);

        $({count: settings.start}).animate({count: settings.end}, {
            duration: settings.duration,
            easing: settings.easing,
            step: function() {
                let mathCount = Math.ceil(this.count);
                if(true){//money comma
                    mathCount = addComma(String(mathCount));
                }
                thisElement.text(mathCount);
            },
            complete: settings.complete
        });
    };
}(jQuery));
var load_animate_duration = 1000;
var load_animate_easing = "easeOutCubic";
//해당 태그에 s_counter클래스가 있을시 자동 카운터
$(window).load(function(){
    $('.s_counter').each(function(){
        counter_start($(this));
        
    });
});