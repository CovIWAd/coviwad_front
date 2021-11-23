import '../../styles/App.scss';
import '../../styles/MyDocuments.css';
import React, {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import UserCard from "../../components/users/UserCard";


export default function MyProfile() {
  const {keycloak} = useKeycloak();

  const [user, setUser] = useState({});

  useEffect(() => {

    async function fetchUser() {
      await fetch(`http://localhost:8080/api/users/${keycloak.tokenParsed.sub}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Origin": "*",
            Authorization: `Bearer ${keycloak.token}`
          }),
          mode: "cors"
        })
        .then(async (res) => {
          let r = await res.json();
          setUser(r)
        });
    }

    fetchUser();
  }, [keycloak.token, keycloak.tokenParsed.sub]);

  const onUpdate = async (changedInfo) => {
    await fetch(`http://localhost:8080/api/users/${keycloak.tokenParsed.sub}`,
      {
        method: "PUT",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Origin": "*",
          Authorization: `Bearer ${keycloak.token}`
        }),
        mode: "cors",
        body: JSON.stringify(changedInfo)
      })
      .then(async (res) => {
        let r = await res.json();
        setUser(r)
      });
  }

  return (
    <>
      <div>
        <h2 className="text-center">My profile</h2>
        {user && (
          <div>
            <UserCard user={user} onUpdate={(s) => onUpdate(s)} setUser={setUser}/>
          </div>
        )}
      </div>
    </>
  );
}
