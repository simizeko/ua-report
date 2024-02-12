// A4 dimensions
let vw = 595.28;
let vh = 841.89;
let docMargins = 40;
let padding = vh / 6;
let docDefinition;
let fullWidth = vw - (docMargins * 2);
let gap = 30;
let colGap = 50;



// Colours
let lightGray = '#f2f2f2';
let midGray = '#e6e6e6';
let darkGray = '#666666';
let orange = '#fc8124';

// Input variables
let container;
let submit;
let LPA = { q: 'Land Planning Authority:', id: 'lpa', a: '' };
let postcode = { q: "Postcode:", id: "pc", a: '' };
let accountManager = { q: "Account Manager:", id: "am", a: '' };
let projectPartner = { q: "Project Partner:", id: 'pPartner', a: '' };
let landOwner = { q: "Land Owner:", id: "lo", a: '' };
let acreage = { q: "Acreage:", id: "acres", a: '' };
let acquisitionOfLand = { q: "Acquisition of Land:", id: "aol", a: '' };
let yearOfAcquisition = { q: "Year of Acquisition:", id: "yoa", a: '' };
let currentLandUse = { q: "Current Land Use:", id: "clu", a: '' };
let reasonForDiversification = { q: "Reason For Diversification:", id: "rfd", a: '' };
let proposedProject = { q: "Proposed Project:", id: "pp", a: '' };
let income = { q: "Income:", id: "income", a: "" };
let expenditure = { q: "Expenditure:", id: "exp", a: "" };
let landOwnerIncome = { q: "Land Owner Income:", id: "loi", a: "" };

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
            plot: 'https://cdn.jsdelivr.net/gh/simizeko/report-assets@main/images/stockplot.jpeg',
            logo: 'https://cdn.jsdelivr.net/gh/simizeko/report-assets@main/images/UpAcreStackedRGB.png'

        },
        header: {
            // image: 'img1',
            // fit: [vw, vh / 6]
            // width: vw,
            // height: padding
        },
        content: [
            /////////////////////////////
            // PAGE 1
            HeaderImage('img1'),
            {
                image: 'logo',
                width: 140,
                alignment: 'center',
                margin: [0, vh / 4, 0, 60]
            },
            {
                text: LPA.a,
                style: 'h1',
                alignment: 'center',
                margin: [0, 0, 0, 0]
            },
            {
                text: postcode.a,
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
                text: accountManager.a,
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
            HeaderImage('img1'),
            Title("Executive Summary"),
            h3("Overview"),
            LineTable([
                "Land Owner", landOwner.a,
                "Acreage", acreage.a,
                "Land Planning Authority", LPA.a,
                "Acquisition of Land", acquisitionOfLand.a,
                "Year of Acquisition", yearOfAcquisition.a,
                "Current Land Use", currentLandUse.a,
                "Reason for Diversification", reasonForDiversification.a,
                "Proposed Project", proposedProject.a
            ]),
            Body(
                "This report is a personalised review of your submitted "
                + acreage.a
                + " acres in "
                + LPA.a
                + ", "
                + postcode.a
                + ". Our project partner, "
                + projectPartner.a
                + ", has analysed and evaluated your land's potential within "
                + proposedProject.a
                + ". The report is a guide for potential diversification, and all figures/strategies should be taken as estimations. Below is my brief summary on the project."),

            Body("{{executive summary}}"),
            h3("Financial Summary"),
            LineTable([
                "Total Project Income", income.a,
                "Total Project Cost", expenditure.a,
                "Land Owner Income", landOwnerIncome.a
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
                'Project Strategy', '{{strategy}}',
                'Habitats', '{{habitats}}',
                'Options Agreement', '{{options agreement}}',
                'Management Agreement', '{{management agreement}}',
                'Landowner Obligations', '{{landowner obligations}}',
                'Term Length', '{{term length}}'
            ]),
            PageBreak(),

            /////////////////////////////
            // PAGE 4
            HeaderImage('img1'),
            Title('Financial Forecast'),
            h3('Revenue'),
            BodySmall("Total sales is the income from sales and is based on the assumptions that a unit will be sold for £20,000 and a management cost of £7,000 per-unit created is achieved."),
            LineTable([
                'Unit Sales', '{{unit sales}}',
                'Maintenance Sales', '{{management sales}}'
            ]),
            h3('Costs'),
            BodySmall("The below costs are subtracted from total sales, resulting in a net-profit."),
            LineTable([
                'Management Costs', '{{Management Costs}}',
                'Development Costs', '{{Development Costs}}',
                'Sales Fee', '{{Sales Fee}}',
                'Hurdle Rate', '{{Hurdle Rate}}',
                'Total Costs', '{{expenditure}}',
                'Net Profit', '{{net profit}}'
            ], true),
            h3("Total Paid to Land Owner"),
            BodySmall("The net profit is then split in a 60% favour of you, the landower. The hurdle rate (which is the estimation of your lands market value), is added to the net-profit to accumulate your grand total."),
            LineTable([
                "60% Split of Sales", "{{landowner cut}}",
                "Hurdle Rate", "{{hurdle rate}}"
            ]),
            // TwoColumn("Total Net Income for the Landowner", "{{landowner income}}",null, 'TOTAL')
            FillTable([
                "Total Net Income for the Landowner", "{{landowner income}}"
            ]),
            BodySmall("Please note the above sum is an estimation and could be subject to change."),
            Body("{{financial summary}}"),
            PageBreak(),

            /////////////////////////////
            // PAGE 4
            HeaderImage('img1'),
            Title("The Site"),
            { image: "plot", width: fullWidth / 1.5, margin: [0, 0, 0, gap] },
            // Shape('rect', midGray),
            // Columns(
            //    [{text: "lorem ipsum donec sit amet"},
            //    {text: "Please note the above sum is an estimation and could be subject to change."}]
            // )
            {
                columns: [
                    LineTable([
                        "Grade Land", "{{grade land}}",
                        "Soil Type", "{{soil type}}",
                        "Terrain", "{{terrain}}",
                        "Brownfield", "{{brownfield}}",
                        "Near Water", "{{near water}}",
                        "Near Main Roads", "{{Near Main Roads}}",
                        "Built Up Area", "{{distance from area}}",
                        "RAMSAR", "{{ramsar}}",
                        "National Park", "{{national park}}"
                    ]),
                    LineTable([
                        "Ancient Woodland", "{{ancient woodland}}",
                        'Flood Zone 2', '{{flood zone 2}}',
                        "Flood Zone 3", "{{flood zone 3}}",
                        "Greenbelt", "{{greenbelt}}",
                        "Public Rights of Way", "{{prow}}",
                        "Listed Buildings", "{{listed buildings}}",
                        "Nature Reserves", "{{nature reserves}}",
                        "AONB", "{{aonb}}",
                        "SSSI", "{{sssi}}"
                    ])
                ]
            },
            PageBreak(),

            /////////////////////////////
            // PAGE 5
            HeaderImage('img1'),
            Title("Terms & Conditions"),
            TermsAndConditions(),
            BodySmall("By engaging in Up Acre's services, the client agrees to abide by these terms and conditions."),
            PageBreak(),

            /////////////////////////////
            // PAGE 6
            HeaderImage('img1'),
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
                margin: [0, padding, 0, gap]
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
                margin: [0, 0, 0, gap]
            },
            bodySmall: {
                fontSize: 8,
                lineHeight: 1.25,
                color: darkGray,
                margin: [0, -(gap / 3), (vw / 4), (gap / 3.5)]
            },
        },
        defaultStyle: {
            font: 'helvetica',
            columnGap: colGap
        }
    }
}


///// HTML page ///////
function setup() {
    container = createDiv('');
    container.position(0, 0);
    container.style('width', '100vw');
    container.style('padding: 40px');
    container.style('background-color: #f2f2f2');
    // container.style('display: block');

    pageTitle('Report Prototype');
    Input(LPA.q, LPA.id);
    Input(postcode.q, postcode.id);
    Input(accountManager.q, accountManager.id);
    Input(projectPartner.q, projectPartner.id);
    Input(landOwner.q, landOwner.id);
    Input(acreage.q, acreage.id);
    Input(acquisitionOfLand.q, acquisitionOfLand.id);
    Input(yearOfAcquisition.q, yearOfAcquisition.id);
    Input(currentLandUse.q, currentLandUse.id);
    Input(reasonForDiversification.q, reasonForDiversification.id);
    Input(proposedProject.q, proposedProject.id);
    Input(income.q, income.id);
    Input(expenditure.q, expenditure.id);
    Input(landOwnerIncome.q, landOwnerIncome.id);

    submit = createButton('Create PDF');
    submit.parent(container);
    submit.style('padding', '10px');
    submit.style('margin-top', '30px');
    submit.style('display', 'block');
    submit.mouseReleased(CreateDocument);

    // setInterval(() => {
    //     console.log(LPA.a)
    // }, 500);
}

function pageTitle(text) {
    let t = createElement('h1', text);
    t.parent(container);
    t.style('font-family', 'sans-serif');
    t.style('margin-bottom', '60px');
    t.style('width', '100%');
}

function Input(text, id) {
    let l = createElement('label', text).attribute('for', id);
    l.parent(container);
    l.style('margin-bottom', '4px');
    l.style('font-family', 'sans-serif');
    l.style('display', 'block');

    let b = createInput('').id(id)
    b.parent(container);
    b.style('margin-bottom', '40px');
    b.style('padding', '8px');
    // b.style('width', '40%');
    b.style('width', '250px');
    b.value('{{' + id + '}}')
    // b.input(() => {
    // UpdateValues();
    // console.log(b.value());
    // });
}
