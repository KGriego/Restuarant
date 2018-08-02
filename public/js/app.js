$reservationBody = $("#reservation > tbody");
$waitingListBody = $("#waitingList > tbody");

$(document).ready(function() {
  console.log("I have been loaded");

  $.get("/api/reservations", function(data) {
    console.log("Reservations: " + JSON.stringify(data));
    var datalength = data.length;
    console.log("Reservations Data Length: " + datalength);
    for (i = 0; i < datalength; i++) {
      $("#details").show();
      var name = data[i].name;
      var email = data[i].email;
      var time = data[i].time;

      var newRow = $("<tr id=" + i + " class='resevationList'>").append(
        $("<td>").text(name),
        $("<td>").text(email),
        $("<td>").text(time)
      );
      $reservationBody.append(newRow);
    }
  });

  $.get("/api/waitingList", function(data) {
    console.log("Waiting List: " + JSON.stringify(data));
    var datalength = data.length;
    console.log("Waiting List Data Length: " + datalength);
    for (i = 0; i < datalength; i++) {
      $("#details").show();
      var name = data[i].name;
      var email = data[i].email;
      var time = data[i].time;

      var newRow = $("<tr id=" + i + " class='resevationList'>").append(
        $("<td>").text(name),
        $("<td>").text(email),
        $("<td>").text(time)
      );
      $waitingListBody.append(newRow);
    }
  });

  $("#add").on("click", function(event) {
    event.preventDefault();

    var newRes = {
      name: $("#name")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim()
      // time: $("#time")
      //   .val()
      //   .trim()
    };

    $.post("/api/list", newRes).then(function(data) {
      console.log(data);
      alert("Adding Reservation...");
    });
  });
});
