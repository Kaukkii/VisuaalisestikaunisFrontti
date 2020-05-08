import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router";

import { Link } from "react-router-dom";

function SurveyQuestions() {

  const [surveyObj, setObj] = useState({});

  const [questions, setQuestions] = useState([]);

  const [message, setMessage] = useState("");

  const [vastaukset, setVastaukset] = useState([]);

  let id = useParams().id;


  const change = (e) => {

    const kysymysID = parseInt(e.target.name);

    const newArr = [];


    vastaukset.forEach((vastaus) => {

      if (vastaus.kysymysID === kysymysID) {

        const newObj = { kysymysID: kysymysID, vastaus: e.target.value };


        newArr.push(newObj);
      } else {

        newArr.push(vastaus);
      }
    });

    setVastaukset(newArr);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/kyselylist/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setObj(json);
        setQuestions(json.kysymykset);
        createAnswerObjects(json.kysymykset);
      });
  }, []);


  const renderTextField = (i, kysymysID) => {
    const id = kysymysID + "";
    const listIndex = i + "";

    if (vastaukset.length > 0) {
      return (
        <div>
          {console.log(vastaukset)}
          <TextField
            label="vastaus tähän..."
            id={listIndex}
            name={id}
            onChange={change}
            margin="normal"
            required
            autoFocus
            fullWidth
            variant="outlined"
          />
        </div>
      );
    }
  };


  const createAnswerObjects = (kysymykset) => {
    var AList = [];

    for (let index = 0; index < kysymykset.length; index++) {

      AList.push({
        kysymysID: kysymykset[index].kysymysID,
        vastaus: "",
      });

    }
    setVastaukset(AList);
  };

  const sendData = (e) => {
    setMessage("Sending information...");
    vastaukset.forEach((answer) => {
      fetch("http://localhost:8080/api/vastauses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vastaus: answer.vastaus,
          kysymys: {
            kysymysID: answer.kysymysID,
          },

        }),
      });
    });
    setMessage("Information SENT.");
  };



  return (
    <Paper style={{ textAlign: "center", width: "85%", margin: "auto" }}>
      <Typography
        variant="h4"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {surveyObj.kyselyName}
      </Typography>
      <div>
        <form>
          {questions.map((question, i) => {


            return (
              <div
                key={question.kysymysID}
                style={{ padding: "7px", margin: "auto", width: "70%" }}
              >
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ marginBottom: "0px" }}>
                    {question.kysymys}
                  </h4>
                  {renderTextField(i, question.kysymysID)}
                  <br />
                </div>
              </div>
            );
          })}

          <div style={{ margin: "10px" }}>
            <Button
              variant="contained"
              onClick={(e) => sendData()}
              color="secondary"
              style={{ margin: "10px" }}
              component={Link}
              to={"/vastaukset"}
            >
              Lähetä
            </Button>
          </div>
          <p>{message}</p>
        </form>
      </div>
    </Paper>
  );
}

export default SurveyQuestions;
