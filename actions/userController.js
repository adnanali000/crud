"use server"
import { getCollection } from "../lib/db"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import { redirect } from "next/navigation"

export const register = async function(prevState,formData){
    const errors = {}

    const ourUser = {
        username: formData.get("username"),
        password: formData.get("password")

    }

    if(typeof ourUser.username != "string") ourUser.username = ""
    if(typeof ourUser.password != "string") ourUser.password = ""

    ourUser.username = ourUser.username.trim()
    ourUser.password = ourUser.password.trim()

    if(ourUser.username.length < 3) errors.username = "Username must be atleast 3 characters"
    if(ourUser.username.length > 30) errors.username = "Username cannot be exceed more than 30 characters"
    if(ourUser.password == "") errors.password = "Password is required"

    //see if user already exist
    const user = await getCollection('users')
    const userExist = await user.findOne({username:ourUser.username})
    if(userExist){
        errors.username = 'User already exist'
    }

    if(errors.username || errors.password){
        return {
            errors:errors,
            success:false
        }
    }

    //hash password
    const salt = bcrypt.genSaltSync(10)
    ourUser.password = bcrypt.hashSync(ourUser.password,salt)

    //storing a new user in database
    const userCollection = await getCollection("users")
    const newUser = await userCollection.insertOne(ourUser)
    const userId = newUser.insertedId.toString()

    //create token value
    const ourTokenValue = jwt.sign({userId:userId,exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24},process.env.JWTSECRET)


    //log the user in by giving them cookie
    cookies().set("ourApp",ourTokenValue,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:60 * 60 * 24,
        secure:true
    })

    return {
        success:true
    }

}


export const logout = async function(){
    cookies().delete('ourApp')
    redirect('/')
}
 

export const login = async function(prevState,formData){
    const failObject = {
        success:false,
        message:"Invalid username / password"
    }
    const ourUser = {
        username: formData.get("username"),
        password: formData.get("password")

    }

    if(typeof ourUser.username != "string") ourUser.username = ""
    if(typeof ourUser.password != "string") ourUser.password = ""

    const collection = await getCollection('users')
    const user = await collection.findOne({username:ourUser.username})

    if(!user){
        return {
            message:"User not found",
            success:false
        }
    }

    const matchOrNot = bcrypt.compareSync(ourUser.password,user.password)
    if(!matchOrNot){
        return failObject
    }

    //create jwt token
     //create token value
     const ourTokenValue = jwt.sign({userId:user._id,exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24},process.env.JWTSECRET)


     //log the user in by giving them cookie
     cookies().set("ourApp",ourTokenValue,{
         httpOnly:true,
         sameSite:"strict",
         maxAge:60 * 60 * 24,
         secure:true
     })

     redirect('/')
}

