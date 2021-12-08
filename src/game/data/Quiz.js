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
        A: `3`,
        B: `4`,
        C: `5`,
        answer: `C`,
      },
      {
        question: `2 + 2`,
        A: `3`,
        B: `4`,
        C: `5`,
        answer: `A`,
      },
    ];
  }

  //get next question
  getNextQuestion(currentQuestionIndex) {
    let nextQuestionIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex >= this.questions.length - 1) {
      return this.questions[0];
    } else {
      return this.questions[nextQuestionIndex];
    }
  }

  getQuestion(index) {
    return this.questions[index];
  }

  getQuestions() {
    return this.questions;
  }
}
