/*Add {opacity:0} style to body element.*/
var max_delay_time = 2000,//2000
    progress_update,
    is_stop = false;
function counter(a, b, c){
    a.each(function () {
        
        $(this).prop('Counter', b).stop().animate({
            Counter: c
        }, {
            
            duration: 1500,//500
            easing: 'swing'
            /*step: function (now) {
                $(this).text(Math.ceil(now)+"%");
            }*/
            
        });
    });
}
$(function(){    
    $("body").append("<iframe id='bubble' src='bubble.html'></iframe>").animate({opacity:1}, 250);
    //$("body").animate({opacity:1}, 250);
    
    var progress_percent = 87;
    
    setTimeout(function(){
        progress_update = setInterval(function(){
            if(is_stop){
                clearInterval(progress_update);
                $("#bubble").contents().find(".wrap").animate({top: "40%"}, 2000);//500
                //counter($(".progress_text"), $(".progress_text").text().replace(/%/g,""), 100);
                
                setTimeout(function(){
                    $("#bubble").fadeOut(1000, function(){
                        $(this).remove();
                    });
                    
                }, 3000);//350
                //초 뒤에 .bubble이라는 요소를 지움 iframe 스르륵 사라짐
                
            }else{            
                const random_number = Math.floor(Math.random() * 2);
                $("#bubble").contents().find(".wrap").stop().animate({top: progress_percent + "%"}, 1500); //50
                progress_percent -= random_number;
                //console.log(progress_percent);
               // counter($(".progress_text"), $(".progress_text").text().replace(/%/g,""), progress_percent);
            }
        }, 35);
    }, 250);
    //문서가 준비되면 .25초 뒤에 해당 명령이 실행됨
});

$(window).load(function(){
    
    setTimeout(function(){
        is_stop = true; 
    }, max_delay_time);
    //2초 뒤 is_stop는 false값에서 true이 됨
});