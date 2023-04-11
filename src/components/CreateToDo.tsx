import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";
import {useEffect} from 'react';


const Form = styled.form`
    max-width: 480px;
    display: flex;
    flex-direction: column;
`;
const ErrorText = styled.span`
    color: #ff1212;
`;

interface IForm{
    toDo: string
}


function CreateToDo(){
  
    const [toDos, setToDos] = useRecoilState(toDoState)
    const category = useRecoilValue(categoryState)
    const {register, handleSubmit, setValue, formState : {errors}} = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) =>{
        
        // oldToDos : 이전의 state
        // oldToDos의 모든 요소를 반환함(...oldToDos)
        setToDos((oldToDos)  => 
        [{id: Date.now(),
            text: toDo, 
            category}, ...oldToDos])

        setValue("toDo", "")
    }

    useEffect(() =>{
        localStorage.setItem("toDos", JSON.stringify(toDos));
    },[toDos])    


    return (
        <Form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", 
                    {required : `${category}란은 필수입력사항입니다.`})
                }
                placeholder = {`${category}을 입력해주세요`} />
                <ErrorText>{errors.toDo?.message}</ErrorText>
                <button>{category} 추가</button>
        </Form>
    )
}





export default CreateToDo;