// Function to validate the form data
function validateForm() {
    // Get form inputs and select element values
    const firstName = document.getElementById("inputFirstName").value;
    const lastName = document.getElementById("inputLastName").value;
    const email = document.getElementById("inputEmail").value;
    const telephone = document.getElementById("inputTelephone").value;
    const restaurantAddress = document.getElementById("inputState").value;

    // Get the error message element
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "";
    errorMessage.hidden = true;

    // Check if required fields are empty
    if (!firstName || !lastName || !email || !telephone || restaurantAddress === "Choose...") {
        errorMessage.innerText = "Please fill in all required fields.";
        errorMessage.hidden = false;
        return false;
    }

    // Regular expressions to validate name, email, and telephone format
    const nameRegex = /^[a-zA-Z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const telephoneRegex = /^\d{3}-\d{3}-\d{4}/;

    // Validate first and last name format
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        errorMessage.innerText = "First Name and Last Name should contain only letters.";
        errorMessage.hidden = false;
        return false;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        errorMessage.innerText = "Invalid email format.";
        errorMessage.hidden = false;
        return false;
    }

    // Validate telephone format (e.g., 123-456-7890)
    if (!telephoneRegex.test(telephone)) {
        errorMessage.innerText = "Invalid telephone format (e.g., 87071071477).";
        errorMessage.hidden = false;
        return false;
    }

    return true;
}

// Function to format time (add leading zeros)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Function to add a new list item
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var text = document.createTextNode(inputValue);
    li.appendChild(text);

    if (inputValue === "") {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    // Toggle 'checked' class on list item click
    li.onclick = function() {
        li.classList.toggle('checked');
    }

    // Hide list item on right-click (context menu)
    li.oncontextmenu = function(e) {
        e.preventDefault();
        li.style.display = "none";
    }
}

// Add interactivity to accordion buttons
document.addEventListener('DOMContentLoaded', function() {
  const accordionButtons = document.querySelectorAll(".accordion-btn");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});

// Countdown Timer Functions
let targetTime;
let intervalId;

// Function to update the countdown timer
function updateCountdown() {
    if (!targetTime) {
        return;
    }

    const now = new Date().getTime();
    const timeRemaining = targetTime - now;

    if (timeRemaining <= 0) {
        clearInterval(intervalId);
        document.getElementById("countdown").innerHTML = "Estimated time for order is up! We offer 78% discount, just show the check!";
        return;
    }

    const minutes = Math.floor((timeRemaining / 1000) / 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    // Add smooth animation effects here if needed
    document.getElementById("minutes").innerText = formatTime(minutes);
    document.getElementById("seconds").innerText = formatTime(seconds);
}

// Function to start the countdown timer
function startCountdown() {
    const minutesInput = document.getElementById("minutesInput");
    const secondsInput = document.getElementById("secondsInput");

    const minutes = parseInt(minutesInput.value, 10);
    const seconds = parseInt(secondsInput.value, 10);

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0) {
        alert("Please enter a valid duration.");
        return;
    }

    const totalSeconds = minutes * 60 + seconds;
    targetTime = new Date().getTime() + totalSeconds * 1000;

    if (intervalId) {
        clearInterval(intervalId);
    }

    updateCountdown();

    intervalId = setInterval(updateCountdown, 1000);
}

// Carousel Functions
const carousel = document.getElementById("carouselExampleIndicators");
const carouselItems = document.querySelectorAll(".carousel-item");
let currentSlide = 0;

function nextSlide() {
    if (currentSlide < carouselItems.length - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateCarousel();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = carouselItems.length - 1;
    }
    updateCarousel();
}

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        if (index === currentSlide) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// Event listeners for carousel control buttons
const prevButton = document.querySelector(".carousel-control-prev");
const nextButton = document.querySelector(".carousel-control-next");

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);
var tries = 1;
var isGameOver = false;
var isTimerStarted = false;
var timerInterval;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  if (!isGameOver) {
    event.dataTransfer.setData('text', event.target.getAttribute('data-category'));
  }
}

function drop(event) {
  if (!isGameOver) {
    event.preventDefault();
    var category = event.dataTransfer.getData('text');
    if (category === event.target.getAttribute('data-category')) {
      event.target.classList.add('correct-match');
    } else {
      event.target.classList.add('incorrect-match');
    }
  }
}

function checkAnswers() {
    if (!isGameOver) {
      clearInterval(timerInterval);
      isGameOver = true;
      var droppableElements = document.querySelectorAll('.droppable');
      var correctMatches = 0;
      droppableElements.forEach(function (droppableElement) {
        if (droppableElement.classList.contains('correct-match')) {
          correctMatches++;
          droppableElement.style.backgroundColor = 'green'; 
        } else {
          droppableElement.style.backgroundColor = 'red'; 
        }
      });
    }
    if (correctMatches === droppableElements.length) {
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = 'Congratulations! You matched all dishes with the correct categories. You receive a 20% discount.';
        resultElement.style.color = 'green';
        resultElement.style.fontSize = '24px'; 
        resultElement.style.fontWeight = 'bold'; 
      
        document.getElementById('correctAudio').play();
      } else {
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = 'Some matches are incorrect. You have used your one try.';
        resultElement.style.color = 'red';
        resultElement.style.fontSize = '24px'; 
        resultElement.style.fontWeight = 'bold';
      
        document.getElementById('wrongAudio').play();
      }
}


  





