//nyt api call must input "YYYYMMDD"
//returns array of objects with properties for web url & headline
function getNYT(inputDate, page) {
  let nytArray = [];
  var url = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'api-key': "2RFlsMjGt55kuosoq0pTUEU2ZMzMJA6R",
    'begin_date': inputDate,
    'end_date': inputDate,
    'fl': "web_url, headline",
    'page': page
  });
  return $.ajax({
    url: url,
    method: 'GET',
  //.then used to wait for the return of promise
  }).then(function (result) {
    for (let i1 = 0; i1 < result.response.docs.length; i1++) {
      let nytObj = result.response.docs[i1];
      let returnObj = {
        web_url: nytObj.web_url,
        headline: nytObj.headline.main
      };
      nytArray.push(returnObj);
    };
    return nytArray;
  }).fail(function (err1) {
    throw err1;
  });
};