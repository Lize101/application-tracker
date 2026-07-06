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
        <button onClick={handleDelete} className="bg-red-600 hover:bg-red-900 text-white border p-2 rounded ml-0 xl:ml-2">Delete</button>
    )
}