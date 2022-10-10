import React, { useEffect, useRef, useState } from "react";
import './Home.css';
import { Card, TextField, Button, Page } from "@shopify/polaris";
import store from "./Store";
import { saveCredentials } from "./Actions";
import { useNavigate } from "react-router-dom";

const Home = () => {
    

  const [customerName, setCustomerName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedResult, setFetchedResult] = useState([]);

  const alert = useRef(null);
  const switchPage = useNavigate();


  const handleFetch = () => {
    setIsFetching(true);
    var options = {
        method: "POST",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
        },
      };
  
      fetch(
        `https://fbapi.sellernext.com/user/login?username=${username}&password=${password}`,
        options
      )
        .then((res) => res.json())
        .then((result) => setFetchedResult(result));
  };

  useEffect(()=>{
    if(fetchedResult.length === 0) return;
    setIsFetching(false);
    if(fetchedResult.success) 
    {
        alert.current.style.display = "none";
        setCustomerName("");
        setUsername("");
        setPassword("");
        store.dispatch(saveCredentials({customerName: customerName, token: fetchedResult.data.token, username: username}));
        switchPage("/dashboard");
    }  
    else
    {
        alert.current.style.display = "block";
    }
  },[fetchedResult])
  
  return (
    <div className='Home'>
        <Card sectioned>
        <Card.Section>
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e)}
            placeholder="Customer Name"
          />
        </Card.Section>
        <Card.Section>
          <TextField
            label="Username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e)}
          />
        </Card.Section>
        <Card.Section>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e)}
            placeholder="Password"
          />
        </Card.Section>
        <Card.Section>
          {isFetching ? (
            <Button loading></Button>
          ) : (
            <Button primary onClick={handleFetch}>
              Login
            </Button>
          )}
          <Page><sup ref={alert}>Invalid Credentials!!</sup></Page>
        </Card.Section>
      </Card>
    </div>
  )
}

export default Home;
