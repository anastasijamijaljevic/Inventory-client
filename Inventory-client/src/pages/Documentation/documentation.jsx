/* eslint-disable react/prop-types */
import React from 'react';

function InventoryDocumentation({ action, inventory, worker }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const currentDateTime = new Date();
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).replace(/\//g, '.');

  const randomPhrasesForCharging = [
    'Project Use',
    'Event Preparation',
    'Temporary Deployment',
    'Training',
    'Workshop',
    'Client Demonstration',
    'Marketing Campaign',
    'Research Experiment',
    'Product Development',
  ];

  const randomPhrasesForDischarging = [
    'Project Completion',
    'Event Conclusion',
    'End of Use',
    'Task Accomplishment',
    'Loan Return',
    'Campaign Conclusion',
    'Training Completion',
    'Research Analysis',
    'Product Testing',
  ];

  const randomIndexCharge = Math.floor(Math.random() * randomPhrasesForCharging.length);
  const randomPhraseCharge = randomPhrasesForCharging[randomIndexCharge];

  const randomIndexDischarge = Math.floor(Math.random() * randomPhrasesForDischarging.length);
  const randomPhraseDischarge = randomPhrasesForDischarging[randomIndexDischarge];

  return (
    <div>
      <h2>Inventory Management Documentation</h2>

      <h3>Statement of {action === 'charge' ? 'Charging' : 'Discharging'} Inventory</h3>

      <p>
        I, {userInfo.username}, hereby confirm that on {formattedDate}, I have{' '}
        {action === 'charge' ? 'charged' : 'discharged'} the following items from our inventory:
      </p>

      {inventory.map((item, index) => (
        <div key={index}>
          <p>Item {index + 1}:</p>
          <p>Name: {item.name}</p>
          <p>Serial Number: {item.serialNumber}</p>
          <p>Mark: {item.mark}</p>
          <p>Model: {item.model}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}

      <p>
        These items have been {action === 'charge' ? 'taken from' : 'returned to'} our inventory
        for the purpose of {action === 'charge' ? randomPhraseCharge : randomPhraseDischarge}. I{' '}
        {action === 'charge' ? 'acknowledge my responsibility' : 'understand'} to ensure the
        proper use and {action === 'charge' ? 'accountability' : 'return'} of these items.
      </p>

      <p>
        By {action === 'charge' ? 'charging' : 'discharging'} these items, I affirm their role in supporting {action === 'charge' ? 'various projects and tasks' : 'successful operations'} within the organization.
        The utilization of these items contributes to the achievement of {action === 'charge' ? 'project goals and objectives' : 'task milestones and objectives'}.
      </p>

      <p>
        It is essential to recognize that these items play a vital role in our operational processes, enhancing our capabilities during {action === 'charge' ? 'project execution' : 'task completion'}.
        Their return after {action === 'charge' ? 'project completion' : 'successful use'} signifies the conclusion of their involvement.
      </p>

      <p>
        Signed: {worker ?(<p>{worker.name} {worker.surname}</p>) : (<p>No Signature</p>)}<br />
        <br />
        {formattedDate}
      </p>
    </div>
  );
}

export default InventoryDocumentation;
