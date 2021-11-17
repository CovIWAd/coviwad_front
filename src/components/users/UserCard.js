import {Button, Card, CardContent, FormGroup} from "@mui/material";
import UserInfo from "./UserInfo";
import UserFormUpdate from "./UserFormUpdate";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import {useState} from "react";

export default function UserCard({user, onUpdate}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: ""
  })

  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  }

  const handleSubmit = () => {
    onUpdate(state);
    setIsUpdate(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  return (
    <Card sx={{ minWidth: 275 }} style={{width: "50%"}}>
      <CardContent>
        {!isUpdate ? (
          <Button style={{float:"right"}} onClick={handleUpdate} endIcon={<EditIcon/>} size="small">Modifier</Button>
        ) : (
          <Button style={{float:"right"}} onClick={handleUpdate} endIcon={<EditOffIcon/>} size="small">Annuler</Button>
          )}

        <UserInfo label={"Username (can't be changed) : "} value={user.username}/>

        {!isUpdate ? (
          <>
            <UserInfo label={"First Name : "} value={user.first_name}/>
            <UserInfo label={"Last Name : "} value={user.last_name}/>
            <UserInfo label={"Email : "} value={user.email}/>
          </>
        ) : (
          <FormGroup onSubmit={handleSubmit}>
            <UserFormUpdate field={"first_name"} label={"First Name"} defaultValue={user.first_name} onChange={handleChange}/>
            <UserFormUpdate field={"last_name"} label={"Last Name"} defaultValue={user.last_name} onChange={handleChange}/>
            <UserFormUpdate field={"email"} label={"Email"} defaultValue={user.email} onChange={handleChange}/>

            <Button type={"submit"} size="small">Modifier</Button>

          </FormGroup>
        )}

      </CardContent>
    </Card>
  );
}
