import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


export default function SurveysPage() {

  const [surveys, setSurveys] = React.useState([]);
  const [answer, setAnswer] = React.useState([]);
  const url = "http://localhost:8080/kyselylist";

  const newurl = "http://localhost:8080/vastaukset";


  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        setSurveys(data);
      });
  }, []);

  React.useEffect(() => {
    fetch(newurl)
      .then((response) => response.json())
      .then((data) => {

        setAnswer(data);
      });
  }, []);


  return (
    <div style={{ width: "50%", textAlign: "center", margin: "auto" }}>
      <Typography variant={"h3"}>Vastaukset</Typography>
      <br />
      {surveys.map((kysely) => { 
        return (
          <div key={kysely.kyselyID}>
            <Paper style={{ padding: "10px" }} elevation={3}>
              <Typography variant={"h4"}>{kysely.kyselyName}</Typography>
              <Typography>{kysely.kyselyDesc}</Typography>
              <Typography> Kysymyksiä {kysely.kysymykset.length}</Typography>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ margin: "auto" }}>Tarkastele vastauksia</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography style={{ margin: "auto" }}>
                   <div>
                          {answer.map((vastaus) => {

                            return (
                              <div key={vastaus.vastausID}>
                                <p>{vastaus.vastaus}</p>
                              </div>
                            );
                          })}
                        </div>
                      
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
             
            </Paper>

            
            <br />
          </div>
        );
      })}
    </div>
  );
}
