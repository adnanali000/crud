import { getCollection } from "../lib/db"
import Link from "next/link"
import { deleteTodo } from "../actions/todoController"

async function getTodos(id){
    const collection = await getCollection('todos')
    const results = await collection.find({userId:id}).sort().toArray()
    return results
}

export default async function Dashboard({user}){
    const todos = await getTodos(user.userId)
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
                <h1>Your Todos</h1>
            </div>
               {todos?.map((item,i)=>(
                <div className="flex items-center space-x-4" key={i}>
                    <div className="text-lg">
                        {item?.todo}
                    </div>
                    <div className="text-md flex space-x-2 item-center">
                        <div className="cursor-pointer">
                        <Link href={`/edit-todo/${item?._id}`}>
                            Edit
                        </Link>
                        </div>
                        <div className="cursor-pointer">
                            <form action={deleteTodo}>
                                <input type="hidden" name="id" defaultValue={item?._id.toString()} />
                                <button>Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
               ))}
        </div>
    )
}