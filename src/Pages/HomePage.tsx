import React from 'react';
import Navbar from '../Components/nav/NavBar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

const HomePage = (props) => {
  // console.log(props.products);
  return (
    <div>
      <>
        <Navbar />
        <Hero />
        <About />
        <Projects products={props.products} />
        <Skills />
        <Contact />
      </>
    </div>
  );
};

export default HomePage;
