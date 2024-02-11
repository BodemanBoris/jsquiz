import { create } from "zustand";
import { type Question } from "../types";
import { persist } from "zustand/middleware";
import confetti from "canvas-confetti";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuestionState = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestion: async (limit: number) => {
        const res = await fetch("http://localhost:5173/questions.json");
        const json = await res.json();

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
        set({ questions });
      },

      selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get();

        const newQuestions = structuredClone(questions);

        const questionIndex = newQuestions.findIndex(
          (el) => el.id === questionId
        );

        const questionInfo = newQuestions[questionIndex];

        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
        if (isCorrectUserAnswer) confetti();

        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };

        set({ questions: newQuestions });
      },

      goNextQuestion: () => {
        const { currentQuestion, questions } = get();
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion === questions.length) return;
        set({ currentQuestion: nextQuestion });
      },

      goPrevQuestion: () => {
        const { currentQuestion } = get();
        const prevQuestion = currentQuestion - 1;
        if (currentQuestion === 0) return;
        set({ currentQuestion: prevQuestion });
      },
      resetQuiz: () => {
        set({ questions: [], currentQuestion: 0 });
      },
    }),
    {
      name: "questions",
    }
  )
);
