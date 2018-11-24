/**
 * @author Rui Li
 * @date 2018/10/10
 * @file This file is used to connect the user database
 */
/**
 * insert a new user to database
 * @param  {[type]} userID [description]
 * @return {[type]}        [description]
 */
function insertUser(userID) {
    var date = getTime();
    var userID = userID;
    var userObj = {
        'userID': userID,
        'date': date,
        'progress': 0,
    }
    $.ajax({
        type: "POST",
        data: userObj,
        url: 'users/adduser',
        dataType: 'JSON',
        success: function(data) {
            alert('register success!');
            var dataObj = new Object();
            dataObj.userID = userID;
            initUser(dataObj);
        },
        error: function(data) {
            console.log(data);
        }
    });
}
/**
 * update user's description for image
 * @param  {[type]} userID       [description]
 * @param  {[type]} description  [description]
 * @param  {[type]} imageID  	 [description]
 * @param  {[type]} currentIndex [description]
 * @param  {[type]} totalImage   [description]
 * @return {[type]}              [description]
 */
function updateUser(userID, imageID, description, currentIndex, totalImage) {
	if(gameType == 0) {
		var dataJson = {
	        'description': description,
	        'imageID': imageID,
	        'userID': userID,
	        'progress': 0
	    }
	}
	else{
		var dataJson = {
	        'description': description,
	        'imageID': imageID,
	        'userID': userID,
	        'progress': currentIndex
	    }
	}

    $.ajax({
        type: "PUT",
        data: dataJson,
        url: 'users/updateUser',
        dataType: 'JSON',
        success: function(data) {
            if (currentIndex < totalImage) {
                beginGame();
            } else {
                finishGame();
            }
        },
        error: function(data) {}
    });
}


function updateSequence(userID, sequence){
	var dataJson = {
        'userID': userID,
        'sequence': sequence
    }

    $.ajax({
        type: "PUT",
        data: dataJson,
        url: 'users/updateSequence',
        dataType: 'JSON',
        success: function(data) {
            getImageUrl(globalSequence);
        },
        error: function(data) {}
    });
}

/**
 * check if user has registered and extract the information from user
 * @param  {[type]} userID [description]
 * @return {[type]}        [description]
 */
function checkUserExist(userID) {
    userIDJson = {
        'userID': userID
    };
    $.ajax({
        type: "POST",
        data: userIDJson,
        url: 'users/checkUser',
        dataType: 'JSON',
        success: function(data) {
            if (data.msg.length != 0) {
                initExistUser(data.msg);
                
            } else {
            	insertUser(userID);
            }
        },
        error: function(data) {

        }
    });
}