import ContactDetails from '@/components/contact/ContactDetails'
import ContactForm from '@/components/contact/ContactForm'
import ContactSection from '@/components/contact/ContactSection'
import MapSection from '@/components/contact/MapSection'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
    return (
        <>
            <div className="bg-[url('/assets/home/home-page-hero-img.svg')] bg-cover bg-center bg-no-repeat">
                <Navbar />
                <ContactSection />
            </div>
            <section className="relative w-full py-24 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <ContactDetails />
                    <ContactForm />
                </div>
            </section>
            <MapSection />
        </>
    )
}

export default page