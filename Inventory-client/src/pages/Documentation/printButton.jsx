import React from 'react';
import ReactDOMServer from 'react-dom/server';
import InventoryDocumentation from './documentation';


export const printInventoryDocumentation = (action, inventory, worker, image, roomCount) => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Print</title></head><body>');

  // Render the InventoryDocumentation component into the print window
  const componentHtml = ReactDOMServer.renderToString(<InventoryDocumentation action={action} inventory={inventory} worker={worker} image={image} roomCount={roomCount}/>);
  printWindow.document.write(componentHtml);

  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};
