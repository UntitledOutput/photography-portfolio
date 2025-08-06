
function getLineOfString(text, lineNumber) {
  if (!text || typeof text !== 'string') {
    return undefined; // Handle invalid input
  }
  const lines = text.split('\n');
  if (lineNumber < 1 || lineNumber > lines.length) {
    return undefined; // Handle out-of-bounds line number
  }
  return lines[lineNumber - 1]; // Return the desired line
}

export async function load_image_data(id) {
    const dataPath = "data/img/" + id + ".img";

    try {
        const response = await fetch(dataPath);
        const data = await response.text();

        const imgName = getLineOfString(data, 1);
        const img_link = getLineOfString(data, 2);

        const lines = data.split('\n');
        const remainingLines = lines.slice(3);
        const newString = remainingLines.join('\n');

        return {
            name: imgName,
            link: img_link,
            statement: newString,
        };
    } catch (error) {
        console.error('Error fetching file:', error);
        return null;
    }
}
