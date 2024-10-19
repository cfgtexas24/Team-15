export interface Company {
    id?: string; // Optional because Firestore generates it
    name: string;
}

export interface JobPosting {
    id?: string; 
    name: string;
    location: string;
    industry: string;
}