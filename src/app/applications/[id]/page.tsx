import supabaseConnection from "@/lib/supabase";
import EditForm from "@/components/EditForm";

export default async function EditPage( { params }: {params: Promise<{id: string}>} ){

    const { id } = await params;

    const { data, error } = await supabaseConnection.from('applications').select('*').eq('id', id).single();

    if(error){
        return(
            <div>
                <p>There has been an error returning your data.</p>
            </div>
        )
    }

    return (
        <div>
            <EditForm application={data}/>
        </div>
    )
}