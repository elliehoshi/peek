// ===========================================================
// Intro Animation
// ===========================================================

window.onload = function(){

// ------------------------------------------
// Create Timeline for Animation to Run On
// ------------------------------------------
  
  //Create Timeline Instance
  var tl = new TimelineLite(),
    bothStaticRectangles = document.getElementsByClassName("staticRectangles"),
    staticArticle = document.getElementById("staticArticle"),
    staticArticle2 = document.getElementById("staticArticle2"),
    selectedRectang = document.getElementById("movingRect"),
    pointer = document.getElementById("pointer"),
    introBucketStage = document.getElementById("introBucketStage"),
    introBucketEyes = document.getElementById("openEyesIntro"),
    introLeftEyeFull = document.getElementById("introLeftEyeFull"),
    introRightEyeFull = document.getElementById("introRightEyeFull"),
    shot2 = document.getElementById("shot2"),
    enterButton = document.getElementsByClassName("closeIntroButton");
// ------------------------------------------
// Append action to Static Rectangles
// ------------------------------------------

  tl.from(staticArticle, .5, {scale:0, autoAlpha:0}, "+=.1");
  tl.from(selectedRectang, .5, {scale:0, autoAlpha:0}, "+=.1");
  tl.from(staticArticle2, .5, {scale:0, autoAlpha:0}, "+=.1");
  // tl.to(pointer, .5, {left: "300px", scale:0, autoAlpha:0}, "+=.5");

  //Figure out how to fade in and move to the left to select article
  tl.from(pointer, 1, {right:-400, autoAlpha:0}, "+=.5");
  
  //Select Rectangle
  tl.to(selectedRectang, .5, {backgroundColor:"red"}, "+=.2"); 

  //Shift Static Rects Diagonally (down/left)
  tl.to(bothStaticRectangles, .5, {right: "100px", top: "50px"}, "+=.1");

  //Drift Static Rects to the Left
  tl.to(bothStaticRectangles, 1.5, {right:"600px", ease:Circ.easeIn}, "+=.3");
  
  //Make Static Rects Fade Away
  tl.to(bothStaticRectangles, 1, {autoAlpha:0}, "-=.5" );

  //Shift Selected Rectangle Back
  tl.to(selectedRectang, 1, {scaleX: 0.7, scaleY: 0.7}, "-=.2");

  //Drop Selected Rectangle
  tl.to(selectedRectang, 1, {top:150, autoAlpha:0}, "+=1");

  //Bucket Appears
  tl.from(introBucketStage, .5, {bottom:-200, autoAlpha:0}, "-=1.5");
  // tl.from(introBucketEyes, .5, {autoAlpha:0}, "+=.2");
  tl.to(introBucketEyes, .1, {autoAlpha:0}, "+=.2");
  console.log(introBucketEyes);
  // tl.to(introRightEyeFull, .1, {css:{display:hidden}}, "+=.2");

  //Switch to Second Shot
  tl.from(shot2, .5, {autoAlpha:0}, "+=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent}, "-=.5");
  
  //Switch to Third Shot
  tl.set(shot3, {top:0}, "+=1");

  //Enter Button Appears
  tl.from(enterButton, .5, {autoAlpha: 0}, "+=1");
  tl.restart();

  //TO DO: Time bucket so that it becomes happy the exact fraction of a second that the article is dropped into it. Similar to blinking, but only 1x at the precise time instead of every 4 seconds x infinitely



function introTextContent() {
  var introFront = document.getElementById("introFront");
  var introCenter = document.getElementById("introCenter");
  var introBack = document.getElementById("introBack");

  introFront.innerHTML = "Wel";
  introCenter.innerHTML = "c";
  introBack.innerHTML = "ome";

  
};



};