//history.muffinlabs.com API call, send individual arguments for month & day
function getHistory(month, day) {
    let endpoint = "https://cors-anywhere.herokuapp.com/https://history.muffinlabs.com/date/";
    let queryURL = endpoint + month + "/" + day;
    return $.ajax({
        url: queryURL,
        method: "GET",
    //.then used to wait for the return of promise
    }).then(function (response) {
        response = JSON.parse(response);
        historyObj.date = response.date;
        historyObj.events = response.data.Events.reverse();
        historyObj.births = response.data.Births.reverse();
        historyObj.deaths = response.data.Deaths.reverse();
    }).fail(function (err) {
        throw err;
    });
};

//global object containing returned history API data
let historyObj = {
    date: "",
    events: [],
    births: [],
    deaths: []
};