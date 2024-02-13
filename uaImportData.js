
let clientSelect = 0;
let clientList = [];
let worksheets = {};
let client = {}
let sheets;
let selection;

let lpa;
let postcode;

function setup() {
    select('.p5Canvas').remove();
    Init();
}


function Init() {
    var workbook;
    var input = document.getElementById("file");

    input.addEventListener("change", function (e) {
        if (!!input.files && input.files.length > 0) {

            var reader = new FileReader();

            reader.readAsArrayBuffer(e.target.files[0]);

            reader.onload = function (e) {
                var data = new Uint8Array(reader.result);
                workbook = XLSX.read(data, { type: "array" });
                sheets = workbook.SheetNames;

                for (const element of workbook.SheetNames) {
                    worksheets[element] = XLSX.utils.sheet_to_json(workbook.Sheets[element]);

                }
                // console.log("JSON\n", JSON.stringify(worksheets), "\n\n");
                // console.log(worksheets[sheets[0]][4])
                // console.log(worksheets[sheets[3]][0].LPA)
                // console.log(worksheets[sheets[0]][0]["Client Number "]);

                // Populate a list of client numbers
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
    select.option('Client Number');
    select.disable('Client Number');
    select.selected('Client Number');

    for (let i = 0; i < list.length; i++) {
        select.option(list[i]);
    }
    select.style('width', '200px');
    select.changed(UpdateClient)
    let p = createP('Please select client number');


    function UpdateClient() {
        clientSelect = clientList.indexOf(Number(select.value()));
        client = worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect];

        ClientDisplay();
        // UpdateData();
    }
}

function ClientDisplay() {
    //Clear all client Info text
    let info = selectAll('.clientInfo');
    for (let i = 0; i < info.length; i++) {
        info[i].remove();
    }

    createElement('h1', 'Client Info').addClass('clientInfo');
    let keys = Object.keys(client);
    let values = Object.values(client);
    for (let i = 0; i < Object.entries(client).length; i++) {
        createP(keys[i] + ":   " + values[i]).addClass('clientInfo')
    }
}

function UpdateData(selection) {

    // // Pulling data from different sheets
    // client = {
    //     lpa: worksheets[sheets[0]][clientSelect].LPA,
    //     postcode: worksheets[sheets[3]][clientSelect].postcode,
    //     accountManager: worksheets[sheets["Report"]][clientSelect]["Account Manager"],
    //     name: worksheets[sheets[3]][clientSelect]["Client Name"],
    //     acreage: worksheets[sheets[0]][clientSelect].Acres,
    //     aol: worksheets[sheets[0]][clientSelect].LPA,
    // }

    // Finds the sheet called 'Report' and uses the clientSelect value to narrow down to a single row
    client = worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect]

    // console.log(Object.keys(worksheets).indexOf('Report'));
    console.log(client['Account Manager']);
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