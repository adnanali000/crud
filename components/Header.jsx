import Link from "next/link"
import { getUserFromCookie } from "../lib/getUser"
import { logout } from "../actions/userController"

export default async function Header(){
    const user = await getUserFromCookie()
    return (
        <header className='bg-gray-100 shadow-md'>
        <div className='container mx-auto'>
        <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">Todo App</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {user ? (
                <div className="flex items-center"> 
                <li>
                    <Link href="/create-todo" className="btn btn-primary">Create Todo</Link>
                </li>
                <li>
                    <form action={logout}>
                        <button className="btn btn-neutral">Log Out</button>
                    </form>
                </li>
                </div>
            ) :
            (
             <li>
                <Link href="/login">Log In</Link>
              </li>
            )

            }
            
         
          
          </ul>
        </div>
      </div>
        </div>
      </header>
    )
}