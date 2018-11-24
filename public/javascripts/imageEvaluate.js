//used to collect data from user

function buildUrlObj(imageURL) {
	//create the imageURLobj
	var imageURLobj = {};
	for (var i = 0; i < imageURL.length; i++) {
		imageURLobj[imageURL[i].imageID] = imageURL[i].url;
	}
	globalImageURLobj = imageURLobj;
	preLoadImage(imageURLobj);
}

//preload image
function preLoadImage(imageURLobj) {


	var images = new Array();
	loadedimage = 0;

	//=============check game mode=============
	var imageCount;
	if (gameType == 0) {
		imageCount = 1;
	}
	else {
		imageCount = 15;
	}

	function imageloadpost() {
		//control the progress bar
		var proportion = (((loadedimage + 1) / imageCount).toFixed(2) * 100).toFixed(0);
		loadedimage++;
		$('.progress-bar').css('width', proportion + '%').attr('aria-valuenow', proportion);
		if (loadedimage == imageCount) {
			setTimeout(_readyGame, 800);

		}
		//begin game

	}

	var _readyGame = function () {
		$('#loading-text').text("Loading completed!");
		$('#loading-box').css({
			'display': 'none'
		});
		$('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
		$('#loading-text').text("Loading...");
		$('#instruction-box').css({
			'display': 'block'
		});	
		if(gameType == 1){
			$("#but_training").text("start");
			// $('#instruction-text').text("A stream of 30 images will be shown on the screen for 1 seconds each. After obeserving each image, please 1. describe the information you obtained from this image.  and try to draw the image as much detail as you can.");
			$('#instruction-title').text('Instruction');
		}
		

		$('#but_training').unbind('click').click(function () { });
		$("#but_training").click(function () {
			$('#instruction-box').css({
				'display': 'none'
			});
			$('#lab-box').css({
				'display': 'block'
			});
			beginGame();
		});		
	}


	for (var i = 0; i < imageCount; i++) {
		var imageID = 'I' + globalSequence[i];
		images[i] = new Image()
		images[i].src = imageURLobj[imageID];
		images[i].onload = function () {
			imageloadpost();
		}
		images[i].onerror = function () {
			imageloadpost();
		}
	}


}

function beginGame() {
	var totalImage;
	var currentImageID;

	if (gameType == 0) {
		totalImage = 1;
	}
	else {
		totalImage = 15;
	}

	var _showFix = function () {
		$("#descript-box").css({ 'display': 'none' });
		$(".imageContainer").css({ 'display': 'block' });
		$(".visImage").css({ 'display': 'none' });
		$(".fixImage").css({ 'display': 'block' });
	}

	var _showImage = function () {
		$("#descript-box").css({ 'display': 'none' });
		$(".imageContainer").css({ 'display': 'block' });
		currentImageID = 'I' + globalSequence[currentIndex];
		var src = globalImageURLobj[currentImageID];
		$('.visImage').attr("src", src);
		$(".visImage").css({ 'display': 'block' });
		$(".fixImage").css({ 'display': 'none' });
		currentIndex = currentIndex + 1;
	}

	var _showDescription = function () {
		$("#comment").val("");
		$("#descript-box").css({ 'display': 'block' });
		$(".imageContainer").css({ 'display': 'none' });
		$(".visImage").css({ 'display': 'none' });
		$(".fixImage").css({ 'display': 'none' });
	}

	setTimeout(_showFix, 1000);
	setTimeout(_showImage, 1500);
	setTimeout(_showDescription, timeSlotArr[currentIndex] * 1000 + 1500);

	$('#but_submit').unbind('click').click(function () { });
	$("#but_submit").click(function () {
		var description = $("#comment").val();
		updateUser(globalUserObj.userID, currentImageID, description, currentIndex, totalImage);
	

	});
}

//end the game
function finishGame() {

	$("#descript-box").css({ 'display': 'none' });
	$(".imageContainer").css({ 'display': 'none' });
	$(".visImage").css({ 'display': 'none' });
	$(".fixImage").css({ 'display': 'none' });
	if (gameType == 1) {
		$("#finish-box").css({ 'display': 'block' });
	}	
	else {
		gameType = 1;
		//initialization
		$('#loading-box').css({
			'display': 'block'
		});
		$('#lab-box').css({
			'display': 'none'
		});
		$("#but_training").text("Start Experiment");
		currentIndex = 0;
		loadImage(dataType, gameType);
	}
}