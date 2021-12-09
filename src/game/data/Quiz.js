export default class Quiz {
  constructor() {
    this.questions = [
      {
        question: `1 + 2`,
        A: `3`,
        B: `4`,
        C: `5`,
        answer: `A`,
      },
      {
        question: `1 + 4`,
        A: `4`,
        B: `5`,
        C: `3`,
        answer: `B`,
      },
      {
        question: `2 + 2`,
        A: `5`,
        B: `3`,
        C: `4`,
        answer: `C`,
      },
    ];
  }

  //get next question
  getNextQuestion(currentQuestionIndex) {
    let nextQuestionIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex >= this.questions.length - 1) {
      this.questions[0]["index"] = 0;
      return this.questions[0];
    } else {
      this.questions[nextQuestionIndex]["index"] = nextQuestionIndex;
      return this.questions[nextQuestionIndex];
    }
  }

  getQuestion(index) {
    return this.questions[index];
  }

  getQuestions() {
    return this.questions;
  }

  checkAnswer(questionIndex, answer) {
    let question = this.getQuestion(questionIndex);
    if (question.answer === answer) {
      return true;
    } else {
      return false;
    }
  }
}
