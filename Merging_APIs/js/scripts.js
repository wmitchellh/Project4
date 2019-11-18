var screenName = [];
var profileImage = [];
var text = [];

$( document ).ready(function() {
    loadData();
    loadTweets();
});

$( function() {
    $( "#tabs" ).tabs();
  } );

function loadData(){

    $.ajax({
            type:"GET",
            url:"https://newsapi.org/v1/sources",
            dataType:"json",
            success: parseData
});


}

function parseData(data){
  console.log(data);
  var sources = []; //makes sources an array
  var tempPath = data["sources"]; //use when data is nested
  var html = "";

  for (var i = 0, len =tempPath.length; i < len; ++i) {
    sources.push(tempPath[i]);
    console.log(sources[0]["name"]);

    html += '<li><a href="#" onclick="loadAtricles(\'' + sources[i]["id"] + '\')">' + sources[i]["name"] + '</a></li>';
  }

  $("#sources-area").html(html);


}

function loadAtricles(source){
  console.log(source);

  $.ajax({
          type:"GET",
          url:"https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=197f51ed30d4469b90a5b0bafb6535d5",
          dataType:"json",
          success: parseArticles
});

}

function parseArticles(data){
  console.log(data);

  var articles = [];
  var tempPath = data["articles"];
  var html = "";

  for (var i = 0, len =tempPath.length; i < len; ++i) {
    articles.push(tempPath[i]);
    console.log(articles[i]["title"]);

    html += '<div><h4><a href="' + articles[i]["url"] + '">' + articles[i]["title"] + '</a></h4>';
    html += '<p>' + articles[i]["description"] + '</p></div>';
  }
  $("#feed-area").html(html);

}

function loadTweets(){

    $.ajax({
            type:"GET",
            url:"json/tweets.json",
            dataType:"json",
            success: parseTweets
});


}

function parseTweets(data){
  console.log(data);

  for (var i = 0, len = data.length; i < len; ++i){

    screenName = (data[i]["screenName"]);
    profileImage = (data[i]["profileImage"]);
    text = (data[i]["text"]);

    var html = '<div class="row" id="twit"><div class="col-sm-1 id="twitImage""> <img class="bioImage" alt="" src="' + profileImage + '" /></div>';
        html += '<div class="col-sm-11">';
        html += '<p><strong>' + screenName + '</strong></p>';
        html += '<p> ' + text + '</p>' ;
        html += '</div>';
        html += '</div>';

        $('dl').append(html);
}
// $('dl').append($(html));
}
// $('dl').append($(html));
