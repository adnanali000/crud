"use client"
import { login } from "../../actions/userController"
import {useFormState,useFormStatus} from 'react-dom'

export default function RegisterForm(){
    const [formState,formAction] = useFormState(login,{})


    return (
        <>
        <form action={formAction} className="max-w-xs mx-auto">
        <div className="mb-4">
            <h2>Login</h2>
        </div>
        {!formState.success && <div className="mb-4 text-red-400">
            {formState.message}
        </div>}
        <div className="mb-4">
        <input type="text" name="username" placeholder="Username" className="input input-bordered w-full max-w-xs" />
        {formState?.errors?.username && <div className="my-1 text-red-500 text-xs">{formState?.errors?.username}</div>}
        </div>
        <div className="mb-4">
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
        {formState?.errors?.password && <div className="my-1 text-red-500 text-xs">{formState?.errors?.password}</div>}
        </div>
        <button className="btn btn-primary">Log In</button>
     </form>
        </>
    )
}