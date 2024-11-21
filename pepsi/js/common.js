function remove_hide(i){
    //remove_hide함수의 매개변수는 i
    $(".fullsection.full"+i).removeClass("hide");
    //.fullsection.full"+i(매개변수).hide라는 클래스를 지워준다.
}
var change_speed = 750;
// change_speed라는 변수선언 변수는 .75
var release_times, times;
// 사이드 퀵버튼 클릭 이동 , release_times과 times라는 변수 선언
function moving_sections(gnbindex,length){ //화면전환 중에 다른 화면 전환 불가
    //moving_sections함수는 (gnbindex,length)매개변수
    $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * gnbindex)}, change_speed);
    //.quick(html에서의 navbar)에 애니메이션추가 margintop:.quick의 높이값을 추출하여 절반으로 나누고(중간에서부터 올라가야함) - .quick의 li의 요소+padding+border+margin을 포함한 영역(24px)까지 높이값을 추출함,23번줄 참고,gnbindex는 ul.nav li.index임  / change_speed 즉 .75s 동안 애니메이션을 실행하라는 뜻
    $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
    //.quick li에 on이라는 클래스를 지워주고(초기화) .quick li에 순번이 부여되고 그 n번째의 li가 on이라는 클래스를 가지게 됨
    $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");
    //.ul.nav li에 on이라는 클래스를 지워주고(초기화) ul.nav li에 순번이 부여되고 그 n번째의 li가 on이라는 클래스를 가지게 됨
    $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
    //전체를 묶고있는 부모#fullpage의 애니매이션을 줌 top으로 $(".full"+i).height() .full+i 섹션의 높이값만큼 top으로 .75s 동안 올리고, easeInOutQuint 천천히 시작 빠르게 천천히 끝남
    $(".pagination b").text(gnbindex+1);
    //.pagination b안에 gnbindex+1의 값으로 추출하여 보여줌
    remove_hide(gnbindex+1);
    //remove_hide(i) 매개변수 i는 gnbindex+1이 됨
    
    if($(".fullsection").eq(gnbindex).hasClass("light")){ //몇번째 .fullsection인지 뽑아내고 그 섹션에 light라는 클래스를 가지고 있을 때
    $("body").addClass("light_mode"); //body에 .light_mode 클래스를 추가
    }else{
    $("body").removeClass("light_mode"); //없을 땐 .light_mode 클래스를 제거
    }
    
}
function quickClick(){
    $(".quick li, ul.nav li").click(function(){
        var gnbindex = $(this).index();
        //gnbindex 변수 선언,.quick li와 ul.nav li를 클릭 했을 때 순번을 부여함
        var length = 0;
        // length는 0이라는 변수를 선언 
        for(var i=1; i<(gnbindex+1); i++){
        //반복문 i=1이고 nav의 첫번째 li를 클릭하게되면 gnbindex는 0의 값을 가지게 됨 그것에 1를 더하면 첫번째 li라는 말이 됨, i=1이고 gnbindex+1일때 값은 동일함으로 반복문에서 탈출
        //반복문 i=1이고 nav의 두번째 li를 클릭하게되면 gnbindex는 1의 값을 가지게 됨 그것에 1를 더하면 두번째 li라는 말이 됨, i=1이고 gnbindex+1일때 값은 1<2이므로 반복문 맞음, 한번 더 반복 i=2이고 2<2는 틀렸으므로 반복문 탈출 한 섹션의 높이값만큼 추출됨
            length+=$(".full"+i).height();
            //변수 length는 0의 값을 가지고 있었고, .full1의 높이값을 추출해왔을때 0이기때문에 값의 변함이 없음
        }
        //if($("body").find("#fullpage:animated").length >= 1) return false;
        moving_sections(gnbindex,length);
        $(".quick li").css({"visibility": 'visible'})
        return false;
    }).mousedown(function(){
		$(".quick_inner").css({ opacity: 0});
	}).mouseup(function(){
		setTimeout(function(){
			$(".quick_inner").css({ opacity: 1});
		}, change_speed);
	});
}


function fullset(){
    var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span").text(pageindex);
    for(var i=1;i<=pageindex;i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
    }
    
    $(".fullsection").each(function(n){//좌우 수평 도트생성
		var subcon_index = $(this).find(".full_sub").length; //페이지 갯수 찾기(0~7)
            
		for(var i=0; i<subcon_index; i++){
			$(".fullsection").eq(n).find(".quick_inner").find("ul").append("<li></li>");
            //페이지 .full_sub 갯수만큼 .fullsection 안에 .quick_inner에 li추가
        }
    });
    
    $(".quick").css({marginTop: $(".quick").height()/2});
    $("#fullpage .quick ul li:first-child, #header ul.nav li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게

    
    function moving_page(){
        clearTimeout(times);
        times = setTimeout(function(){
        //일정시간 뒤에 중괄호 안에 있는 명령 실행
            $("body").removeClass("locked");
            $(".quick_inner").css({ opacity: 1});
        }, change_speed);
        
        $(".quick li").css({"visibility": 'visible'});
        $(".quick_inner").css({ opacity: 0});
        
        //event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
            var page = $(".quick ul li.on");
            //console.log(page.index()+1);  // 현재 on 되어있는 페이지 번호
            if($("body").find("#fullpage:animated").length >= 1){
                return false;
            }
            

            if (event.wheelDelta > 0 || event.detail < 0) {//마우스 휠을 위로
                var before = page.index();
                var pagelength=0;
                for(var i=1; i<(before); i++){
                    pagelength += $(".full"+i).height();
                }
                if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                    page = page.index()-1;                        
                    moving_sections(page, pagelength);
                }else{
                    //alert("첫번째 섹션 입니다.");
                }	
            }else{ // 마우스 휠을 아래로	
                var nextPage = parseInt(page.index()+1); //다음페이지번호 parseInt 정수로 전환> 소수점이 있다면 다 잘라냄
                var lastPageNum = parseInt($(".quick ul li").length); //마지막 페이지번호
                //현재페이지번호 <= (마지막 페이지 번호 - 1)
                if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate
                    var pagelength=0;
                    for(var i = 1; i<(nextPage+1); i++){ 
                        //총 페이지 길이 구하기
                        //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                        pagelength += $(".full"+i).height();
                    }
                    moving_sections(nextPage, pagelength);
                }else{ // 현재 마지막 페이지 일때는
                    //alert("마지막 섹션 입니다!");
                }
            }                      
        }else{
            return false;
        }
        clearTimeout(release_times);
        release_times = setTimeout(function(){            
            $("body").removeClass("locked");
        }, 150);
    }

    window.addEventListener("mousewheel", moving_page, {passive: false});
    window.addEventListener("DOMMouseScroll", moving_page, {passive: false});    

    $(window).resize(function(){ 
        //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
        var resizeindex = $(".quick ul li.on").index()+1;
        var pagelength = 0;
        for(var i = 1; i<resizeindex; i++){ 
            //총 페이지 길이 구하기
            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
            pagelength += $(".full"+i).height();
        }
        $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
        full_sub_resize();
    });
}


function full_sub_inner(){
    //full_sub_inner 함수를 선언함
    //변수는 var let const

    $(".quick_inner").css({"margin-left": - $(".quick_inner li").outerWidth()});//.quick_inner 인 ul이 통으로 li의 너비만큼 이동.

    $("#fullpage .fullsection .quick_inner li:first-child").addClass("on");
    $(".quick_inner li").click(function(){
        var $this = $(this).parents(".fullsection").find(".quick_inner").find("li").eq($(this).index());
        var subindex = $(this).index() + 1;
        var length = 0;
        for(var i=1; i<subindex; i++){
            length += $(".fullsection").width();
        }
        var quick_w = $this.outerWidth();
        for(var i=2; i<subindex+1; i++){
            quick_w += $this.outerWidth(true);
        }
        
        $this.parents(".fullsection").find(".full_sub_con").stop().animate({"left": -length + "px"}, change_speed).attr("data-index", subindex);
        $this.parents(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed);
        $this.parents("ul").find("li").removeClass("on").eq(subindex-1).addClass("on");

        var quickindex = $this.parents(".fullsection").index();
        $(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'});
        $this.parents(".fullsection").find(".full_sub").eq(subindex-1).removeClass("hide");
             
        var $parents_full = $(this).parents(".fullsection");
        if(subindex == 1){
            $parents_full.find(".btn_left").addClass("disable");
            $parents_full.find(".btn_right").removeClass("disable");
        }else if(subindex == $(this).parent("ul").find("li").length){
            $parents_full.find(".btn_left").removeClass("disable");
            $parents_full.find(".btn_right").addClass("disable");
        }else{
            $parents_full.find(".btn_left").removeClass("disable");
            $parents_full.find(".btn_right").removeClass("disable");
        }
        
    });
}


/*페이지 옆으로 이동, 버튼 disabled*/
var prnts_w, prnts_h;
//prnts_w와 prnts_h라는 변수를 선언
function full_sub_resize(){
// full_sub_resize라는 함수는 아래와 같다
    $(".full_sub").each(function(){
    //full_sub 각각에
        prnts_w = $(this).parents(".fullsection").width();
        //prnts_w는 full_sub의 증조 중 fullsection의 너비값을 추출해온다 (full_sub의 전체를 감싸고 있음)
        prnts_h = $(this).parents(".fullsection").height();
        //prnts_h full_sub의 증조 중 fullsection의 높이값을 추출해온다 (full_sub의 전체를 감싸고 있음)
        $(this).css({width: prnts_w, height:prnts_h});
        //full_sub의 너비는 fullsection의 너비가 되고 높이는 fullsection의 높이가 됨
    });
    $(".full_sub_con").each(function(){
    //full_sub_con 각각에
        $(this).width(prnts_w * $(this).find(".full_sub").length);
        //full_sub_con 너비는 fullsection의 너비값에서 full_sub_con에서 full_sub의 개수만큼 곱한값이다.
    });
}



function full_sub_sizing(){
    full_sub_resize();
    //full_sub_resize 함수 사용
    full_sub_inner();
    //full_sub_inner 함수 사용
    $(".btn_left, .btn_right").each(function(){
    //.btn_left, .btn_right 각각에 무슨일이 일어날 것임
        if($(this).hasClass("btn_left")){
            //만약 .btn_left라는 클래스를 가지고 있다면
          $(this).addClass("disable");
            //그것에 disable이라는 클래스를 추가해주세요
        }
        
        $(this).click(function(){
            //.btn_left, .btn_right를 클릭했을 때
            var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            //parseInt(파라미터,리턴값) 문자를 숫자로 변경함 .btn_left, .btn_right의 증조에 fullsection라는 클래스를 가진 친구에게서 full_sub_con이라는 클래스를 가진 친구의 data-index속성을 가져와 정수로 반환함
            var move_w = prnts_w;
            //move_w라는 변수는 prnts_w
            
            if($(this).hasClass("btn_left")){
                 //만약 btn_left라는 클래스를 가지고 있다면
                if(sub_counter > 1){
                    //sub_counter 즉, data-index의 값이 1보다 크다면! 즉, 첫 장에서는 성립이 안됨
                    sub_counter -=1;
                    //data-index의 값에서 1을 빼준다
					if(sub_counter == 1){
                        //만약 data-index의 값이 1이라면
						$(this).addClass("disable");
                        //data-index에 disable이라는 클래스를 추가한다.
					}
				}
				$(this).parent().find(".btn_right").removeClass("disable");
                //.btn_left, .btn_right의 부모 중 .btn_right를 찾아 disable이라는 클래스를 지워줌
            }else{
                //만약 btn_left라는 클래스를 가지고 있지않다면 즉, btn_right는 가지고 있어도 됨
				$(this).parent().find(".btn_left").removeClass("disable");
                //.btn_left, .btn_left 부모 중 .btn_left를 찾아 disable이라는 클래스를 지워줌
                if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){//length는 문자열의 개수를 세어줌 즉 full_sub의 개수도 세어줌
                //만약 data-index 값이 fullsection안에 full_sub의 값보다 작다면 
                    sub_counter +=1;
                    //data-index값에 1을 더 해주세요. 즉 옆으로 가는 페이지가 2개 이상이라면 data-index에 값은 1씩 증가함
                    if(sub_counter == $(this).parents(".fullsection").find(".full_sub").length){
                    //만약 data-index값이 fullsection안에 full_sub의 값과 같다면
						$(this).addClass("disable");
                        //.btn_left, .btn_right에 disable을 추가해주세요
					}
				}
			}
            
            move_w = move_w * (sub_counter-1) * -1;
            //move_w는 prnts_w이며 prnts_w은 fullsection의 너비값임, fullsection의 너비값에 data-index에서 1을 뺀 값에 -1을 곱하면 무조건 음수값
            $(this).parent(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
            //fullsection에서 full_sub_con을 찾아 move_w만큼 왼쪽으로 이동 .75초동안, data-index값을 full_sub_con의 data-index속성으로 교체(위 if문에서 data-index가 바뀌기 떄문에),full_sub를 찾아 full_sub_con의 data-index에서 1을 뺀 값으로 순번을 부여하고 hide라는 클래스를 지워줌
            var quick_w = $(this).parent(".fullsection").find(".quick_inner ul li").outerWidth();
            //quick_w 변수 선언, fullsection에서 .quick_inner ul li의 요소+패딩+테두리를 합한 너비의 값을 가져옴
			for(var i=2; i<sub_counter+1; i++){
            //i는 2고 i가 data-index의 값에 1을 더한 값보다 작다면 반복문이 거짓이 될때까지 실행됨
				quick_w += $(this).parent(".fullsection").find(".quick_inner ul li").eq(sub_counter - 1).outerWidth(true);
                //quick_w은 fullsection에서 .quick_inner ul li를 찾아 data-index에 1을 뺀 값으로 순번을 부여하고 outerWidth(true)로 요소+패딩+테두리+마진을 합한 너비값이 됨
			}
			$(this).parent(".fullsection").find(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed);
            //fullsection에서 quick_inner를 찾아 왼쪽으로 quick_w만큼 이동하고 .75초동안
			var quickindex = $(this).parents(".fullsection").index();
            //quickindex는 fullsection에게 순번을 부여함
			$(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'});
            //.quick li는 보여지게 하고 quickindex
			$(this).parent(".fullsection").find(".quick_inner ul li").removeClass("on").eq(sub_counter-1).addClass("on");
            //fullsection quick_inner ul li를 찾아 on클래스를 지우고 data-index의 값에 1을 뺀 li친구에게 on이라는 클래스를 부여
        });
    });  
}




var one_p_six;
function resize(){
    one_p_six = $(".panels li").eq(0).height();
    //제일 첫번째 li의 높이값을 추출
}

window.onresize = resize;
$(window).load(function(){
    resize();
    setInterval(function(){/*상단 영상 반복재생*/
         /*setInterval() 지정된 시간 간격마다 지정된 기능을 반복하고자 할 때 사용함*/
        $(".youtube_player").attr("src", $(".youtube_player").attr("src"));
        /*.youtube_player클래스 src속성을 $(".youtube_player").attr("src")로 교체해준다 => 같은 영상 반복*/
    }, 30000);
    /*20초 후 반복됨*/
})

var $mouse_tracker_p, $mouse_tracker_c;
$(function(){
    fullset();
    quickClick();
    full_sub_sizing();
    
    $mouse_tracker_p = $(".mouse_tracker.pointer");
    $mouse_tracker_c = $(".mouse_tracker.cell");
    $("body").on("mousemove", function(event){
        $mouse_tracker_p.css({ left: event.clientX, top: event.clientY});
        $mouse_tracker_c.stop().animate({left: event.clientX, top: event.clientY}, 200, "easeOutCirc");
    });
    
    $("a, .btn, .btn_con i, i.fa-times").hover(function(){
        $("body").addClass("btn_hover");
        $("body").removeClass("back_cursor");
    },function(){
        $("body").removeClass("btn_hover");
    });
    
    $("iframe").hover(function(){
        $("body").addClass("back_cursor");
    },function(){
        $("body").removeClass("back_cursor");
    });
    
    
    
    
    
    var flavor = ["pepsi","mango","cherry","caffeinefree"],
        flavor_title = ["pepsi&nbsp;classic","pepsi&nbsp;mango","pepsi&nbsp;cherry","caffeine&nbsp;free"],
        option=[
            ["diet","zerosugar"],
            ["","zerosugar"],
            ["diet","zerosugar"],
            ["diet",""]
        ],
        nut =
        [
            [
                ["150","0","1","14","41"],
                ["0","0","1","0","0"], 
                ["0","0","2","0","0"], 
            ],
            [
                ["150","0","4","14","41"],
                [""],
                ["0","0","1","0","0"]
            ],
            [
                ["160","0","1","14","42"],
                ["0","0","1","0","0"],
                ["0","0","1","0","0"]
            ],
            [
                ["150","0","1","14","41"],
                ["0","0","2","0","0"],
                [""]
            ]
        ];

    var $flavor_btn = $("#products.full3 .full_sub_con .full_sub .full_con .flavor .f_btn li"),
        $img_chage= $("#products.full3 .full_sub_con .full_sub .full_con .pepsi_img img"),
        flavor_index = 0,
        option_index = 0,
        $option_btn = $("#products.full3 .full_sub_con .full_sub .full_con .option .o_btn li"),
        $cal = $("#products.full3 .full_sub_con .full_sub .full_con .nutri ul.nutri_wrap li.cal span"),
        $fat = $("#products.full3 .full_sub_con .full_sub .full_con .nutri ul.nutri_wrap li.fat span"),
        $so = $("#products.full3 .full_sub_con .full_sub .full_con .nutri ul.nutri_wrap li.so span"),
        $car = $("#products.full3 .full_sub_con .full_sub .full_con .nutri ul.nutri_wrap li.car span"),
        $sugar = $("#products.full3 .full_sub_con .full_sub .full_con .nutri ul.nutri_wrap li.sugar span");

    function nutri_change(){
        $cal.html(nut[flavor_index][option_index+1][0]);
        $fat.html(nut[flavor_index][option_index+1][1]);
        $so.html(nut[flavor_index][option_index+1][2]);
        $car.html(nut[flavor_index][option_index+1][3]);
        $sugar.html(nut[flavor_index][option_index+1][4]);
        counter_start($cal);
        counter_start($fat);
        counter_start($so);
        counter_start($car);
        counter_start($sugar);
    }

    function p_nutri_change(){
        $cal.html(nut[flavor_index][0][0]);
        $fat.html(nut[flavor_index][0][1]);
        $so.html(nut[flavor_index][0][2]);
        $car.html(nut[flavor_index][0][3]);
        $sugar.html(nut[flavor_index][0][4]);
        counter_start($cal);
        counter_start($fat);
        counter_start($so);
        counter_start($car);
        counter_start($sugar);
    }


    function text_change(n){
        var $product_name = $("#products.full3 .full_sub_con .full_sub.pro_1 .full_con .title_con h2");
        var text_replace = flavor_title[n].replace(/&nbsp;/g,"<br>");
        
        $product_name.css({transition: "none"}).fadeOut(250, function(){
            $product_name.html(text_replace).fadeIn(250);
        });
    }

    $flavor_btn.each(function(){
        $(this).click(function(){
            $flavor_btn.removeClass("selected");
            $option_btn.removeClass("selected");
            $(this).addClass("selected");
        });
    });

    $option_btn.each(function(){
        $(this).click(function(){
            $option_btn.removeClass("selected");
            $(this).addClass("selected");
        });
    });
    
    $flavor_btn.click(function(){
        flavor_index=$(this).index();
        img_src="img/can/"+flavor[flavor_index]+".png";
        $img_chage.attr("style","background: url("+img_src+") 50% 50% no-repeat;");


        // 모든 버튼의 disable 클래스 제거
        $option_btn.removeClass("disable");

        if (flavor[flavor_index] === "mango" && option[flavor_index][0] === "") {
            $option_btn.eq(0).addClass("disable");

        } else if (flavor[flavor_index] === "caffeinefree" && option[flavor_index][1] === "") {
            $option_btn.eq(1).addClass("disable");
        }
        p_nutri_change();
        text_change(flavor_index);
    });

    $option_btn.click(function(){
        option_index=$(this).index();
        img_src="img/can/"+flavor[flavor_index]+"_"+option[flavor_index][option_index]+".png";
        $img_chage.attr("style","background: url("+img_src+") 50% 50% no-repeat;");
        nutri_change();
        /*[option_index]에 +1이 되어야함 */
        //alert(nut[flavor_index][option_index+1][1]);
    });

    
    $(".plus_btn .plus_txt").each(function(){
        $(this).click(function(){
            $(".plus_btn .plus_txt").removeClass("selected");
            $(this).addClass("selected");
            $(".how_con").removeClass("selected").eq($(this).index()).addClass("selected");
        })
    });


    $(".panels>li").each(function(){
        //.panels li 각각에 
        var $this = $(this);
        //짧게 쓰려구
        $this.hover(function(){
            //li각각을 호버 했을 때
            $this.addClass("hover");
            //li에 hover라는 클래스가 생김 z-index
        },function(){
            setTimeout(function(){
            //.25초 뒤에 실행
                $this.removeClass("hover");
                //hover라는 클래스 지워짐, 마우스가 떠났을 때
            }, 250);
        });

        $this.click(function(){
            //li click했을 때
            $(this).addClass("on").find(".panel").css({height: $("#products.full3 .full_sub_con .full_sub .full_con ul.panels").height() -20, marginTop: ($this.index() * one_p_six * -1) + ($this.index() * -20)});
            // li에 on이라는 클래스가 추가됨 li안에 panel이라는 div를 찾아서 height값을 창의 높이 값 만큼 늘려줌, li의 순번 부여 곱한만큼 커짐!
            //$(this).removeClass("hover");
            $(".panels>li:not(.on)").animate({opacity: '0'}, 250, 'swing');
        });
    });

    $(document).on("click","#products.full3 .full_sub_con .full_sub .full_con ul.panels li.on .panel .acc_nav .btn_close", function(){
        //.btn_close 클릭했을 때 높아졌던 높이값이 다시 돌아오게만드는 코드같음
        // 즉 on이 추가되면서 div.panel은 css가 본인의 li순번만큼 li의 높이와 -1을 곱하여 마진탑으로 올라가게됨
        $(".panels>li").removeClass("on").find(".panel").attr("style","");
        // btn_close가 click되면서 div.panel의 클래스는 지워지고 변경되었던 div.panel의 css 속성이 사라짐,, 이걸 어떻게 자연스럽게 줄이지 .animate({},500)?
        $(".panels>li:not(.on)").animate({opacity: '1'}, 250, 'swing');
    });
    
    
    
    
    /*--------history 마우스 휠로 스크롤 제어하기--------*/
    var history_length = $("#history .full_con .slide_con .slide ul.his_slide li").length;
    //history_length라는 변수 선언, 해당 변수는 ul.his_slide li의 개수를 추출
	var total_history_w = 0;
	//total_history_w 라는 변수 선언, 해당 변수는 0의 값을 가지고 있음

	for(i=0; i<history_length; i++){
	//반복문 실행, i=0, i가 li개수 추출값보다 작다면 계속 반복될 것임 i는 1씩 증가
		total_history_w += $("#history .full_con .slide_con .slide ul.his_slide li").eq(i).outerWidth(true);
		//total_history_w는 li의 i번째 요소+패딩+보더값을 더한 너비값을 추출함
	}
	$("#history .full_con .slide_con .slide").width(total_history_w);
	//반복문에서 종료되면 slide의 너비는 total_history_w값이 됨
	
	var before_x, this_scroll, after_x;
	//before_x, this_scroll, after_x이라는 변수 선언
	$(".slide_con").mousedown(function(){
	//slide_con(슬라이드를 묶고있는 친구) 마우스를 누를 때 어떤 일이 발생함

		before_x = event.pageX;
		//before_x 는 event.pageX임
		this_scroll = $(".slide_con").scrollLeft();//왼쪽에서 오른쪽으로 스크롤
		//.slide_con이 가로로 스크롤되는 값 반환
		event.preventDefault();
		
		$(this).addClass("moving").mousemove(function(){
		//moving이라는 클래스 추가 후 마우스가 떠나면 함수
			event.preventDefault();
            //<a> 태그는 href에 연결된 링크를 통해, 해당 페이지로 이동하는 기능을 가지고 있으며, <submit> 태그는 그 태그의 값을 전송하면서 해당 페이지를 새로고침 하는 기능을 가지고 있다. 이러한 기능들은 매우 유용하지만, 그 의도로 사용하지 않게 될 경우 불편함을 야기할 수 있다. 이때 사용하는 것이 바로 event.preventDefault() 이다.
			if($(this).hasClass("moving")){
			//.slide_con이 moving이라는 클래스가 있을 때
				after_x = event.pageX;
				//after_x는 event.pageX가 됨
				if(before_x != after_x){
				//before_x값과 after_x값이 다르다면
					$(".slide_con").scrollLeft(this_scroll - (after_x - before_x) * 2);
					//slide_con의 가로로 스크롤 되는 값은 전체 스크롤 되는 값에서 after_x에서 before_x뺀 값의 곱하기 2의 값을 뺀 값이 됨
				}
			}else{
			//.slide_con이 moving이라는 클래스가 없다면
				$(this).removeClass("moving");
				//.slide_con이 moving이라는 클래스를 지워줘라
			}
		});
	}).mouseup(function(){
	//마우스를 눌렀다 땠을 때
		$(this).removeClass("moving");
		//.slide_con에 moving이라는 클래스를 지워줘라
	}).mouseleave(function(){
	//마우스가 떠났을때
		$(this).removeClass("moving");
		//.slide_con에 moving이라는 클래스를 지워줘라
	});
	
	var slc = 0,
		slc_stop = 1,
		slc_interval;
	function slide_scroll(a){
		if(a>0){//스크롤 아래(오른쪽으로)로 내릴 때
			if($(".slide_con").hasClass("scroll_down")){
				slide_scroll_stop();
				slc = a;
			}else{
				slc += a;
				if(slc>120){
					slc = 120;
				}
			}
		}else{
			if($(".slide_con").hasClass("scroll_up")){
				slide_scroll_stop();
				slc = a;
			}else{//스크롤 위(왼쪽으로)로 올릴 때
				slc += a;
				if(slc < -120){
					slc = -120;
				}
			}
		}
		if(slc_stop == 1){
			slc_stop = 0;
			slc_interval = setInterval(function(){
				if(!slc == 0){
					if(slc > 0){//마우스 휠을 위로 했을 때
						slc = slc - 5;
						if(slc < 0){
							slc = 0;
						}
						$(".slide_con").addClass("scroll_up");
					}else{//마우스 휠을 아래로 했을 때
						slc = slc + 5;
						if(slc > 0){
							slc = 0;
						}
						$(".slide_con").addClass("scroll_down");
					}
					$(".slide_con").addClass("scrolling").scrollLeft($(".slide_con").scrollLeft() + (-.12 * slc));//스크롤 값 변경
				}else{
					slide_scroll_stop();
				}
			}, 1);
		}
	}
	
	function slide_scroll_stop(){
		$(".slide_con").removeClass("scrolling").removeClass("scroll_down").removeClass("scroll_up");
		slc = 0;
		slc_stop = 1;
	}
	
	$(".slide_con").hover(function(){//해당 부분에서만 스크롤 할 수 있도록 클래스 만듦.
		$(this).addClass("scroll_ready");
	}, function(){
		$(this).removeClass("scroll_ready");
	});
	$(".slide_con").on("mousewheel DOMMouseScroll", function(event){
		event.stopPropagation();
		if($(".slide_con").hasClass("scroll_ready")){
			var scroll = event.originalEvent.wheelDelta;
			slide_scroll(scroll);
		}
	});
    /*-------------------------------------------------------------*/
});