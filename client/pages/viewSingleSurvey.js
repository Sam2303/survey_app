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
      </div>
      <div className="responses">
          repsonses
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
