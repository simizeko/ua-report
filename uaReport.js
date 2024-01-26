// A4 dimensions
let vw = 595.28;
let vh = 841.89

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
    },
    header: {
        image: 'img1',
        // fit: [vw, vh / 6]
        width: vw,
        height: vh / 6
    },
    content: [
        // Cover page
        {
            text: '{{LPA}}',
            style: 'h1',
            alignment: 'center',
            //margin: [left, top, right, bottom]
            margin: [0, vh / 3, 0, 0]
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
            margin: [0, 0, 0, 312]
        },
        {
            text: 'This entire Document is strictly Private and Confidential',
            style: 'body',
            alignment: 'center',
            bold: true,
            margin: [0, 0, 0, 0]
        },
        {
            text: 'Up Acre Limited, Studio 2, 92 Lots Road, Chelsea, London, SW10 0QD',
            style: 'body',
            alignment: 'center'
        }
    ],
    styles: {
        h1: {
            fontSize: 28,
            bold: true,
            lineHeight: 1,
            margin: [0, 0, 0, 30]
        },
        h2: {
            fontSize: 15,
            bold: true,
            margin: [0, 0, 0, 30]
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

// console.log(docDefinition.pageSize.width);
pdfMake.createPdf(docDefinition).open();