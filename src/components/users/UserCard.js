import "../../styles/App.scss";
import {Button, Card, CardContent, FormControl, FormHelperText} from "@mui/material";
import UserInfo from "./UserInfo";
import UserFormUpdate from "./UserFormUpdate";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import {useEffect, useState} from "react";

export default function UserCard({user, onUpdate, setUser}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    first_name: "",
    last_name: ""
  })

  useEffect(() => {
    if(user){
      setState({
        first_name: user.first_name,
        last_name: user.last_name
      })
    }
  }, [user])

  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  }

  const handleSubmit = () => {
    let newUser = {
      ...user,
      ...state
    }
    setUser(newUser)
    onUpdate(newUser);
    setIsUpdate(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    if(value === ""){
      setError("Input cannot be empty.")
    } else {
      setError("")
    }
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
        <UserInfo label={"Email : "} value={user.email}/>

        {!isUpdate ? (
          <>
            <UserInfo label={"First Name : "} value={user.first_name}/>
            <UserInfo label={"Last Name : "} value={user.last_name}/>
          </>
        ) : (
          <FormControl>
            <UserFormUpdate field={"first_name"} label={"First Name"} defaultValue={user.first_name} onChange={handleChange}/>
            <UserFormUpdate field={"last_name"} label={"Last Name"} defaultValue={user.last_name} onChange={handleChange}/>

            <FormHelperText className="ceriseColor">{error}</FormHelperText>
            <Button disabled={error !== ""} onClick={handleSubmit} size="small">Modifier</Button>

          </FormControl >
        )}

      </CardContent>
    </Card>
  );
}
