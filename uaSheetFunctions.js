(function () {
var input = document.getElementById("file");

// Returns nothing if no input file is found
    if (!input) {
        return;
    }

    input.addEventListener("change", function () {
        if (!!input.files && input.files.length > 0) {
            importData(input.files[0]);

            // console.log(input.files[0]);
        }
    });


    function importData(spreadsheet) {
        // if (!spreadsheet || !FileReader) {
        //     console.log('File or FileReader API does not exist');
        //     return;
        // }

        // var reader = new FileReader();
        const workbook = XLSX.read(spreadsheet.name);

        // Convert XLXS to JSON
        var workSheets = {};

        for (const sheetName of workbook.SheetNames) {
            workSheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        }

        console.log(workSheets)
        // console.log("JSON\n", JSON.stringify(workbook.Sheet1), "\n\n");
    }
}) ();






// // Wrapped in an immdiately executed function
// (function () {
//     var delimiter = ",";
//     var newline = "\n";
//     var returnKey = "\r";
//     var i = document.getElementById("file");
//     var table = document.getElementById("table");

//     if (!i) {
//         return;
//     }

//     i.addEventListener("change", function () {
//         if (!!i.files && i.files.length > 0) {
//             parseCSV(i.files[0]);
//         }
//     });
//     function parseCSV(file) {
//         if (!file || !FileReader) {
//             console.log('File or FileReader API does not exist');
//             return;
//         }

//         var reader = new FileReader();

//         reader.onload = function (e) {
//             toDoc(e.target.result);
//         };

//         reader.readAsText(file)
//     }

//     function toDoc(text) {
//         if (!text || !table) {
//             return;
//         };

//         // Clear table
//         while (!!table.lastElementChild) {
//             table.removeChild(table.lastElementChild);
//         }

//         // Get all the rows
//         var rows = text.split(newline);
//         var headers = rows.shift().trim().split(delimiter);
//         var headerTableRow = document.createElement("tr");

//         headers.forEach(function (h) {
//             var tableHeader = document.createElement("th");
//             var headerTrim = h.trim();

//             if (!headerTrim) {
//                 return;
//             }

//             tableHeader.textContent = headerTrim;
//             headerTableRow.appendChild(tableHeader);
//         });

//         table.appendChild(headerTableRow);

//         var rtr;

//         rows.forEach(function (r) {
//             r = r.trim();

//             // Makes sure there aren't any empty rows such as an accidental double return key
//             if (!r) {
//                 return;
//             }

//             var columns = r.split(delimiter);

//             // Check for empty columns
//             if (columns.length === 0) {
//                 return;
//             }

//             rtr = document.createElement("tr");

//             columns.forEach(function (c) {
//                 var textValue = document.createElement("td");
//                 var trimCell = c.trim();

//                 textValue.textContent = trimCell;
//                 rtr.appendChild(textValue);
//             });

//             table.append(rtr);

//             // The 'columns' are actually the rows when not formatted for a html table.
//             console.log(columns);
//         });
        
//     };
// })();