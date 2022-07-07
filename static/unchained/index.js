window.onload = () => {
    // Elements
    const stdin = document.getElementById('python-stdin');
    const stdout = document.getElementById('python-stdout');
    const run = document.getElementById('python-run');
    const runCode = (pyodide) => {
        // Get input
        const input = stdin.value;

        // Run code
        let output;
        try {
            output = pyodide.runPython(input);
        } catch (err) {
            // Replace newlines with <br>s
            let error = err.toString().replace(/\n/g, '<br>');

            // Replace preceding whitespaces with &nbsp;s
            error = error.replace(/ /g, '&nbsp;');

            stdout.innerHTML += '<hr style="margin: .5rem 0; border-color: rgb(156 163 175)">';
            stdout.innerHTML += `<p class="text-red-500">${error}</p>`;
            return;
        }

        // Display output
        if (output !== undefined) {
            stdout.innerHTML += '<hr style="margin: .5rem 0; border-color: rgb(156 163 175)">';
            stdout.innerHTML += `<p>${output}</p>`;
        }

        // Set focus to textarea
        stdin.focus();
    };

    // Load Pyodide
    loadPyodide({
        stdout: (output) => {
            if (output === 'Python initialization complete') {
                stdout.innerHTML += '<p class="text-gray-400 italic">Loaded Python</p>';
            } else {
                stdout.innerHTML += '<hr style="margin: .5rem 0; border-color: rgb(156 163 175)">';
                stdout.innerHTML += `<p>${output}</p>`;
            }
        },
    }).then((pyodide) => {
        // Load biopython
        pyodide.loadPackage('biopython');

        // Enable textarea and run button
        stdin.disabled = false;
        stdin.classList.remove('cursor-not-allowed');
        run.disabled = false;
        run.classList.remove('cursor-not-allowed');

        // Set focus to textarea
        stdin.focus();

        // Add event listener for clearing
        document.getElementById('python-inclear').addEventListener('click', () => {
            stdin.value = '';
        });
        document.getElementById('python-outclear').addEventListener('click', () => {
            stdout.innerHTML = '';
        });

        // Add event listener for run button and enter key within textarea
        run.addEventListener('click', () => { runCode(pyodide) });
    });
};
