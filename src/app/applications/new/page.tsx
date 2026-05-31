'use client' //Client component

import { useForm } from "react-hook-form";
import supabaseConnection from "@/lib/supabase";

export default function ApplicationPage(){

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
        reset()
    }

    return(
        <>
            <h1>Applications</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="job_title">Job Title *</label>
                <input {...register('job_title', {required: 'Job title is required'})} id="job_title" type="text"/>
                {errors.job_title && <p>{errors.job_title.message as string}</p>}

                <label htmlFor="company">Company *</label>
                <input {...register('company', {required: 'Company name is required'})} id="company" type="text"/>
                {errors.company && <p>{errors.company.message as string}</p>}

                <label htmlFor="salary">Salary</label>
                <input {...register('salary')} id="salary" type="text"/>

                <label htmlFor="status">Status *</label>
                <select {...register('status', {required: 'Status is required'})} id="status">
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
