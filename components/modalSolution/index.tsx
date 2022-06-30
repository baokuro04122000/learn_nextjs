import React from 'react'
import styles from './modal.module.scss'
import type { AppProps } from 'next/app'

type ModalProps = {
  isVisible?: boolean;
}
//tcl-modal__wrapper
const ModalSolution:React.FC<ModalProps>  = ({
   isVisible
}) => {
  return (
    <div className={styles.tcl_modal__wrapper}>
      <div className={styles.tcl_mask}></div>
      <div className={styles.tcl_dialog}>
        <div className={styles.tcl_modal__content}>
          <div className={styles.tcl_modal__header}>
            Title demo
          </div>
          <button className={styles.tcl_modal__close}>X</button>
        </div>
        <div className={styles.tcl_modal__body}>
          
        </div>
        <div className={styles.tcl_modal__footer}></div>
      </div>
    </div>
  )
}

export default ModalSolution;