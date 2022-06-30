import React, { useState } from 'react'
import ModalTest from '../../components/modalSolution'


const solutionModal = () => {

  const [openModal, setOpenModal] = useState(false);

  
  const handleChangeStateModal = () => {
    setOpenModal(!openModal)
  }
  
  return (
    <div className="container">
      <ModalTest
        isVisible={false}
      >
        <h2>Demo Modal</h2>
        <form>
          <input type="text" />
        </form>
      </ModalTest>
      <button onClick={handleChangeStateModal}>button</button>
    </div>
  )
}
export default solutionModal