import React from 'react';
import { TextField, Typography, Paper, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';

function MultipleChoiceQuestion(props) {
    const [answerValue, setAnswerValue] = React.useState({kysymysID: "", vastaus: ""});
    //console.log(props.monivalinnat);
    //console.log(props.monivalinnat.multiAnswerOptions[0]);
    const handleChange = (event) => {
      const obj = {kysymysID: props.monivalinnat.kysymysID, vastaus: event.target.value}
      setAnswerValue(obj);
      sendAnswerValue(obj)
      
    };

    
      const sendAnswerValue = (obj) => {
        props.callback(obj);
      }
      
    const multiOptions = props.monivalinnat.vaihtoehto;
   
    return (
    <div>
      <FormControl component="fieldset"  style={{margin: '20px'}}>
        <Typography>{props.monivalinnat.kysymys}</Typography>
        <FormLabel component="legend"></FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={ answerValue.vastaus } onChange={ handleChange }>
        {multiOptions.map((option) => {
            return(
              <FormControlLabel value={option.vaihtoehto + " "} control={<Radio />} label={option.vaihtoehto} />
            )
        })}
        </RadioGroup>
      </FormControl>
      
    </div>

    );
  }

  export default MultipleChoiceQuestion;