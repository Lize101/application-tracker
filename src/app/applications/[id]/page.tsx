import supabaseConnection from "@/lib/supabase";
import EditForm from "@/components/EditForm";

export default async function EditPage( { params }: {params: Promise<{id: string}>} ){

    const { id } = await params;
    console.log(id);

    const { data } = await supabaseConnection.from('applications').select('*').eq('id', id).single();
    console.log(data);

    return (
        <div>
            <EditForm application={data}/>
        </div>
    )
}