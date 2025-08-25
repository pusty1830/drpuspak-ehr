import React from 'react'
import { useLocation } from 'react-router-dom'

function PrescriptionDetails() {

    const location=useLocation()
    const { prescription } = location.state || {};
  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto bg-white   p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Prescription Details
        </h2>
    
        {/* Condition */}
        {prescription?.condition && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Condition</h3>
            <p className="text-gray-800">{prescription.condition}</p>
          </div>
        )}
    
        {/* Medicines */}
        {prescription?.drug?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Medicines</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {prescription.drug.map((med, i) => (
                <li key={i}>
                  {med.name} — {med.dose}, {med.freq} for {med.days} days
                </li>
              ))}
            </ul>
          </div>
        )}
    
        {/* Next Visit */}
        {prescription?.nextVisit && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Next Visit</h3>
            <p className="text-gray-800">{prescription.nextVisit}</p>
          </div>
        )}
    
        {/* Notes */}
        {prescription?.messages && (
          <div>
            <h3 className="font-semibold text-gray-700">Notes</h3>
            <p className="text-gray-800">{prescription.messages}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default PrescriptionDetails
