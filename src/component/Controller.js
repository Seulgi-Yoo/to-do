import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  width: 500px;
  height: 100px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 0.5px solid #C1C7FF;
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

  // function formatDate(date) {
  //   const diff = Math.floor((new Date() - date) / 1000); // 초 단위 차이 계산
  //   if (diff < 60) { // 1분 미만일 경우
  //     return '방금 전';
  //   } else if (diff < 3600) { // 1시간 미만일 경우
  //     const minutes = Math.floor(diff / 60);
  //     return `${minutes}분 전`;
  //   } else { // 1시간 이상일 경우
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  //   }
  // };

  useEffect(() => {
    const storedToDoList = JSON.parse(localStorage.getItem("toDoList"));
  if (storedToDoList) {  
    setToDoList(storedToDoList);
  }
}, []);

useEffect(() => {
  const currentDate = new Date().toLocaleDateString();
  const storedDate = localStorage.getItem("date");
  if (currentDate !== storedDate) {
    localStorage.setItem("date", currentDate);
    setToDoList([]);
    localStorage.removeItem('toDoList')
  }
}, [toDoList]);

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleAddTaskChange = (e) => {
    setNewTask(e.target.value);
  };


  const handleAddTaskSubmit = () => {
    if (newTask !== "") {
      const newId =
        toDoList.length > 0 ? toDoList[toDoList.length - 1].id + 1 : 1;
      const createDate = new Date().toLocaleTimeString('en-US', {hour12:false}).slice(0, -3)
      const newToDo = {
        id: newId,
        todo: newTask,
        createDate
      };
      setToDoList([...toDoList, newToDo]);
      setNewTask("");
      setIsAddingTask(false);

      localStorage.setItem("toDoList", JSON.stringify([...toDoList, newToDo]));
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
