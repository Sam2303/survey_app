import React, { useContext, useState, useEffect } from "react";
import Nav from "./components/Nav";
import { SurveysContext } from "../context/SurveysContext";
import { table, minifyRecords } from "./api/utils/Airtable-survey";

export default function Create() {
  const { addSurvey } = useContext(SurveysContext);
  const [showcaseSurvey, setShowcaseSurvey] = useState({
    Title: "Title",
    Secret: false,
    Password: "",
    Questions: [],
  });

  const addNewSurvey = () => {
    const Title = document.getElementById("title").value;
    const Secret = document.getElementById("yesRadio").checked;
    let Password = "";
    if (Secret) {
      Password = document.getElementById("password").value;
    }
    const Questions = {
      questions: showcaseSurvey.Questions,
    };
    console.log(JSON.stringify(Questions));
    addSurvey(Title, Secret, Password, JSON.stringify(Questions), "");
  };

  const addNewQuestion = () => {
    const Secret = document.getElementById("yesRadio").checked;
    let Password = "";
    if (Secret) {
      Password = document.getElementById("password").value;
    }
    const newQuestion = document.getElementById("question").value;
    showcaseSurvey.Questions.push(newQuestion);
    setShowcaseSurvey({
      Title: document.getElementById("title").value,
      Secret: Secret,
      Password: Password,
      Questions: showcaseSurvey.Questions,
    });
    document.getElementById("question").value = "";
  };

  return (
    <div>
      <Nav />
      <div className="createContainer">
        <div className="createForm">
          <p>Title</p>
          <input type="text" className="text" id="title" name="title"></input>

          <p>Secret Survey</p>
          <label>Yes</label>
          <input type="radio" name="secret" value="Yes" id="yesRadio"></input>
          <label>No</label>
          <input type="radio" name="secret" value="No"></input>

          <p>Password</p>
          <input
            type="text"
            className="text"
            id="password"
            name="password"
          ></input>

          <p>Question</p>
          <input
            type="text"
            className="text"
            id="question"
            name="question"
          ></input>
          <br />

          <button onClick={() => addNewQuestion()}>Add Question</button>
          <br />

          <button type="submit" onClick={() => addNewSurvey()}>
            Submit Survey
          </button>
        </div>

        <div className="showcaseSurvey">
          <p>Title: {showcaseSurvey.Title}</p>
          <p>Secret Survey: {JSON.stringify(showcaseSurvey.Secret)}</p>

          <p>Questions: </p>
          {showcaseSurvey.Questions.map((val) => {
            return <p className="showcaseQuestions">{val}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const surveys = await table.select({}).firstPage();
    return {
      props: {
        initialSurveys: minifyRecords(surveys),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}
