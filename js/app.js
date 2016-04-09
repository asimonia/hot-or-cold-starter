// declare and initialize global variables
'use strict';
var secretNumber;
var userGuess;
var pastGuesses = [];
var count;
var guessHtml;
var userFeedback;
var alreadyGuessed;
var feedback;
var countElement;
var guessList;

// variables referencing DOM elements
var newButton;
var form;
var input;

// jQuery ready method to run script after loading page
$(document).ready(load);

function load() {
	
	/*--- Display information modal box ---*/
  	$(".what").click(function() {
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function() {
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Get from user ---*/
  	newButton = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');

  	/*--- Display to user ---*/
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guessList = $('#guessList');

  	/*--- Initialize New Game ---*/
  	newGame();

  	/*--- Event Handlers ---*/
  	// The user can submit a new form for guess or start a new game
  	form.submit(function(e) {
  		getUserGuess();
  	});
  	newButton.click(newGame);
}

function newGame() {
	// clear out the variables and DOM elements
	// generate a new random number
	form.find('input[type=submit]').css('opacity', '1');
	resetVariables();
	render();
	generateNumber();
}

function resetVariables() {
	count = 0;
	pastGuesses = [];
	guessHtml = '';
	userGuess = '';
	userFeedback = 'What is your guess?'
}

function render() {
	guessList.html(guessHtml);
	countElement.html(count);
	feedback.html(userFeedback);
}

function generateNumber() {
	secretNumber = Math.floor((Math.random() * 100) + 1);
}

function getUserGuess() {
	userGuess = input.val();
	input.val('');
	input.focus();
	if (checkGuess())
		return ;
	generateFeedback();
	trackGuess();
	guessCount();
	checkLost();
	render();
}

function checkLost() {
	if (count == 15) {
		loser();
	}
}

function checkGuess() {
	if (userGuess % 1 !== 0) {
		alert('please input a number');
		return true;
	}

	if (userGuess < 0 || userGuess > 101) {
		alert('please choose a number between zero and 100');
		return true;
	}

	if (pastGuesses.length > 0) {
		$.each(pastGuesses, function(guess, value) {
			if (userGuess == value) {
				alreadyGuessed = true;
			}
		});
	}

	if (alreadyGuessed) {
		alreadyGuessed = false;
		alert('You guessed this number already');
		return true;
	}

	return false;
}

function generateFeedback() {
	var range = Math.abs(secretNumber - userGuess);
	if (range == 0) {
		winner();
	} else if (range <= 5) {
		userFeedback = 'white hot';
	} else if (range <= 10) {
		userFeedback = 'hot';
	} else if (range <= 20) {
		userFeedback = 'warm';
	} else if (range <= 25) {
		userFeedback = 'cool';
	} else if (range <= 30) {
		userFeedback = 'cold';
	} else {
		userFeedback = 'ice cold';
	}
}

function trackGuess() {
	pastGuesses.push(userGuess);
	guessHtml = '';
	if (pastGuesses[0].length) {
		$.each(pastGuesses, function(guess, value) {
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

function guessCount() {
	count++;
}

function winner() {
	userFeedback = 'You Won.  Click new game to play again.';
	form.find('input[type=submit]').css('opacity', '0');
}

function loser() {
	userFeedback = 'Too many guesses! Better luck next time!';
	form.find('input[type=submit]').css('opacity', '0');
}