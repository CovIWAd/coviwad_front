import React, {useEffect, useState} from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import "../../styles/fileUploader.css";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function DocumentType({onChangeType, onChangeValid, type, isValid}) {
  const docType = type;
  const [isTest, setIsTest] = useState(false);
  const [date, setDate] = useState(new Date());
  const [validityDate, setValidityDate] = useState();
  const isVal = isValid;

  useEffect(() => {
    if(docType !== "" && docType !== "VACCINE"){
      setIsTest(true);
    } else {
      setIsTest(false);
    }
  }, [docType])

  useEffect(() => {
    if(validityDate !== undefined){
      let d = validityDate.split("/");
      let x = d[1] + "/" + d[0] + "/" + d[2];
      let d2 = new Date(x);
      let d1 = new Date()
      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if(diffDays < 0){
        onChangeValid(false);
      } else {
        onChangeValid(true);
      }
    }
  }, [validityDate, onChangeValid])

  const handleChange = (event) => {
    onChangeType(event.target.value);
  };

  const handleChangeDate = (newDate) => {
    let date = new Date(newDate);
    date.setDate(date.getDate() + 3);
    let validity_date = new Date(date).toLocaleDateString("fr");
    setValidityDate(validity_date);
    setDate(newDate);
  }

  return (
    <>
      <div className="radio_group">
        <FormControl component="fieldset">
          <FormLabel component="legend">Nature du document</FormLabel>
          <RadioGroup onChange={handleChange} row aria-label="document" name="row-radio-buttons-group">
            <FormControlLabel value="VACCINE" control={<Radio />} label="Vaccin" />
            <FormControlLabel value="PCR" control={<Radio />} label="Test PCR" />
            <FormControlLabel value="ANTIGENIC" control={<Radio />} label="Test Antigénique" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="date_picker">
        {isTest && (
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date de prélèvement"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleChangeDate}
                disableFuture={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {validityDate && (
              <p className="validity_message" style={!isVal ? {color : "red"} : null}>Fin de validité du test : {validityDate}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
