/**
 * Function to format and highlight VIP mobile numbers
 * @param {string} number - The phone number to format
 * @returns {object} - HTML formatting with highlighted digits
 */
function formatVIPNumber(number) {
    // Remove any non-digit characters
    const cleanNumber = number.toString().replace(/\D/g, '');
    
    // Initialize result with all digits in default color
    const result = {
      formattedNumber: '',
      category: ''
    };
  
    // Detect the most suitable category and the pattern to highlight
    const categoryInfo = detectCategory(cleanNumber);
    result.category = categoryInfo.category;
    
    // Format the number with highlights based on the pattern
    let formattedHtml = '';
    const digits = cleanNumber.split('');
    
    // Apply the highlight pattern from the category detection
    switch (categoryInfo.category) {
      case "OCTA NUMBERS":
        formattedHtml = highlightOctaPattern(digits, categoryInfo.patternInfo);
        break;
      case "SEPTA (9XY AAA AAA A)":
        formattedHtml = highlightSeptaPattern(digits, categoryInfo.patternInfo);
        break;
      case "HEXA NUMBER":
        formattedHtml = highlightHexaPattern(digits, categoryInfo.patternInfo);
        break;
      case "PENTA NUMBERS":
        formattedHtml = highlightPentaPattern(digits, categoryInfo.patternInfo);
        break;
      case "MIRROR NUMBERS":
        formattedHtml = highlightMirrorPattern(digits);
        break;
      case "ABC ABC NUMBERS":
        formattedHtml = highlightAbcAbcPattern(digits, categoryInfo.patternInfo);
        break;
      case "ABCD ABCD NUMBERS":
        formattedHtml = highlightAbcdAbcdPattern(digits, categoryInfo.patternInfo);
        break;
      case "XY XY XY NUMBERS":
        formattedHtml = highlightXyXyXyPattern(digits, categoryInfo.patternInfo);
        break;
      case "ENDING AAAA NUMBERS":
        formattedHtml = highlightEndingAAAAPattern(digits, categoryInfo.patternInfo);
        break;
      case "AAA BBB":
        formattedHtml = highlightAaaBbbPattern(digits, categoryInfo.patternInfo);
        break;
      case "AB AB (XXXXXX 1212)":
        formattedHtml = highlightAbAbPattern(digits, categoryInfo.patternInfo);
        break;
      case "123456 NUMBERS":
        formattedHtml = highlightSequentialPattern(digits, categoryInfo.patternInfo);
        break;
      // Add more specialized formatting cases as needed
      default:
        // For categories without specific formatting, add some standard grouping
        formattedHtml = applyDefaultFormatting(digits);
        break;
    }
    
    result.formattedNumber = formattedHtml;
    return result;
  }
  
  /**
   * Detect the most suitable category for a number
   * @param {string} number - The clean number
   * @returns {object} - Category and pattern information
   */
  function detectCategory(number) {
    const result = {
      category: '',
      patternInfo: null
    };
    
    // OCTA NUMBERS - 8 identical digits in a row
    const octaMatch = number.match(/(.)\1{7}/);
    if (octaMatch) {
      result.category = "OCTA NUMBERS";
      result.patternInfo = {
        digit: octaMatch[1],
        startIndex: octaMatch.index
      };
      return result;
    }
    
    // SEPTA (9XY AAA AAA A) - Format like 9xy aaaaaaa
    const septaMatch = number.match(/^9\d{2}(.)\1{6}/);
    if (septaMatch) {
      result.category = "SEPTA (9XY AAA AAA A)";
      result.patternInfo = {
        prefix: number.substring(0, 3),
        repeatingDigit: septaMatch[1]
      };
      return result;
    }
    
    // HEXA NUMBER - 6 identical digits in a row
    const hexaMatch = number.match(/(.)\1{5}/);
    if (hexaMatch) {
      result.category = "HEXA NUMBER";
      result.patternInfo = {
        digit: hexaMatch[1],
        startIndex: hexaMatch.index
      };
      return result;
    }
    
    // PENTA NUMBERS - 5 identical digits in a row
    const pentaMatch = number.match(/(.)\1{4}/);
    if (pentaMatch) {
      result.category = "PENTA NUMBERS";
      result.patternInfo = {
        digit: pentaMatch[1],
        startIndex: pentaMatch.index
      };
      return result;
    }
    
    // MIRROR NUMBERS - Second half is mirror of first half
    const half = Math.floor(number.length / 2);
    if (number.length % 2 === 0) {
      const firstHalf = number.slice(0, half);
      const secondHalf = number.slice(half).split('').reverse().join('');
      if (firstHalf === secondHalf) {
        result.category = "MIRROR NUMBERS";
        return result;
      }
    }
    
    // ABCD ABCD NUMBERS - Two identical 4-digit sequences
    const abcdMatch = number.match(/(\d{4})(\1)/);
    if (abcdMatch) {
      result.category = "ABCD ABCD NUMBERS";
      result.patternInfo = {
        pattern: abcdMatch[1],
        startIndex: abcdMatch.index
      };
      return result;
    }
    
    // ABC ABC NUMBERS - Two identical 3-digit sequences
    const abcMatch = number.match(/(\d{3})(\1)/);
    if (abcMatch) {
      result.category = "ABC ABC NUMBERS";
      result.patternInfo = {
        pattern: abcMatch[1],
        startIndex: abcMatch.index
      };
      return result;
    }
    
    // XY XY XY NUMBERS - Three repeating pairs
    const xyxyxyMatch = number.match(/(\d{2})(\1{2})/);
    if (xyxyxyMatch) {
      result.category = "XY XY XY NUMBERS";
      result.patternInfo = {
        pattern: xyxyxyMatch[1],
        startIndex: xyxyxyMatch.index
      };
      return result;
    }
    
    // AAA BBB - Contains two groups of 3 identical digits
    const aaabbbMatch = number.match(/(.)\1{2}.*(.)\2{2}/);
    if (aaabbbMatch && !number.match(/(.)\1{5}/)) {
      result.category = "AAA BBB";
      result.patternInfo = {
        firstDigit: aaabbbMatch[1],
        secondDigit: aaabbbMatch[2],
        firstIndex: aaabbbMatch.index,
        secondIndex: number.indexOf(aaabbbMatch[2].repeat(3))
      };
      return result;
    }
    
    // ENDING AAAA NUMBERS - Last 4 digits identical
    const endingAAAAMatch = number.match(/(.)\1{3}$/);
    if (endingAAAAMatch) {
      result.category = "ENDING AAAA NUMBERS";
      result.patternInfo = {
        digit: endingAAAAMatch[1],
        startIndex: endingAAAAMatch.index
      };
      return result;
    }
    
    // AB AB (XXXXXX 1212) - Ending with pattern like 1212
    const ababMatch = number.match(/^.+(\d{2})(\1)$/);
    if (ababMatch) {
      result.category = "AB AB (XXXXXX 1212)";
      result.patternInfo = {
        pattern: ababMatch[1],
        startIndex: ababMatch.index + ababMatch[0].length - 4
      };
      return result;
    }
    
    // 123456 NUMBERS - Contains sequential digits
    const sequentialMatch = number.match(/(0123|1234|2345|3456|4567|5678|6789)/);
    if (sequentialMatch) {
      result.category = "123456 NUMBERS";
      result.patternInfo = {
        sequence: sequentialMatch[0],
        startIndex: sequentialMatch.index
      };
      return result;
    }
    
    // Default - Unique Numbers
    result.category = "UNIQUE NUMBERS";
    return result;
  }
  
  // Helper functions for highlighting patterns
  
  function highlightOctaPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const endIndex = patternInfo.startIndex + 8;
    
    for (let i = patternInfo.startIndex; i < endIndex && i < digits.length; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightSeptaPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    
    // Color the prefix
    for (let i = 0; i < 3; i++) {
      coloredDigits[i] = `<span>${digits[i]}</span>`;
    }
    
    // Color the repeating digit
    for (let i = 3; i < 10 && i < digits.length; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightHexaPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const endIndex = patternInfo.startIndex + 6;
    
    for (let i = patternInfo.startIndex; i < endIndex && i < digits.length; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightPentaPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const endIndex = patternInfo.startIndex + 5;
    
    for (let i = patternInfo.startIndex; i < endIndex && i < digits.length; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightMirrorPattern(digits) {
    const coloredDigits = [...digits];
    const half = Math.floor(digits.length / 2);
    
    // First half in one color
    for (let i = 0; i < half; i++) {
      coloredDigits[i] = `<span>${digits[i]}</span>`;
    }
    
    // Second half in another color
    for (let i = half; i < digits.length; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightAbcAbcPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const patternLength = patternInfo.pattern.length;
    
    // Highlight first occurrence
    for (let i = patternInfo.startIndex; i < patternInfo.startIndex + patternLength; i++) {
      coloredDigits[i] = `<span>${digits[i]}</span>`;
    }
    
    // Highlight second occurrence
    for (let i = patternInfo.startIndex + patternLength; i < patternInfo.startIndex + (patternLength * 2); i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 3).join('');
  }
  
  function highlightAbcdAbcdPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const patternLength = patternInfo.pattern.length;
    
    // Highlight first occurrence
    for (let i = patternInfo.startIndex; i < patternInfo.startIndex + patternLength; i++) {
      coloredDigits[i] = `<span>${digits[i]}</span>`;
    }
    
    // Highlight second occurrence
    for (let i = patternInfo.startIndex + patternLength; i < patternInfo.startIndex + (patternLength * 2); i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightXyXyXyPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const patternLength = patternInfo.pattern.length;
    const totalPatternLength = patternLength * 3;
    
    // Color alternating pairs
    for (let i = patternInfo.startIndex; i < patternInfo.startIndex + totalPatternLength && i < digits.length; i++) {
      const colorIndex = Math.floor((i - patternInfo.startIndex) / patternLength) % 2;
      if (colorIndex === 0) {
        coloredDigits[i] = `<span>${digits[i]}</span>`;
      } else {
        coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
      }
    }
    
    return insertSpacesEvery(coloredDigits, 2).join('');
  }
  
  function highlightEndingAAAAPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    
    // Regular formatting for most digits
    for (let i = 0; i < patternInfo.startIndex; i++) {
      coloredDigits[i] = `<span>${digits[i]}</span>`;
    }
    
    // Highlight the ending AAAA pattern
    for (let i = patternInfo.startIndex; i < digits.length; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 4).join('');
  }
  
  function highlightAaaBbbPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    
    // Highlight first AAA group
    for (let i = patternInfo.firstIndex; i < patternInfo.firstIndex + 3; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    // Highlight second BBB group
    for (let i = patternInfo.secondIndex; i < patternInfo.secondIndex + 3; i++) {
      coloredDigits[i] = `<span style="color:#FF5722;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 3).join('');
  }
  
  function highlightAbAbPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    
    // Regular formatting for most digits
    for (let i = 0; i < patternInfo.startIndex; i++) {
      coloredDigits[i] = `<span>${digits[i]}</span>`;
    }
    
    // Alternate colors for the AB AB pattern
    for (let i = patternInfo.startIndex; i < patternInfo.startIndex + 4; i++) {
      if ((i - patternInfo.startIndex) % 4 < 2) {
        coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
      } else {
        coloredDigits[i] = `<span style="color:#FF5722;">${digits[i]}</span>`;
      }
    }
    
    return insertSpacesEvery(coloredDigits, 2).join('');
  }
  
  function highlightSequentialPattern(digits, patternInfo) {
    const coloredDigits = [...digits];
    const sequenceLength = patternInfo.sequence.length;
    
    // Highlight the sequential pattern
    for (let i = patternInfo.startIndex; i < patternInfo.startIndex + sequenceLength; i++) {
      coloredDigits[i] = `<span style="color:#2196F3;">${digits[i]}</span>`;
    }
    
    return insertSpacesEvery(coloredDigits, 3).join('');
  }
  
  function applyDefaultFormatting(digits) {
    // For numbers without specific patterns, create an alternating color scheme
    const coloredDigits = digits.map((digit, index) => {
      // Alternate between different colors based on position
      if (index % 2 === 0) {
        return `<span>${digit}</span>`;
      } else {
        // Use different colors for different digits to create visual interest
        const colorMap = {
          '0': 'black', // Blue
          '1': 'black', // Green
          '2': 'black', // Red
          '3': 'black', // Orange
          '4': 'black', // Purple
          '5': 'black', // Cyan
          '6': 'black', // Indigo
          '7': 'black', // Brown
          '8': 'black', // Blue Grey
          '9': 'black'  // Deep Orange
        };
        return `<span style="color:${colorMap[digit] || 'black'};">${digit}</span>`;
      }
    });
    
    return insertSpacesEvery(coloredDigits, 2).join('');
  }
  
  /**
   * Insert spaces between groups of digits for better readability
   * @param {array} digits - Array of formatted digits
   * @param {number} groupSize - Size of each group
   * @returns {array} - Array with spaces inserted
   */
  function insertSpacesEvery(digits, groupSize) {
    const result = [...digits];
    
    // Add spaces after every groupSize digits
    for (let i = groupSize; i < result.length; i += groupSize + 1) {
      result.splice(i, 0, ' ');
    }
    
    return result;
  }
  
  export {formatVIPNumber}
  // Example usage
  function displayFormattedNumber(number) {
    const result = formatVIPNumber(number);
    // console.log(`Number: ${number}`);
    // console.log(`Category: ${result.category}`);
    // console.log(`Formatted: ${result.formattedNumber}`);
    return result;
  }
  
  // Example
  // displayFormattedNumber("7377707775");
  // displayFormattedNumber("8699991782");
  // displayFormattedNumber("7688840059");
  