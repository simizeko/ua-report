// A4 dimensions
let vw = 595.28;
let vh = 841.89;
let padding = vh / 6;
let docDefinition;

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
        images: {
            img1: 'https://cdn.jsdelivr.net/gh/simizeko/report-assets@main/images/photo-1471289660181-7feae98d61ae.jpeg',
            logo: 'https://cdn.jsdelivr.net/gh/simizeko/report-assets@main/images/UpAcreStackedRGB.png',
        },
        header: {
            image: 'img1',
            // fit: [vw, vh / 6]
            width: vw,
            height: padding
        },
        content: [
            // Cover page
            {
                image: 'logo',
                width: 140,
                alignment: 'center',
                margin: [0, vh / 4, 0, 60]
            },
            {
                text: LPA.a,
                // text: 'test test',
                style: 'h1',
                alignment: 'center',
                //margin: [left, top, right, bottom]
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
            // PAGE 1
            {
                text: 'Executive Summary',
                style: 'title'
            },
            {
                text: 'Overview',
                style: 'h2'
            },
            {
                // layout: 'lightHorizontalLines', // optional
                layout: {
                    hLineWidth: function hLineWidth(i, node) {
                        //   if (i === 0 || i === node.table.body.length) {
                        //     return 0;
                        //   }
                        //   return i === node.table.headerRows ? 2 : 1;
                        return (0.5)
                    },
                    vLineWidth: function vLineWidth(i) {
                        return 0;
                    },
                    hLineColor: function hLineColor(i) {
                        //   return i === 1 ? 'black' : '#aaa';
                        return '#bababa'
                    },
                    paddingLeft: function paddingLeft(i) {
                        //   return i === 0 ? 0 : 8;
                        return 0
                    },
                    paddingRight: function paddingRight(i, node) {
                        //   return i === node.table.widths.length - 1 ? 0 : 8;
                        return 50
                    },
                    paddingTop: function paddingTop(i, node) {
                        //   return i === node.table.widths.length - 1 ? 0 : 8;
                        return 8
                    },
                    paddingBottom: function paddingBottom(i, node) {
                        //   return i === node.table.widths.length - 1 ? 0 : 8;
                        return 4
                    }
                },
                style: 'body',
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['auto', '*'],
                    // heights: function (row) {
                    // 	return (row + 1)+20;
                    // },
                    body: [
                        [{ bold: true, text: 'Land Owner' }, landOwner.a],
                        [{ bold: true, text: 'Acreage' }, acreage.a],
                        [{ bold: true, text: 'Land Planning Authority' }, LPA.a],
                        [{ bold: true, text: 'Acquisition of Land' }, acquisitionOfLand.a],
                        [{ bold: true, text: 'Year of Acquisition' }, yearOfAcquisition.a],
                        [{ bold: true, text: 'Current Land Use' }, currentLandUse.a],
                        [{ bold: true, text: 'Reason for Diversification' }, reasonForDiversification.a],
                        [{ bold: true, text: 'Proposed Project' }, proposedProject.a]
                    ]
                }
            },
            {
                text: 'This report is a personalised review of your submitted ' + acreage.a + ' acres in ' + LPA.a + ', ' + postcode.a + ". Our project partner, " + projectPartner.a + ", has analysed and evaluated your land's potential within " + proposedProject.a + ". The report is a guide for potential diversification, and all figures/strategies should be taken as estimations. Below is my brief summary on the project.",
                style: 'body'
            },
            {
                text: 'Financial Summary',
                style: 'h2'
            },
            {
                layout: 'lightHorizontalLines', // optional
                style: 'body',
                pageBreak: 'after',
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 0,
                    widths: ['auto', '*'],
                    // heights: function (row) {
                    // 	return (row + 1)+20;
                    // },
                    body: [
                        [{ bold: true, text: 'Total Project Income' }, income.a],
                        [{ bold: true, text: 'Total Project Cost' }, expenditure.a],
                        [{ bold: true, text: 'Land Owner Income' }, landOwnerIncome.a],
                    ]
                }
            },

            /////////////////////////////
            // PAGE 2
            Title('Project Outline'),
            twoColumn('Report', 'Desk survey and ecological forecasting.'),
            twoColumn('Site Visit', 'Discussion of the BNG strategy and NDA.'),
            twoColumn('Legals', 'Signing and negotiating of all legal documents.'),
            twoColumn('Sell Units', 'Marketing of site to appropriate developers seeking planning.'),
            twoColumn('Trigger Lease', 'The 33 year lease begins and all parties get paid.'),
            twoColumn('Manage and Monitor', 'Habitats created and the monitoring and management of the site begins.', '#d4682f')

            // {
            //     style: 'body',
            //     table: {
            //         // headers are automatically repeated if the table spans over multiple pages
            //         // you can declare how many rows should be treated as headers
            //         headerRows: 0,
            //         widths: ['auto', '*'],
            //         // heights: function (row) {
            //         // 	return (row + 1)+20;
            //         // },
            //         body: [
            //             tableFill('Report', 'Desk survey and ecological forecasting.'),
            //             tableFill('Site Visit', 'Discussion of the BNG strategy and NDA.'),
            //             tableFill('Legals', 'Signing and negotiating of all legal documents.'),
            //             tableFill('Sell Units', 'Marketing of site to appropriate developers seeking planning.'),
            //             tableFill('Trigger Lease', 'The 33 year lease begins and all parties get paid.'),
            //             tableFill('Manage and Monitor', 'Habitats created and the monitoring and management of the site begins.')
            //             // [{ fillColor: '#CCCCCC', bold: true, text: 'Report' }, {fillColor: '#d1d1d1', text:'Desk survey and ecological forecasting'}],
            //         ]
            //     },
            //     layout: {
            //         hLineWidth: function hLineWidth(i, node) {
            //             return 2
            //         },
            //         vLineWidth: function vLineWidth(i) {
            //             return 0;
            //         },
            //         hLineColor: function hLineColor(i) {
            //             //   return i === 1 ? 'black' : '#aaa';
            //             return '#ffffff'
            //         },
            //         paddingLeft: function paddingLeft(i) {
            //             //   return i === 0 ? 0 : 8;
            //             return 16
            //         },
            //         paddingRight: function paddingRight(i, node) {
            //             //   return i === node.table.widths.length - 1 ? 0 : 8;
            //             return 16
            //         },
            //         paddingTop: function paddingTop(i, node) {
            //             //   return i === node.table.widths.length - 1 ? 0 : 8;
            //             return 16
            //         },
            //         paddingBottom: function paddingBottom(i, node) {
            //             //   return i === node.table.widths.length - 1 ? 0 : 8;
            //             return 8
            //         }
            //     }
            // },
        ],

        // Base styles
        styles: {
            title: {
                fontSize: 28,
                bold: true,
                lineHeight: 1,
                margin: [0, padding, 0, 30]
            },
            h1: {
                fontSize: 28,
                bold: true,
                lineHeight: 1,
                margin: [0, 0, 0, 30]
            },
            h2: {
                fontSize: 18,
                bold: true,
                margin: [0, 20, 0, 20]
            },
            body: {
                fontSize: 10,
                lineHeight: 1.5,
                margin: [0, 0, 0, 30]
            },
        },
        defaultStyle: {
            font: 'helvetica'
        }
    }
}

function CreateDocument() {
    UpdateValues();
    UpdateDoc();
    pdfMake.createPdf(docDefinition).open();
}

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

function Title(text) {
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



function UpdateValues() {
    LPA.a = Answer(LPA.id);
    postcode.a = Answer(postcode.id)
    accountManager.a = Answer(accountManager.id);
    projectPartner.a = Answer(projectPartner.id);
    landOwner.a = Answer(landOwner.id);
    acreage.a = Answer(acreage.id);
    acquisitionOfLand.a = Answer(acquisitionOfLand.id);
    yearOfAcquisition.a = Answer(yearOfAcquisition.id);
    currentLandUse.a = Answer(currentLandUse.id);
    reasonForDiversification.a = Answer(reasonForDiversification.id);
    proposedProject.a = Answer(proposedProject.id);
    income.a = Answer(income.id);
    expenditure.a = Answer(expenditure.id);
    landOwnerIncome.a = Answer(landOwnerIncome.id);

    function Answer(id) {
        let answer = select('#' + id);
        return answer.value();
    }


    //     // reset array
    //     // answers = [];

    //     // select all values from the inputs and add to array
    //     // let a = selectAll('.answers')
    //     // for (let i = 0; i < a.length; i++) {
    //     //     answers.push(a[i].value())
    //     // }
    //     // LPA = Input(LPAinput)
    //     // console.log(LPA);
}

function tableFill(column1, column2) {
    let t = [{ fillColor: '#b3b3b3', bold: true, text: column1 }, { fillColor: '#e6e6e6', text: column2 }]
    return t
}

function Title(titleText) {
   let t = {
        text: titleText,
        style: 'title'
    }
    return t;
}

function twoColumn(column1, column2, color) {
    let columnWidth = 90;
    let c;
    if (color) {
        c = {
            style: 'body',
            table: {
                headerRows: 0,
                widths: [columnWidth, '*'],
                body: [
                    [{ fillColor: color, bold: true, text: column1 }, { fillColor: color, text: column2 }]
                    // [{ fillColor: '#CCCCCC', bold: true, text: 'Report' }, {fillColor: '#d1d1d1', text:'Desk survey and ecological forecasting'}],
                ]
            },
            layout: {
                hLineWidth: function hLineWidth(i, node) {
                    return 0
                },
                vLineWidth: function vLineWidth(i) {
                    return 0;
                },
                hLineColor: function hLineColor(i) {
                    //   return i === 1 ? 'black' : '#aaa';
                    return '#ffffff'
                },
                paddingLeft: function paddingLeft(i) {
                    //   return i === 0 ? 0 : 8;
                    return 16
                },
                paddingRight: function paddingRight(i, node) {
                    //   return i === node.table.widths.length - 1 ? 0 : 8;
                    return 16
                },
                paddingTop: function paddingTop(i, node) {
                    //   return i === node.table.widths.length - 1 ? 0 : 8;
                    return 16
                },
                paddingBottom: function paddingBottom(i, node) {
                    //   return i === node.table.widths.length - 1 ? 0 : 8;
                    return 8
                }
            }
        }
    } else {
        c = {
            style: 'body',
            table: {
                headerRows: 0,
                widths: [columnWidth, '*'],
                body: [
                    [{ fillColor: '#b3b3b3', bold: true, text: column1 }, { fillColor: '#e6e6e6', text: column2 }]
                    // [{ fillColor: '#CCCCCC', bold: true, text: 'Report' }, {fillColor: '#d1d1d1', text:'Desk survey and ecological forecasting'}],
                ]
            },
            layout: {
                hLineWidth: function hLineWidth(i, node) {
                    return 0
                },
                vLineWidth: function vLineWidth(i) {
                    return 0;
                },
                hLineColor: function hLineColor(i) {
                    //   return i === 1 ? 'black' : '#aaa';
                    return '#ffffff'
                },
                paddingLeft: function paddingLeft(i) {
                    //   return i === 0 ? 0 : 8;
                    return 16
                },
                paddingRight: function paddingRight(i, node) {
                    //   return i === node.table.widths.length - 1 ? 0 : 8;
                    return 16
                },
                paddingTop: function paddingTop(i, node) {
                    //   return i === node.table.widths.length - 1 ? 0 : 8;
                    return 16
                },
                paddingBottom: function paddingBottom(i, node) {
                    //   return i === node.table.widths.length - 1 ? 0 : 8;
                    return 8
                }
            }
        }
    }
    return c;
}