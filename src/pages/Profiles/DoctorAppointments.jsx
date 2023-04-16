import React from 'react'
import { useGetDoctorApointmentsQuery } from '../../features/appointment/appointmentApiSlice'
import { selectProfile } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import './DoctorAppointments.css'
function DoctorAppointments() {
  const profile = useSelector(selectProfile)
  const { data, isLoading } = useGetDoctorApointmentsQuery(profile?.id,{ refetchOnMountOrArgChange: true })

  return isLoading ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : data ? (
    <div className="doctor-appointments-container">
      {data.map((appointment) => (
        <div key={appointment.id} className="appointment-card">
          <h3>{appointment.patient_name}</h3>
          <p>{appointment.date}</p>
          <span>{appointment?.time_slot?.start_time}</span>
          <span> - {appointment?.time_slot?.end_time}</span>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default DoctorAppointments
