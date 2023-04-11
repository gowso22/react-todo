import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, toDoState, IToDo } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

// todo 버튼을 클랙하면 인자를 통해 
// todo 버튼이 클릭되었다는 것을 알려주도록 설정
//ITodo["category"] : "TO_DO" | "DOING" | "DONE"
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
     //return oldToDos : 이전의 state 값을 반환(변하지 않음)
    setToDos((oldToDos) => {
    // oldToDos.findIndex(toDo => toDo.id === id )
    // : oldToDos의 배열을 받고 해당 oldToDos의 index를 찾기 위해
    // toDo의 id가 props에서 온 id와 같은지 비교
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex), newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  // 삭제
  const delToDo = (text :string) =>{
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
    })
  }
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={()=>delToDo(text)}>x</button>
    </li>
  )
}

export default ToDo;