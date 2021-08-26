
function reverserStr(str){
  var listOfChars = str.split('');
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join('');
  return reversedStr;

}
function isPallindrome(str){
  var reverse = reverserStr(str);
  if(str === reverse){
    return true;
  }
  return false;
}



function convertDateToStr(date){
  var dateStr = { day: '', month: '', year: ''};
  if(date.day < 10){
    dateStr.day = '0' + date.day;
  }
  else{
    dateStr.day = date.day.toString();
  }


  if(date.month < 10){
    dateStr.month = '0' + date.month;
  }
  else{
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;


}

function getAllDateFormats(date){
  var dateStr = convertDateToStr(date);

  var ddmmyy = dateStr.day + dateStr.month + dateStr.year;

  var mmddyy = dateStr.day + dateStr.month + dateStr.year;

  var yymmdd = dateStr.day + dateStr.month + dateStr.year;

  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

  var mmddyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.year;

  return [ddmmyy, mmddyy, yymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeForAllDateFormats(date){

  var listofPalindromes = getAllDateFormats(date);
  var flag = false;
  for(var i = 0; i<listofPalindromes.length; i++){
    if(isPallindrome(listofPalindromes[i])){
      flag = true;
      break;
    }
  }
  return flag;
}




function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}


function getNextdate(date){
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth  = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month === 2){
    if(isLeapYear(year)){
      if(day > 29){
        day =1;
        month++;
      }
    }
    else{
      if(day > 28){
        day = 1;
        month++;
      }
    }
 }
 else{
   if(day > daysInMonth[month - 1]){
     day = 1;
     month++;
   }
 }

if(month > 12){
  month = 1;
  year++;
}
return{
  day: day,
  month: month, 
  year: year
};
}

function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextdate(date);
  while(1){
    ctr++;
    var isPallindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPallindrome){
      break;
    }
    nextDate = getNextdate(nextDate);
  }
  return[ctr, nextDate];

}



var bdayInput = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var showOutput = document.querySelector('#output');


function clickHandler(){
  var bdayStr = bdayInput.value;
  if(bdayStr !== ''){
    var listOfDate = bdayStr.split('-');
    console.log(listOfDate);
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])

    
    };
    var isPallindrome = checkPalindromeForAllDateFormats(date);

    if(isPallindrome){
      showOutput.innerText = "Conratulations your birthday is a Palindrome!!";

    }
    else{
      var[ctr, nextDate] = getNextPalindromeDate(date);
      showOutput.innerText = `Sorry this is not a palindrome. Well, next palindrome date is after ${ctr}. You missed it by ${ctr} days.`
    }
  }

}


showBtnRef.addEventListener('click', clickHandler);




