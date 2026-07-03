'use client'

import supabaseConnection from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DeleteButton( { id }: {id: string} ) {

    const router = useRouter();

    const handleDelete = async () => {
        await supabaseConnection.from('applications').delete().eq('id', id)
        router.refresh();
    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}