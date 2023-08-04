import React from 'react';
import ReactDOMServer from 'react-dom/server';
import InventoryDocumentation from './documentation';

export const printInventoryDocumentation = () => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Print</title></head><body>');
  printWindow.document.write('<div style="padding: 20px;">'); // Styling for printing
  printWindow.document.write('<h1>Inventory Documentation</h1>');

  // Render the InventoryDocumentation component into the print window
  const componentHtml = ReactDOMServer.renderToString(<InventoryDocumentation/>);
  printWindow.document.write(componentHtml);

  printWindow.document.write('</div></body></html>');
  printWindow.document.close();
  printWindow.print();
};
