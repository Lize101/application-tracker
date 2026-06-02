'use client' //Client component

import { useForm } from "react-hook-form";
import supabaseConnection from "@/lib/supabase";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const applicationSchema = z.object({
    job_title: z.string().min(1, 'Job title is required here'),
    company: z.string().min(1, 'Company name is required here'),
    salary: z.string().optional(),
    status: z.string().min(1, 'Status is required here'),
    date_applied: z.string().optional(),
    notes: z.string().optional(),
    feedback: z.string().optional(),
    job_url: z.string().optional()
})

type ApplicationForm = z.infer<typeof applicationSchema>

export default function ApplicationPage(){

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ApplicationForm>({resolver: zodResolver(applicationSchema)});

    const onSubmit = async (data: ApplicationForm) => {
        try {
            await supabaseConnection.from('applications').insert(data)
            reset()
        } catch (err) {
            console.error('There is an error:', err)
        }
    }

    return(
        <>
            <h1>Applications</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="job_title">Job Title *</label>
                <input {...register('job_title')} id="job_title" type="text"/>
                {errors.job_title && <p>{errors.job_title.message as string}</p>}

                <label htmlFor="company">Company *</label>
                <input {...register('company')} id="company" type="text"/>
                {errors.company && <p>{errors.company.message as string}</p>}

                <label htmlFor="salary">Salary</label>
                <input {...register('salary')} id="salary" type="text"/>

                <label htmlFor="status">Status *</label>
                <select {...register('status')} id="status">
                    <option value="">Select Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
                {errors.status && <p>{errors.status.message as string}</p>}

                <label htmlFor="date_applied">Date Applied</label>
                <input {...register('date_applied')} id="date_applied" type="date"/>

                <label htmlFor="notes">Notes</label>
                <textarea {...register('notes')} id="notes"/>

                <label htmlFor="feedback">Feedback</label>
                <textarea {...register('feedback')} id="feedback"/>

                <label htmlFor="job_url">Job URL</label>
                <input {...register('job_url')} id="job_url" type="url"/>

                <button type="submit">Add to job tracker</button>
            </form>
        </>
    )
}
