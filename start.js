document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("display");
  
    startButton.addEventListener("click", function () {
      console.log("Start quiz");
      window.location.href = "quiz.html"; 
    });
  });