import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menubar from "./nav/Menubar";
import SurveysPage from "./components/SurveysPage";
import SurveyQuestions from "./components/SurveysQuestions";
import AnswersPage from "./components/AnswersPage";



function App() {
  return (
    <div>

      <BrowserRouter>
        <div className="App">
          <Menubar />
          <Switch>
            <Route exact path="/" component={SurveysPage} />

            <Route path="/kysely/:id" component={SurveyQuestions} />
            <Route path="/vastaukset" component={AnswersPage} />
           
          </Switch>
        </div>
      </BrowserRouter>

    </div>

  );
}

export default App;
