import React, {useContext} from 'react'
import Nav from './components/Nav'
import {SurveysContext} from '../context/SurveysContext';
import { table, minifyRecords } from "./api/utils/Airtable-survey";

export default function Create(initialSurveys){
    console.log(initialSurveys);
    const { addSurvey } = useContext(SurveysContext);
    const addNewSurvey = () => {
        addSurvey("Test1", true, "test1", "{'questions':['q1': 'Is this a test?']}", "{}"); 
    }

    return (
        <div>
            <Nav />

            <button onClick={() => addNewSurvey()}> ADDNEW </button>            
        </div>
    )
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