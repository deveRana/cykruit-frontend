import JobPageHeader from '@/components/jobs/JobPageHeader'
import JobsListing from '@/components/jobs/JobsListing'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const JobsPage = () => {
    return (
        <>
            <div className="bg-[url('/assets/home/home-page-hero-img.svg')] bg-cover bg-center bg-no-repeat">
                <Navbar />
                <JobPageHeader />
            </div>
            <JobsListing />
        </>
    )
}

export default JobsPage