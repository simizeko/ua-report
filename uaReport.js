// A4 dimensions
let vw = 595.28;
let vh = 841.89;
let docMargins = 40;
let padding = vh / 6;
let docDefinition;
let fullWidth = vw - (docMargins * 2);
let gap = 30;
let colGap = 50;

// Import variables
let clientSelect = 0;
let dropdown;
let clientList = [];
let worksheets = {};
let client = {}
let sheets;
let selection;
let plotImage = {};
let showPlotImage = false;

// Colours
let lightGray = '#f2f2f2';
let midGray = '#e6e6e6';
let darkGray = '#666666';
let orange = '#fc8124';

//// HTML variables
let page;
let container;
let infoContainer;

//// Input variables
// let container;
// let LPA = { q: 'Land Planning Authority:', id: 'lpa', a: '' };
// let postcode = { q: "Postcode:", id: "pc", a: '' };
// let accountManager = { q: "Account Manager:", id: "am", a: '' };
// let projectPartner = { q: "Project Partner:", id: 'pPartner', a: '' };
// let landOwner = { q: "Land Owner:", id: "lo", a: '' };
// let acreage = { q: "Acreage:", id: "acres", a: '' };
// let acquisitionOfLand = { q: "Acquisition of Land:", id: "aol", a: '' };
// let yearOfAcquisition = { q: "Year of Acquisition:", id: "yoa", a: '' };
// let currentLandUse = { q: "Current Land Use:", id: "clu", a: '' };
// let reasonForDiversification = { q: "Reason For Diversification:", id: "rfd", a: '' };
// let proposedProject = { q: "Proposed Project:", id: "pp", a: '' };
// let income = { q: "Income:", id: "income", a: "" };
// let expenditure = { q: "Expenditure:", id: "exp", a: "" };
// let landOwnerIncome = { q: "Land Owner Income:", id: "loi", a: "" };

pdfMake.fonts = {
    helvetica: {
        normal: 'HelveticaNeue.ttf',
        bold: 'HelveticaNeue-Bold.ttf',
        light: 'HelveticaNeue-Light.ttf',
    }
};

function UpdateDoc() {
    docDefinition = {
        pageSize: {
            width: vw,
            height: vh
        },
        pageMargins: docMargins,
        images: {
            img1: 'https://cdn.jsdelivr.net/gh/simizeko/report-assets@main/images/photo-1471289660181-7feae98d61ae.jpeg',
            logo: 'https://cdn.jsdelivr.net/gh/simizeko/report-assets@main/images/UpAcreStackedRGB.png'
        },
        header: {
            // image: 'img1',
            // fit: [vw, vh / 6]
            // width: vw,
            // height: padding
        },
        footer: function (currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element

            return {
                // absolutePosition: { x: 0, y: vh / 2 },
                width: vw,
                style: 'folio',
                columns: [
                    { text: 'upacre.co.uk', alignment: 'left', width: '*' },
                    { text: currentPage + ' of ' + pageCount, alignment: 'right', width: '*' }
                ]
            }
        },
        // footer: {
        //     columns: [
        //         function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
        //         { text: 'upacre.co.uk', alignment: 'right', style: 'body' }
        //     ]
        // },
        content: [
            /////////////////////////////
            // PAGE 1
            // HeaderImage('img1'),
            {
                image: 'logo',
                width: 140,
                alignment: 'center',
                margin: [0, vh / 4, 0, 60]
            },
            {
                text: client.lpa,
                style: 'h1',
                alignment: 'center',
                margin: [0, 0, 0, 0]
            },
            {
                text: client.postcode,
                style: 'h1',
                alignment: 'center',
                bold: false
            },
            {
                text: 'Signed and Approved by:',
                style: 'body',
                alignment: 'center',
                margin: [0, 0, 0, 0]
            },
            {
                text: client.accountManager,
                style: 'body',
                alignment: 'center',
                margin: [0, 0, 0, 0]
            },
            {
                text: 'This entire Document is strictly Private and Confidential',
                style: 'body',
                alignment: 'center',
                bold: true,
                margin: [0, 230, 0, 0]
            },
            {
                text: 'Up Acre Limited, Studio 2, 92 Lots Road, Chelsea, London, SW10 0QD',
                style: 'body',
                alignment: 'center',
                pageBreak: 'after'
            },

            /////////////////////////////
            // PAGE 2
            // HeaderImage('img1'),
            Title("Executive Summary"),
            h3("Overview"),
            LineTable([
                "Land Owner", client.name,
                "Acreage", client.acres,
                "Land Planning Authority", client.lpa,
                "Acquisition of Land", client.aol,
                "Year of Acquisition", client.yoa,
                "Current Land Use", client.clu,
                "Reason for Diversification", client.rfd,
                "Proposed Project", client.proposedProject
            ]),
            Body(
                "This report is a personalised review of your submitted "
                + client.acres
                + " acres in "
                + client.lpa
                + ", "
                + client.postcode
                + ". Our project partner, "
                + client.projectPartner
                + ", has analysed and evaluated your land's potential within "
                + client.proposedProject
                + ". The report is a guide for potential diversification, and all figures/strategies should be taken as estimations. Below is my brief summary on the project."),

            Body(client.executiveSummary),
            h3("Financial Summary"),
            LineTable([
                "Total Project Income", client.income,
                "Total Project Cost", client.expenditure,
                "Land Owner Income", client.loIncome
            ]),
            PageBreak(),

            /////////////////////////////
            // PAGE 3
            HeaderImage('plot'),
            Title('Project Outline'),
            TwoColumn('Report', 'Desk survey and ecological forecasting.'),
            Arrow(midGray),
            TwoColumn('Site Visit', 'Discussion of the BNG strategy and NDA.'),
            Arrow(midGray),
            TwoColumn('Legals', 'Signing and negotiating of all legal documents.'),
            Arrow(midGray),
            TwoColumn('Sell Units', 'Marketing of site to appropriate developers seeking planning.'),
            Arrow(midGray),
            TwoColumn('Trigger Lease', 'The 33 year lease begins and all parties get paid.'),
            Arrow(midGray),
            TwoColumn('Manage and Monitor', 'Habitats created and the monitoring and management of the site begins.', orange),

            LineTable([
                'Options Agreement', client.optionAgreement,
                'Management Agreement', client.managementAgreement,
                'Landowner Obligations', client.loObligation,
                'Term Length', client.termLength,
                'Agreement Type', client.agreementType
            ]),
            PageBreak(),

            /////////////////////////////
            // PAGE 4
            // HeaderImage('img1'),
            Title("The Site"),
            PlotDisplay('plot'),
            {
                columns: [[
                    h3('Overview of Site'),
                    LineTable([
                        "Grade Land", client.gradeLand,
                        "Soil Type", client.soilType,
                        "Terrain", client.terrain,
                        "Greenbelt", client.greenbelt,
                        "Brownfield", client.brownfield,
                        "Near Water", client.nearWater,
                        "Near Main Roads", client.nearAm
                    ])],
                [
                    h3('Distance from Site'),
                    LineTable([
                        "Ancient Woodland", client.ancientWoodland,
                        'Flood Zone 2', client.floodZone2,
                        "Flood Zone 3", client.floodZone3,
                        "Public Rights of Way", client.prow,
                        "Listed Buildings", client.listedBuildings,
                        "Nature Reserves", client.natureReserve,
                        "AONB", client.aonb,
                        "SSSI", client.sssi,
                        "Built Up Area", client.dfba,
                        "RAMSAR", client.ramsar,
                        "National Park", client.nationalPark
                    ])]
                ]
            },
            PageBreak(),

            /////////////////////////////
            // PAGE 5
            // HeaderImage('img1'),
            Title('Financial Forecast'),
            h3('Revenue'),
            BodySmall("Total sales is the income from sales and is based on the assumptions that a unit will be sold for £20,000 and a management cost of £7,000 per-unit created is achieved."),
            LineTable([
                'Unit Sales', client.sales,
                'Maintenance Sales', client.mSales
            ]),
            h3('Costs'),
            BodySmall("The below costs are subtracted from total sales, resulting in a net-profit."),
            LineTable([
                'Management Costs', client.mCosts,
                'Development Costs', client.habitatCreation,
                'Sales Fee', client.salesFee,
                'Hurdle Rate', client.hurdleRate,
                'Total Costs', client.expenditure,
                'Net Profit', client.netProfit
            ], true),
            h3("Total Paid to Land Owner"),
            BodySmall("The net profit is then split in a 60% favour of you, the landower. The hurdle rate (which is the estimation of your lands market value), is added to the net-profit to accumulate your grand total."),
            LineTable([
                "60% Split of Sales", client.loCut,
                "Hurdle Rate", client.hurdleRate
            ]),
            // TwoColumn("Total Net Income for the Landowner", "{{landowner income}}",null, 'TOTAL')
            FillTable(["Total Net Income for the Landowner", client.loIncome], true),
            BodySmall("Please note the above sum is an estimation and could be subject to change."),
            PageBreak(),

            /////////////////////////////
            // PAGE 6
            // HeaderImage('img1'),
            Title("Terms & Conditions"),
            TermsAndConditions(),
            BodySmall("By engaging in Up Acre's services, the client agrees to abide by these terms and conditions."),
            PageBreak(),

            /////////////////////////////
            // PAGE 7
            // HeaderImage('img1'),
            Title("Biodiversity Net Gain: FAQs"),
            {
                columns: [
                    [
                        h4body("What is biodiversity net gain?", "Biodiversity net gain (BNG) is a system where housebuilders have to make an overall positive impact on UK’s environment by paying landowners to have degraded or poor parts of land restored and maintained."),
                        h4body("What is biodiversity net gain in terms of new legal responsibilities for developers?", "As of January 2024, all housebuilders in England are required to provide a minimum 10% ‘net gain’ in biodiversity. This legislation will go a long way towards halting and even reversing the decline in biodiversity in England by ensuring that the issue becomes a primary focus for property developers nationwide."),
                        h4body("What is biodiversity net gain in terms of ‘onsite’ and ‘offsite’ solutions?", "Onsite BNG means meeting the new requirements and introducing the 10% biodiversity net gain at the same site as development takes place. Onsite solutions are not always viable without losing a developable area; therefore, mitigating against this biodiversity loss is offsite."),
                        h4body("Are onsite or offsite BNG habitats better for the environment?", "From an ecological perspective, offsite is better. The types of habitats and species generated onsite tend to be heavily weighted towards species that thrive near human activity. Working offsite – and preferably linking up several biodiversity sites into more significant sites – means a greater diversity of species can thrive."),
                        h4body("What is a Habitat Unit (HU)?", "A Habitat Unit is a parcel of land that is used to create an uplift in biodiversity. A unit is usually made on low-productivity land, which can be converted to species-rich grassland, woodland, wetland, mixed scrub or rewilding sites. The numerical value of a Habitat Unit is based on its type, distinctiveness, condition and location. Conversion of low-value habitats to higher-value ones typically generates 1-3 Habitat Units per acre.")
                    ],
                    [
                        h4body("How much does the Landowner receive?", "If the Landowner inputs over 20 acres of land, they will receive an upfront payment. The amount is typically £15,000 - £30,000 per acre. £10,000 is the agricultural value of the land, and the remainder is half the HU value of the land. The other half is the amount the developer takes.\n\nLand under 20 acres is more complicated and can range from £300 - £600 per acre per annum over 30 years. This is only if you decide to go with a leased land bank agreement."),
                        h4("An Example of how it works", orange),
                        NumberList([
                            "A housebuilder builds 100 homes but, in the process, destroys an ancient bog (or something equivalent).",
                            "The housebuilder hires an ecologist to calculate the environmental damage this has caused. The Ecologist uses the Habitat Units to show the extent of damage done to the bog. (for this, we will say they score - 10 Habitat Units)",
                            "The housebuilder must find and purchase appropriate Habitat Units to offset the damage to the ancient bog.",
                            "They find a landowner who, with the help of a Specialist Ecologist, has restored their over farmed and disused land into a new bog(or wildflower meadow, forest etc).For doing this, the land owner is awarded Habitat Units.",
                            "The housebuilder will contact the landowner and purchase the necessary Habitat Units. (As this has to be a net gain of 10%, the housebuilder must buy +11 Habitat Units from the landowner.)",
                            "Each Habitat Unit typically costs £15,000 - £40,000 and has to be maintained for 30 years.The landowner retains all ownership of the land, and at the end of the 30 years, they can do whatever they so wish with the land.",
                            "It is down to the landowner to maintain and manage the land throughout the 30"
                        ])
                    ]
                ]
            }
        ],

        // Base styles
        styles: {
            title: {
                fontSize: 28,
                bold: true,
                // color: orange,
                lineHeight: 1,
                // margin: [0, padding, 0, gap]
                margin: [0, 0, 0, gap]
            },
            h1: {
                fontSize: 28,
                bold: true,
                lineHeight: 1,
                margin: [0, 0, 0, gap]
            },
            h2: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, (gap / 1.5)]
            },
            h3: {
                fontSize: 14,
                color: orange,
                bold: true,
                margin: [0, 0, 0, (gap / 2)]
            },
            h4: {
                fontSize: 9,
                bold: true,
                margin: [0, 0, 0, 0]
            },
            body: {
                fontSize: 9,
                lineHeight: 1.5,
                margin: [0, 0, 0, (gap / 3)]
            },
            bodySmall: {
                fontSize: 8,
                lineHeight: 1.25,
                color: darkGray,
                margin: [0, -(gap / 3), (vw / 4), (gap / 3.5)]
            },
            folio: {
                fontSize: 8,
                color: darkGray,
                margin: [docMargins / 2, 0, docMargins / 2, 0]
            }
        },
        defaultStyle: {
            font: 'helvetica',
            columnGap: colGap
        }
    }

    // Add the plot image to the docDefinition object
    if (showPlotImage) {
        docDefinition.images.plot = plotImage.src
    }
}


///// HTML page ///////
function setup() {
    select('.p5Canvas').remove();

    page = createDiv('');
    page.position(0, 0);
    // page.style('width: 100%');
    // page.style('background-color: #5ad1ad');
    // page.style('overflow: hidden');
    // page.style('display: inline-block')

    container = createDiv('').id('container');
    // container.position(0, 0);
    // container.style('min-width', '50%');
    // container.style('width: 50%')
    container.parent(page);
    container.style('padding: 40px');
    container.style('padding-top: 20px');
    container.style('background-color: #f2f2f2');
    container.style('float: left');
    // container.style('position: relative');
    // container.style('display: block');

    infoContainer = createDiv('');
    infoContainer.parent(page);
    infoContainer.style('padding: 40px');
    infoContainer.style('padding-top: 0px');
    // infoContainer.style('background-color: #cdcdcd');
    // infoContainer.style('width: 50%');
    infoContainer.style('display: inline-block');


    pageTitle('Report Prototype');
    createP('Please upload the spreadsheet as an .xlsx').parent(container);

    // Find the input in the html and parent to container div
    // let upload = select("#file");
    // upload.parent(container);
    // let upload = createFileInput().id('file');
    // upload.parent(container);

    let upload = document.createElement('INPUT');
    upload.setAttribute("type", "file");
    upload.setAttribute("id", "file");
    document.getElementById('container').appendChild(upload);

    Init();
    Styles();
}

function pageTitle(text) {
    let t = createElement('h1', text);
    t.parent(container);
    t.style('font-family', 'sans-serif');
    t.style('margin-bottom', '40px');
    // t.style('width', '100%');
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


                // if (clientList.length < 0) {
                //     createP('Please upload a valid .xlsx spreadsheet').parent(container).addClass('Body');
                // }

                ClientDropDown(clientList)
                Styles();
            }

        }
    });
}

function ClientDropDown(list) {

    //// delete everything below dropdown so it stays in the same order
    DeleteElements('#dropdownText', '#clientDropdown', '.clientInfo', '#submitButton', '#plotImage', '#plotText');

    createP('Please select client number').parent(container).style('margin-top: 40px').id('dropdownText');

    dropdown = createSelect().id('clientDropdown');
    dropdown.parent(container);
    dropdown.style('display', 'block');
    dropdown.style('margin-bottom', '20px');
    // dropdown.style('margin-top', '20px');
    dropdown.option('Client Number');
    dropdown.disable('Client Number');
    dropdown.selected('Client Number');

    for (let i = 0; i < list.length; i++) {
        dropdown.option(list[i]);
    }
    dropdown.style('width', '200px');
    dropdown.changed(UpdateClient);
}


function UpdateClient() {
    clientSelect = clientList.indexOf(Number(dropdown.value()));

    ClientObject(worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect]);


    function ClientObject(spreadsheet) {
        //// The client object is defined here
        // client = worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect];
        client = {
            lpa: spreadsheet.LPA,
            postcode: spreadsheet.Postcode,
            accountManager: spreadsheet["Account Manager"],
            name: spreadsheet["Client Name"],
            acres: spreadsheet.Acreage,
            aol: spreadsheet["Acquisition of Land"],
            yoa: spreadsheet["Year of Acquisition "],
            clu: spreadsheet["Current Land Use "],
            rfd: "{{Reason for Diversification}}",
            proposedProject: spreadsheet["Proposed Project "],
            projectPartner: spreadsheet["Project Partner"],
            executiveSummary: spreadsheet["Executive Summary"],
            income: Currency("Income "),
            expenditure: Currency("Expenditure"),
            ownerIncome: Currency("Landowner Income"),
            strategy: spreadsheet.Strategy,
            habitats: spreadsheet["The Habitats"],
            optionAgreement: spreadsheet["Option Agreement"],
            managementAgreement: spreadsheet["Management Agreement"],
            loObligation: spreadsheet["Landowner Obligation"],
            termLength: spreadsheet["Term Length"],
            sales: Currency("Sales"),
            mSales: Currency("Management Sales"),
            mCosts: Currency("Management Costs"),
            habitatCreation: Currency("Habitat Creation"),
            salesFee: Currency("Sales Fee"),
            hurdleRate: Currency("Hurdle Rate"),
            netProfit: Currency("Net Profit"),
            loCut: Currency("Landowner Cut"),
            loIncome: Currency("Landowner Income"),
            financialSummary: "{{Financial Summary}}",
            gradeLand: spreadsheet["Agricultural Grade Land"],
            soilType: spreadsheet["Soil type"],
            terrain: spreadsheet.Terrain,
            brownfield: spreadsheet.Brownfield,
            nearWater: spreadsheet["Near Water"],
            nearAm: spreadsheet["Near A/M Road"],
            dfba: spreadsheet["Distance from built up area"],
            ramsar: spreadsheet.RAMSAR,
            nationalPark: spreadsheet["National Park"],
            ancientWoodland: spreadsheet["Ancient Woodland"],
            floodZone2: spreadsheet["Flood Zone 2"],
            floodZone3: spreadsheet["Flood Zone 3"],
            greenbelt: spreadsheet.Greenbelt,
            prow: spreadsheet.PRoW,
            listedBuildings: spreadsheet["Listed Buildings"],
            natureReserve: spreadsheet["Nature Reserves "],
            aonb: spreadsheet.AONB,
            sssi: spreadsheet.SSSI,
            agreementType: spreadsheet["Agreement Type"]
        }

        function Currency(data) {
            let v = "£ " + str(spreadsheet[data]).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
            return v;
        }
    }

    PlotImageUpload();
    SubmitButton('Create Report PDF');
    ClientDisplay();
    // UpdateData();
    Styles();
}


function PlotImageUpload() {

    DeleteElements('#plotImage', '#plotText', '#plotFile', '#error');

    let l = createP('Upload a plot image (optional)').parent(container).style('margin-top: 40px').id('plotText');
    let e = createP('').parent(l).style('color: red').id('error');

    // let imgUpload = createFileInput(HandleImage).id('plotImage');
    // imgUpload.parent(container);

    let imgUpload = document.createElement('INPUT');
    imgUpload.setAttribute("type", "file");
    imgUpload.setAttribute('id', 'plotFile');
    document.getElementById('container').appendChild(imgUpload);

    let plot = document.getElementById('plotFile');
    plot.addEventListener("change", function (e) {
        if (!!plot.files && plot.files.length > 0) {

            var reader = new FileReader();

            reader.onload = function (e) {
                plotImage.src = reader.result;
                HandleImage(plot.files[0]);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // // const f = document.querySelector("input[type=file]").files[0];
    // const f = document.querySelectorAll("input[type=file]");
    // // const f = document.getElementById('plotFile')

    // // console.log(f[1].files[0]);
    // const reader = new FileReader();

    // reader.addEventListener(
    //     "load",
    //     () => {
    //         // convert image file to base64 string
    //         // preview.src = reader.result;

    //         plotImage.src = reader.result;
    //         // console.log(reader.result);
    //     },
    //     false,
    // );

    // if (f[1].files[0]) {
    //     reader.readAsDataURL(f[1].files[0]);
    //     console.log(plotImage);

    //     // let thumbnail = document.createElement('img');
    //     // thumbnail.src = 'my_image.jpg';
    //     // document.getElementById('container').appendChild(thumbnail);
    // }


    // plot.addEventListener("change", function (e) {
    //     if (!!plot.files && plot.files.length > 0) {
    //     }
    // });


    function HandleImage(file) {
        DeleteElements('#plotImage');
        if (file.type === 'image' || file.type === 'image/jpeg' || file.type === 'image/png') {
            // let thumbnail = createImg(file.data, '');
            let thumbnail = createImg(plotImage.src, '').id('plotImage');
            thumbnail.parent(l);
            thumbnail.style('width', '200px');
            thumbnail.style('display', 'block');
            thumbnail.style('margin-top', '20px');

            // const preview = document.querySelector("img");
            // const f = document.querySelector("input[type=file]").files[0];
            // // const f = imgUpload.value().blob();
            // const reader = new FileReader();

            // reader.addEventListener(
            //     "load",
            //     () => {
            //         // convert image file to base64 string
            //         preview.src = reader.result;
            //     },
            //     false,
            // );

            // if (f) {
            //     plotImage = reader.readAsDataURL(f);
            // }




            e.html('');
            // select('#submitButton').style('visibility: visible');
            showPlotImage = true;
        } else {
            pic = null;
            e.html('Please upload a valid .jpeg or .png file');
            // select('#submitButton').style('visibility: hidden');
            showPlotImage = false;
        }
    }
}


function SubmitButton(text) {

    DeleteElements('#submitButton');

    let submit = createButton(text).id('submitButton');
    submit.parent(container);
    submit.style('padding', '10px');
    submit.style('margin-top', '30px');
    submit.style('display', 'block');
    submit.mouseReleased(CreateDocument);
}


function ClientDisplay() {
    //Clear all client Info text
    DeleteElements('.clientInfo');

    createElement('h3', 'Client Info').style('font-family: sans-serif').style('margin-top: 50px').parent(infoContainer).addClass('clientInfo');
    let keys = Object.keys(worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect]);
    let values = Object.values(worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect]);
    for (let i = 0; i < Object.entries(worksheets[sheets[Object.keys(worksheets).indexOf('Report')]][clientSelect]).length; i++) {
        createP(keys[i] + ":   " + values[i]).parent(infoContainer).addClass('clientInfo');
    }
}


function Styles() {
    let b = selectAll('p')
    for (let i = 0; i < b.length; i++) {
        b[i].style('font-family', 'sans-serif').style('max-width: 50vw');
    }
}

// function Input(text, id) {
//     let l = createElement('label', text).attribute('for', id);
//     l.parent(container);
//     l.style('margin-bottom', '4px');
//     l.style('font-family', 'sans-serif');
//     l.style('display', 'block');

//     let b = createInput('').id(id)
//     b.parent(container);
//     b.style('margin-bottom', '40px');
//     b.style('padding', '8px');
//     // b.style('width', '40%');
//     b.style('width', '250px');
//     b.value('{{' + id + '}}')
//     // b.input(() => {
//     // UpdateValues();
//     // console.log(b.value());
//     // });
// }
