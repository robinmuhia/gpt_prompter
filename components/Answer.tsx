type QuestionAndAnswers = {
  question: string;
  answer: string;
};

interface storedValues {
  storedValues: Array<QuestionAndAnswers>;
}

const Answer = ({ storedValues }: storedValues) => {
  return (
    <>
      <hr className="hr-line" />
      <div className="answer-container">
        {storedValues.map((value, index) => {
          return (
            <div className="answer-section" key={index}>
              <p className="question">{value.question}</p>
              <p className="answer">{value.answer}</p>
              <div className="copy-icon">
                <i className="fa-solid fa-copy"></i>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Answer;
