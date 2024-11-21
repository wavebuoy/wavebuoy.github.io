history.scrollRestoration = "manual";

function resize(){
    $(".fixed_bg").each(function(){
        var this_h = $(this).height();
        var this_w = $(this).width();
        if(this_h / 9 > this_w / 16){
            $(this).find("img").css({width: "auto", height: this_h});
        }else{
            $(this).find("img").css({width: this_w, height: "auto"});
        }
    });
}
$(window).on("resize",function(){
    resize();
});
$(window).load(function(){
    resize();
    setTimeout(function(){
        $("body").removeClass("ready");
        $('.loading_cover').fadeOut(1000, function(){
            $(this).remove();
        });
    }, 1000);
    
    var h4_origin_height = 26;
    $("ul.v_con li.cells.viewer .text_box h5").each(function(){
        $(this).attr("data-height",$(this).height() + h4_origin_height);
    });
    
    $("ul.v_con li.cells.viewer .text_box").each(function(){
        var $t_h5 = $(this).find("h5");
        var $t_h4 = $(this).find("h4");
        $(this).hover(function(){
            $t_h4.css({bottom: Number($t_h5.attr("data-height"))});
        },function(){
            $t_h4.css({bottom: h4_origin_height});
        });
    });
    
});
$(function(){
    resize();
    
    setInterval(function(){
        $(".youtube_player").attr("src", $(".youtube_player").attr("src"));
    }, 65000);
    $(".choice").each(function(){
        $(this).click(function(){
            $(".choice").removeClass("selected");
            $(this).addClass("selected");
            for(i=0; i<$(".choice").length; i++){
                $("#collaborations.sections.section_05").removeClass("choice_0"+(i+1));
            }
            $("#collaborations.sections.section_05").addClass("choice_0"+($(this).index()+1));
        });
    });
    
    
    //$(".sections.section_09_1 ul.v_con li.cells").each().cilck().eq(function(e){
    //    $(".sections.section_09 ul.v_con li.cells img").attr('src', "img/bg_s9_0" + e + ".jpg");
    //});
    
    $(".btn_store").each(function(){
        $(this).click(function(){
            var store_no = $(this).attr("data-store");
            $("#store.sections.section_09 img.full_img").attr('style', "background: url(img/bg_s9_" + store_no + ".jpg) 50% 50% no-repeat; background-size: cover;");
            
            var store_city = $(this).find("h4").text();
            var store_address = $(this).find("h6").text();
            $("#store.sections.section_09 .width_con ul.v_con li.cells .title_con h3").text(store_city);
            $("#store.sections.section_09 .width_con ul.v_con li.cells .title_con h5").text(store_address);
        
        });
    });
    
});





















