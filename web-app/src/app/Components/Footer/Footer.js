import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="main-footer">
        <div className= "container">
        <p class="Footer__address">
			360 Huntington Ave., Boston, Massachusetts 02115
			| <a class="primary-link" href="tel:·617.373.2000" aria-label="· 6 1. 7 . 3. 7 3 . 2. 0 0 0 ">· 617.373.2000</a>
			| <a class="primary-link" href="tel:·TTY617.373.3768" aria-label="· T T. Y 6 1. 7 . 3 7. 3 . 3 7 6 8 ">· TTY 617.373.3768</a>
			  | <a href="https://www.northeastern.edu/emergency-information" target="_blank">Emergency Information</a>

      </p>
      
       
        <p className = "text-xs-center">
            &copy;{new Date().getFullYear()} Job Tracker App - All Rights Reserved
            </p>
        </div>
        
        </div>
      
  );
}

export default Footer;