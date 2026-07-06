import supabaseConnection from "@/lib/supabase";
import EditForm from "@/components/EditForm";
import Link from "next/link";

export default async function EditPage( { params }: {params: Promise<{id: string}>} ){

    const { id } = await params;

    const { data, error } = await supabaseConnection.from('applications').select('*').eq('id', id).single();

    if(error){
        return(
            <div className='text-red-600'>
                <p>There has been an error returning your data.</p>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-end">
                <Link href="/" className="text-right mb-10 text-lg mr-4 sm:mr-10 mt-10 hover:text-blue-600">← Back to Job Listing</Link>
            </div>
            <EditForm application={data}/>
        </>
    )
}