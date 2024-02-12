
let clientSelect = 0;
let clientList = [];
let worksheets = {};
let sheets;
let selection;

let lpa;
let postcode;

function setup() {

    Init();
}


function Init() {
    var workbook
    var input = document.getElementById("file");

    input.addEventListener("change", function (e) {
        if (!!input.files && input.files.length > 0) {

            var reader = new FileReader();

            reader.readAsArrayBuffer(e.target.files[0]);

            reader.onload = function (e) {
                var data = new Uint8Array(reader.result);
                workbook = XLSX.read(data, { type: "array" });
                // console.log(workbook.Sheets[workbook.SheetNames[0]]);
                sheets = workbook.SheetNames;
                // console.log(sheets)

                for (const element of workbook.SheetNames) {
                    worksheets[element] = XLSX.utils.sheet_to_json(workbook.Sheets[element]);
                    // console.log(worksheets)

                }
                // console.log("JSON\n", JSON.stringify(worksheets), "\n\n");
                // console.log(worksheets[sheets[0]][4])
                // console.log(worksheets[sheets[3]][0].LPA)
                // console.log(worksheets[sheets[0]][0]["Client Number "]);


                for (let i = 0; i < worksheets[sheets[0]].length; i++) {
                    let l = worksheets[sheets[0]][i]["Client Number "];
                    clientList.push(l);
                }
                ClientDropDown(clientList)
            }

        }
    });
}

function ClientDropDown(list) {
    let select = createSelect();
    for (let i = 0; i < list.length; i++) {
        select.option(list[i]);
    }
    select.style('width', '200px');
    select.changed(UpdateClient)
    let p = createP('Please select client number');


    function UpdateClient() {
        clientSelect = clientList.indexOf(Number(select.value()));
        ClientDisplay();
        ClientData();
        console.log("LPA: ", lpa);
        console.log("Acres: ", acres);
    }
}

function ClientDisplay() {
    createElement('h1', 'Client Info');
    let keys = Object.keys(worksheets[sheets[0]][clientSelect]);
    let values = Object.values(worksheets[sheets[0]][clientSelect]);
    for (let i = 0; i < Object.keys(worksheets[sheets[0]][clientSelect]).length; i++) {
        let list = createP(keys[i] + ":   " + values[i])
    }
}

function ClientData(selection) {
    lpa = worksheets[sheets[0]][clientSelect].LPA
    acres = worksheets[sheets[0]][clientSelect].Acres
}

// function Init() {
// const workbook = XLSX.read("ReportsAndFormDocument.xlsx", { dense: true });
// // var workbook = XLSX.read("./spreadsheet/Javascript Test.xlsx", { type: 'string' });
// // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// const data = XLSX.utils.sheet_to_json(workbook, { header: 1 });
// const first_row = data[0];
// console.log(first_row);
// console.log(workbook.SheetNames);
// var jsonObject = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
// console.log(raw_data);



// console.log(jsonObject);

// let worksheets = {};

// for (const sheetName of workbook.SheetNames) {
//     worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1});
// }

// console.log("JSON\n", JSON.stringify(worksheets.Sheet1), "\n\n");
// console.log(worksheets.Sheet1)
// }



// const data = XLSX.utils.sheet_to_json < IPresident > (wb.Sheets[wb.SheetNames[0]]); // IPresident[]
// const first_row = data[0]; // IPresident
// console.log(first_row.Name); // this passes strict type check