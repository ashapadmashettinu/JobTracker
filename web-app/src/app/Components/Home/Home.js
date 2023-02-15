import logo from './homelogo1.jpeg';
import logo2 from './homelogo2.jpeg';
import logo3 from './homelogo3.jpeg';
import React, {useState} from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './Home.scss';
import { useNavigate } from "react-router-dom";

export function HomeComponent() {
    const [index, setIndex] = useState(0);
    let navigate = useNavigate();
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const redirect= (i) =>{
        if(i===0){
            navigate("/jobs");
          }else if(i===1){
            navigate("/job-post");
            }
            else{
                navigate("/job-tracker");
            }
    }
  
    return (
        <>
        <Container>
        <h3 className="homeHeader">Job Tracker makes it easy to apply and track your jobs!!!!</h3>
        <div className="home-container">
        
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item onClick={() => redirect(0)}>
        <Carousel.Caption>
            <h3>Search and Apply Jobs</h3>
            <p>Need a jobs?? Find the jobs and apply at any time. </p>
          </Carousel.Caption>
          <img
            className="d-block w-100"
            src={logo2}
            alt="First slide"
          />
          
        </Carousel.Item>
        <Carousel.Item onClick={() =>  redirect(1)}>
          <img
            className="d-block w-100"
            src={logo}
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Post Jobs</h3>
            <p>Own a Company or Need to recruit...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() =>  redirect(2)}>
          <img
            className="d-block w-100"
            src={logo3}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Job Tracking</h3>
            <p>
             You may check your applications and what their status is!!!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
      </Container>
      </>
    );
  }