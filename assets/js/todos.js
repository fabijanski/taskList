var lastDeleted;
var indexOfDeleted;
var popUp = document.getElementById('pop-up'),
    popuptoggled = false,
    btntoggled = false;

///////////////////////////// CHECK OFF CLICKED TASK //////////////////////////
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed");
});

/////////////////////// SHOW OR HIDE BUTTON WHEN ACTION ///////////////////////
var btnVisib = function(event){
  if(!btntoggled){
    if(event == "show"){
      btntoggled = true;
      showBtn();
    }
  }else if(event == "hide"){
      btntoggled = false;
      showBtn();
  }else{
      console.log("WARNING");
  }
}

var showBtn = function() {
    $("button").fadeToggle(300);
}

////////////////////// ACTION AFTER "ENTER" WAS CLICKED ///////////////////////
$("input[type='text']").on("keypress", function(event){
  if(event.which === 13){
    // grabbing new task from input
    var inputtedText = $(this).val();
    if(inputtedText !== ""){
      // clearing input
      $(this).val("");
      // show/hide button and alert
      btnVisib("hide");
      // create a new li and add to ul
      $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + inputtedText + "</li>");
      visib("added");
    }else{
      visib("error");
    }
  }
});

//////////////// SHOW AND HIDE THE POP-UP WINDOW WHEN ACTION //////////////////
var visib = function(e) {
  if (!popuptoggled) {
    if (e === "error") {
      popUp.style.color = "#c82020";
      popUp.style.height = "40px";
      popUp.textContent = "ENTER A NEW TASK!";
      popuptoggled = true;
      openPopUp();
    } else if (e === "added") {
      popUp.style.color = "#62cd19";
      popUp.style.height = "40px";
      popUp.textContent = "NEW TASK WAS ADDED!";
      popuptoggled = true;
      openPopUp();
    } else {
      console.log("WARNING");
    }
  }
}

var openPopUp = function() {
    $("#pop-up").slideDown(200).delay(1000).slideUp(200);
    popuptoggled = false;
}

/////////////////// CLICK ON TRASH ICON TO DELETE THE TASK ////////////////////
$("ul").on("click", "span", function(event){
  // lastDeleted = $(this).parent().fadeOut(200, function(){
  lastDeleted = $(this).parent().animate({width:'toggle'},350, function(){
    $(this).detach();
  });
  indexOfDeleted = lastDeleted.index();
  event.stopPropagation();
  btnVisib("show");
});

////////////// CLICK ON BUTTON TO RESTORE LAST DELETED TASK ///////////////////
$("body").on("click", "button", function(){
  if(indexOfDeleted === 0){
    if($("li").length !== 0){
      lastDeleted.fadeIn(200).insertBefore( $("li").eq(indexOfDeleted))
    }else{
      // when the list is empty
      lastDeleted = lastDeleted.fadeIn(200);
      $("ul").append(lastDeleted);
    }
  }else{
    lastDeleted.fadeIn(200).insertAfter( $("li").eq(indexOfDeleted-1));
  }
  btnVisib("hide");
});

////////////////// CLICK ON "+" TO SHOW/HIDE INPUT WINDOW /////////////////////
$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
})
