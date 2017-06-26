var $restoreButton = $("#restore-button");
var lastDeleted;
var indexOfDeleted;
var $popUp = $("#pop-up");
var $newTaskInput = $("#new-task-input");
var $newTaskButton = $("#new-task-button");
var isPopupToggled = false;
var isButtonToggled = false;

// CHECK OFF CLICKED TASK
$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

// SHOW OR HIDE BUTTON WHEN ACTION
var btnVisib = function(event) {
  if (!isButtonToggled) {
    if (event === "show") {
      isButtonToggled = true;
      showBtn();
    }
  } else if (event === "hide") {
      isButtonToggled = false;
      showBtn();
  }
}

var showBtn = function() {
  $restoreButton.fadeToggle(300);
}

// ACTION AFTER "ENTER" WAS CLICKED
$newTaskInput.on("keypress", function(event) {
  if (event.which === 13) {
    // grabbing new task from input
    var inputtedText = $(this).val();
    if (inputtedText !== "") {
      // clearing input
      $(this).val("");
      // show/hide button and alert
      btnVisib("hide");
      // create a new li and add to ul
      $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + inputtedText + "</li>");
      visib("added");
    } else {
      visib("error");
    }
  }
});

// SHOW AND HIDE THE POP-UP WINDOW WHEN ACTION
var visib = function(e) {
  var errorStyles = {
    color: "#c82020",
    height: "40px",
  }
  var noErrorStyles = {
    color: "#62cd19",
    height: "40px",
  }

  if (!isPopupToggled) {
    if (e === "error") {
      $popUp.text("enter a new task!")
        .css(errorStyles);
      isPopupToggled = true;
      openPopUp();
    } else if (e === "added") {
      $popUp.text("new task added!")
        .css(noErrorStyles);
      isPopupToggled = true;
      openPopUp();
    } else {
      console.log("WARNING");
    }
  }
}

var openPopUp = function() {
  $popUp.slideDown(200).delay(1000).slideUp(200, function() {
    isPopupToggled = false;
  });
}

// CLICK ON TRASH ICON TO DELETE THE TASK
$("ul").on("click", "span", function(event) {
  // lastDeleted = $(this).parent().fadeOut(200, function(){
  lastDeleted = $(this).parent().animate({width:'toggle'},350, function() {
    $(this).detach();
  });
  indexOfDeleted = lastDeleted.index();
  event.stopPropagation();
  btnVisib("show");
});

// CLICK ON BUTTON TO RESTORE LAST DELETED
$restoreButton.on("click", function() {
  if (indexOfDeleted === 0) {
    if ($("li").length !== 0) {
      lastDeleted.fadeIn(200).insertBefore( $("li").eq(indexOfDeleted))
    } else {
      // when the list is empty
      lastDeleted = lastDeleted.fadeIn(200);
      $("ul").append(lastDeleted);
    }
  } else {
    lastDeleted.fadeIn(200).insertAfter( $("li").eq(indexOfDeleted-1));
  }
  btnVisib("hide");
});

// CLICK ON "+" TO SHOW/HIDE INPUT WINDOW
$newTaskButton.on('click', function() {
  $newTaskInput.fadeToggle();
});
