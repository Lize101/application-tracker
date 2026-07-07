export interface Application {
    id: string;
    job_title: string;
    company: string
    salary: string | null;
    status: string;
    date_applied: string | null;
    notes: string | null;
    feedback: string | null;
    job_url: string | null;
    created_at: string
}