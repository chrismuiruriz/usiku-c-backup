export default class Quiz {
  constructor() {
    this.questions = [
      {
        question: "1+4",
        A: 3,
        B: 4,
        C: 5,
        answer: "C",
      },
      {
        question: "8+7",
        A: 7,
        B: 12,
        C: 15,
        answer: "C",
      },
      {
        question: "5+5",
        A: 10,
        B: 5,
        C: 15,
        answer: "A",
      },
      {
        question: "12+10",
        A: 13,
        B: 22,
        C: 7,
        answer: "B",
      },
      {
        question: "9+7",
        A: 14,
        B: 19,
        C: 16,
        answer: "C",
      },
      {
        question: "222+222",
        A: 111,
        B: 444,
        C: 333,
        answer: "B",
      },
      {
        question: "2+8",
        A: 9,
        B: 10,
        C: 7,
        answer: "B",
      },
      {
        question: "2+1",
        A: 3,
        B: 4,
        C: 5,
        answer: "A",
      },
      {
        question: "50+50",
        A: 50,
        B: 0,
        C: 100,
        answer: "C",
      },
      {
        question: "5+4",
        A: 9,
        B: 8,
        C: 7,
        answer: "A",
      },
      {
        question: "7-6",
        A: 1,
        B: 0,
        C: 13,
        answer: "A",
      },
      {
        question: "1-1",
        A: 1,
        B: 0,
        C: 2,
        answer: "B",
      },
      {
        question: "4-3",
        A: 3,
        B: 7,
        C: 1,
        answer: "C",
      },
      {
        question: "10-9",
        A: 11,
        B: 1,
        C: 10,
        answer: "B",
      },
      {
        question: "9-3",
        A: 3,
        B: 6,
        C: 4,
        answer: "B",
      },
      {
        question: "6-4",
        A: 2,
        B: 4,
        C: 3,
        answer: "A",
      },
      {
        question: "5-5",
        A: 5,
        B: 0,
        C: 10,
        answer: "B",
      },
      {
        question: "4-1",
        A: 1,
        B: 2,
        C: 3,
        answer: "C",
      },
      {
        question: "7-4",
        A: 4,
        B: 5,
        C: 3,
        answer: "C",
      },
      {
        question: "7-3",
        A: 4,
        B: 5,
        C: 3,
        answer: "A",
      },
      {
        question: "2x2",
        A: 8,
        B: 6,
        C: 4,
        answer: "C",
      },
      {
        question: "4x2",
        A: 8,
        B: 6,
        C: 2,
        answer: "A",
      },
      {
        question: "10x1",
        A: 1,
        B: 10,
        C: 0,
        answer: "B",
      },
      {
        question: "4x3",
        A: 11,
        B: 12,
        C: 7,
        answer: "B",
      },
      {
        question: "6x2",
        A: 12,
        B: 13,
        C: 8,
        answer: "A",
      },
      {
        question: "8x2",
        A: 5,
        B: 10,
        C: 16,
        answer: "C",
      },
      {
        question: "5x2",
        A: 10,
        B: 7,
        C: 4,
        answer: "A",
      },
      {
        question: "9x1",
        A: 9,
        B: 3,
        C: 2,
        answer: "A",
      },
      {
        question: "2x1",
        A: 1,
        B: 2,
        C: 3,
        answer: "B",
      },
      {
        question: "5x5",
        A: 5,
        B: 10,
        C: 25,
        answer: "C",
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
