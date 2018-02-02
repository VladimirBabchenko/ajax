var Search = (function(){
  var query = function(url, request) {
    return new Promise(function(res, rej) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("load", function() {
        if (xhr.status === 200) {
          var req = JSON.parse(xhr.responseText);
          res(req);
        } else {
          var error = new Error(this.statusCode);
          error.code = this.status;
          rej(error);
        }
      });

      xhr.onerror = function() {
        rej(new Error("Network Error"));
      };

      xhr.send(JSON.stringify({
        key: request
      }));
    })
  };

  var Search = function(url) {
    this.url = url;
  };

  Search.prototype.ask = function(request) {
    return query(this.url, request)
  };

  return Search;
}());