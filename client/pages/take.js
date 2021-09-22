import React from "react";
import Nav from "./components/Nav";
import Link from "next/link";
import { table, minifyRecords } from "./api/utils/Airtable-survey";

const take = (initialSurveys) => {
  const surveyList = initialSurveys.initialSurveys;
  return (
    <div>
      <Nav />
      <div className="viewContainer">
        {surveyList.map((survey) => {
          return (
            <Link href={{
              pathname:"/takeSurvey",
              query:{id: survey.id}}} 
               key={survey.id}>
              {survey.fields.Title}
            </Link>
          );
        })}
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

export default take;

