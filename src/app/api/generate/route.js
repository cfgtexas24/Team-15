// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.

export async function POST(req, res) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI 
        const genAI = new GoogleGenerativeAI('') // INSERT API KEY HERE

        // Ininitalize the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()

        const context = "Assume you are a recruiter creating a job posting. I want you to include the job title, description (includes list of different qualifications), salary range, and if it is remote or in person (location). "
        // Stores the prompt asked by the user
        const prompt = context + data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}