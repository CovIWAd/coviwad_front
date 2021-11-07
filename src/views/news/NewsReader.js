import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export default function NewsReader() {
  const [results, setResults] = useState([]);

  useEffect(() => {

    async function fetchData() {
      //ALL NEWS
      await fetch(`http://localhost:8081/api/news/all`,
        {
          method: "GET",
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          mode: "cors"
        })
        .then(async (res) => {
          let r = await res.json();
          setResults(r)
        });
    }
    fetchData();
  },[]);

  return (
    <>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        maxWidth: "100%"
      }}>
        { results.length > 0 && results.map((news,index) => {
          return (
            <div style={{width: "30%", margin: "1%"}}>
              <Card variant="outlined" key={index}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
                    {news.subtitle}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {news.title}
                  </Typography>
                  <Typography variant="body2">
                    {news.article}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href={news.link} target={"_blank"} size="small">Voir Plus</Button>
                </CardActions>
              </Card>
            </div>
          )
        })}
      </div>
    </>
  );

}
