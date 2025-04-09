import React from 'react'
import "../../Styles/Page404.css"; // Import your CSS file for styling

const NotFound = () => {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="content_wrapper">
              {/* 404 text positioned above the image */}
              <div className="error_heading">
                <h1>404</h1>
              </div>
              
              {/* Image container with no text inside */}
              <div className="four_zero_four_bg">
                
              </div>
              
              {/* Content below the image */}
              <div className="contant_box_404">
                <h3>Look like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <a href="/" className="link_404">Go to Home</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFound