  /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyAZKvQ6U8n63AB-12PaFPr2MazFY23IXpQ");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "q": "Chile Protests"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                parseVideos(response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "156181074100-m52ut2npen46iqra8dbri3qcke7mkapc.apps.googleusercontent.com"});
  });

  function parseVideos(response) {
    //   console.log("testing");
    //   console.log(response);
    let len = response.result.items.length;
    let html = "";
    for (let a = 0; a < len; a++) {
    //   console.log(response.result.items[a].snippet.title);
        html += "<h4>" + response.result.items[a].snippet.title + "</h4>";
        html += '<iframe src="https://www.youtube.com/embed/' + response.result.items[a].id.videoId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    }
    console.log(html);
    document.getElementById("videos").innerHTML = html;
  }
