import supabaseConnection from '@/lib/supabase';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

export default async function Home() {

const { data, error } = await supabaseConnection.from('applications').select('*').order('created_at', {ascending: false});

if(error) {
  return (
    <div className='text-red-600'>
      <p>There has been an error returning your data.</p>
    </div>
  )
}

  return (
    <main className='max-w-full md:max-w-7xl mx-auto px-2 py-10'>
      <h1 className="text-3xl font-bold my-14">Job Application Tracker</h1>
      <Link href="/applications/new" className='bg-blue-500 hover:bg-blue-700 p-4 text-white text-lg rounded'>Add New Application</Link>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
              <tr className='text-xl'>
                <th>Job Title</th>
                <th>Company</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Notes</th>
                <th>Feedback</th>
                <th>Job URL</th>
                <th>Actions</th>
              </tr>
          </thead>
          {data?.length > 0 ? (<tbody>
            {data?.map((app) => {
              return (
                <tr key={app.id}>
                  <td>{app.job_title}</td>
                  <td>{app.company}</td>
                  <td>{app.salary}</td>
                  <td className=
                  {app.status === 'Applied' ? 'text-blue-600' : 
                  app.status === 'Interview' ? 'text-amber-400' :
                  app.status === 'Offer' ? 'text-green-600' :
                  app.status === 'Rejected' ? 'text-red-600' : ''}>{app.status}</td>
                  <td>{app.date_applied}</td>
                  <td>{app.notes}</td>
                  <td>{app.feedback}</td>
                  <td>{app.job_url}</td>
                  <td>
                    <div className='flex gap-2 items-center'>
                      <Link href={`/applications/${app.id}/`} className='bg-amber-600 hover:bg-amber-400 text-white border p-2 rounded'>Edit</Link>
                      <DeleteButton id={app.id}/>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>) : 
          (<tbody>
            <tr>
              <td colSpan={9}>
                No applications added yet
              </td>
            </tr>
          </tbody>)}
        </table>
      </div>
    </main>
  );
}
