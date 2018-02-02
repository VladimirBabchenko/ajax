var str = new Search("http://localhost:3000/search")
function reqAsk(e) {
  searchBlock.innerHTML = "";
  if (e.currentTarget.value) {
    str.ask(this.value)
      .then(function (res) {
        res.forEach(function (el) {
          var li = document.createElement("li");
          li.innerHTML = el.key;
          searchBlock.appendChild(li);
        })
      })
  }
}

search.addEventListener("keyup", reqAsk);