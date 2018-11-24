//used to generate image sequence and connect to image database

/**
 * generate sequence for evaluation
 * @param  {[type]} gameType [description]
 * @return {[type]}          [description]
 */
function generateSequence(gameType){

	var userID = globalUserObj.userID;
	//1. training mode
	if(gameType == 0){	
		var imageArr = getRandom(2,61,62);
		return imageArr;
	}
	else{ 
		if(userID == 'A1'){
			var imageArr = getRandom(15, 1, 15);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A2'){
			var imageArr = getRandom(15, 16, 30);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A3'){
			var imageArr = getRandom(15, 31, 45);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A4'){
			var imageArr = getRandom(15, 45, 60);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A5'){
			var imageArr = getRandom(15, 61, 75);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A6'){
			var imageArr = getRandom(15, 76, 90);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A7'){
			var imageArr = getRandom(15, 91, 104);
			imageArr = shuffle(imageArr);
			return imageArr;
		}		
	}
}


function oldgenerateSequence(gameType){

	var userID = globalUserObj.userID;
	//1. training mode
	if(gameType == 0){	
		var imageArr = getRandom(2,61,62);
		return imageArr;
	}
	else{ 
		if(userID == 'A1'){
			var imageArr1 = getRandom(15,1,15);
			var imageArr2 = getRandom(15,31,45);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A2'){
			var imageArr1 = getRandom(15,1,15);
			var imageArr2 = getRandom(15,46,60);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A3'){
			var imageArr1 = getRandom(15,1,15);
			var imageArr2 = getRandom(15,31,45);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A4'){
			var imageArr1 = getRandom(15,16,30);
			var imageArr2 = getRandom(15,31,45);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A5'){
			var imageArr1 = getRandom(15,16,30);
			var imageArr2 = getRandom(15,46,60);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A5'){
			var imageArr1 = getRandom(15,16,30);
			var imageArr2 = getRandom(15,46,60);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A6'){
			var imageArr1 = getRandom(15,16,30);
			var imageArr2 = getRandom(15,46,60);
			//var imageArr = imageArr1.concat(imageArr2);
			imageArr = shuffle(imageArr);
			return imageArr;
		}
		else if(userID == 'A7'){
			var imageArr = getRandom
		}
		
	}
}

//obtain the url of images 
//input: globalSequence, output: url
function getImageUrl(imageSequence){

	var imageIDArr = "";
	for(var i = 0;i < imageSequence.length;i++){
		if(i == imageSequence.length-1){
			imageIDArr = imageIDArr + 'I' + imageSequence[i].toString();
		}else{
			imageIDArr = imageIDArr + 'I' + imageSequence[i].toString() + ',';
		}	
	}

	//search imageURL from database
	var imageIDJSON = {'imageID':imageIDArr};
 	$.ajax({
            type: 'POST',
            data: imageIDJSON,
            url: '/images/getImageUrl',
            dataType: 'JSON'
        }).done(function( data ) {
        	buildUrlObj(data.msg);
        });

}