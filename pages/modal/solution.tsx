import React, { useState } from 'react'


const solutionModal = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openModal, setOpenModal] = useState(false)

  
  const handleChangeStateModal = () => {
    setOpenModal(!openModal)
  }
  
  return (
    <div className="container">
      
      <button onClick={handleChangeStateModal}>button</button>
    </div>
  )
}
export default solutionModal