import DashboardHeader from "@/components/employer/dashboard/dashboard-header";
import DashboardContent from "@/components/employer/dashboard/DashboardContent";


export default function EmployerDashboard() {
  const stats = {
    activeJobs: 12,
    totalApplicants: 540,
    newApplicants: 34,
    interviews: 18,
    hired: 6,
  };

  const recentJobs = [
    { id: 1, title: 'Penetration Tester', priority: 'high', applicants: 38, salary: '₹8L', status: 'Active', postedDate: '1d ago' },
    { id: 2, title: 'Security Analyst', priority: 'medium', applicants: 27, salary: '₹9L', status: 'Active', postedDate: '3d ago' },
  ];

  const upcomingInterviews = [
    { id: 1, candidate: 'Rohit Sharma', position: 'Penetration Tester', type: 'Technical', date: 'Sep 30', time: '10:00 AM' },
    { id: 2, candidate: 'Anjali Verma', position: 'Security Analyst', type: 'HR Round', date: 'Oct 1', time: '2:00 PM' },
  ];

  const recentApplicants = [
    { id: 1, avatar: 'RS', name: 'Rohit Sharma', position: 'Penetration Tester', experience: '3y exp', rating: 4.7, matchScore: 90, status: 'Shortlisted' },
    { id: 2, avatar: 'AV', name: 'Anjali Verma', position: 'Security Analyst', experience: '2y exp', rating: 4.6, matchScore: 88, status: 'Interview Scheduled' },
  ];


  return <>

    <DashboardHeader />
    <main className="p-8">
      <DashboardContent stats={stats} recentJobs={recentJobs} upcomingInterviews={upcomingInterviews} recentApplicants={recentApplicants} />
    </main >
  </>;
}
