document.getElementById('compressButton').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to compress.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        
        // Create a JSON object to store user details
        const userDetails = {
            name: name,
            email: email,
            phone: phone,
            fileData: data // Include the original file data
        };
        
        // Convert user details to a string and then to a Uint8Array
        const userDetailsString = JSON.stringify(userDetails);
        const userDetailsData = new TextEncoder().encode(userDetailsString);
        
        // Compress the user details data using pako
        const compressedData = pako.deflate(new Uint8Array([...userDetailsData, ...data])); // Combine user details and file data
        
        // Create a blob from the compressed data
        const blob = new Blob([compressedData], { type: 'application/octet-stream' });

        // Create a link to download the compressed file
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = url;
        downloadLink.download = 'compressed_' + file.name + '.gz'; // Optional: set the filename
        downloadLink.style.display = 'block';
        downloadLink.innerHTML = 'Download Compressed File';
        
        document.getElementById('message').innerText = 'File compressed successfully!';
    };

    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
});

