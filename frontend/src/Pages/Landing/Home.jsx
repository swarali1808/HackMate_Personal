import React from 'react'
import Header from './Header';
import HeroSection from './HeroSection';
import Features from './Features'
import Footer from './Footer';
import FlowTimeLine from './FlowTimeLine';

const Home = () => {
  return (
    <div className='h-auto w-full'>
      <Header />
      <HeroSection />
      <Features />
      <FlowTimeLine />
      <Footer />
    </div>
  )
}

export default Home