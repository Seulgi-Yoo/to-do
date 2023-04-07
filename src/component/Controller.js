import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  width: 500px;
  height: 100px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 0.5px solid #C1C7FF;
  background-color: #fff;
  @media screen and (max-width:500px) {
    max-width: 100vw;
  }
`;

const AddNewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin: 25px;
    color: #6b7dff;
  }
`;

const AddTaskContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  button {
    border: none;
    background-color: #fff;
    color: #C1C7FF;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    position: absolute;
    top: -20px;
    cursor: pointer;
    &:hover {
      color: #6b7dff;
    }
  }
`;

const AddTaskInput = styled.input`
  width: 440px;
  height: 52px;
  margin: 10px;
  border: 1px solid #6b7dff;
  border-radius: 5px;
  font-size: 18px;
  outline: none;
  text-align: center;
  color: #6b7dff;
  &:focus {
    border-color: #6b7dff;
    box-shadow: 0 0 0 1px #6b7dff;
  }
  &::placeholder {
    color: #C1C7FF;
  }
`;

const AddNewButton = styled.div`
  cursor: pointer;
`;

export default function Controller({ toDoList, setToDoList }) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState("");

  const AddTaskInputRef = useRef(null);
  useEffect(() => {
    if (isAddingTask) {
      AddTaskInputRef.current.focus();
    }
  }, [isAddingTask])

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleAddTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCloseButton = () => {
    setIsAddingTask(false);
  }

  const handleAddTaskSubmit = () => {
    if (newTask !== "") {
      const createTime = new Date().toLocaleTimeString('en-US', {hour12:false}).slice(0, -3);
      const createDate = new Date().toLocaleDateString();
      const newToDo = {
        todo: newTask,
        isDone: false,
        createTime,
        createDate
      };
      axios
      .post("http://localhost:3003/todos", newToDo)
      .then((response) => {
        const updatedList = [...toDoList, response.data];
        setToDoList(updatedList);
        setNewTask("");
        setIsAddingTask(false);
      })
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTaskSubmit();
    }
  };

  return (
    <Container>
      {isAddingTask ? (
        <AddTaskContainer>
          <button onClick={handleCloseButton}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <AddTaskInput
            placeholder="Write a To Do & Press Enter"
            type="text"
            value={newTask}
            onChange={handleAddTaskChange}
            onKeyPress={handleKeyPress}
            ref={AddTaskInputRef}
          />
        </AddTaskContainer>
      ) : (
        <AddNewContainer>
          <div>{toDoList.length} TASKS</div>
          <AddNewButton onClick={handleAddTaskClick}>
            ADD NEW <FontAwesomeIcon icon={faPlus} />
          </AddNewButton>
        </AddNewContainer>
      )}
    </Container>
  );
}
