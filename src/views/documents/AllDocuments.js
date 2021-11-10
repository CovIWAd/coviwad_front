import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import {useKeycloak} from "@react-keycloak/web";

export default function AllDocuments() {
  const [results, setResults] = useState([]);
  const {keycloak} = useKeycloak();

  useEffect(() => {

    async function fetchData() {
      let accessToken = keycloak.token;
      console.log(accessToken)

      //ALL NEWS
      await fetch(`http://localhost:8082/api/documents`,
        {
          method: "GET",
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          }),
          mode: "cors"
        })
        .then(async (res) => {
          let r = await res.json();
          setResults(r)
        });
    }
    fetchData();
  },[keycloak.token]);

  return (
    <>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        maxWidth: "100%"
      }}>
        { results.length > 0 && results.map((doc,index) => {
          return (
            <div style={{width: "30%", margin: "1%"}} key={index}>
              <Card variant="outlined" key={index}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
                    {doc.documentId}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </>
  );

}
