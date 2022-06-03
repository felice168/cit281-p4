const fastify = require("fastify")();
const { data } = require("./p4-data.js");
const {getQuestions,getAnswers,getQuestionsAnswers,getQuestion,getAnswer,getQuestionAnswer,addQuestionAnswer,updateQuestionAnswer,deleteQuestionAnswer} = require("./p4-module.js");
const Response = {
    error: "",
    statusCode: "",
    questions: [],
    answers: [],
    questions_answers:[],
}
const Response1 = {
    error: "", 
}
fastify.get("/cit/question", (request, reply) => {
    Response.questions = getQuestions();
    Response.statusCode = 200;
    delete Response.answers && delete Response.questions_answers;
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Response);
    });

fastify.get("/cit/answer", (request, reply) => {
    Response.answers = getAnswers();
    Response.statusCode = 200;
    delete Response.questions && delete Response.questions_answers;
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Response);
    });

fastify.get("/cit/questionanswer", (request, reply) => {
    Response.statusCode = 200;
    Response.questions_answers = getQuestionsAnswers();
    delete Response.questions && delete Response.answers;
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Response);
    });

fastify.get("/cit/question/:number", (request, reply) => {
    const {number} = request.params; 
    StringNumber = parseInt(number);
    Response1.statusCode = 200;
    Object.assign(Response1, getQuestion(StringNumber));
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Response1);
    });

fastify.get("/cit/answer/:number", (request, reply) => {
    const {number} = request.params;  
    StringNumber = parseInt(number);
    Response1.statusCode = 200;
    Object.assign(Response1, getAnswer(StringNumber));
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Response1);
    });

fastify.get("/cit/questionanswer/:number", (request, reply) => {
    const {number} = request.params;  
    StringNumber = parseInt(number);
    Response1.statusCode = 200;
    Object.assign(Response1, getQuestionAnswer(StringNumber));
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Response1);
    });
    
fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ error: "Route Not Found", statusCode: 404 });
});

//Extra Credits part8
fastify.post("/cit/question", (request, reply) => {
  const addQuestion = request.body;
 const Bodyreceive = addQuestionAnswer(addQuestion);
 Bodyreceive.statusCode = 201;
  reply
    .code(201)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(Bodyreceive);
});

//Extra Credits part9
fastify.put("/cit/question", (request, reply) => {
    const UpdateQuestion = request.body;
   const Bodyreceive1 = updateQuestionAnswer(UpdateQuestion);
   Bodyreceive1.statusCode = 200;
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(Bodyreceive1);
      //.send(data);
  });

//Extra Credits part10
fastify.delete("/cit/question/:number", (request, reply) => {
    const output = {};
    const {number} = request.params;  
    StringNumber = parseInt(number);
    output.statusCode = 200;
    Object.assign(output, deleteQuestionAnswer(StringNumber));
    reply 
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(output);
  });  

const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
if (err) {
console.log(err);
process.exit(1);
}
console.log(`Server listening on ${address}`);
});