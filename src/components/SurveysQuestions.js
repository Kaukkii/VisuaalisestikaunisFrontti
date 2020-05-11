import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';




import { Link } from "react-router-dom";

function SurveyQuestions() {

  const [surveyObj, setObj] = useState({});

  const [questions, setQuestions] = useState([]);

  const [message, setMessage] = useState("");

  const [vastaukset, setVastaukset] = useState([]);

  let id = useParams().id;

  

  const [value, setValue] = React.useState('');
  const [state, setState] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


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

  const handleChanged = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
              if(question.kysymysType === "Monivalinta"){
                  return(
                    <FormControl component="fieldset">
  <h4 style={{ marginBottom: "0px" }}>
                    {question.kysymys}
                  </h4>
  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
    <FormControlLabel value={question.vaihtoehto} control={<Radio />} label={question.vaihtoehto} />
    <FormControlLabel value={question.vaihtoehto1} control={<Radio />} label={question.vaihtoehto1} />
    <FormControlLabel value={question.vaihtoehto2} control={<Radio />} label={question.vaihtoehto2} />
   
    
  </RadioGroup>
</FormControl>
                  )
                    } 
                 if(question.kysymysType === "Checkbox"){
                  return(

                  <div >
      <FormControl component="fieldset" >
      <h4 style={{ marginBottom: "0px" }}>
                    {question.kysymys}
                  </h4>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={question.vaihtoehto} onChange={handleChanged} name={question.vaihtoehto} />}
            label={question.vaihtoehto}
          />
           <FormControlLabel
            control={<Checkbox checked={question.vaihtoehto1} onChange={handleChanged} name={question.vaihtoehto1} />}
            label={question.vaihtoehto1}
          />
           <FormControlLabel
            control={<Checkbox checked={question.vaihtoehto2} onChange={handleChanged} name={question.vaihtoehto2} />}
            label={question.vaihtoehto2}
          />
         
        </FormGroup>
       
      </FormControl>
     
    </div>)
                 }
                
            else{
            return (
              <div
                key={question.kysymysID}
                style={{ padding: "7px", margin: "auto", width: "70%" }}>
                  
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ marginBottom: "0px" }}>
                    {question.kysymys}
                  </h4>
                  {renderTextField(i, question.kysymysID)}
                  <br />
                </div>
              </div>
            );}
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
