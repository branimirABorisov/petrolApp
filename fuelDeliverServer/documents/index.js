module.exports = (data) => {
    console.log('template', data);
    let barcodeData = data.orderNumber;
    let totalPrice = 0;
    const productsHTML = data.items.map(product => {
        const productValue = parseFloat(product.product_data.value);
    
        if (!isNaN(productValue)) {
            totalPrice += productValue;
    
            return `
                <tr>
                    <td>${product.product_data.name}</td>
                    <td>${product.quantity}</td>
                    <td>$${productValue.toFixed(2)}</td>
                </tr>
            `;
        } else {
            return '';
        }
    }).join('');
        

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/qrcode-generator/qrcode.min.js"></script>
        <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
        <script type="text/javascript" src="JsBarcode.all.min.js"></script>
        <title>Invoice Number: </title>
    </head>
    <body>
        <style>
     .invoice-box {
                 margin: 0;
                 padding: 15px;
                 border: 1px solid #eee;
                 box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                 font-size: 12px;
                 line-height: 14px;
                 font-family: 'Helvetica Neue', 'Helvetica';
                 color: #555;
                 }
      .invoice-header {
        color: white;
        padding: 5px 25px 5px 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #1C2434;
      }
      img {
        width: 180px;
      }
      .invoice-info {
        padding: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .sender p, .reciver p {
        font-weight: 600;
        text-align: left;
        margin: 4px 0;
    }
    .items {
      margin: 40px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    thead {
      background-color: #1C2434;
      color: #fff;
    }
    thead td {
      padding: 10px;
      text-align: center;
    }
    tbody tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tbody td {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    tbody td:first-child {
      font-weight: bold;
      color: #333;
    }
    tbody td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    tfoot td:last-child {
      color: white;
      font-weight: 600;
      text-align: center;
      padding: 15px;
      background-color: #1C2434;
      
    }
        </style>
        <div class="invoice-box">
        <header style="color: white; padding: 5px 25px 5px 25px; display: flex; flex-direction: row; align-items: center; background-color: #1C2434;">
        <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="color: white; padding: 5px 25px 5px 25px; background-color: #1C2434; border-bottom: none;">
                <img src="https://firebasestorage.googleapis.com/v0/b/nextjs-e-commerce-storage.appspot.com/o/fuelImages%2FBG%20PETROL(1).png?alt=media&token=547721da-9a40-417a-8d06-84d293f7d9c3" alt="invoice-logo" style="width: 180px;">
            </td>
            <td style="color: white; padding: 5px 25px 5px 25px; background-color: #1C2434; border-bottom: none;">
                <h3 class="heading" style="margin-left: 10px;">Order number: ${barcodeData}</h3>
            </td>
        </tr>
    </table>
    
        </header>
        <div class="invoice-info">
        <table>
        <tr>
        
        <td class="barcode-container" style="vertical-align: center; text-align: center;">
        <div id="qrcode"></div>
        </td>

    </tr>
        </table>
        <table style="width: 100%; border-collapse: collapse;">
          
            <tr>
                <td class="sender" style="vertical-align: top; text-align: left;">
                    <h3>Sender</h3>
                    <p>Company: EU petrol</p>
                    <p>Owner: Branimir Borisov</p>
                    <p>VAT: 205916305</p>
                    <p>Address: Sofia, Krasno selo 201-A</p>
                    <p>Email: lansan608@gmail.com</p>
                </td>
                <td style="width: 20px;"></td>
                <td class="barcode-container" style="vertical-align: center; text-align: center;">
                    <div id="qrcode"></div>
                </td>
                <td class="reciver" style="vertical-align: top; text-align: left;">
                    <h3>Recipient</h3>
                    <p>Company: ${data.companyName}</p>
                    <p>Owner: ${data.name}</p>
                    <p>VAT: ${data.vat}</p>
                    <p>Address: ${data.address}</p>
                    <p>Email: ${data.email}</p>
                </td>
                
            </tr>
        </table>
    </div>
    
            <div class="items">
                <table>
                    <thead>
                        <tr>
                            <td>Product</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHTML}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total: $${totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <script>
        
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: "${barcodeData}",
            width: 128,
            height: 128,
        });
    </script>
    </body>
    </html>`;
};
