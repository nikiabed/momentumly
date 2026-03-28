import { NextRequest, NextResponse } from "next/server"
import "../../../db.json"

let todos = [{ id: "", title: "string", status: false }]

// const todos = 
export async function GET(request:NextRequest) {
    // const todos = NextResponse(JSON.stringify(db))
    try {
        return new Response(JSON.stringify(todos), {status:200})
    } catch(error) {
        return new Response(JSON.stringify({"error":error}),{status:500})
    }
}

export async function POST(request:NextRequest) {
    try {
        let newTodo = await request.json()
        todos.push(newTodo)
        return new Response(JSON.stringify(todos),{status:201})
    } catch(error) {
        return new Response(JSON.stringify({"alert": "invalid data"}), {status:400})
    }
}

export async function PUT(request:NextRequest) {
    try {
        let updatedProduct = await request.json()
        let index = todos.findIndex((todo:any)=> todo.id == updatedProduct.id )
        if (index== -1) {
            return new Response(JSON.stringify({"alert":"not found"}), {status:404})
        }
        todos[index] = updatedProduct
        return new Response(JSON.stringify(todos),{status:200})
    } catch(error){
        new Response(JSON.stringify({"alert":"invalid data"}), {status:500})
    }
}