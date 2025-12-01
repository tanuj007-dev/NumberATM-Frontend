function categorizeVIPNumber(number) {
    // Remove any non-digit characters
    const cleanNumber = number.toString().replace(/\D/g, '');
    
    // Define categories in order of priority (most prestigious/rare first)
    const categoryChecks = [
      // OCTA NUMBERS - 8 identical digits in a row (highest priority)
      {
        name: "OCTA NUMBERS",
        check: () => /(.)\1{7}/.test(cleanNumber)
      },
      
      // SEPTA (9XY AAA AAA A) - Format like 9xy aaaaaaa
      {
        name: "SEPTA (9XY AAA AAA A)",
        check: () => /^9[A-Z0-9]{2}([A-Z0-9])\1{6}$/i.test(cleanNumber)
      },
      
      // HEXA NUMBER - 6 identical digits in a row
      {
        name: "HEXA NUMBER",
        check: () => /(.)\1{5}/.test(cleanNumber)
      },
      
      // PENTA NUMBERS - 5 identical digits in a row
      {
        name: "PENTA NUMBERS",
        check: () => /(\d)\1{4}/.test(cleanNumber)
      },
      
      // AAAA BBBB NUMBERS - Groups of 4 identical digits
      {
        name: "AAAA BBBB NUMBERS",
        check: () => /(.)\1{3}.*(.)\2{3}/.test(cleanNumber) && !/(.)\1{7}/.test(cleanNumber)
      },
      
      // Start & Middle PENTA - 5 identical digits at start or middle
      {
        name: "Start & Middle PENTA",
        check: () => /^(.)\1{4}|.(.)\2{4}/.test(cleanNumber)
      },
      
      // MIRROR NUMBERS - Second half is mirror of first half
      {
        name: "MIRROR NUMBERS",
        check: () => {
          const half = Math.floor(cleanNumber.length / 2);
          if (cleanNumber.length % 2 === 0) {
            const firstHalf = cleanNumber.slice(0, half);
            const secondHalf = cleanNumber.slice(half).split('').reverse().join('');
            return firstHalf === secondHalf;
          }
          return false;
        }
      },
      
      // abc abc abc - Three identical 3-digit sequences
      {
        name: "abc abc abc",
        check: () => /(\d{3})\1{2}/.test(cleanNumber)
      },
      
      // ABCD ABCD NUMBERS - Two identical 4-digit sequences
      {
        name: "ABCD ABCD NUMBERS",
        check: () => /(\d{4})\1/.test(cleanNumber)
      },
      
      // ABC ABC NUMBERS - Two identical 3-digit sequences
      {
        name: "ABC ABC NUMBERS",
        check: () => /(\d{3})\1/.test(cleanNumber)
      },
      
      // XY XY XY NUMBERS - Three repeating pairs
      {
        name: "XY XY XY NUMBERS",
        check: () => /(\d{2})\1{2}/.test(cleanNumber)
      },
      
      // AB XYXYXYXY - Two digits followed by repeating pattern
      {
        name: "AB XYXYXYXY",
        check: () => /^\d{2}(\d{2})\1{3}/.test(cleanNumber)
      },
      
      // AAA BBB - Contains two groups of 3 identical digits
      {
        name: "AAA BBB",
        check: () => /(.)\1{2}.*(.)\2{2}/.test(cleanNumber) && !/(.)\1{5}/.test(cleanNumber)
      },
      
      // AAA XY AAA - Group of 3 identical digits, 2 different, then 3 identical again
      {
        name: "AAA XY AAA",
        check: () => /(.)\1{2}.{2}(.)\2{2}/.test(cleanNumber)
      },
      
      // AB AB XY XY - Two patterns of repeating pairs
      {
        name: "AB AB XY XY",
        check: () => /(\d{2})\1.*(\d{2})\2/.test(cleanNumber) && !/(\d{2})\1{2}/.test(cleanNumber)
      },
      
      // ENDING AAAA NUMBERS - Last 4 digits identical
      {
        name: "ENDING AAAA NUMBERS",
        check: () => /(.)\1{3}$/.test(cleanNumber)
      },
      
      // AAAA middle - 4 identical digits in the middle
      {
        name: "AAAA middle",
        check: () => {
          const midStart = Math.floor(cleanNumber.length / 2) - 2;
          return midStart >= 0 && /(.)\1{3}/.test(cleanNumber.substring(midStart, midStart + 4));
        }
      },
      
      // AB AB (XXXXXX 1212) - Ending with pattern like 1212
      {
        name: "AB AB (XXXXXX 1212)",
        check: () => /^.+(\d{2})\1$/.test(cleanNumber)
      },
      
      // ENDING AAA NUMBERS - Last 3 digits identical
      {
        name: "ENDING AAA NUMBERS",
        check: () => /(.)\1{2}$/.test(cleanNumber)
      },
      
      // AAA Middle - 3 identical digits in the middle
      {
        name: "AAA Middle",
        check: () => {
          const midStart3 = Math.floor(cleanNumber.length / 2) - 1;
          return midStart3 >= 0 && /(.)\1{2}/.test(cleanNumber.substring(midStart3, midStart3 + 3));
        }
      },
      
      // 123456 NUMBERS - Contains sequential digits
      {
        name: "123456 NUMBERS",
        check: () => /0123|1234|2345|3456|4567|5678|6789/.test(cleanNumber)
      },
      
      // START A OOO B END A OOO B - Pattern at start and end
      {
        name: "START A OOO B END A OOO B",
        check: () => /^(\d)0{3}(\d).*\10{3}\2$/.test(cleanNumber)
      },
      
      // AOOB COOD / ABOO CDOO / OOOAB - Patterns with repeating zeros
      {
        name: "AOOB COOD / ABOO CDOO / OOOAB",
        check: () => /\d0{2}\d|\d{2}0{2}|\d0{3}\d|0{3}\d{2}/.test(cleanNumber)
      },
      
      // AOO BOO / AOO BOO COO - Patterns with repeating zeros
      {
        name: "AOO BOO / AOO BOO COO",
        check: () => /\d0{2}.*\d0{2}|\d0{2}.*\d0{2}.*\d0{2}/.test(cleanNumber)
      },
      
      // AO BO CO DO EO - Pattern with digits followed by zeros
      {
        name: "AO BO CO DO EO",
        check: () => /\d0.*\d0.*\d0.*\d0/.test(cleanNumber)
      },
      
      // 786 NUMBERS - Contains 786
      {
        name: "786 NUMBERS",
        check: () => cleanNumber.includes('786')
      },
      
      // 11 12 13 NUMBERS - Contains sequential repeating patterns
      {
        name: "11 12 13 NUMBERS",
        check: () => /11.*12.*13|12.*13.*14|10.*11.*12/.test(cleanNumber)
      },
      
      // SEMI MIRROR NUMBERS - Some mirroring but not perfect
      {
        name: "SEMI MIRROR NUMBERS",
        check: () => {
          const digits = cleanNumber.split('');
          let mirrorCount = 0;
          for (let i = 0; i < Math.floor(digits.length / 2); i++) {
            if (digits[i] === digits[digits.length - 1 - i]) {
              mirrorCount++;
            }
          }
          return mirrorCount >= Math.floor(digits.length / 4);
        }
      },
      
      // DOUBLING NUMBERS - Same digit repeats (e.g., 11, 22, etc.)
      {
        name: "DOUBLING NUMBERS",
        check: () => {
          const digits = cleanNumber.split('');
          const uniqueDigits = new Set(digits);
          return uniqueDigits.size <= cleanNumber.length / 2;
        }
      },
      
      // Numerology Without 2 4
      {
        name: "Numerology Without 2 4",
        check: () => !cleanNumber.includes('2') && !cleanNumber.includes('4')
      },
      
      // 3 DIGITS NUMBER - Just 3 digits long
      {
        name: "3 DIGITS NUMBER",
        check: () => cleanNumber.length === 3
      }
    ];
    
    // Check categories in order of priority
    for (const category of categoryChecks) {
      if (category.check()) {
        return {
          number: cleanNumber,
          category: category.name
        };
      }
    }
    
    // If no special category is found, it's a UNIQUE NUMBER
    return {
      number: cleanNumber,
      category: "UNIQUE NUMBERS"
    };
  }
  export {categorizeVIPNumber};
  // Example usage
//   function testNumber(number='91 234 56789') {
//     const result = categorizeVIPNumber(number);
//     console.log(`Number: ${result.number}`);
//     console.log(`Categories: ${result.categories.join(', ')}`);
//     return result;
//   }
//   testNumber();