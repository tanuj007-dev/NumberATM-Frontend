

const highlightMobileNumber = (numberString) => {
  const num = numberString.replace(/\s+/g, "").trim();
  if (num.length !== 10) return <span className="text-red-500">{numberString}</span>;

  // Define patterns with priority
  const patterns = [
    { regex: /(\d)\1{9}/, className: "text-orange-500 font-bold", label: "Deca" },
    { regex: /(\d)\1{8}/, className: "text-orange-500 font-bold", label: "Nona" },
    { regex: /(\d)\1{7}/, className: "text-orange-500 font-bold", label: "Octa" },
    { regex: /(\d)\1{6}/, className: "text-orange-500 font-bold", label: "Hepta" },
    { regex: /(\d)\1{5}/, className: "text-orange-500 font-bold", label: "Hexa" },
    { regex: /(\d)\1{4}/, className: "text-orange-500 font-bold", label: "Penta" },

    // Repeating sequences
    { regex: /(\d{5})\1/, className: "text-orange-500 font-bold", format: "$1 $1" },
    { regex: /(\d{4})\1/, className: "text-orange-500 font-bold", format: "$1 $1" },
    { regex: /(\d{3})\1{2,}/, className: "text-orange-500 font-bold", format: "$1 $1 $1" },
    { regex: /(\d{3})\1/, className: "text-orange-500 font-bold", format: "$1 $1" },
    { regex: /(\d{2})\1{3,}/, className: "text-orange-500 font-bold", format: "$1 $1 $1 $1" },
    { regex: /(\d{2})\1{2,}/, className: "text-orange-500 font-bold", format: "$1 $1 $1" },
    { regex: /(\d{5})\1/, className: "text-orange-500 font-bold", format: "$1 $1" }, // Penta repeating
    { regex: /(\d{4})\1/, className: "text-orange-500 font-bold", format: "$1 $1" }, // Quad repeating
    { regex: /(\d{3})\1{2,}/, className: "text-orange-500 font-bold", format: "$1 $1 $1" }, // Triplet repeating (3 times)
    { regex: /(\d{3})\1/, className: "text-orange-500 font-bold", format: "$1 $1" }, // Triplet repeating (2 times)
    // Double repeating (3 times)
    { regex: /(\d{2})\1/, className: "text-orange-500 font-bold", format: "$1 $1" }, // Double repeating (2 times)
    { regex: /(\d)\1{3,}/, className: "text-orange-500 font-bold" }, // 4+ consecutive digits
    { regex: /(\d)(\d)\2\1/, className: "text-orange-500 font-bold" }, // Palindromes
  ];

  let highlightedParts = [];
  let matchFound = false;

  for (let { regex, className, format } of patterns) {
    const match = num.match(regex);
    if (match) {
      let highlightedText = format ? match[0].replace(regex, format) : match[0]; // Apply spacing format if available
      let start = match.index;
      let end = start + match[0].length;

      highlightedParts = [
        <span key="start">{num.slice(0, start)}</span>,
        <span key="match" className={className}>&nbsp;{highlightedText}&nbsp;</span>,
        <span key="end">{num.slice(end)}</span>,
      ];
      matchFound = true;
      break;
    }
  }

  // Agar koi pattern match nahi hota to random highlight
  if (!matchFound) {
    let randomIndex = Math.floor(Math.random() * 6);
    let randomLength = Math.floor(Math.random() * 3) + 3; // Pick 3, 4, or 5 digits

    highlightedParts = [
      <span key="start">{num.slice(0, randomIndex)}</span>,
      <span key="random" className="text-orange-500 font-bold">&nbsp;{num.slice(randomIndex, randomIndex + randomLength)}&nbsp;</span>,
      <span key="end">{num.slice(randomIndex + randomLength)}</span>,
    ];
  }

  return <>{highlightedParts}</>;
};


export { highlightNumber, highlightMobileNumber };
