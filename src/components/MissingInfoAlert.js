import { NavLink } from "react-router-dom";

const MissingInfoAlert = ({ message, linkText, path }) => {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <p className="mb-4 fs-4">Oops! Data Missing ... <br/>Please consider adding data first. </p>
          <div className=" bg-light p-3 rounded-pill">
              <NavLink className="mx-5 text-secondary text-decoration-none" to={path}>{linkText}</NavLink>
          </div>
        </div>
      </div>
    );
  };
  
export default MissingInfoAlert;