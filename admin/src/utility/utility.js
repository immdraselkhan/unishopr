/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text
    .split(' ')
    .slice(0, size)
    .join(' ')}...`;
};

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const exportToCsv = (filename, rows) => {
  let processRow = function (row) {
      let finalVal = '';
      for (let j = 0; j < row.length; j++) {
          let innerValue = row[j] === null ? '' : row[j].toString();
          if (row[j] instanceof Date) {
              innerValue = row[j].toLocaleString();
          }
          let result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              finalVal += ',';
          finalVal += result;
      }
      return finalVal + '\n';
  };

  let csvFile = '';
  for (let i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
  }

  let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
  } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

const phoneFormatted = (phone) => {
  if (!phone.includes("@")) {
      if (phone.startsWith("0")) {
      phone = phone.slice(1)
      }
      if (phone.startsWith("+880")) {
          phone = phone.slice(4)
      }
      if (phone.includes("-")) {
          phone = phone.replace(/-/g, "");
      }
      if (phone.includes(" ") && parseInt(phone) > 100) {
          phone = phone.replace(/ /g, "");
      }
  }
  return phone
}

export { ellipsis, isJsonString, exportToCsv, phoneFormatted };
