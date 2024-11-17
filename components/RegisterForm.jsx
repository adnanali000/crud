"use client"
import { register } from "../actions/userController"
import {useFormState,useFormStatus} from 'react-dom'

export default function RegisterForm(){
    const [formState,formAction] = useFormState(register,{})


    return (
        <form action={formAction} className="max-w-xs mx-auto">
             <p className="mb-5">Don't have an account? <strong>Create One</strong></p>
        <div className="mb-4">
        <input type="text" name="username" placeholder="Username" className="input input-bordered w-full max-w-xs" />
        {formState?.errors?.username && <div className="my-1 text-red-500 text-xs">{formState?.errors?.username}</div>}
        </div>
        <div className="mb-4">
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
        {formState?.errors?.password && <div className="my-1 text-red-500 text-xs">{formState?.errors?.password}</div>}
        </div>
        <button className="btn btn-primary">Create Account</button>
     </form>
    )
}