
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST 

export async function POST(req, res) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI 
        const genAI = new GoogleGenerativeAI(process.env.NEXT_GOOGLE_GEMINI_KEY)
        const jobPostingSchema = {
            description: "Job Posting Details",
            type: SchemaType.OBJECT,  // Defining the main type as an object
            properties: {
              job_title: {
                type: SchemaType.STRING,
                description: "Title of the job",
                nullable: false,
              },
              description: {
                type: SchemaType.STRING,
                description: "Detailed description of the job",
                nullable: false,
              },
              salary_range: {
                type: SchemaType.STRING,
                description: "Salary range for the position",
                nullable: false,
              },
              remote_or_in_person: {
                type: SchemaType.STRING,
                description: "Job location type (Remote, In-Person, Hybrid)",
                enum: ["Remote", "In-Person", "Hybrid"], // Possible values
                nullable: false,
              },
              responsibilities: {
                type: SchemaType.ARRAY,
                description: "List of job responsibilities",
                items: {
                  type: SchemaType.STRING,
                },
                nullable: false,
              },
              qualifications: {
                type: SchemaType.ARRAY,
                description: "List of required qualifications",
                items: {
                  type: SchemaType.STRING,
                },
                nullable: false,
              },
              bonus_points: {
                type: SchemaType.ARRAY,
                description: "List of bonus qualifications (optional)",
                items: {
                  type: SchemaType.STRING,
                },
                nullable: true,  // Marking this field as optional
              },
            },
            required: [
              "job_title",
              "description",
              "salary_range",
              "remote_or_in_person",
              "responsibilities",
              "qualifications",
            ],  // Required fields for the schema
          };
          
        // Ininitalize the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: {
            responseMimeType: "application/json",
            responseSchema: jobPostingSchema,
          } })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()

        const context = "Assume you are a recruiter creating a job posting. I want you to include the job title, description (includes list of different qualifications), salary range, and if it is remote or in person (location). "
        // Stores the prompt asked by the user
        const prompt = context + data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        console.log(output)

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}