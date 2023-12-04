const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index');

async function createInvoice(data) {
    try {
        const result = await new Promise((resolve, reject) => {
            pdf.create(pdfTemplate(data), {}).toBuffer((err, buffer) => {
                if (err) reject(err);
                resolve(buffer);
            });
        });

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createInvoice
};
