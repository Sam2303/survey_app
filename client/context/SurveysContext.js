import { createContext, useState } from "react";

const SurveysContext = createContext();

const SurveysProvider = ({ children }) => {
  const [surveys, setSurveys] = useState([]);

  const refreshSurveys = async () => {
    try {
      const res = await fetch("api/GetSurveys");
      const latestSurveys = await res.json();
      setSurveys(latestSurveys);
    } catch (err) {
      console.log(err);
    }
  };

  const addSurvey = async (Title, Private, Password, Questions, Responses) => {
    try {
        console.log(Title, Private, Password, Questions, Responses)
        const res = await fetch("/api/CreateSurvey", {
          method: "POST",
          body: JSON.stringify({ Title, Private, Password, Questions, Responses }),
          headers: { "content-type": "application/json" },
        });
        const newSurvey = await res.json();
        setSurveys((prevSurvey) => {
          return [newSurvey, ...prevSurvey];
        });
      } catch (err) {
        console.log(err);
      }
  }

  const updateSurvey = async (updatedSurvey) => {
    console.log(updatedSurvey);
    try {
      const res = await fetch("/api/UpdateSurvey", {
        method: "PUT",
        body: JSON.stringify(updatedSurvey),
        headers: { "content-type": "application/json" },
      });

      setSurveys((prevSurveys) => {
        const existingSurveys = prevSurveys;
        return existingSurveys;
    });
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleSurvey = async (id) => {
    console.log(id);
    try {
      const res = await fetch("/api/getSingleSurvey", {
        method: "GET",
        body: JSON.stringify(id),
        headers: { "content-type": "application/json" },
      })
      let response = res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SurveysContext.Provider
      value={{
        surveys,
        setSurveys,
        refreshSurveys,
        updateSurvey,
        addSurvey,
        getSingleSurvey,
      }}
    >
      {children}
    </SurveysContext.Provider>
  );
};

export { SurveysContext, SurveysProvider };
