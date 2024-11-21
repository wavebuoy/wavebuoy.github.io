history.scrollRestoration = "manual";
/*manual=수동조작*/
var w_w, w_h, re_resize_timer;
/*w_w, w_h, re_resize_timer라는 변수를 선언함*/
function scroll_effect(sc_y){
/* scroll_effect함수의 매개변수는 sc_y이다*/
    if(sc_y <= 0){
        /*만약에 sc_y가 0보다 작거나 같다면 즉, 스크롤이 내려가지않은 상태를 말함*/
        $("#visual.sections.section_01 iframe").attr("style","");
        /*#visual.sections.section_01 iframe의 속성 style을 빈값으로 교체함*/
    }else if(sc_y <= 1080){
        /*만약에 sc_y가 0보다 크다면*/
        $("#visual.sections.section_01 iframe").css({marginTop: sc_y / 2, opacity: (1080 - sc_y) / 1080, filter: "blur("+ (sc_y / 1080 * 10) +"px)"});
        /*#visual.sections.section_01 iframe의 css marginTop: sc_y / 2 스크롤값의 절반 만큼 영상이 내려온다.
        opacity: 1080-스크롤 / 1080 값으로 스크롤이 1080px만큼 다 내려오면 투명도는 0으로 보이지않게 된다.
        filter: blur는 sc_y / 1080 * 10 스크롤값은 커지므로 스크롤이 내려올수록 블러가 더 진해질 것임.
        */
    }
}

var re_resize_timer;
/*re_resize_timer라는 변수 선언*/
function resize(){
    /*resize라는 함수 지정 디스플레이 크기가 변할 때마다 적용됨*/
    clearTimeout(re_resize_timer);
    /*setTimeout을 호출 하면 타이머 식별자가 반환된다. setTimeout을 취소하고 싶을 때 이 반환된 식별자를 사용하면 된다.*/
    re_resize_timer = setTimeout(function(){
    /*re_resize_timer은 setTimeout은 특정시간동안 지연 후에 함수를 실행하도록 하며*/
        if($("#fact .slick-current").length > 0){
        /*만약에 #fact .slick-current 문자열의 길이가 0보다 크다면*/
            dial($("#fact .slick-current").attr("data-year"));
            /*dial함수의 매개변수는 year이며 year은 #fact .slick-current의 data-year속성값이 된다.*/
        }
        $(".fixed_bg").each(function(){
            /*클래스 fixed_bg 각각에*/
            var this_h = $(this).height();
            /*this_h 변수선언 = .fixed_bg의 세로값 추출*/
            var this_w = $(this).width();
            /*this_w 변수선언 = .fixed_bg의 가로값 추출*/
            if(this_h / 9 > this_w / 16){
            /*.fixed_bg의 세로값을 9로 나눴을 때 몫이 .fixed_bg의 가로값을 16로 나눴을때 몫보다 클 때
            => 나눠준 이유가 같은 값으로 너비값과 높이값을 만들어 준 후에 비교하기위함.*/
                $(this).find("img").css({width: "auto", height: this_h});
                /*.fixed_bg에 속한 img를 찾고 조건이 참일 경우 img 너비값은 "auto", 높이값은 this_h를 따른다. this_h는 .fixed_bg의 세로값 추출된 값.*/
            }else{/*16:8이하*/
                $(this).find("img").css({width: this_w, height: "auto"});
                /*.fixed_bg에 속한 img를 찾고 조건이 참일 경우 img 너비값은 "auto", 높이값은 this_h를 따른다. this_h는 .fixed_bg의 세로값 추출된 값.*/
            }
        });
              
        window.addEventListener("DOMContentLoaded", function (ev) {
            const { innerHeight } = window;
            /*창 틀을 뺀 스크롤을 합한 창의 크기*/
        });
        w_w = $(window).width();
        /*w_w는 window의 너비값을 추출한 값임 */
        w_h = innerHeight;
        /*w_h는 창 틀을 뺀 스크롤을 합한 창의 크기*/
        if(w_w < 1000){
        /*만약 w_w가 1000보다 작다면*/
            $("#header.section_00 .width_con .nav_con").height(w_h);
            /*#header.section_00 .width_con .nav_con의 높이값은 w_h값을 추출해온다*/
        }else{
        /*1000보다 크거나 같다면*/
            $("#header.section_00 .width_con .nav_con").attr("style","");
            /*#header.section_00 .width_con .nav_con의 속성 중 style의 속성을 빈값으로 교체한다*/
            $("html").removeClass("open_menu");
            /*html에는 open_menu클래스를 지워준다.*/
        }
    }, 200);
    /*0.2초 뒤에 시작*/
}

function dial(year){
        /*dial이라는 함수로 전체를 지정함, 매개변수 year*/
    var this_year = year;
        /*this_year는 year라는 변수선언*/
    /*블러, 모션효과*/
    $("#fact .date_dial .dial").each(function(i){
            /*.date_dial .dial 각각에*/
        var $this = $(this);
            /*$this = $(this) = $(".date_dial .dial")*/
        if($this.attr("data-num") == this_year.substring(i,i+1)){
            /*만약 .date_dial .dial가 "data-num"이라는 속성의 this_year.substring(i,i+1)를 가지고 있다면 실행할 것이 없음
            현재 dial의 값은 2023이고, 바뀌는 year가 2022이면 data_1의 값은 2고 == this_year.substring(i,i+1)가 2기때문에 효과 안먹음
            즉 위아래로 움직여야하는 span친구들에게만 블러,잔상 모션을 주기위해 if문을 써서 제어함 ex)2023 -> 2018 이면 10,1의 자리만 효과 적용
            */
        }else{
            /*만약 가지고 있지 않다면 다음을 실행한다*/
            $this.find("span").addClass("moving");
            /*.date_dial .dial의 span을 찾아 moving이라는 클래스 만듦*/
            setTimeout(function(){
                $this.find("span").removeClass("moving");
            }, 500 / 2);
            /*.date_dial .dial의 transition은 500ms임, 블러,모션은 애니매이션이 선명했다가 블러됐다가 선명해지끔 만들어야 함
            =>블러효과는 중간에서 없어져야 함 moving이라는 클래스가 추가되고 500/2ms(중간)에서 moving클래스가 사라지게 됨
            */
        }
    });

    var span_height = $("#fact .date_dial .dial span").height();
        /*span_height라는 변수 선언, html의 .dial span의 높이를 추출함 */
    var date_1 = Number(this_year.substring(0,1));
        /*date_1 변수를 선언, Number(문자열을 숫자로 만들어 줌, 자바스크립트에서 number의 N은 꼭 대문자), 위에서 선언한 this_year라는 변수(=year, year는 dial($(".slick-current").attr("data-year")) dial의 매개변수다.) 즉 html의 data-year를 불러온다. substring(문자를 잘라줌)*/
    var date_2 = Number(this_year.substring(1,2));
    var date_3 = Number(this_year.substring(2,3));
    var date_4 = Number(this_year.substring(3,4));
        /* substring(a,b) :a에서 b까지 잘라유
           |2|0|2|3|
           0 1 2 3 4 */
    $(".dial.date_1").css({transform: "translateY("+(span_height * (9 - date_1) * -1)+"px)"}).attr("data-num", date_1);
    $(".dial.date_2").css({transform: "translateY("+(span_height * (9 - date_2) * -1)+"px)"}).attr("data-num", date_2);
    $(".dial.date_3").css({transform: "translateY("+(span_height * (9 - date_3) * -1)+"px)"}).attr("data-num", date_3);
    $(".dial.date_4").css({transform: "translateY("+(span_height * (9 - date_4) * -1)+"px)"}).attr("data-num", date_4);
        /*예를 들어 9876 현재 span_height의 높이, 즉 .dial span의 높이값은 180px임
        1000의 자리는 9이며 translateY는 0의 값이 되어야함 date_1는 9이므로 (9 - date_1) * -1) => 0
        100의 자리는 8이며 translateY는 -180px이 되어야함 date_2는 8이므로 (9 - date_2) * -1) => -180*/
}

$(window).on("resize",function(){
    /*resize함수가 실행 대기했다가 창의 크기가 재조정될 때*/
    resize(); 
    /*함수실행*/
});

let ticking = false;
/*ticking 변수 선언 false값을 가짐*/
var current_scroll,wh;
/*current_scroll,wh 변수 선언*/
function show_whatever(el, current_scroll, wh){ 
    var el_offset_t = el.offset().top; 
    if(current_scroll > el_offset_t - wh){
        /*current_scroll 값이 */
        el.parent().removeClass("wait_scroll"); 
        el.remove();
    }    
}
function doSomething(scrollPos) {
    var wh =  $(window).height();
    current_scroll = scrollPos;
    $(".show_trigger").each(function(){
        show_whatever($(this), current_scroll, wh);
    }); 
}
document.addEventListener('scroll', function(e) {
    if (!ticking) {
        /*만약 ticking=true라면*/
        window.requestAnimationFrame(function() {
        /**/
            doSomething(window.scrollY);
            /*doSomething 창의 스크롤 값*/
            scroll_effect(window.scrollY);
            /*scroll_effect 창의 스크롤 값*/
            ticking = false;
            /*ticking은 false값이 된다*/
        });
        ticking = true;
    }
});


$(window).load(function(){
    /**/
    resize();
    setInterval(function(){/*상단 영상 반복재생*/
         /*setInterval() 지정된 시간 간격마다 지정된 기능을 반복하고자 할 때 사용함*/
        $(".youtube_player").attr("src", $(".youtube_player").attr("src"));
        /*.youtube_player클래스 src속성을 $(".youtube_player").attr("src")로 교체해준다 => 같은 영상 반복*/
    }, 20000);
    /*20초 후 반복됨*/
    
    setTimeout(function(){
        $("html").removeClass("loading");
            setTimeout(function(){
                $("html").removeClass("not_yet");
            }, 5950);
    }, 750);
    
})

$(function(){
    resize();
    /* 외부 리소스, 이미지와는 상관없이 브라우저을 실행 시킨 직후에 실행(문서,텍스트) 즉,더 빠르게 실행
        최초 방문이 아닌 경우, 더 빨리 보여주기위함*/
    $("#header.section_00 .width_con .btn_open_nav, .nav_cover, #header.section_00 .width_con .nav_con ul li a").click(function(){
    /*#header 안에 i태그와 a태그 클릭 시*/
        if(w_w < 1000){
            /*만약 $(window).width() 즉, 화면의 너비값이 1000보다 작을 경우*/
            resize();
            $("html").toggleClass("open_menu");
            /*html에 open_menu를 toggleClass로 클래스를 넣었다 뺐다함*/
        }
    });
    
    
    w_w = $(window).width();
    if(w_w > 1000){
        resize();
        $(window).scroll(function(){
            SE = $(document).scrollTop();
            if(SE >= 500){
                $("#header").addClass("small");
            }else{
                $("#header").removeClass("small");
            }
        });

        $("#header").hover(function(){
            $(this).removeClass("small");
        });
    }
    
    $("#header ul.nav li").each(function(){
        $(this).click(function(){
            $("#header ul.nav li").removeClass("selected");
            $(this).addClass("selected");
         });
    });
    
    $(".products").each(function(){
    /*.products 각각에*/
        $(this).click(function(){
            /*.products 클릭했을 때*/
            $(".products").removeClass("selected");
            /*초기화*/
            $(this).addClass("selected");
            /*.products중 클릭된 li한테만 클래스 추가*/
            var products_no = $(this).attr("data-item");
            /*products_no라는 변수 선언, 해당 변수는 .products의 data-item의 속성을 가져온 값이다*/
            $(this).parents("ul.v_con.two_con").find(".viewer").removeClass("selected").eq(products_no).addClass("selected");
            /*.products li의 조상 중 ul.v_con.two_con의 viewer이라는 클래스를 찾고 selected라는 클래스를 지워 초기화 시켜줌
            products_no가 몇번인지 추출해 selected클래스를 추가함*/
         });
    });
    
    $("#product .width_con ul.v_con.two_con li.cells ul.three_con").slick({
    /*#product .width_con ul.v_con.two_con li.cells ul.three_con li가 슬릭으로 돌아가야하기때문에 그 부모인 ul.three_con에 슬릭을 걸어줌*/
        infinite: true,
        /*무한재생*/
        autoplay: true,
        /*자동재생*/
        autoplaySpeed: 5000,
        /*자동재생 5초 후 다음 슬라이드로 넘어감*/
        slidesToShow: 3,
        /*3개씩 보이게끔*/
        dots: true,
        /*슬라이드 도트 표시*/
        arrows: true,
        /*화살표 표시*/
        swipeToSlide:true
        /*부드럽게 넘어가도록 설정함*/
    });
    
    $(".tab_menu ul.tab_btn li").each(function(){
    /*.tab_menu ul.tab_btn li 각각에*/
        $(this).click(function(){
            /*위 선택자가 클릭이 되었을 때*/
            $(".tab_menu ul.tab_btn li").removeClass("selected");
            /*tab_menu ul.tab_btn li .selected라는 클래스가 지워짐 초기화 과정*/
            $(this).addClass("selected");  
            /*.tab_menu ul.tab_btn li중 클릭된 li에 selected라는 클래스가 생김*/
            $(".tab_menu ul.tab_content").removeClass("selected").eq($(this).index()).addClass("selected");
            /*.tab_menu ul.tab_content selected클래스를 지워 초기화 시켜줌 .tab_menu ul.tab_btn li의 순번을 지정하고 클릭된 li가 몇번인지 추출해 selected클래스를 추가함*/
        });
    });
    
    dial("2023");
    /*위 함수의 초기값은 2023*/

    $("#fact .slick").slick({
        /*#fact .slick slick으로 돌아가야 할 li의 부모에게 슬릭을 적용시켜야 함*/
        infinite: true,
        /*무한반복*/
        slidesToShow: 1,
        /*하나씩만 보이도록*/
        slidesToScroll: 1,
        /*한개씩 넘어가도록*/
        dots: true,
        /*하단 점*/
        arrows: true
        /*화살표 보이도록*/
    }).on("afterChange", function(event, slick, currentSlide, nextSlide){
        /*afterChange 슬라이드 변동 후 발동하는 이벤트*/
        dial($("#fact .slick-current").attr("data-year"));/*year*/
        /*slick 기능 추가 시 .slick-current가 ul에 생김 ul.v_con.four_con.slick.slick-current의 data-year속성을 가져옴*/
    });

    $(".store_list").each(function(){
        /*store_list클래스를 가진 li 각각에 */
        $(this).click(function(){
            /*store_list 즉 li를 클릭하였을 때*/
            $(".store_list").removeClass("selected");
            /*selected라는 클래스를 지워준다. 초기화 과정*/
            $(this).addClass("selected");  
            /*클릭된 store_list에 selected라는 클래스가 추가된다.*/
            var store_no = $(this).attr("data-store");
            /*store_no라는 변수 선언, 해당 변수는 store_list의 data-store의 속성을 가져온 값이다*/
            $("#store").css({background: "url(img/bg_s10_" + store_no + ".webp) 50% 50% no-repeat", backgroundSize: "cover"});
            /*#store css 배경이미지를 store_no라는 변수(클릭된 li의 data-store속성값)를 사용해 바꿈*/
            var $text_con = $("#store.sections.section_11 .width_con > .text_con");
            /*$text_con 변수지정 해당 변수는 #store.sections.section_10안에 .width_con안에 .text_con을 말함*/
            $text_con.find("h4").html($(this).find("h4").html());
            /*$text_con에 h4태그를 찾고 .store_list에서 h4를 찾아 해당 h4를 가져온 후 #store.sections.section_10 .width_con > .text_con h4로 교체함*/
            $text_con.find("h5").html($(this).find("h5").html());
            /*$text_con에 h5태그를 찾고 .store_list에서 h4를 찾아 해당 h5를 가져온 후 #store.sections.section_10 .width_con > .text_con h4로 교체함*/
            $text_con.find("h6").html($(this).find("h6").html());
            /*$text_con에 h6태그를 찾고 .store_list에서 h4를 찾아 해당 h6를 가져온 후 #store.sections.section_10 .width_con > .text_con h4로 교체함*/
        });
    });
});












