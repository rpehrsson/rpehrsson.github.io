//// TUTEE SCRIPTS////

const simple_interest_data ={
  cookieid: "simple",
  page:"html/sidraganddrop.html", 
  scriptpage:"html/sidraganddrop_script.html",
  dragQuestions: {
    question1: {
      hints: ["Every year, you pay $100 in interest", "$1000 + $100 + $100 = $1200"]
    }, 
  }, 

  question1: {
    answer: "1200", 
    hints:["Every year, he pays $100 in interest.", "$1000 + $100 + $100 = $1200"]
  },

  grid: {
    interest: ["100", "100", "100"],
    initialAmount: "1100",
    totalInterest: ["200", "300", "400"], 
    amount:["1200", "1300", "1400"],
    hints:{
      year2:["Interest: Interest for 1 year = 10% of $1000 = $100", 
      "Total Interest: Total interest for 2 years is $100",  
      "Amount: Total amount owed at the end of 2 years = $1000 + $200 = $1200"], 
      year3:["Interest: Interest for 3 years = 3 x (10% of $1000) = $300", 
      "Total Interest: Total interest for 3 years is $300",
      "Amount: Total amount owed at the end of 3 years = $1000 + $300 = $1300"],
      year4:["Interest: Interest for 4 years = 4 x (10% of $1000) = $400", 
      "Total Interest: Total interest for 3 years is $300",
      "Amount: Total amount owed at the end of 3 years = $1000 + $300 = $1300"]
    }
  },

  practice: [
    {
      answer: "40",
      hints:["P= $200  r=10% n=2 years",
      "Simple Interest Formula = Prn/100",
      "Simple Interest = (200 x 10 x 2)/100 = $40",
      "Jenny earned $40 in interest at the end of 2 years."]
    },
    {
      answer: "linearly"
    }
  ]

};

const compound_interest_data ={
  cookieid: "compound",
  page:"html/cigpart1_script.html", 
  scriptpage:"html/cigpart1_script.html",
  dragQuestions: {
    question1: {
      hints: ["Every year, you pay $100 in interest", "$1000 + $100 + $100 = $1200"]
    }, 
  }, 

  question1: {
    answer: "1100", 
    hints:["You pay 10% of $1000 in Interest.", "10/100 * 1000 = $100, so total amount = $1100"]
  },

  question2: {
    answer: "1210", 
    hints:["For Year 2, you pay 10% on $1100 = $110", "Total amount owed = $1100 + $110 = $1210"]
  },

  grid: {
    interest: ["110", "121"],
    initialAmount: "1100",
    totalInterest: ["210", "331"], 
    amount:["1210", "1331"],
    hints:{
      year2:["Interest: Interest for 2nd year = 10% of $1100 = $110",
      "Total Interest: Total interest for 2 years is $210",
      "Amount: Total amount owed at the end of 2 years = $1000 + $210 = $1210"], 
      year3:["Interest: Interest for 3 years = 10% of $1210 = $121",
          "Total Interest: Total interest for 3 years is $331",
          "Amount: Total amount owed at the end of 3 years = $1000 + $331 = $1331"]
    }
  },

  practice: [
    {
      answer: "42",
      hints:["P= $200  r=10%=0.1    n=2 years", 
        "Amount A= P(1+r)^n <br> A= 200(1+0.1)^2 <br> = 200(1.1)^2<br> = 200 x 1.1 x 1.1<br> = 200 x 1.21<br> = $242<br>", 
        "Total amount is $242. Jenny had invested $200. She earned $242 - $200 =$42 in interest at the end of 2 years."
      ]
    },
    {
      answer: "exponentially"
    }
  ]

};


const compare_interest_data ={
  cookieid: "comparison",
  page:"html/comppractice.html", 
  scriptpage:"html/comppractice_script.html",
  question1: {
    answer: "same amount in interest"
  },

  question2: {
    answer: "different amount in interest"
  }
};



var numErrors = 0;

$( document ).ready(function() {
	if(window.location.href.includes("index")||window.location.href.endsWith(".io/")){
		confirm("During your use of this product, we will be collecting data to better adapt your experience. However, you may retract"+
		" consent at any time and the data will be expunged from our records. Click OK to continue, or cancel to leave the activity.");
	}

});


function launchChapter(id){
  document.cookie = id;
  var launchData;
  if (id == simple_interest_data.cookieid){
    launchData = simple_interest_data;
  }
  else if(id == compound_interest_data.cookieid){
    launchData = compound_interest_data;
  }
  else{
    launchData = compare_interest_data;
  }

window.location=launchData.page;
}

function navPage(page){
  //if (document.cookie == simple_interest_data.cookieid){
    if(page.includes("tutee-index")){
      page = "../"+page;
    }
    else{
      page = "../html/"+page;
    }
    window.location = page;
    // if(page.includes("sigdpart2")){
    //   loadTableFunctions();
    // }
  //}
}

function setIncorrect(event, error){
  event.target.classList.add("incorrect");
  numErrors++;
  if(numErrors>=2){
  	//show instruction
   // $(event.target.parentElement.getAttribute("for")).show();
    //alert("You should probably ask your tutor for help!");
    if(window.location.href.includes("draganddrop")){
    	$(".content-video").css("display", "block");
    }
  }
  else{
    alert(error);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
   ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.dataTransfer.getData("text"));
  //ev.target.style.display = "none";
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var corrDrags = ev.target.getAttribute("for").split(", ");
  if(corrDrags.includes(data)){
    ev.target.appendChild(document.getElementById(data));
    if(ev.target.classList.contains("incorrect")){
      ev.target.classList.remove("incorrect");
    }
    ev.target.classList.add("correct");
    //check if page is complete
    var dropspaces = document.getElementsByClassName("dropspace");
    var complete = true;
    for(const ds of dropspaces){
      if(!ds.classList.contains("correct")){
        complete = false;
        break;
      }
    }
    if(complete == true){
      alert("Good work! You may now move on to the next section.");
      $("#next").removeClass("disabled");
    }
  }
  else{
    if(!(ev.target.classList.contains("correct")||ev.target.classList.contains("incorrect"))){
      setIncorrect(ev, "Careful! Read the dialog again. You are asking to borrow $1000, and will have to pay 10% of that as interest, which will increase what you ultimately pay.");
    }
  }

}

//$(window).live("load", function(){

function loadInitialFunctions(){

$("#investinp").keyup(function(event){
  event.preventDefault();
  if (event.keyCode === 13) {
    var questionData;
    if(window.location.href.includes("si")){
      questionData = simple_interest_data.question1;
    }
    else{
      questionData = compound_interest_data.question1;
    }
  if(event.target.value == questionData.answer){
      if(event.target.classList.contains("incorrect")){
      event.target.classList.remove("incorrect");
      }
    event.target.classList.add("correct");
    completenessCheck("answer");
  }
  else{
    setIncorrect(event, "Not quite! You are paying $100 of interest for two years. How much will that add up to? Also, please just enter a number without the dollar sign.");
  }
}

}); 

$("#investinp2").keyup(function(event){
  event.preventDefault();
  if (event.keyCode === 13) {
    var questionData = compound_interest_data.question2;
  if(event.target.value == questionData.answer){
      if(event.target.classList.contains("incorrect")){
      event.target.classList.remove("incorrect");
      }
    event.target.classList.add("correct");
    completenessCheck("answer");
  }
  else{
    setIncorrect(event,"");
  }
}

}); 
}

function loadTableFunctions(){

$(".interest").keyup(function(event){
  event.preventDefault();
  if (event.keyCode === 13) {
    var tableData;
    var error;
   if(window.location.href.includes("si")){
      tableData = simple_interest_data;
      error = "In simple interest, the interest paid never changes!"
    }
    else{
      tableData = compound_interest_data;
      error = "Not quite! In compound interest, the interest paid will increase each year."
    }
    var num = parseInt(event.target.id.replace("interest", ""));
    if(event.target.value == tableData.grid.interest[num-1]){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("table-input");
      }
      else{
        setIncorrect(event,error);
      }
  }
});

$("#investhint").click(function(event){
  if(window.location.href.includes("si")){
    var hintBox = document.getElementById(event.target.getAttribute("for"));
    var hintCount = (hintBox.children.length-1);
    if(hintCount == simple_interest_data.question1.hints.length){
      alert("You have seen all of the hints for that step.")
    }
    else{
      hintBox.style.display = "block";
      const hint = document.createElement("div");
      hint.className = "hint";
      hint.innerText = simple_interest_data.question1.hints[hintCount];
      hintBox.appendChild(hint);
    }
  }
});

$(".hint-button").click(function(event){
  if(window.location.href.includes("si")){
    var hintBox = document.getElementById(event.target.getAttribute("for"));
    var hintCount = (hintBox.children.length-1);
    var hintData;
    if(window.location.href.includes("part2")){
      hintData = simple_interest_data.grid.hints[event.target.parentElement.id];
      if(hintCount>=2 && event.target.parentElement.id.includes("4")){
      	$(".content-video").css("display", "block");
      }
    }
    if(window.location.href.includes("practice")){
      hintData = simple_interest_data.practice[0].hints;
    }
    if(hintCount == hintData.length){
      alert("You have seen all of the hints for that step.")
    }
    else{
      hintBox.style.display = "inline-block";
      const hint = document.createElement("div");
      hint.className = "hint";
      hint.innerText = hintData[hintCount];
      hintBox.appendChild(hint);
    }
  }
	if(window.location.href.includes("ci")){
    var hintBox = document.getElementById(event.target.getAttribute("for"));
    var hintCount = (hintBox.children.length-1);
    var hintData;
    if(window.location.href.includes("part1")){
      hintData = compound_interest_data["question"+event.target.id.replace("investhint", "")].hints;
    }
    else if(window.location.href.includes("part2")){
      hintData = compound_interest_data.grid.hints[event.target.parentElement.id];
      if(hintCount>=2 && event.target.parentElement.id.includes("3")){
      	$(".content-video").css("display", "block");
      }
    }
    else if(window.location.href.includes("practice")){
      hintData = compound_interest_data.practice[0].hints;
    }
    if(hintCount == hintData.length){
      alert("You have seen all of the hints for that step.")
    }
    else{
      hintBox.style.display = "inline-block";
      const hint = document.createElement("div");
      hint.className = "hint";
      hint.innerHTML = hintData[hintCount];
      hintBox.appendChild(hint);
    }
  }
});

$(".total-interest").keyup(function(event){
  event.preventDefault();
  if (event.keyCode === 13) {
    var tableData;
    var error;
    if(window.location.href.includes("si")){
      tableData = simple_interest_data;
      error = "Not quite. Add up the interest from each year so far!";
    }
    else{
      tableData = compound_interest_data;
      error = "Not quite. Add up the interest from each year so far!";
    }
    var num = parseInt(event.target.id.replace("total-interest", ""));
    if(event.target.value == tableData.grid.totalInterest[num-1]){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("table-input");
      }
      else{
        setIncorrect(event,error);
      }
  }
});

$(".amount").keyup(function(event){
  event.preventDefault();
  if (event.keyCode === 13) {
    var tableData;
    var error;
    if(window.location.href.includes("si")){
      tableData = simple_interest_data;
      error = "Not quite right. Try getting all of the yearly interest first, and then add it up for each year with what was initially borrowed.";
    }
    else{
      tableData = compound_interest_data;
      error = "Not quite right. Try getting all of the yearly interest first, and then add it up for each year with what was initially borrowed.";
    }
    var num = parseInt(event.target.id.replace("amount", ""));
    if(event.target.value == tableData.grid.amount[num-1]){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("table-input");
      }
      else{
        setIncorrect(event,error);
      }
  }
});
}

function loadPracticeFunctions(){

$("#question1").keyup(function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    var num = parseInt(event.target.id.replace("question", ""));
    var quesData;
   if(window.location.href.includes("si")){
      quesData = simple_interest_data;
    }
    else if(window.location.href.includes("ci")){
      quesData = compound_interest_data;
    }
    if(event.target.value == quesData.practice[num-1].answer){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("question-input");
      }
      else{
        setIncorrect(event,"");
      }
  }
});

$("#question2").change(function (event) {
  event.preventDefault();
    var num = parseInt(event.target.id.replace("question", ""));
    if(window.location.href.includes("si")){
      quesData = simple_interest_data;
    }
    else if(window.location.href.includes("ci")){
      quesData = compound_interest_data;
    }
    if(event.target.value == quesData.practice[num-1].answer){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("question-input");
      }
      else{
        setIncorrect(event,"");
      }
});

$("#question1comp").change(function(event){
  event.preventDefault();
  if(event.target.value == compare_interest_data.question1.answer){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("question-input");
      }
      else{
        setIncorrect(event,"Recall the definition of simple interest. The amount of interest added was the same every year.");
      }
});

$("#question2comp").change(function(event){
  event.preventDefault();
  if(event.target.value == compare_interest_data.question2.answer){
      if(event.target.classList.contains("incorrect")){
          event.target.classList.remove("incorrect");
        }
        event.target.classList.add("correct");
        completenessCheck("question-input");
      }
      else{
        setIncorrect(event,"Recall the definition of compound interest. The amount of interest added increased every year.");
      }
});
}

//});

function completenessCheck(className){
  numErrors = 0;
  var inputs = document.getElementsByClassName(className);
    var complete = true;
    for(const is of inputs){
      if(!is.classList.contains("correct")){
        complete = false;
        break;
      }
    }
    if(complete == true){
      alert("Good work! You may now move on to the next section.");
      $("#next").removeClass("disabled");
      $("#sidiagram").show();
      $("#cidiagram").show()
    }

}

function showExtraPractice(){
	//if($("#hints").children().length>1){
		window.location = "sigdpart2.html";
		//just navigate
	//}
	//else{
		//show new question
	//	$("#new-question").css("display", "inline-block");
	//}
}

$("#new-question").keyup(function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
  		if(window.location.href.includes("si")){
  	//		if(event.target.value = )
  		}
  	}
  });




   function show_master_hint() {
   document.getElementById('master_hint').style.display = "block";}
   function show_option1_hint() {
   document.getElementById('option1_hint').style.display = "block";}
   function show_option2_hint() {
   document.getElementById('option2_hint').style.display = "block";}
   function show_option3_hint() {
   document.getElementById('option3_hint').style.display = "block";}
   function show_option4_hint() {
   document.getElementById('option4_hint').style.display = "block";}  
