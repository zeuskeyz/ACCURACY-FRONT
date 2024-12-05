import { NavLink } from "react-router-dom"

export const FormHeader = ({text, path}) => {
    return (
        <>
            <div className="d-flex justify-content-between mb-3 align-items-baseline">
                <div>
                    <h4 className="card-title text-center">{text}</h4>
                </div>

                <div className=" bg-light p-2 rounded-pill">
                    <NavLink className="mx-4 text-secondary text-decoration-none" to={path}>BACK</NavLink>
                </div>
            </div>

        </>
    )
}

