import TodoForm from "../../../components/TodoForm"
import { getCollection } from "../../../lib/db"
import { ObjectId } from "mongodb"
import { getUserFromCookie } from "../../../lib/getUser"
import { redirect } from "next/navigation"

async function getDoc(id){
    const todos = await getCollection('todos')
    const result = await todos.findOne({_id:ObjectId.createFromHexString(id)})
    if (result) {
        return {
            ...result,
            _id: result._id.toString(), 
        };
    }

    return null;
}

export default async function Page(props){
    const doc = await getDoc(props.params.id)
    const user = await getUserFromCookie()
    console.log(doc.userId)
    if(user?.userId !== doc.userId){
        return redirect("/")
    }

    return (
        <>
            <div className="mb-4 text-center w-full">Edit Todo</div>
            <TodoForm todo={doc} action="edit" />
        </>
    )
}