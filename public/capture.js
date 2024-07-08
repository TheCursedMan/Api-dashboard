function SectionCapture(button_id , target_id){
    document.getElementById(button_id).addEventListener('click', async function() {
        // Capture the section using html2canvas
        const canvas = await html2canvas(document.getElementById(target_id));
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    
        // Prompt user to select directory
        const options = {
            types: [{
                description: 'PNG files',
                accept: {
                    'image/png': ['.png']
                }
            }],
            suggestedName: 'screenshot.png'
        };
    
        // Show the file save dialog
        try {
            const fileHandle = await window.showSaveFilePicker(options);
            const writableStream = await fileHandle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
            alert('File saved successfully.');
        } catch (error) {
            console.error('Error saving file:', error);
        }
    });
    
    
}
SectionCapture('gold-capture' , 'goldbox')
SectionCapture('oil-capture' , 'oilbox')
SectionCapture('volume-capture' , 'volumebox')
SectionCapture('lottery-capture' , 'lotterybox')
