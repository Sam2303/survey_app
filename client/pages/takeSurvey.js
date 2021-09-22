import React, {useContext} from "react";
import { useRouter } from "next/router";
import Nav from "./components/Nav";
import { table, minifyRecords } from "./api/utils/Airtable-survey";
import { SurveysContext } from "../context/SurveysContext";

const viewSingleSurvey = (initialSurveys) => {

    const { updateSurvey } = useContext(SurveysContext);
 
  const router = useRouter();
  const {
    query: { id },
  } = router;
  let survey = initialSurveys.initialSurveys.filter((x) => x.id === id)[0];
  const questions = JSON.parse(survey.fields.Questions).questions;

  const submitResponse = () => {
    const length = questions.length;
    let newResponse = {
        "response" : []
    }
    for(let i = 0; i < length; i++){
        let response = document.getElementById(i).value;
        newResponse.response.push(response);
    }
    console.log(newResponse);
    let responses = (JSON.parse(survey.fields.Responses));
    responses.responses.push(newResponse);
    survey.fields.Responses = JSON.stringify(responses);
    console.log(survey);
    updateSurvey(survey);
  }

  return (
    <div>
      <Nav />
      <div className="survey">
        <h2>{survey.fields.Title}</h2>
        {questions.map((val, ind) => {
          return (
            <div className="indvQuestion" key={ind}>
              <p  className="question">
                {val}
              </p>
              <input type="text" id={ind}></input>
            </div>
          );
        })}
        <button type="submit" onClick={() => submitResponse()}>Submit</button>
      </div>
    </div>
  );
};

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

export default viewSingleSurvey;
