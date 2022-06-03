const { data } = require("./p4-data.js");

function getQuestions() {
  const ArrayForQ = data.map((x) => x.question);
  return ArrayForQ;
}

function getAnswers() {
  const ArrayForA = data.map((y) => y.answer);
  return ArrayForA;
}

function getQuestionsAnswers() {
  //let ArrayForQA = data.map(({ question, answer }) => ({ question, answer}));
  //return ArrayForQA;
  const originalObj = data;
  const clonedObj = Object.assign([], originalObj);
  return clonedObj;
}

function getQuestion(number = "") {
  const response = {
    question: "",
    number: "",
    error: "",
  };
  const Qarray = getQuestions();
  if (number > 3) {
    response.error =
      "Question number must be less than the number of questions (3)";
  } else if (number >= 1 && number <= 3) {
    response.question = Qarray[number - 1];
    response.number = number;
  } else if (number === 0) {
    response.error = "Question number must be >= 1";
  } else {
    response.error = "Question number must be an integer";
  }
  return response;
}

function getAnswer(number = "") {
  const response = {
    answer: "",
    number: "",
    error: "",
  };
  const Aarray = getAnswers();
  if (number > 3) {
    response.error =
      "Answer number must be less than the number of questions (3)";
  } else if (number >= 1 && number <= 3) {
    response.answer = Aarray[number - 1];
    response.number = number;
  } else if (number === 0) {
    response.error = "Answer number must be >= 1";
  } else {
    response.error = "Answer number must be an integer";
  }
  return response;
}

function getQuestionAnswer(number = "") {
  const response = {
    question: "",
    answer: "",
    number: "",
    error: "",
  };
  const Aarray = getAnswers();
  const Qarray = getQuestions();
  if (number > 3) {
    response.error =
      "Question number must be less than the number of questions (3)";
    delete response.answer;
  } else if (number >= 1 && number <= 3) {
    response.question = Qarray[number - 1];
    response.answer = Aarray[number - 1];
    response.number = number;
  } else if (number === 0) {
    response.error = "Question number must be >= 1";
    delete response.answer;
  } else {
    response.error = "Question number must be an integer";
    delete response.answer;
  }
  return response;
}

//Extra Credit part8
function addQuestionAnswer(info = {}) {
  const response = {
    error: "",
    message: "",
    number: "",
  };
  if (Object.keys(info).length === 2) {
    response.message = "Question added";
    response.number = data.length + 1; //Object.keys(info).length + 2
    //data.push(info);
  } else if (info.hasOwnProperty("question") == true) {
    response.number = -1;
    response.error = "Object answer property required";
  } else if (info.hasOwnProperty("answer") == true) {
    response.error = "Object question property required";
    response.number = -1;
  } else {
    response.error = "Object question property required";
    response.number = -1;
  }
  return response;
}

//Extra Credit part9
function updateQuestionAnswer(info = {}) {
  const response = {
    error: "",
    message: "",
    number: "",
  };
  if (Object.keys(info).length === 2) {
    response.error = "Object number property must be a valid integer";
  } else if (Object.keys(info).length === 1) {
    response.error = "Object number property must be a valid integer";
  } else if (Object.keys(info).length === 3) {
    response.message = `Question ${info.number} updated`;
    response.number = info.number;
    data[info.number - 1].question = info.question;
    data[info.number - 1].answer = info.answer;
  } else {
    response.error = "Object question property or answer property required";
  }
  return response;
}

//Extra Credit part10
function deleteQuestionAnswer(info = {}) {
  const response = {
    error: "",
    message: "",
    number: "",
  };
  
  if (info === 0) {
    response.error = "Question/answer number must be >= 1";
  } else if (info > data.length) {
    response.error = `Question/answer number must be less than the number of questions (${data.length})`;
  } else if (info <= data.length)  {
    response.message = `Question ${info} deleted`;
    response.number = info;
    delete data[info-1];
  } else {
    response.error = "Question/answer number must be an integer";
  }
  return response;
}

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

// Set a constant to true to test the appropriate function
const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;
const testAdd = false; // Extra credit
const testUpdate = false; // Extra credit
const testDelete = true; // Extra credit

// getQuestions()
if (testGetQs) {
  testing("getQuestions", { d: "()", f: getQuestions() });
}

// getAnswers()
if (testGetAs) {
  testing("getAnswers", { d: "()", f: getAnswers() });
}

// getQuestionsAnswers()
if (testGetQsAs) {
  testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

// getQuestion()
if (testGetQ) {
  testing(
    "getQuestion",
    { d: "()", f: getQuestion() }, // Extra credit: +1
    { d: "(0)", f: getQuestion(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) } // Extra credit: +1
  );
}

// getAnswer()
if (testGetA) {
  testing(
    "getAnswer",
    { d: "()", f: getAnswer() }, // Extra credit: +1
    { d: "(0)", f: getAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) } // Extra credit: +1
  );
}

// getQuestionAnswer()
if (testGetQA) {
  testing(
    "getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() }, // Extra credit: +1
    { d: "(0)", f: getQuestionAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) } // Extra credit: +1
  );
}

// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
  console.log(data);
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}

// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(4)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
};
