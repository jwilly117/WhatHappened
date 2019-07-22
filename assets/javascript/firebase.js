//ready js
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyATqeh-hyDxXHeiGMmrcOZI-yK-NAsJBeM",
        authDomain: "bootcampp1t4.firebaseapp.com",
        databaseURL: "https://bootcampp1t4.firebaseio.com",
        projectId: "bootcampp1t4",
        storageBucket: "bootcampp1t4.appspot.com",
        messagingSenderId: "250848158957"
    };

    firebase.initializeApp(config);
    let db = firebase.database();

    //set max threshold of items shared on DOM from all user shares
    let shareMax = 20;
    let snapshotArray = [];
    db.ref("sharedData").orderByChild("dateAdded").limitToLast(shareMax).on("child_added", function (snapshot) {
        snapshotArray.unshift(snapshot.val());
        if (snapshotArray.length > shareMax) {
            snapshotArray.splice(shareMax,1)
        }       
        postShare();        
    }, function (error) {
    });

    //post shared items to DOM
    function postShare() {
        $("#share").empty();
        for (let i = 0; i < snapshotArray.length; i++) {
            let dateHeader = "";
            let card = $("<div class='card-panel'>");
            if (snapshotArray[i].api === "nyt") {
                dateHeader = $("<h6>").text(snapshotArray[i].userName + " shared a NYT article from " + moment(snapshotArray[i].dateSearched, "YYYYMMDD").format("MMM D, YYYY"));
            } else if (snapshotArray[i].api === "history") {
                // change to year of event as opposed to year of date searched
                dateHeader = $("<h6>").text(snapshotArray[i].userName + " shared an event from " + moment(snapshotArray[i].dateSearched, "YYYYMMDD").format("MMM D, ") + snapshotArray[i].year);
            }
            let sharedContent ="<div style='margin-top:10px'>" + snapshotArray[i].userShared + "</div>";
            card.append(sharedContent);
            card.prepend(dateHeader);
            $("#share").append(card);
        };
    };

    //post to firebase
    function shareHistory(index) {
        db.ref("sharedData").push({
            api: "history",
            dateAdded: moment().valueOf(),
            dateSearched: moment(dateSearched, "YYYY-MM-DD").format("YYYYMMDD"),
            userName: userName,
            userShared: historyObj.events[index].html,
            // added to share year of event instead of year (of birthday) searched
            year: historyObj.events[index].year
        });
    };

    //onclick function to push data into firebase
    $(document).on("click", ".shareThis", function () {
        let sharedObj = JSON.parse($(this).attr("data-array"));
        sharedObj.userName = $("#name").val();
        sharedObj.dateAdded = firebase.database.ServerValue.TIMESTAMP;
        db.ref("sharedData").push(sharedObj);
    });

    $(document).on("click", ".history-btn", function (event) {
        let id = $(this).attr("id");
        id = id.substring(12, id.length);
        shareHistory(id);
    });
    
    //end ready js
});