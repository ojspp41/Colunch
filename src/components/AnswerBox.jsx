// AnswerBox.jsx
import React from "react";
import MBTIMaker from "./MBTIMaker";

const AnswerBox = ({
  showAnswerBox,
  questionNum,
  showMbtiAnswers,
  handleQuestionComplete,
  setSelectedMBTI,
  setChooseAnswer,
}) => {
  if (!showAnswerBox) return null;

  return (
    <MBTIMaker
      mbtiAnswers={showMbtiAnswers}
      questionNum={questionNum}
      handleQuestionComplete={handleQuestionComplete}
      setSelectedMBTI={setSelectedMBTI}
      setChooseAnswer={setChooseAnswer}
    />
  );
};

export default AnswerBox;
