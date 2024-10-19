export interface Company {
    id?: string; // Optional because Firestore generates it
    name: string;
}

export interface JobPosting {
    id?: string; 
    name: string;
    location: string;
    industry: string;

    // these two are numbers because no need for string
    minSalary: number; 
    maxSalary: number;
}

export interface Recruiter{

}

export interface JobsApplied{
    jobID: string;
    status: string;
    empID: string;
}

export interface ContactInfo{
    id: string;
    email: string;
    phone: string;
    linkedin: string;
}

export interface Employees{
    empID: string;
    name: string;
    resume: string; // Temporarily set to string
    skills: string;
    jobsApplied: string;
}