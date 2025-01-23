//Create an interface for the Candidate objects returned by the API

export interface CandidateProps {
    id: number;
    html_url: string;
    avatar_url: string;
    name: string;
    login: string;
    location: string;
    email: string;
    company: string;
    bio: string;
    status: string;
}