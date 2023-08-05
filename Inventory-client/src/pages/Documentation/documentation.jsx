/* eslint-disable react/prop-types */
import React from 'react';

function InventoryDocumentation({ action }) {

    const currentDateTime = new Date()
      const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
  return (
    <div>
      <h2>Inventory Management Documentation</h2>

      <h3>Statement of Inventory {action === 'charge' ? 'Charge' : 'Discharge'}</h3>

      <p>
        I, [Your Name], hereby confirm that on {formattedDate.toString()}, I have{' '}
        {action === 'charge' ? 'charged' : 'discharged'} the following items of inventory:
      </p>

      {/* <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}

      <p>
        These items have been {action === 'charge' ? 'taken from' : 'returned to'} our inventory
        for the purpose of [Specify Purpose, e.g., project, event, etc.]. I{' '}
        {action === 'charge' ? 'understand my responsibility' : 'acknowledge'} for ensuring the
        proper use and {action === 'charge' ? 'return' : 'accountability'} of these items.
      </p>

      <p>
        Signed: ___________________<br />
        [Your Name]<br />
        [Your Title/Position]<br />
        [Date of Signature]
      </p>
    </div>
  );
}

export default InventoryDocumentation;
