
import { getUserFromCookie } from "../../lib/getUser"
import { redirect } from "next/navigation"
import TodoForm from "../../components/TodoForm"

export default async function RegisterForm(){
    const user = await getUserFromCookie()
    if(!user){
        redirect("/")
    }


    return (
        <>
        <div className="mb-4 w-full text-center">
            <h2>Create Todo</h2>
        </div>
        <TodoForm action="create" />
        </>
    )
}