// A4 dimensions
let vw = 595.28;
let vh = 841.89;
let docMargins = 40;
let headerDepth = vh / 10;
let fullWidth = vw - (docMargins * 2);
let gap = 30;
let colGap = 40;
let columnWidth = (fullWidth - colGap) / 2;
let bodyWidth = vw / 4.5;

// Import variables
let docDefinition = {};
let clientSelect = 0;
let dropdown;
let clientList = [];
let worksheets = {};
let client = {}
let sheets;
let selection;
let uploadedImages = {};
let showImage = {};
let errors = [];

// Colours
let lightGray = '#f2f2f2';
let midGray = '#e6e6e6';
let darkGray = '#666666';
let orange = {
    t100: '#fc8124',
    t90: '#fc8a33',
    t80: '#fc9343',
    t70: '#fd9b52',
    t60: '#fda461',
    t50: '#fdad71'
}
//// HTML variables
let flexbox;
let container;
let infoContainer;
let baseMargin = '40px'

//// Set default fonts
pdfMake.fonts = {
    helvetica: {
        normal: 'HelveticaNeue.ttf',
        bold: 'HelveticaNeue-Bold.ttf',
        light: 'HelveticaNeue-Light.ttf',
    }
};


//// Creates and updates document object
function UpdateDoc() {
    docDefinition = {
        pageSize: {
            width: vw,
            height: vh
        },
        pageMargins: docMargins,
        images: {
            defaultHeader: 'https://cdn.jsdelivr.net/gh/simizeko/ua-report@main/placeholder/photo-1471289660181-7feae98d61ae.jpeg',
            logo: 'https://cdn.jsdelivr.net/gh/simizeko/ua-report@main/placeholder/up-acre-stacked-positive-RGB.png',
            logoBlack: 'https://cdn.jsdelivr.net/gh/simizeko/ua-report@main/placeholder/up-acre-stacked-black-RGB.png',
            signature: 'https://cdn.jsdelivr.net/gh/simizeko/ua-report@main/placeholder/signature.png',
            projectPartnerLogo: 'https://cdn.jsdelivr.net/gh/simizeko/ua-report@main/placeholder/biofarmLogo.png'
        },
        header: {
            // image: 'defaultHeader',
            // fit: [vw, vh / 6]
            // width: vw,
            // height: padding
        },
        footer: function (currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element

            if (currentPage === 1 || currentPage === pageCount) {
                return;
            } else {
                return {
                    width: vw,
                    style: 'folio',
                    columns: [
                        { text: 'upacre.co.uk', alignment: 'left', width: '*', margin: [0, 15, 0, 0] },
                        { image: 'logoBlack', width: 36, alignment: 'center', opacity: 0.35 },
                        { text: currentPage + ' of ' + pageCount, alignment: 'right', width: '*', margin: [0, 15, 0, 0] }
                    ]
                }
            }
        },
        content: [
            /////////////////////////////
            // PAGE 1
            {
                image: 'logo',
                width: 120,
                alignment: 'center',
                margin: [0, vh / 5, 0, 60]
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
                image: 'signature',
                width: 100,
                alignment: 'center',
                margin: [0, gap / 2, 0, 0]
            },
            {
                text: 'This entire Document is strictly Private and Confidential',
                style: 'body',
                alignment: 'center',
                bold: true,
                absolutePosition: { x: docMargins, y: (vh - 55) - 15 },
                margin: [0, 0, 0, 0]
            },
            {
                text: 'Up Acre Limited, Studio 2, 92 Lots Road, Chelsea, London, SW10 0QD',
                style: 'body',
                alignment: 'center',
                absolutePosition: { x: docMargins, y: (vh - 55) },
                margin: [0, 0, 0, 0],
                pageBreak: 'after'
            },

            /////////////////////////////
            // PAGE 2
            HeaderImage(),
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
                + ". The report is a guide for potential diversification, and all figures/strategies should be taken as estimations. Below is my brief summary on the project."
            ),

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
            HeaderImage(),
            Title('Project Outline'),
            TwoColumn('Report', 'Desk survey and ecological forecasting.', orange.t50),
            Arrow(orange.t50),
            TwoColumn('Site Visit', 'Discussion of the BNG strategy and NDA.', orange.t60),
            Arrow(orange.t60),
            TwoColumn('Legals', 'Signing and negotiating of all legal documents.', orange.t70),
            Arrow(orange.t70),
            TwoColumn('Sell Units', 'Marketing of site to appropriate developers seeking planning.', orange.t80),
            Arrow(orange.t80),
            TwoColumn('Trigger Lease', 'The 33 year lease begins and all parties get paid.', orange.t90),
            Arrow(orange.t90),
            TwoColumn('Manage and Monitor', 'Habitats created and the monitoring and management of the site begins.', orange.t100),

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
            HeaderImage(),
            Title('Project Partner'),
            {
                margin: [0, 0, 0, gap / 2],
                columns: [
                    PartnerLogo(uploadedImages['partner-logo0']),
                    [h3(client.projectPartner), Body(client.aboutPartner), Body(client.partnerInfo),]
                ]
            },
            h3('Proposed Project Strategy'),
            DisplayImage('habitat0', 'habitat1'),
            {
                columns: [
                    h4body("{{Neutral Grassland}}", "{{Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies hendrerit massa, sed tincidunt nisi tempus eu. Etiam rhoncus tempor enim, nec gravida ligula ultricies ut. Curabitur tincidunt ante non tortor scelerisque, non convallis ex congue. Mauris vestibulum dui risus, eu mollis sapien interdum ac.}}"),
                    h4body("{{Wild Flowers}}", "{{Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies hendrerit massa, sed tincidunt nisi tempus eu. Etiam rhoncus tempor enim, nec gravida ligula ultricies ut. Curabitur tincidunt ante non tortor scelerisque, non convallis ex congue. Mauris vestibulum dui risus, eu mollis sapien interdum ac.}}")
                ]
            },
            Spacer(),
            Body(client.strategy),
            PageBreak(),

            /////////////////////////////
            // PAGE 5
            HeaderImage(),
            Title("The Site"),
            DisplayImage('plot0', 'plot1'),
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
            Spacer('large'),
            BodySmall("DISCLAIMER: Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla semper tincidunt lacus, vitae convallis eros varius eget.Vivamus volutpat nisl et sem feugiat accumsan.Nunc mattis blandit magna, non laoreet est congue a.Nulla nunc metus, luctus quis ultrices eu, ultricies vel mauris.Vestibulum convallis maximus neque, ornare volutpat enim pellentesque id."),
            PageBreak(),

            /////////////////////////////
            // PAGE 6
            HeaderImagePlot(),
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
            FillTable(["Total Net Income for the Landowner", client.loIncome], true),
            BodySmall("Please note the above sum is an estimation and could be subject to change."),
            PageBreak(),

            /////////////////////////////
            // PAGE 7
            HeaderImage(),
            Title("Terms & Conditions"),
            TermsAndConditions(),
            BodySmall("By engaging in Up Acre's services, the client agrees to abide by these terms and conditions."),
            PageBreak(),

            /////////////////////////////
            // PAGE 8
            HeaderImage(),
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
                        h4("An Example of how it works", orange.t100),
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
            },
            PageBreak(),

            /////////////////////////////
            // PAGE 9
            { image: 'logoBlack', opacity: 0.35, width: 120, absolutePosition: { x: (vw / 2) - 60, y: (vh / 2) - 90 } },
            {
                text: "e: info@upacre.co.uk\nt: 020 394 417 067\nm: 07933 430 394",
                style: 'body',
                alignment: 'center',
                absolutePosition: { x: docMargins, y: (vh - 55) - 38 }
            },
            {
                text: 'upacre.co.uk',
                style: 'body',
                bold: true,
                color: orange.t100,
                alignment: 'center',
                absolutePosition: { x: docMargins, y: vh - 55 }
            }
        ],

        // Base styles
        styles: {
            title: {
                fontSize: 28,
                bold: true,
                // color: orange,
                lineHeight: 1,
                margin: [0, (headerDepth - 5), 0, gap]
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
                color: orange.t100,
                bold: true,
                margin: [0, gap / 2, 0, (gap / 2)]
            },
            h4: {
                fontSize: 9,
                lineHeight: 1,
                bold: true,
                margin: [0, 0, 0, 2]
            },
            body: {
                fontSize: 9,
                lineHeight: 1.25,
                margin: [0, 0, 0, (gap / 3)]
            },
            bodySmall: {
                fontSize: 8,
                lineHeight: 1.25,
                color: darkGray,
                margin: [0, -(gap / 3), bodyWidth, (gap / 3.5)]
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
}


///// HTML page ///////
function setup() {
    select('.p5Canvas').remove();

    flexbox = createDiv('');
    flexbox.position(0, 0);
    flexbox.style('display: flex');
    flexbox.style('flex-direction: row');
    flexbox.style('flex-wrap: wrap');
    // flexbox.style('width: 100%');
    // flexbox.style('background-color: #5ad1ad');
    // flexbox.style('overflow: hidden');

    container = createDiv('').id('container');
    // container.position(0, 0);
    // container.style('min-width', '50%');
    // container.style('width: 50%')
    container.parent(flexbox);
    container.style('padding', baseMargin);
    // container.style('padding-top: 20px');
    container.style('background-color: #f2f2f2');
    // container.style('float: left');
    // container.style('width', '200%');
    // container.style('min-width', '50%');
    // container.style('position: relative');
    // container.style('display: block');

    infoContainer = createDiv('');
    infoContainer.parent(flexbox);
    infoContainer.style('padding', baseMargin);
    infoContainer.style('padding-top: 0px');
    // infoContainer.style('background-color: #cdcdcd');
    infoContainer.style('max-width: 50%');
    // infoContainer.style('float', 'left');
    // infoContainer.style('display: inline-block');


    pageTitle('Report Prototype');
    createP('Please upload the spreadsheet as an .xlsx').parent(container);


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
    t.style('margin-top', '0px');
    t.style('margin-bottom', baseMargin);
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

                //// Populate a list of client numbers
                for (let i = 0; i < worksheets[sheets[0]].length; i++) {
                    let l = worksheets[sheets[0]][i]["Client Number "];
                    clientList.push(l);
                }

                ClientDropDown(clientList)
                Styles();
            }

        }
    });
}

function ClientDropDown(list) {

    //// delete everything below dropdown so it stays in the same order
    DeleteElements('#dropdownText', '#clientDropdown', '.clientInfo', '#submitButton', '#plotImage0', '#plotImage1', '#plotText');

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
            habitats: List("Habitats"),
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
            floodZone: spreadsheet["Flood Zone "],
            greenbelt: spreadsheet.Greenbelt,
            prow: spreadsheet.PRoW,
            listedBuildings: spreadsheet["Listed Buildings"],
            natureReserve: spreadsheet["Nature Reserves "],
            aonb: spreadsheet.AONB,
            sssi: spreadsheet.SSSI,
            agreementType: '{{ Agreement Type }}',
            aboutPartner: '{{ About Prject Partner }}',
            partnerInfo: '{{ Further Partner Information }}',
        }

        function Currency(data) {
            let value = "£ " + str(spreadsheet[data]).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
            return value;
        }

        function List(data) {
            let list = str(spreadsheet[data]).replace(/(\d+)\u002E/g, '\n$1\u002E');
            let removeFirstLineBreak = list.replace('\n', '');
            return removeFirstLineBreak;
        }
    }

    ImageUpload('partner-logo', 1, '#e6e6e6', true);
    ImageUpload('habitat', 2, '#e6e6e6');
    ImageUpload('plot', 2, '#d9d9d9');
    SubmitButton('Create Report PDF');
    ClientDisplay();
    Styles();
}


function ImageUpload(category, numberOfInputs, color, required) {

    function CategoryId(text) {
        let string = '#' + category + text;
        return string;
    }

    // DeleteElements(CategoryId('Image0'), CategoryId('Image1'), CategoryId('Text'), CategoryId('File0'), CategoryId('File1'), CategoryId('Error'));
    DeleteElements(CategoryId('UploadContainer'));

    let imageUploadContainer = createDiv('').parent(container).id(category + 'UploadContainer');
    imageUploadContainer.style('background-color', color);
    imageUploadContainer.style('width', '100%');
    imageUploadContainer.style('margin-left', '-' + baseMargin);
    imageUploadContainer.style('margin-right', '-' + baseMargin);
    imageUploadContainer.style('padding', baseMargin);

    let containerId = select(CategoryId('UploadContainer'));

    let label = ' images (optional)';
    if (numberOfInputs == 1) {
        label = ' .jpeg or .png'
    }
    let l = createP('Upload ' + category + label).style('margin-top', '0px').parent(containerId).id(category + 'Text');
    if (required) {
        l.html(' (required)', true);
    }

    let e = [];

    for (let i = 0; i < numberOfInputs; i++) {
        e[i] = createP('').parent(l).style('color: red').id(category + 'Error' + i);
    }

    for (let i = 0; i < numberOfInputs; i++) {
        let imgUpload = document.createElement('INPUT');
        imgUpload.setAttribute("type", "file");
        imgUpload.setAttribute('id', category + 'File' + i);
        document.getElementById(category + 'UploadContainer').appendChild(imgUpload);

        if (required) {
            imgUpload.setAttribute('class', 'requiredInput');
        }

        let uploaded = document.getElementById(category + 'File' + i);
        uploaded.addEventListener("change", function (e) {
            if (!!uploaded.files && uploaded.files.length > 0) {

                var reader = new FileReader();

                reader.onload = function (e) {
                    uploadedImages[category + i] = reader.result;
                    HandleImage(uploaded.files[0], i);
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    function HandleImage(file, index) {
        DeleteElements(CategoryId('Image') + index);
        if (required) {
            RequiredCheck();
        }
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            let thumbnail = createImg(uploadedImages[category + index], '').id(category + 'Image' + index);
            thumbnail.parent(l);
            thumbnail.style('width', '200px');
            thumbnail.style('display', 'inline');
            thumbnail.style('margin-right: 20px');

            e[index].html('');

            //// Replaces array with array that does not contain any specified string
            errors = errors.filter(a => a !== category + 'Image' + index);

        } else {
            // pic = null;
            e[index].html(category + ' image ' + (index + 1) + ': ' + 'Please upload a valid .jpeg or .png file');
            // select('#submitButton').style('visibility: hidden');
            // showPlotImage['value' + index] = false;
            // showImage[category + index] = false;
            errors.push(category + 'Image' + index);
            // console.log(errors)
        }
    }
}


function SubmitButton(text, color) {

    DeleteElements('#buttonContainer');

    let buttonContainer = createDiv('').id('buttonContainer');
    buttonContainer.parent(container);
    buttonContainer.style('background-color', color);
    buttonContainer.style('margin', '-' + baseMargin)
    buttonContainer.style('margin-top', '0px');
    buttonContainer.style('padding', baseMargin);
    // buttonContainer.style('float', 'left');
    // buttonContainer.style('display', 'block');

    let submit = createButton(text).id('submitButton');
    submit.parent(buttonContainer);
    submit.style('padding', '10px');
    // submit.style('margin-top', '60px');
    submit.style('display', 'block');
    submit.style('width', '100%');
    // submit.style('position', 'relative');
    // submit.style('float', 'left');
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
    let b = selectAll('p');
    for (let i = 0; i < b.length; i++) {
        b[i].style('font-family', 'sans-serif');
        // b[i].style('max-width: 40vw');
        // b[i].style('min-width: 40%');
        // b[i].style('margin-left', baseMargin);
        // b[i].style('margin-right', baseMargin);
        // b[i].style('background-color: red');
    }

    // let v = selectAll('#file');
    // for (let i = 0; i < v.length; i++) {
    //     v[i].style('margin-left', baseMargin);
    //     v[i].style('margin-right', baseMargin);
    // }
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
