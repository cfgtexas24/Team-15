import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST requests
export async function POST(req, res) {
    try {
        // Access your API key by creating an instance of GoogleGenerativeAI
        const genAI = new GoogleGenerativeAI(process.env.NEXT_GOOGLE_GEMINI_KEY);

        // Define the schema for job posting details
        const jobPostingSchema = {
            description: "Job Posting Details",
            type: SchemaType.OBJECT,  // Main type as an object
            properties: {
                id: {
                    type: SchemaType.NUMBER,
                    description: "Unique identifier for the job posting",
                    nullable: false,
                },
                name: {
                    type: SchemaType.STRING,
                    description: "Title of the job (e.g., Software Engineer Intern)",
                    nullable: false,
                },
                location: {
                    type: SchemaType.STRING,
                    description: "Full address of the job location",
                    nullable: false,
                },
                company: {
                    type: SchemaType.STRING,
                    description: "Name of the company offering the job",
                    nullable: false,
                },
                desc: {
                    type: SchemaType.STRING,
                    description: "Detailed description of the job role and responsibilities",
                    nullable: false,
                },
                requirements: {
                    type: SchemaType.ARRAY,
                    description: "List of job requirements or qualifications",
                    items: {
                        type: SchemaType.STRING,
                    },
                    nullable: false,
                },
                salary: {
                    type: SchemaType.STRING,
                    description: "Salary information (e.g., hourly or annual pay)",
                    nullable: false,
                },
            },
            required: [
                "id",
                "name",
                "location",
                "company",
                "desc",
                "requirements",
                "salary",
            ],  // Required fields for the schema
        };

        // Initialize the model with schema validation
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: jobPostingSchema,
            },
        });

        // Retrieve the data from the request body
        const data = await req.json();

        // Context for the prompt to generate job posting content
        const context =
            "Assume you are a recruiter creating a job posting. I want you to include the job title, company name, location, detailed description, salary, and a list of requirements. For any incomplete or erroneous looking fields, replace them with the correct and more specific info.";
        
        // Combine the context with the request body
        const prompt = context + data.body;

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();

        console.log(output);

        // Send the LLM output as a JSON response
        return NextResponse.json({ output: output });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while generating the content." }, { status: 500 });
    }
}
