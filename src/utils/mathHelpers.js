import * as math from 'mathjs';

export const formatEquation = (equation) => {
  return equation.trim();
};

// A more robust equation evaluation function
export const evaluateEquation = (equation) => {
  try {
    // Remove LaTeX commands and formatting
    let processedEquation = equation
      .replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)') // Convert \sqrt{x} to sqrt(x)
      .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)') // Convert \frac{x}{y} to (x)/(y)
      .replace(/([a-zA-Z0-9])\^(\{[^{}]+\}|[a-zA-Z0-9])/g, '$1^$2') // Keep exponents
      .replace(/\\[a-zA-Z]+/g, '') // Remove other LaTeX commands
      .replace(/\{|\}/g, ''); // Remove curly braces
    
    // Handle equals sign - evaluate right side if present
    if (processedEquation.includes('=')) {
      processedEquation = processedEquation.split('=')[1].trim();
    }
    
    // Try evaluating with mathjs
    const result = math.evaluate(processedEquation);
    
    // Round to 4 decimal places if needed
    return typeof result === 'number' 
      ? Math.abs(result - Math.round(result)) < 1e-10 
        ? Math.round(result) 
        : math.round(result, 4)
      : result;
  } catch (error) {
    console.log('Evaluation error:', error);
    return null; // Return null if evaluation fails
  }
};

export const getExampleEquations = () => {
  return [
    { label: "Einstein's Energy-Mass Equivalence", equation: "E = mc^2" },
    { label: "Newton's Law of Gravitation", equation: "F = G\\frac{m_1 m_2}{r^2}" },
    { label: "Sum of Squares Formula", equation: "\\sum_{i=0}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}" },
    { label: "Euler's Identity", equation: "e^{i\\pi} + 1 = 0" },
    { label: "Derivative of Sine", equation: "\\frac{d}{dx}[\\sin(x)] = \\cos(x)" },
    { label: "Quadratic Formula", equation: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
    { label: "Normal Distribution", equation: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}" }
  ];
};

// Reference guide for LaTeX syntax
export const getLatexGuide = () => {
  return [
    { syntax: "a^b", description: "Exponent/Power", example: "x^2" },
    { syntax: "a_b", description: "Subscript", example: "x_1" },
    { syntax: "\\sqrt{x}", description: "Square root", example: "\\sqrt{16}" },
    { syntax: "\\frac{a}{b}", description: "Fraction", example: "\\frac{1}{2}" },
    { syntax: "\\pi, \\alpha, \\beta", description: "Greek letters", example: "\\pi r^2" },
    { syntax: "\\sum_{i=1}^{n}", description: "Summation", example: "\\sum_{i=1}^{n} i" },
    { syntax: "\\int_{a}^{b}", description: "Integral", example: "\\int_{0}^{1} x^2 dx" },
    { syntax: "\\lim_{x \\to a}", description: "Limit", example: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x}" },
    { syntax: "\\sin(x), \\cos(x), \\tan(x)", description: "Trigonometric functions", example: "\\sin(x)" },
    { syntax: "\\log(x), \\ln(x)", description: "Logarithms", example: "\\log_{10}(x)" }
  ];
};