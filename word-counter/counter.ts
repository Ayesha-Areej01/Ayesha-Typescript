import * as readline from 'readline';
function countCharactersAndWords(text: string): [number, number] {
    const cleanedText = text.replace(/\s/g, '');
    const characterCount = cleanedText.length;
    const words = cleanedText.split(/\s+/).filter(word => word !== ''); // Split by one or more whitespaces
    const wordCount = words.length;
  
    return [characterCount, wordCount];
  }
 
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }); 
  rl.question('Enter an English paragraph: ', (paragraph: string) => {
    const [charCount, wordCount] = countCharactersAndWords(paragraph);
    console.log(`Character count (excluding whitespaces): ${charCount}`);
    console.log(`Word count (excluding whitespaces): ${wordCount}`);
    rl.close();
  });
  