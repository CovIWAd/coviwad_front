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

export default function DocumentType() {
  const [type, setType] = useState("");
  const [isTest, setIsTest] = useState(false);
  const [date, setDate] = useState(new Date());
  const [validityDate, setValidityDate] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if(type !== "" && type !== "VACCINE"){
      setIsTest(true);
    } else {
      setIsTest(false);
    }
  }, [type])

  useEffect(() => {
    if (validityDate !== undefined && validityDate.toLocaleString() <= new Date().toLocaleString()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [validityDate])

  const handleChange = (event) => {
    setType(event.target.value);
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
              <p className="validity_message" style={!isValid ? {color : "red"} : null}>Fin de validité du test : {validityDate}</p>
            )}
          </div>
        )}
      </div>


    </>
  );
}
