import React from "react";
import { useRouter } from "next/router";
import Nav from "./components/Nav";
import { table, minifyRecords } from "./api/utils/Airtable-survey";

const viewSingleSurvey = (initialSurveys) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const survey = initialSurveys.initialSurveys.filter((x) => x.id === id)[0];
  console.log(survey.fields);
  const questions = JSON.parse(survey.fields.Questions).questions;
  const responses = JSON.parse(survey.fields.Responses).responses;

  return (
    <div>
      <Nav />
      <div className="singleSurveyContainer">
        <div className="survey">
          <h2>{survey.fields.Title}</h2>
          {questions.map((val) => {
            return (
              <p key={val} className="question">
                {val}
              </p>
            );
          })}
        </div>
        <div className="responses">
          <h2>Responses</h2>
          {responses.map((response) => {
            return (
              <div className="indvResponse">
                {response.response.map((val) => {
                  console.log(val);
                  return <p>{val}</p>;
                })}
              </div>
            );
          })}
        </div>
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
