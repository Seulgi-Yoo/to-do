import "./App.css";
import styled from "styled-components";
import Header from "./component/Header";
import List from "./component/List";
import Controller from "./component/Controller";
import { useState } from "react";

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
  height: 800px;
  overflow: hidden;
  box-shadow: 10px 10px 100px #ccc;
`;
function App() {
  const [toDoList, setToDoList] = useState([]); // 투두 리스트

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
