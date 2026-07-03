import supabaseConnection from '@/lib/supabase';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

export default async function Home() {

const { data } = await supabaseConnection.from('applications').select('*').order('created_at', {ascending: false});

  return (
    <main>
      <h1 className="text-3xl font-bold">Job Application Tracker</h1>
      <Link href="/applications/new">Add New Application</Link>
      <table>
        <thead>
            <tr>
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
                <td>{app.status}</td>
                <td>{app.date_applied}</td>
                <td>{app.notes}</td>
                <td>{app.feedback}</td>
                <td>{app.job_url}</td>
                <td>
                  <Link href={`/applications/${app.id}/`}>Edit</Link>
                  <DeleteButton id={app.id}/>
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
    </main>
  );
}
