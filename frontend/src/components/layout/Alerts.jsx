import React, { useContext } from 'react'
import AlertContext from '../../context/alerts/alertContext'

const Alerts = () => {

    const alertContext = useContext(AlertContext);

    const { setAlert,alerts } = alertContext;

  return (
      alerts.length > 0 && alerts.map(alert => {
        return (
          // <ToastContainer autoClose={5000} />
            
              <div key={alert.id} className={`alert alert-${alert.type}`} >
                <i className="fas fa-info-circle">{ alert.msg}</i>
              </div>
          )
      })
  )
}

export default Alerts