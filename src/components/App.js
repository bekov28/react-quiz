import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_PER_QUES = 30;

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questions,
        status: "ready",
        highscore: action.payload.highscore,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", timeRemaining: state.questions.length * SEC_PER_QUES };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case "retake":
      return {
        ...initialState,
        questions: state.questions.map((question) => {
          const correctOption = question.options[question.correctOption];
          const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
          const newCorrectOption = shuffledOptions.indexOf(correctOption);
          return { ...question, options: [...shuffledOptions], correctOption: newCorrectOption };
        }),
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export function App() {
  const [{ questions, status, index, answer, points, highscore, timeRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/questions"),
      fetch("http://localhost:8000/highscore"),
    ])
      .then(([resQ, resH]) => {
        if (!resQ.ok || !resH.ok) {
          throw new Error(`HTTP error! Status: ${resQ.status}, ${resH.status}`);
        }
        return Promise.all([resQ.json(), resH.json()]);
      })
      .then(([dataQ, dataH]) =>
        dispatch({ type: "dataReceived", payload: { questions: dataQ, highscore: dataH[0].value } })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Start numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
            </Footer>
          </>
        )}
      </Main>

      {status === "finished" && (
        <FinishedScreen
          points={points}
          maxPoints={maxPoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
export default App;
