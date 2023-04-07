import "./App.css";
import axios from "axios";
import styled from "styled-components";
import Header from "./component/Header";
import List from "./component/List";
import Controller from "./component/Controller";
import { useState } from "react";
import { useEffect } from "react";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  `;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100vh;
  overflow: hidden;
  box-shadow: 10px 10px 100px #ccc;
  @media screen and (max-width: 500px) {
    width: 100vw;
  }
`;

function App() {
  const [toDoList, setToDoList] = useState([]); // 투두 리스트

  useEffect(() => {
    async function fetchData() {
      const today = new Date().toLocaleDateString();
      const response = await axios.get(`http://localhost:3003/todos?createDate=${today}`);
      const todos = response.data;
      setToDoList(todos);
      // console.log(todos);
    }
    fetchData();
  },[])

  return (
    <Main>
      <Container>
        <Header />
        <List toDoList={toDoList} setToDoList={setToDoList} />
        <Controller toDoList={toDoList} setToDoList={setToDoList} />
      </Container>
    </Main>
  );
}

export default App;
