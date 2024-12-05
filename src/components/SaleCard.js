import { useState } from "react"
import ReceiptModal from "./ReceiptModal"

const SaleCard = ({info}) => {

  const [classNm, setClassNm] = useState('d-none')
  const handleClick = () => setClassNm('d-block')

  return (
    
    <div className="accordion accordion-flush mt-2 col-md-3" id={info.serial}>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed shadow-none border-0 btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#${info._id}`}>
            {info.serial}
          </button>
        </h2>
        <div id={info._id} className="accordion-collapse collapse" data-bs-parent={`#${info.serial}`}>
          <div className="accordion-body text-end">
            <div> <span className="fst-italic fw-bold">customer</span> : {info.customer.toUpperCase()} </div>
            <div> <span className="fst-italic fw-bold">number</span> : {info.msisdn} </div>
            <div> <span className="fst-italic fw-bold">mpesa tid</span> :  {info.mpesa}</div>
            <div> <span className="fst-italic fw-bold">sold by</span> : {info.seller.toUpperCase()}</div>
            <div className="my-2"><button className="btn btn-primary" onClick={handleClick}>POST SALE</button></div>
            <ReceiptModal classNm={classNm}/>
         </div>
        </div>
      </div>
    </div>
  )

}

export default SaleCard
