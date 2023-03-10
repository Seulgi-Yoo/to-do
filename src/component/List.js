import styled, { keyframes, css } from "styled-components";
import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// Hello 컴포넌트 나타나는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Hello = styled.div`
  font-size: 50px;
  text-align: center;
  position: relative;
  top: 100px;
  color: #6b7dff;
  overflow-wrap: break-word;
  animation: ${props => props.show ? css`${fadeIn} 0.5s ease-out` : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-10px)'};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  padding: 23px;
  > input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 3px;
    border: 3px solid #6b7dff;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    &:checked::before {
      content: "✓";
      font-weight: 900;
      color: #6b7dff;
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  > span {
    margin: 0 23px;
    font-size: 18px;
    color: #6b7dff;
    &.checked {
      text-decoration: line-through;
      color: #c1c7ff;
    }
  }
  > div {
    position: absolute;
    right: 18px;
    display: flex;
    align-items: center;
    .date {
      color: #c1c7ff;
      margin-right: 10px;
    }
    .delete {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      color: #6b7dff;
      cursor: pointer;
      position: relative;
      &:hover {
        z-index: 1;
        color: #fff;
      }
      &:hover::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: red;
        z-index: -1;
      }
      > svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export default function List({ toDoList, setToDoList }) {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (e, itemId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    }
  };

  const handleClick = (itemId) => {
    const updatedList = toDoList.filter((item) => item.id !== itemId);
    setToDoList(updatedList);
    localStorage.setItem("toDoList", JSON.stringify(updatedList));
  };

  const text = [
    "You are special!",
    "You are doing great today!",
    "Your efforts shine through!",
    "Have confidence, you are amazing!",
    "You inspire us all to believe!",
    "Your future is bright!",
    "You make us proud!",
    "You are the best!",
    "Keep moving forward, you can do it!",
    "You are a winner in life!",
    "You are awesome!",
  ];

  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * text.length);
    return text[randomIndex];
  }

  return (
    <div className="list-container">
      {toDoList.length === 0 ? (
        <Hello show={toDoList.length === 0}>{getRandomText()}</Hello>
      ) : (
        <ul>
          {toDoList.map((item) => (
            <ListItem key={item.id}>
              <input
                type="checkbox"
                checked={checkedItems.includes(item.id)}
                onChange={(e) => handleCheck(e, item.id)}
              />
              <span className={checkedItems.includes(item.id) ? "checked" : ""}>
                {item.todo}
              </span>
              <div>
                <span className="date">{item.createDate}</span>
                <div className="delete" onClick={() => handleClick(item.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </ListItem>
          ))}
        </ul>
      )}
    </div>
  );
}
