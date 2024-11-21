history.scrollRestoration = "manual";
var w_w, w_h, re_resize_timer, visual_h;
var w, h;
function scroll_effect(sc_y){
    if(sc_y <= 0){
        $("#visual.sections.section_01 img").attr("style","");
    }else if(sc_y <= 1080){
        $("#visual.sections.section_01 img").css({marginTop: sc_y / 2, opacity: (1080 - sc_y) / 1080, filter: "blur("+ (sc_y / 1080 * 10) +"px)"});   
    }
}
var section_count = 7;
var arr = new Array();

var re_resize_timer;
function resize(){
    w = $(window).width();
    h = $(window).height();
    visual_h = $("#visual").height();
    clearTimeout(re_resize_timer);
    re_resize_timer = setTimeout(function(){
        $(".fixed_bg").each(function(){
            var this_h = $(this).height();
            var this_w = $(this).width();
            if(this_h / 9 > this_w / 16){
                $(this).find("img").css({width: "auto", height: this_h});
            }else{
                $(this).find("img").css({width: this_w, height: "auto"});
            }
        });
        
        var total_arr = 0;
        for (i = 0; i < section_count; i++) {
            total_arr += $(".wrap > .sections").eq(i+1).height()-30;
            arr[i] = total_arr;
        }
    }, 200);
}
window.onresize = resize;

let ticking = false;
var current_scroll,wh;
function show_whatever(el, current_scroll, wh){ 
    var el_offset_t = el.offset().top; 
    
    if(current_scroll > el_offset_t - wh){
        el.parent().removeClass("wait_scroll"); 
        el.remove();
    }    
}
function doSomething(scrollPos){
    var wh =  $(window).height();
    current_scroll = scrollPos;
    $(".show_trigger").each(function(){
        show_whatever($(this), current_scroll, wh);
    });
    if(scrollPos > 0){
        $("body").addClass("scrolled");
    }else{
        $("body").removeClass("scrolled");
    }
    
    for(i = arr.length; i > 0; i--){
        if(scrollPos < arr[0]){
            if(!$("ul.nav li").eq(0).hasClass("selected")){
                $("ul.nav li").removeClass("selected");
                $("ul.nav li").eq(0).addClass("selected");
            }
        break;
        }else if(scrollPos > arr[section_count-1]){
            $("ul.nav li").removeClass("selected");
        break;
        }else if(scrollPos > arr[i-1]){
            if(!$("ul.nav li").eq(i).hasClass("selected")){
                $("ul.nav li").removeClass("selected");
                $("ul.nav li").eq(i).addClass("selected");
            }
        break;
        }
    }
    
    /*----------------------------------------------------------------*/
    
    if(scrollPos < visual_h){
        $(".box.ball_0").css({marginTop: (scrollPos * -.8)});
        $(".box.ball_1").css({marginTop: (scrollPos * -.7)});
        $(".box.ball_7").css({marginTop: (scrollPos * -.7)});
        $(".box.ball_2").css({marginTop: (scrollPos * -.6)});
        $(".box.ball_3").css({marginTop: (scrollPos * -.5)});
        $(".box.ball_4").css({marginTop: (scrollPos * -.4)});
        $(".box.ball_5").css({marginTop: (scrollPos * -.3)});
        $(".box.ball_6").css({marginTop: (scrollPos * -.2)});
    }
    
    /*----------------------------------------------------------------*/
    
}
document.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            doSomething(window.scrollY);
            scroll_effect(window.scrollY);
            ticking = false;
        });
        ticking = true;
    }
});


$(window).on("resize",function(){
    resize(); 
});

var position_box_1_top,
    position_box_1_left,
    position_box_2_top,
    position_box_2_left,
    position_box_3_top,
    position_box_3_left,
    position_box_4_top,
    position_box_4_left,
    position_box_5_top,
    position_box_5_left,
    position_box_6_top,
    position_box_6_left,
    position_box_7_top,
    position_box_7_left;

function mouse_tracker(a,b){
        var x = a,
            y = b;
        position_box_0_top  = h/2 - $(".box.ball_0").height()/2 + (h/2-y) * -0.1;
        position_box_0_left = w/2 - $(".box.ball_0").width()/2 + (w/2-x) * -0.1;

        position_box_1_top  = h/2 - $(".box.ball_1").height()/2 + (h/2-y) * -0.075;
        position_box_1_left = w/2 - $(".box.ball_1").width()/2 + (w/2-x) * -0.075;

        position_box_2_top  = h/2 - $(".box.ball_2").height()/2 + (h/2-y) * -0.06;
        position_box_2_left = w/2 - $(".box.ball_2").width()/2 + (w/2-x) * -0.06;

        position_box_3_top  = h/2 - $(".box.ball_3").height()/2 + (h/2-y) * -0.02;
        position_box_3_left = w/2 - $(".box.ball_3").width()/2 + (w/2-x) * -0.02;

        position_box_4_top  = h/2 - $(".box.ball_4").height()/2 + (h/2-y) * -0.04;
        position_box_4_left = w/2 - $(".box.ball_4").width()/2 + (w/2-x) * -0.04;

        position_box_5_top  = h/2 - $(".box.ball_5").height()/2 + (h/2-y) * -0.02;
        position_box_5_left = w/2 - $(".box.ball_5").width()/2 + (w/2-x) * -0.02;

        position_box_6_top  = h/2 - $(".box.ball_6").height()/2 + (h/2-y) * -0.01;
        position_box_6_left = w/2 - $(".box.ball_6").width()/2 + (w/2-x) * -0.01;

        position_box_7_top  = h/2 - $(".box.ball_7").height()/2 + (h/2-y) * -0.009;
        position_box_7_left = w/2 - $(".box.ball_7").width()/2 + (w/2-x) * -0.009;

        $(".box.ball_0").css({top: position_box_0_top, left: position_box_0_left});
        $(".box.ball_1").css({top: position_box_1_top, left: position_box_1_left});
        $(".box.ball_2").css({top: position_box_2_top, left: position_box_2_left});
        $(".box.ball_3").css({top: position_box_3_top, left: position_box_3_left});
        $(".box.ball_4").css({top: position_box_4_top, left: position_box_4_left});
        $(".box.ball_5").css({top: position_box_5_top, left: position_box_5_left});
        $(".box.ball_6").css({top: position_box_6_top, left: position_box_6_left});
        $(".box.ball_7").css({top: position_box_7_top, left: position_box_7_left});
        $(".distort").css({top: y, left: x});
}

$(function(){
    resize();
    mouse_tracker(($(window).height() / 2), ($(window).width() / 2));
    $("#visual").mousemove(function(event){
        $(this).removeClass("disabled");
        var x = event.pageX,
            y = event.pageY;
        mouse_tracker(x, y);
    }).hover(function(){
        $(this).addClass("buffer").removeClass("disabled");
        setTimeout(function(){
            $("#visual").removeClass("buffer");
        }, 75);
        
    }, function(){
        $(this).addClass("disabled");
        mouse_tracker(($(window).height() / 2), ($(window).width() / 2));
    });
    
    $("#header.section_00 .width_con .nav_con ul.nav li").each(function(){
       $(this).click(function(){
           $("#header.section_00 .width_con .nav_con ul.nav li").removeClass("selected");
           $(this).addClass("selected");
       }); 
    });
    
    var circle_draw = $("#personality.section_07 .width_con .title_con");
    circle_draw.one("transitionend", function(){
        $(".circle_wrap").append("<div class='circle top'></div><div class='circle bottom'></div>");
    });
    
    $("#portfolio_design .width_con ul.v_con.four_con li.cells").each(function(){
        $(this).click(function(){
            
            $("body").addClass("lock_scroll");
            $(".gallary_popup").addClass("on");
            var port_no = $(this).attr("data-name");
            /*if(port_no < 10){
                port_no = "0" + port_no;
            }*/
            var port_count = $(this).attr("data-num");
            if(port_count == undefined){
                port_count = 1;
            };
            var port_zero_count = port_count;
            var port_list = "";
            for(i=1; i<=port_count; i++){
                /*if(i < 10){
                    i = "0" + i;
                }*/
                port_list += "<img class='origin_img' src='img/portfolio/portfolio_"+port_no+"_"+i+".jpg'>";
            }
            $(".popup_viewer").html(port_list).scrollTop(0);
        });
    });
    
    $(".gallary_popup .gallary_popup_bg, .btn_close").click(function(){
        $(".gallary_popup").removeClass("on");
        $("body").removeClass("lock_scroll");
    });
    
    
});

var loadings; 
function loading_start(){
    loadings = setInterval(function(){
        $(".loading_cover");
    }, 500);
}
function loading_end(){
    clearInterval(loadings);
    setTimeout(function(){
        $(".loading_cover").fadeOut(1000);
    }, 500);
    setTimeout(function(){
        $(".pl").addClass("done").fadeOut(1500, function(){
        });
    });
    setTimeout(function(){          
        $("body").addClass("done").removeClass("loading");
        setTimeout(function(){
            $(".loading_cover").remove();
        }, 2000);
    }, 1500);
}

$(window).load(function(){
    setTimeout(function(){
        loading_end();
        mouse_tracker(($(window).height() / 2), ($(window).width() / 2));
    }, 3500);
});











