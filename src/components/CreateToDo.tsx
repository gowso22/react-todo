import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";


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
  
    const setToDos = useSetRecoilState(toDoState);
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
    return (
        <Form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", 
                    {required : `${category}란은 필수입력사항입니다.`})
                }
                placeholder = {category} />
                <ErrorText>{errors.toDo?.message}</ErrorText>
                <button>{category} 추가</button>
        </Form>
    )
}





export default CreateToDo;