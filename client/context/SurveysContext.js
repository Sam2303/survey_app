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
        body: JSON.stringify(updatedTodo),
        headers: { "content-type": "application/json" },
      });
      setSurveys((prevSurveys) => {
        const existingSurveys = [...prevSurveys];
        const existingSurvey = existingSurveys.find(
            (survey) => survey.id === updatedSurvey.id
        );
        existingSurvey.fields = updatedSurvey.fields;
        return existingSurveys;
    });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SurveysContext.Provider
      value={{
        surveys,
        setSurveys,
        refreshSurveys,
        updateSurvey,
        addSurvey,
      }}
    >
      {children}
    </SurveysContext.Provider>
  );
};

export { SurveysContext, SurveysProvider };
