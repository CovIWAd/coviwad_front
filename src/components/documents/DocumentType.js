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

export default function DocumentType({
                                         onChangeType,
                                         onChangeValid,
                                         onChangeTestDate,
                                         onChangeIsPositive,
                                         type,
                                         isValid,
                                         testDate,
                                         isPositive
                                     }) {
    const docType = type;
    const [isTest, setIsTest] = useState(false);
    const date = testDate;
    const [validityDate, setValidityDate] = useState();
    const isVal = isValid;
    const positive = isPositive;

    useEffect(() => {
        if (docType !== "" && docType !== "VACCINE") {
            setIsTest(true);
        } else {
            setIsTest(false);
        }
    }, [docType])

    useEffect(() => {
        if (validityDate !== undefined) {
            let d = validityDate.split("/");
            let x = d[1] + "/" + d[0] + "/" + d[2];
            let d2 = new Date(x);
            let d1 = new Date()
            const diffTime = d2 - d1;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) {
                onChangeValid(false);
            } else {
                onChangeValid(true);
            }
        }
    }, [validityDate, onChangeValid])

    const handleChange = (event) => {
        onChangeType(event.target.value);
    };

    const handleChangePositive = (event) => {
        onChangeIsPositive(event.target.checked);
    };

    const handleChangeDate = (newDate) => {
        let date = new Date(newDate);
        date.setDate(date.getDate() + 3);
        let validity_date = new Date(date).toLocaleDateString("fr");
        setValidityDate(validity_date);

        onChangeTestDate(newDate);
    }

    return (
        <>
            <div className="radio_group">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Type of document</FormLabel>
                    <RadioGroup onChange={handleChange} row aria-label="document" name="row-radio-buttons-group">
                        <FormControlLabel value="VACCINE" control={<Radio/>} label="Vaccine"/>
                        <FormControlLabel value="PCR" control={<Radio/>} label="PCR test"/>
                        <FormControlLabel value="ANTIGENIC" control={<Radio/>} label="Antigenic test"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="date_picker">
                {isTest && (
                    <>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Sampling date"
                                    inputFormat="dd/MM/yyyy"
                                    value={date}
                                    onChange={handleChangeDate}
                                    disableFuture={true}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            {validityDate && (
                                <p className="validity_message" style={!isVal ? {color: "red"} : null}>End of the test's
                                    validity : {validityDate}</p>
                            )}


                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={positive}
                                    onChange={handleChangePositive}
                                />
                                Positive test
                            </label>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
