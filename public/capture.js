const { jsPDF } = window.jspdf;

        function SectionCapture(button_id, target_id, imgname) {
            document.getElementById(button_id).addEventListener('click', async function () {
                // Capture the section using html2canvas
                const canvas = await html2canvas(document.getElementById(target_id));
                const imgData = canvas.toDataURL('image/png');

                // Get the current timestamp
                const timestamp = Date.now();

                // Create a Date object from the timestamp
                const date = new Date(timestamp);

                // Function to format the date
                function formatDate(date) {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }

                // Get the formatted date
                const formattedDate = formatDate(date);

                // Create a new jsPDF instance
                const pdf = new jsPDF('p', 'pt', 'a4'); // 'p' for portrait, 'pt' for points, 'a4' for A4 size

                // Get the width and height of the A4 page in points
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                // Calculate the dimensions of the image
                const imgWidth = pageWidth;
                const imgHeight = (canvas.height * pageWidth) / canvas.width;

                // Add the captured image to the PDF
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                // Prompt user to save the PDF
                const options = {
                    types: [{
                        description: 'PDF files',
                        accept: {
                            'application/pdf': ['.pdf']
                        }
                    }],
                    suggestedName: imgname + '-' + formattedDate + '.pdf'
                };

                try {
                    const fileHandle = await window.showSaveFilePicker(options);
                    const writableStream = await fileHandle.createWritable();
                    const pdfBlob = pdf.output('blob');
                    await writableStream.write(pdfBlob);
                    await writableStream.close();
                    alert('PDF saved successfully.');
                } catch (error) {
                    console.error('Error saving PDF:', error);
                }
            });
        }

        SectionCapture('gold-capture', 'goldbox', 'gold');
        SectionCapture('oil-capture', 'oilbox', 'oil');
        SectionCapture('volume-capture', 'volumebox', 'volume');
        SectionCapture('lottery-capture', 'lotterybox', 'lottery');