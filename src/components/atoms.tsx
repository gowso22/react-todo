import { atom, selector } from "recoil";


//Selector는 파생된 state(derived state)의 일부를 나타낸다.
// 즉, 기존 state를 가져와서, 기존 state를 이용해 
// 새로운 state를 만들어서 반환할 수 있다. 
// 기존 state를 이용만할 뿐 변형시키지 않는다. 
// derived state는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념이다.


export enum Categories {
    "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}



export interface IToDo {
    id : number;
    text:string;
    // category 값은 "TO_DO" | "DOING" | "DONE"중 하나를 받도록 설정
    category: Categories;
}
export const categoryState = atom<Categories>({
    key : "category",
    default : Categories.TO_DO,
})


export const toDoState = atom<IToDo[]>({
    key : "toDo",
    default : [],
 
});

// atom을 가져다가 output을 변형(atom을 받아서 atom을 변형)
export const toDoSelector  = selector({
    key : "toDoSelector",
    // get function : selector 내부로 atom을 가지고 올 수 있다.
    get : ({get}) => {
        // toDoSelctor의 value
       const toDos = get(toDoState)
       const category = get(categoryState)
        // 카테고리가 select태그의 value인 카테고리만 필터링함
       return toDos.filter((toDo)=> toDo.category === category)
    }
})

function recoilPersist(arg0: { key: string; storage: Storage; }): { persistAtom: any; } {
    throw new Error("Function not implemented.");
}
