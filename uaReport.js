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
            image: 'img1',
            // fit: [vw, vh / 6]
            width: vw,
            height: padding
        },
        content: [
            /////////////////////////////
            // PAGE 1
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

            Title("Terms & Conditions"),
            TermsAndConditions(),
            BodySmall("By engaging in Up Acre's services, the client agrees to abide by these terms and conditions.")


            // h4("1. Introduction"),
            // Body("1.1 Up Acre Ltd. ('Up Acre') specialises in alternative land diversification for farmers and landowners."),
            // 2. Reports and Advice:
            // 2.1 Up Acre provides reports based on predictions and estimations. These reports are generic advice and should not be
            // considered as absolute guarantees.
            // 2.2 Clients are advised to conduct their own research and seek professional advice before making any decisions based
            // on the reports provided by Up Acre.
            // 3. Remuneration:
            // 3.1 Up Acre is typically remunerated by the Project Partner at a rate of 2% of the net profit on a finders fee.
            // 3.2 The compensation amount and terms may vary based on the specific agreement between Up Acre and the Project
            // Partner.
            // 4. Confidentiality:
            // 4.1 Up Acre acknowledges that the information provided by clients may be sensitive and confidential.
            // 4.2 Up Acre agrees to take all reasonable measures to maintain the confidentiality of client information and not to
            // disclose it to third parties without the client's explicit consent.
            // 5. Limitation of Liability:
            // 5.1 Up Acre shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from the
            // use of its services.
            // 5.2 Up Acre's liability is limited to the fees paid by the client for the specific services rendered.
            // 6. Client Responsibilities:
            // 6.1 Clients are responsible for verifying the accuracy and completeness of the information provided by Up Acre.
            // 6.2 Clients are responsible for compliance with any applicable laws and regulations related to the use of Up Acre's
            // services.
            // 7. Termination of Services:
            // 7.1 Either party may terminate the services provided by Up Acre at any given time..
            // 8. Governing Law:
            // 8.1 These terms and conditions are governed by the laws of England and any disputes shall be resolved in the
            // appropriate courts of England.
            // 9. Amendment of Terms:
            // 9.1 Up Acre reserves the right to amend these terms and conditions at any time.
            // 9.2 Clients will be notified of any changes to the terms and conditions, and continued use of Up Acre's services implies
            // acceptance of the updated terms.
            // 10. Miscellaneous:
            // 10.1 These terms and conditions constitute the entire agreement between Up Acre and the client.
            // 10.2 No waiver or modification of these terms shall be valid unless in writing and signed by both parties."

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

    Title('Report Prototype');
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