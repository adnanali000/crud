"use client"

import { createTodo,editTodo } from "../actions/todoController"
import {useFormState} from 'react-dom'

export default function TodoForm({action,todo}){
    let actualAction;
    if(action == 'create'){
        actualAction = createTodo
    }
    if(action == 'edit'){
        actualAction = editTodo
    }


    const [formState,formAction] = useFormState(actualAction,{})

    return(
        <form action={formAction} className="max-w-xs mx-auto">
        <div className="mb-4">
        <input type="text" name="todoData" defaultValue={todo?.todo} placeholder="write todo" className="input input-bordered w-full max-w-xs" />
        {!formState?.success && <div>
            {formState?.message}
        </div>}
        </div>
        <input type="hidden" name="todoId" defaultValue={todo?._id} />
        <button className="btn btn-primary">save</button>
     </form>
    )
}