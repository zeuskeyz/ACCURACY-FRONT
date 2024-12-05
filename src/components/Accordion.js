import React from 'react'

const Accordion = ({accordData}) => {

    return (
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <div className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${accordData._id}`}>
                        {accordData.phone} - {accordData.serials.length} Items
                    </div>
                </h2>
                <div id={accordData._id} className="accordion-collapse collapse" data-bs-parent="#serialsAccordion">
                    <div className="accordion-body">
                        <div className='row'>
                            {accordData.serials?.map((serial, index) => <div className='col-md-2 col-6 px-0 text-sm-centre' key={index} > <h6 className='fs-6'>{serial} </h6> </div>)}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Accordion
