import {TextField} from "@mui/material";

export default function UserFormUpdate({field, label, defaultValue, disabled, required, onChange}) {
  return (
    <div style={{marginBottom: 25}}>
      <TextField
        required={required}
        disabled={disabled}
        id="outlined-required"
        name={field}
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
