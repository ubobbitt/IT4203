

function details( movieid) {
    var vid;
    $.get("https://api.themoviedb.org/3/movie/"+movieid+"?api_key=9824d5d7ab77a02aa6e9cc1b18bab686&language=en-US",
        function(result){
            $.get("https://api.themoviedb.org/3/movie/"+movieid+"/videos?api_key=9824d5d7ab77a02aa6e9cc1b18bab686&language=en-US",
            function(x){vid = x.results[0].key;
                $('#main').html('');
                $('#main').css("background","none");
                console.log(result);
                $(' #details').html(
                    '<a href="https://www.youtube.com/watch?v='+vid+'"><img class="poster2 youtube" src="https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png" alt="paly" width="50px"></a>'+
                    '<div><img class="poster2" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/'+result.poster_path+'" alt="picture"></div>'+
                    '<div class="movieDetails">'+
                    '<h3 class="title2">'+result.original_title+'</h3>'+'<h4 style="text-align: center;margin-top:0px;"> ( '+result.release_date.substring(0,4)+')</h4>'+
                    '<p style="font-size: 16px;font-weight: bold;">User Score ('+result.vote_average*10+'%)</p>'+
                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 meter">'+
                    '<div class="innermeter"></div>'+
                    '</div>'+
                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 overview2">'+
                    '<p class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Overview:</p>'+
                    '<p class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+result.overview +
                    '</p></div>'+'<div style="clear: both"></div>'+
                    '<p style="text-align: center;" class="icons"><i class="fa fa-bars" aria-hidden="true"></i>'+
                    '<i class="fa fa-heart" aria-hidden="true"></i>'+
                    '<i class="fa fa-star" aria-hidden="true"></i>'+
                    '<i class="fa fa-bookmark" aria-hidden="true"></i></p>'+
                    '</div>');

                $('.innermeter').animate({
                    "transition-duration": "1s",
                    width: result.vote_average*10+'%',
                });

                function isScrolledIntoView(elem) {
                    var docViewTop = $(window).scrollTop();
                    var docViewBottom = docViewTop + $(window).height();

                    if($(elem).offset() !== undefined) {
                        var elemTop = $(elem).offset().top;
                        var elemBottom = elemTop + $(elem).height();

                        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                    }

                }

                $(window).scroll(function(){
                    if (isScrolledIntoView('.innermeter') === true) {
                        $('.innermeter').addClass('in-view');
                    }
                    else {
                        $('.innermeter').removeClass('in-view');
                    }

                });

                $(window).scroll(function(){
                    if(isScrolledIntoView('.movieDetails') === true) {
                        $('.movieDetails').addClass('spin');
                    }
                });
            });

    });

}


var movieid;

$(function (){
    var home;
    function add3Dots(string, limit)
    {
        var dots = "...";
        if(string.length > limit)
        {
            // you can also use substr instead of substring
            string = string.substring(0,limit) + dots;
        }

        return string;
    }

    function cards(x,i){
        $('#main').append('<div class="col-lg-4 col-sm-6 col-md-4 col-xs-12" style="margin-top:25px;padding: 0 5px 0 5px"><div class="card " id="card"'+i+'>'+
            '<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6 poster" id="poster"'+i+' style="padding: 0px;">'+
            '<a href="https://image.tmdb.org/t/p/w500'+x.results[i].poster_path+'"><img src="https://image.tmdb.org/t/p/w500'+x.results[i].poster_path+'" alt="picture"></a></div>'
            +'<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6  content" id="content"'+i+'>'+
            '<h5 class="title" id="title"'+i+'  onclick="details('+x.results[i].id+')" ><a href="#">'+x.results[i].original_title+'</a></h5>'+
            '<span class="calender"><i class="fa fa-calendar" aria-hidden="true"></i> '+x.results[i].release_date.substring(0,4)+'</span>'+
            '<span class="rating" id="rating"+i+><i class="fa fa-star" aria-hidden="true"></i>&nbsp;&nbsp;'+x.results[i].vote_average+'</span>'+
            '<h6 class="overview">Overview</h6><p class ="overviewp ">'+add3Dots(x.results[i].overview,170)+'</p>'+
            '</div>'+
            '</div></div>');
    }
    $.get("https://api.themoviedb.org/3/movie/popular?api_key=9824d5d7ab77a02aa6e9cc1b18bab686&language=en-US&page=1",
        function popular(popularData){
            // console.log(popularData);
            popularData.results.forEach(function(x,i){cards(popularData,i);home = popularData;});
        });

    $('#searchIcon').click(function () {
        console.log($('#searchBox').val());
        if($('#searchBox').val()!== "") {
            $('#details').html('');
            $.get('https://api.themoviedb.org/3/search/movie?api_key=9824d5d7ab77a02aa6e9cc1b18bab686&language=en-US&query='+$('#searchBox').val()+'&page=1&include_adult=false',
            function search(searchData){
            // console.log(searchData);
            // console.log($('#searchBox').val());
                $('#main').html('<h4 style="margin-bottom: -30px;">Search result for "'+$('#searchBox').val()+'"</h4>');
                searchData.results.forEach(function(x,i){
                    cards(searchData,i);
                });
            });
        }
    });

    $('#home').click(function() {$('#details').html('');home.results.forEach(function(x,i){cards(home,i)})});
});

