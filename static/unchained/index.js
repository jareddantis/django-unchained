window.onload = () => {
    // Load Pyodide
    loadPyodide().then((pyodide) => {
        // Load biopython
        pyodide.loadPackage('biopython');
    });
};
