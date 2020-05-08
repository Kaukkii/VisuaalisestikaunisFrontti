import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function SurveysPage() {
  
  const [surveys, setSurveys] = React.useState([]);
  const url = "http://localhost:8080/api/kyselies";

  
  React.useEffect(() => {
    fetch(url) 
      .then((response) => response.json()) 
      .then((data) => {
        
        setSurveys(data.content); 
      });
  }, []);

  return (
    <div style={{ width: "50%", textAlign: "center", margin: "auto" }}>
      <Typography variant={"h3"}>Kyselyt</Typography>
      <br />
      {surveys.map((kysely) => {
        return (
          <div key={kysely.kyselyID}>
            <Paper style={{ padding: "10px" }} elevation={3}>
              <Typography variant={"h4"}>{kysely.kyselyName}</Typography>
              <Typography>{kysely.kyselyDesc}</Typography>

              <Button
                style={{ margin: "5px" }}
                variant="contained"
                color="secondary"
                component={Link}
                to={"/kysely/" + kysely.kyselyID}
              >
                Vastaa Kyselyyn
              </Button>
            </Paper>
            <br />
          </div>
        );
      })}
    </div>
  );
}
