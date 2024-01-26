// A4 dimensions
let vw = 595.28;
let vh = 841.89;
let padding = vh / 6;


// Input variables
let LPA;
let clientName = 'Jane Smith';

pdfMake.fonts = {
    helvetica: {
        normal: 'HelveticaNeue.ttf',
        bold: 'HelveticaNeue-Bold.ttf',
        light: 'HelveticaNeue-Light.ttf',
    }
};

let docDefinition = {
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
            text: LPA,
            style: 'h1',
            alignment: 'center',
            //margin: [left, top, right, bottom]
            margin: [0, 0, 0, 0]
        },
        {
            text: '{{Postcode}}',
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
            text: '{{Account Manager}}',
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
        // Executive Summary
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
                    [{ bold: true, text: 'Land Owner' }, clientName],
                    [{ bold: true, text: 'Acreage' }, '{{acreage}}'],
                    [{ bold: true, text: 'Land Planning Authority' }, '{{LPA}}'],
                    [{ bold: true, text: 'Acquisition of Land' }, '{{acquisition of land}}'],
                    [{ bold: true, text: 'Year of Acquisition' }, '{{year of acquisition}}'],
                    [{ bold: true, text: 'Current Land Use' }, '{{current land use}}'],
                    [{ bold: true, text: 'Reason for Diversification' }, '{{reason for diversification}}'],
                    [{ bold: true, text: 'Proposed Project' }, 'Proposed Project']
                ]
            }
        },
        {
            text: "This report is a personalised review of your submitted {{ acreage }}acres in {{ LPA }}, {{ Postcode }}. Our project partner, {{ Project Partner }}, has analysed and evaluated your land's potential within {{Proposed Project }}. The report is a guide for potential diversification, and all figures/strategiesshould be taken as estimations. Below is my brief summary on the project.",
            style: 'body'
        },
        {
            text: 'Finicial Summary',
            style: 'h2'
        },
        {
            layout: 'lightHorizontalLines', // optional
            style: 'body',
            table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 0,
                widths: ['auto', '*'],
                // heights: function (row) {
                // 	return (row + 1)+20;
                // },
                body: [
                    ['Total Project Income', '{{income}}'],
                    ['Total Project Cost', '{{expenditure}}'],
                    ['Land Owner Income', '{{land owner income}}'],
                ]
            }
        },
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

function CreateDocument() {
    pdfMake.createPdf(docDefinition).open();
}

function setup() {
let container = createDiv('');
container.position(0,0);
container.style('width', '100%');
container.style('padding: 10px');
container.style('background-color: gray');

LPAinput = createInput('Test Content');
LPAinput.parent(container);
LPAinput.input(UpdateValue);



submit = createButton('create PDF');
submit.parent(container);
submit.mouseReleased(CreateDocument);

// console.log(LPA);
}

function UpdateValue(variable) {
    LPA = str(LPAinput.value());
}

function draw() {
    console.log(LPA)
}