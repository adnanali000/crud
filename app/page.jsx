
import Link from "next/link"
import RegisterForm from "../components/RegisterForm"
import { getUserFromCookie } from "../lib/getUser"
import Dashboard from "../components/Dashboard"

export default async function Page(){
    const user = await getUserFromCookie()
    return(
        <>
        {user && <Dashboard user={user} /> }
        {!user && (
            <>
             <RegisterForm />
            </>
        )}
        </>
    )
}