
    // DOM Elements
    const helpButton = document.getElementById('helpButton');
    const helpPanel = document.getElementById('helpPanel');
    const toRomanButton = document.getElementById('toRomanButton');
    const toNumberButton = document.getElementById('toNumberButton');
    const autoDetectButton = document.getElementById('autoDetectButton');
    const inputLabel = document.getElementById('inputLabel');
    const inputField = document.getElementById('inputField');
    const convertButton = document.getElementById('convertButton');
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');
    const resultLabel = document.getElementById('resultLabel');
    const resultDisplay = document.getElementById('resultDisplay');
    const copyButton = document.getElementById('copyButton');
    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    
    // State variables
    let mode = 'toRoman'; // 'toRoman' or 'toNumber'
    let autoDetect = false;
    let history = [];
    
    // Initialize app
    function init() {
      loadHistoryFromStorage();
      updateUI();
      
      // Set up event listeners
      helpButton.addEventListener('click', toggleHelp);
      toRomanButton.addEventListener('click', () => setMode('toRoman'));
      toNumberButton.addEventListener('click', () => setMode('toNumber'));
      autoDetectButton.addEventListener('click', toggleAutoDetect);
      convertButton.addEventListener('click', handleConvert);
      copyButton.addEventListener('click', copyResultToClipboard);
      clearHistoryButton.addEventListener('click', clearHistory);
      
      // Enter key to convert
      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleConvert();
        }
      });
    }
    
    // Toggle help panel visibility
    function toggleHelp() {
      helpPanel.classList.toggle('show');
    }
    
    // Set conversion mode
    function setMode(newMode) {
      mode = newMode;
      autoDetect = false;
      resetInput();
      updateUI();
    }
    
    // Toggle auto-detect mode
    function toggleAutoDetect() {
      autoDetect = !autoDetect;
      resetInput();
      updateUI();
    }
    
    // Reset input and results
    function resetInput() {
      inputField.value = '';
      hideError();
      hideResult();
    }
    
    // Update UI based on current state
    function updateUI() {
      // Update mode buttons
      if (autoDetect) {
        toRomanButton.classList.remove('active');
        toRomanButton.classList.add('inactive');
        toNumberButton.classList.remove('active');
        toNumberButton.classList.add('inactive');
        autoDetectButton.classList.add('active');
        autoDetectButton.classList.remove('inactive');
      } else {
        autoDetectButton.classList.remove('active');
        autoDetectButton.classList.add('inactive');
        
        if (mode === 'toRoman') {
          toRomanButton.classList.add('active');
          toRomanButton.classList.remove('inactive');
          toNumberButton.classList.remove('active');
          toNumberButton.classList.add('inactive');
        } else {
          toRomanButton.classList.remove('active');
          toRomanButton.classList.add('inactive');
          toNumberButton.classList.add('active');
          toNumberButton.classList.remove('inactive');
        }
      }
      
      // Update input label and type
      if (autoDetect) {
        inputLabel.textContent = 'Enter a number or Roman numerals:';
        inputField.type = 'text';
        inputField.placeholder = 'e.g. 1994 or MCMXCIV';
        inputField.removeAttribute('min');
        inputField.removeAttribute('max');
      } else if (mode === 'toRoman') {
        inputLabel.textContent = 'Enter a number (1-3999):';
        inputField.type = 'number';
        inputField.placeholder = '1-3999';
        inputField.min = 1;
        inputField.max = 3999;
      } else {
        inputLabel.textContent = 'Enter Roman numerals:';
        inputField.type = 'text';
        inputField.placeholder = 'e.g., MCMXCIV';
        inputField.removeAttribute('min');
        inputField.removeAttribute('max');
      }
      
      // Update result label
      resultLabel.textContent = mode === 'toRoman' ? 'Roman numeral:' : 'Number:';
      
      // Show history section if there's history
      historySection.style.display = history.length > 0 ? 'block' : 'none';
    }
    
    // Convert number to Roman numeral
    function toRoman(num) {
      if (num <= 0 || num > 3999) {
        throw new Error('Number must be between 1 and 3999');
      }
      
      const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
      ];
      
      let result = '';
      let remaining = num;
      
      for (const { value, numeral } of romanNumerals) {
        while (remaining >= value) {
          result += numeral;
          remaining -= value;
        }
      }
      
      return result;
    }
    
    // Convert Roman numeral to number
    function fromRoman(roman) {
      if (!roman) return 0;
      
      const romanStr = roman.toUpperCase();
      const validRomanRegex = /^[IVXLCDM]+$/;
      
      if (!validRomanRegex.test(romanStr)) {
        throw new Error('Invalid Roman numeral');
      }
      
      const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
      };
      
      let result = 0;
      
      for (let i = 0; i < romanStr.length; i++) {
        const current = romanMap[romanStr[i]];
        const next = romanMap[romanStr[i + 1]];
        
        if (next && current < next) {
          result += next - current;
          i++;
        } else {
          result += current;
        }
      }
      
      return result;
    }
    
    // Handle conversion
    function handleConvert() {
      try {
        hideError();
        
        const inputValue = inputField.value.trim();
        
        if (!inputValue) {
          showError('Please enter a value');
          hideResult();
          return;
        }
        
        let input, output, inputType, outputType;
        
        if (autoDetect) {
          // Auto-detect input type
          if (/^\d+$/.test(inputValue)) {
            // Input is a number
            const num = parseInt(inputValue, 10);
            input = num;
            output = toRoman(num);
            inputType = 'number';
            outputType = 'roman';
            mode = 'toRoman';
          } else {
            // Input is a Roman numeral
            input = inputValue.toUpperCase();
            output = fromRoman(input);
            inputType = 'roman';
            outputType = 'number';
            mode = 'toNumber';
          }
        } else {
          // Use selected mode
          if (mode === 'toRoman') {
            const num = parseInt(inputValue, 10);
            input = num;
            output = toRoman(num);
            inputType = 'number';
            outputType = 'roman';
          } else {
            input = inputValue.toUpperCase();
            output = fromRoman(input);
            inputType = 'roman';
            outputType = 'number';
          }
        }
        
        showResult(output.toString());
        updateUI(); // Update UI to reflect any mode changes
        
        // Add to history
        const newEntry = {
          id: Date.now(),
          input: input.toString(),
          output: output.toString(),
          inputType,
          outputType,
          timestamp: new Date().toISOString()
        };
        
        addToHistory(newEntry);
        
      } catch (err) {
        showError(err.message);
        hideResult();
      }
    }
    
    // Show error message
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
    
    // Hide error message
    function hideError() {
      errorMessage.style.display = 'none';
    }
    
    // Show result
    function showResult(value) {
      resultDisplay.textContent = value;
      resultSection.style.display = 'block';
    }
    
    // Hide result
    function hideResult() {
      resultSection.style.display = 'none';
    }
    
    // Copy result to clipboard
    function copyResultToClipboard() {
      navigator.clipboard.writeText(resultDisplay.textContent).then(
        () => {
          // Success - could show a temporary notification here
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    }
    
    // Add conversion to history
    function addToHistory(entry) {
      history = [entry, ...history.slice(0, 9)]; // Keep only 10 most recent
      saveHistoryToStorage();
      renderHistory();
      historySection.style.display = 'block';
    }
    
    // Render history items
    function renderHistory() {
      historyList.innerHTML = '';
      
      history.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.addEventListener('click', () => loadFromHistory(entry));
        
        historyItem.innerHTML = `
          <div class="history-conversion">
            <span class="history-input">${entry.input}</span>
            <span class="history-arrow">→</span>
            <span class="history-output">${entry.output}</span>
          </div>
          <div class="history-meta">
            <span class="history-type">${entry.inputType === 'number' ? 'Number to Roman' : 'Roman to Number'}</span>
            <span class="history-time">${formatTime(entry.timestamp)}</span>
          </div>
        `;
        
        historyList.appendChild(historyItem);
      });
    }
    
    // Format timestamp for display
    function formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Load a history entry
    function loadFromHistory(entry) {
      inputField.value = entry.input;
      showResult(entry.output);
      mode = entry.inputType === 'number' ? 'toRoman' : 'toNumber';
      autoDetect = false;
      updateUI();
    }
    
    // Clear history
    function clearHistory() {
      history = [];
      localStorage.removeItem('romanConverterHistory');
      historySection.style.display = 'none';
    }
    
    // Save history to localStorage
    function saveHistoryToStorage() {
      localStorage.setItem('romanConverterHistory', JSON.stringify(history));
    }
    
    // Load history from localStorage
    function loadHistoryFromStorage() {
      const savedHistory = localStorage.getItem('romanConverterHistory');
      if (savedHistory) {
        try {
          history = JSON.parse(savedHistory);
          renderHistory();
        } catch (e) {
          console.error('Failed to parse history:', e);
          history = [];
        }
      }
    }
    
    // Initialize the app
    init();

