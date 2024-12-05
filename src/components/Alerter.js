import { Toaster } from "react-hot-toast"

const Alerter = ({ type, message }) => {
    return (

        <Toaster
            position="bottom-right"
            toastOptions={{
                style: { border: '1px solid #3B71CA', color: '#3B71CA', background: 'transparent' },
                iconTheme: { primary: '#3B71CA', secondary: 'white' }
            }}
        />
    )
}

export default Alerter

/*
  <div className={`alert alert-${type} alert-dismissible fade mb-3`}  role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" ></button>
  </div> 
*/