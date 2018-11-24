//used to control the flow of program

var globalObj;   //record the global variable
var gameType;  //0: training, 1: formal game
var dataType;  //1: general; 2. biomedical; 3. vector
var globalSequence;
var globalImageURLobj;
var globalUserObj = {};
var currentIndex = 0;
var timeSlotArr = [];

$(document).ready(function() {  

    $('#but_entry').unbind('click').click(function() {});
    $("#but_entry").click(function() {
        $('#entry-box').css({
            'display': 'none'
        });
        $('#loading-box').css({
            'display': 'block'
        });
        $('#lab-box').css({
            'display': 'none'
        });
        gameType = 1;
        var userID = $('.workID-input').val();
        initTimeslot();
        //insertUser(userID);
        checkUserExist(userID);
        
    });
});

function initUser(dataObj){

    //init user
    globalUserObj.userID = dataObj.userID;
    loadImage();

}


function initExistUser(dataObj){
    globalUserObj.userID = dataObj[0].userID;
    globalUserObj.progress = dataObj[0].progress;
    globalUserObj.sequence = dataObj[0].sequence;
    loadImage();
}

function loadImage(){



    if (typeof(globalUserObj.sequence) == "undefined"){

        globalSequence = generateSequence(gameType);
        if(gameType == 1){
            var sequence = '';
            for(var i = 0; i < 15; i++){
                if(i == 14){
                    sequence = sequence + globalSequence[i];
                }
                else{
                    sequence = sequence + globalSequence[i] + ',';
                }
                
            }
            updateSequence(globalUserObj.userID, sequence);
        }
        else{
            getImageUrl(globalSequence);
        }       
    }
    else{
        gameType = 1;
        var sequence = globalUserObj.sequence.split(',');
        currentIndex = parseInt(globalUserObj.progress);
        globalSequence = sequence;
        getImageUrl(globalSequence);
    }

	
}

/**
 * [initTimeslot description]
 * @return {[type]} [description]
 */
function initTimeslot(){
    for(var i = 0; i < 15; i++){
        timeSlotArr.push(1);
    }
}


