"use server"

import {getUserFromCookie} from "../lib/getUser"
import { redirect } from "next/navigation"
import { getCollection } from "../lib/db"
import { ObjectId } from "mongodb"



export const deleteTodo = async function(formData){
    const user = await getUserFromCookie();
     if (!user) {
        redirect('/');
    }
        //delete in db
        const todoCollection = await getCollection('todos')
        let todoId = formData?.get('id')
        if(!todoId){
            return {success:false,message:'invalid todo id'}
        }
    
        //make sure author update the id
        let checkAuthor = await todoCollection.findOne({_id:ObjectId.createFromHexString(todoId)})
        
        if(checkAuthor?.userId != user.userId){
            return redirect("/")
        }
    
        await todoCollection.deleteOne({_id:ObjectId.createFromHexString(todoId)})
    
        return redirect("/")

}

export const editTodo = async function(prevState,formData){
    let todo = formData?.get('todoData')
    
    const user = await getUserFromCookie();
     if (!user) {
        redirect('/');
    }
    
    if(todo == ""){
        return {success:false,message:'Field is required'}
    }

    let payload = {
        userId:user.userId,
        todo:todo
    }

    //update in db
    const todoCollection = await getCollection('todos')
    let todoId = formData?.get('todoId')
    if(!todoId){
        return {success:false,message:'invalid todo id'}
    }

    //make sure author update the id
    let checkAuthor = await todoCollection.findOne({_id:ObjectId.createFromHexString(todoId)})
    
    if(checkAuthor?.userId != user.userId){
        return redirect("/")
    }

    await todoCollection.findOneAndUpdate({_id:ObjectId.createFromHexString(todoId)},{$set:payload})

    return redirect("/")
}


export const createTodo = async function (prevState, formData) {
    
    let todo = formData?.get('todoData')
    
    const user = await getUserFromCookie();
     if (!user) {
        redirect('/');
    }
    
    if(todo == ""){
        return {success:false,message:'Field is required'}
    }

    let payload = {
        userId:user.userId,
        todo:todo
    }

    //save in db
    const todoCollection = await getCollection('todos')
    
    const newTodo = await todoCollection.insertOne(payload)
    return redirect("/")
    
  
};