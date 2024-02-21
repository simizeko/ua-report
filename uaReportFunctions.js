
function mm(value) {
    let conversion = map(value, 0, 210, 0, vw);
    return conversion;
}

function Title(titleText) {
    let t = {
        text: titleText,
        style: 'title'
    }
    return t;
}

function H2(h2text) {
    let t = {
        text: h2text,
        style: 'h2'
    }
    return t;
}

function h3(h3text) {
    let t = {
        text: h3text,
        style: 'h3'
    }
    return t;
}

function h4(h4text, color) {
    let t = {
        text: h4text,
        style: 'h4',
        color: color
    }
    return t;
}

function Body(bodytext) {
    let b = {
        text: bodytext,
        style: 'body',
    };
    return b;
}

function BodySmall(bodytext) {
    let bs = {
        text: bodytext,
        style: 'bodySmall'
    };
    return bs;
}

function NumberList(values) {
    // Add paragraph break to end of each string
    for (let i = 0; i < values.length; i++) {
        values[i] += "\n\n"
    }
    let l = {
        style: 'body',
        lineHeight: 1.1,
        margin: [0, 2, 0, gap / 2],
        ol: values
    };
    return l;
}

function h4body(h3text, bodytext) {
    let t = {
        text: h3text,
        style: 'h4',
        color: orange,
        margin: [0, 0, 0, 0.5]
    };
    let b = {
        text: bodytext,
        style: 'body',
        lineHeight: 1.15,
        margin: [0, 0, 0, gap / 2]
    };
    return [t, b];
}


function TableFill(column1, column2) {
    let t = [{ fillColor: '#b3b3b3', bold: true, text: column1 }, { fillColor: '#e6e6e6', text: column2 }]
    return t
}

function LineTable(values, total) {
    // v = v.filter(Boolean); // remove all the undefined values
    let stroke = 0.5;
    let heavyStroke = 0.75;
    let pad = 6
    let l = {
        // layout: 'lightHorizontalLines', // optional
        margin: [0, 0, 0, gap / 1.5],
        layout: {
            hLineWidth: function (rowIndex) {
                // return (rowIndex === (values.length / 2) - 1) ? 3 : 0.5;
                if (total) {
                    if (rowIndex === (values.length / 2 - 1)) {
                        return heavyStroke;
                    }
                    if (rowIndex === (values.length / 2)) {
                        return heavyStroke;
                    } else {
                        return stroke;
                    }
                } else {
                    return stroke;
                }
            },
            vLineWidth: function vLineWidth(i) {
                return 0;
            },
            hLineColor: function (rowIndex) {
                //   return i === 1 ? 'black' : '#aaa';
                if (total) {
                    if (rowIndex === (values.length / 2 - 1)) {
                        return orange;
                    }
                    if (rowIndex === (values.length / 2)) {
                        return orange;
                    } else {
                        return midGray;
                    }
                } else {
                    return midGray;
                }
            },
            paddingLeft: function paddingLeft(i) {
                //   return i === 0 ? 0 : 8;
                return 0;
            },
            paddingRight: function paddingRight(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 20;
                // return 30;
                // return 20;
                return 15;
            },
            paddingTop: function paddingTop(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return pad;
            },
            paddingBottom: function paddingBottom(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return pad / 2;
            },
            // fillColor: function (rowIndex, node, columnIndex) {
            //     return (rowIndex === (values.length / 2) - 1) ? orange : null;
            // }
        },
        style: 'body',
        lineHeight: 1.25,
        table: {
            headerRows: 0,
            widths: ['auto', '*'],
            // heights: function (row) {
            // 	return (row + 1)+20;
            // },
            body: LoopValues()
        }
    }
    // print(values);
    return l;

    function LoopValues() {
        let rows = [];
        for (let i = 0; i < values.length; i += 2) {
            let r = [{ bold: true, text: values[i] }, { text: values[i + 1] }]
            // let c1 = [{ bold: true, text: values[i] }];
            // let c2 = [{ text: values[i + 1] }];
            // c1.push(c2);
            // print(c1);
            // rows.push(c1);
            rows.push(r);
        }
        // print(c1);
        return rows;
    }
}

function FillTable(values, total) {
    // v = v.filter(Boolean); // remove all the undefined values
    let pad = 8
    let l = {
        // layout: 'lightHorizontalLines', // optional
        margin: [0, 0, 0, gap / 1.5],
        layout: {
            hLineWidth: function (rowIndex) {
                return 0;
            },
            vLineWidth: function vLineWidth(i) {
                return 0;
            },
            hLineColor: function (rowIndex) {
                return 0;
            },
            paddingLeft: function paddingLeft(i) {
                return pad;
            },
            paddingRight: function paddingRight(i, node) {
                return pad;
            },
            paddingTop: function paddingTop(i, node) {
                return pad;
            },
            paddingBottom: function paddingBottom(i, node) {
                return pad / 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex === (values.length / 2) - 1) ? lightGray : midGray;
            }
        },
        style: 'body',
        table: {
            headerRows: 0,
            widths: ['auto', 'auto'],
            body: LoopValues()
        }
    }
    return l;

    function LoopValues() {
        let rows = [];
        for (let i = 0; i < values.length; i += 2) {
            let r = [{ bold: true, text: values[i] }, { text: values[i + 1] }];
            if (total) {
                r[1].bold = true;
            };
            rows.push(r);
        }
        return rows;
    }
}

function TwoColumn(column1, column2, color, total) {
    let columnWidth = 100;
    let boldText = false;
    let secondWidth = "*";
    if (total) {
        columnWidth = "auto";
        boldText = true;
        secondWidth = "auto";
    }
    let pad = 14;
    let colour = "#000000";
    let fColour = midGray;
    if (color) {
        colour = "#ffffff";
        fColour = color;
    }
    let c = {
        style: 'body',
        margin: [0, 0, 0, gap],
        table: {
            headerRows: 0,
            widths: [columnWidth, secondWidth],
            body: [
                [{ fillColor: fColour, color: colour, bold: true, alignment: 'center', lineHeight: 1, text: column1 }, { bold: boldText, fillColor: lightGray, text: column2 }]
                // [{ fillColor: '#CCCCCC', bold: true, text: 'Report' }, {fillColor: '#d1d1d1', text:'Desk survey and ecological forecasting'}],
            ]
        },
        layout: {
            hLineWidth: function hLineWidth(i, node) {
                return 0;
            },
            vLineWidth: function vLineWidth(i) {
                return 0;
            },
            hLineColor: function hLineColor(i) {
                //   return i === 1 ? 'black' : '#aaa';
                return '#ffffff';
            },
            paddingLeft: function paddingLeft(i) {
                //   return i === 0 ? 0 : 8;
                return pad;
            },
            paddingRight: function paddingRight(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return pad;
            },
            paddingTop: function paddingTop(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return pad;
            },
            paddingBottom: function paddingBottom(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return pad / 2;
            }
        }
    }
    return c;
}

function Arrow(color) {
    let size = 15;
    let origin = 56;
    let shapeSize = origin + size;
    let c = {
        margin: [0, -(gap + 1), 0, (gap / 4)],
        canvas: [
            {
                type: 'polyline',
                // lineWidth: 3,
                color: color,
                closePath: true,
                points: [{ x: origin, y: 0 }, { x: shapeSize, y: 0 }, { x: shapeSize - (size / 2), y: (size / 1.5) }],
            }
        ]
    }
    return c;
}

function HeaderImage(imagery) {
    if (showPlotImage === false) {
        return;
    } else {
        let pic = {
            image: imagery,
            absolutePosition: { x: 0, y: 0 },
            // width: 10,
            cover: { width: vw, height: padding, valign: "center", align: "center" }
        };
        return pic;
    }
}

function PlotDisplay(image) {
    if (showPlotImage) {
        let img = { image: image, width: fullWidth / 1.5, margin: [0, 0, 0, gap] };
        return img;
    }
}

function Shape(type, color) {
    let s = {
        margin: [0, 0, 0, gap],
        canvas: [
            {
                type: type,
                color: color,
                x: 0,
                y: 0,
                w: fullWidth,
                h: (fullWidth / 3) * 2,
                r: 6
            }
        ]
    }
    return s;
}

function Columns(values) {
    let c = {
        columnGap: 50,
        columns: [
            LoopValues()
        ]
    }

    return c;
    function LoopValues() {
        let val = [];
        let r;
        for (let i = 0; i < values.length; i++) {
            r = values[i];
            val.push(r);
        }
        return r;
    }
}

function PageBreak() {
    let pb = {
        text: '',
        pageBreak: 'after'
    };
    return pb;
}

function TermsAndConditions() {
    let tc = {
        style: 'body',
        lineHeight: 1.1,
        margin: [0, 0, 130, gap / 2],
        ol: [
            h4('Introduction'),
            {
                margin: [0, 0, 0, 5],
                separator: ['1.', ''],
                ol: [
                    "Up Acre Ltd. ('Up Acre') specialises in alternative land diversification for farmers and landowners."
                ]
            },
            h4('Reports and Advice'),
            {
                margin: [0, 0, 0, 5],
                separator: ['2.', ''],
                ol: [
                    "Up Acre provides reports based on predictions and estimations. These reports are generic advice and should not be considered as absolute guarantees.",
                    "Clients are advised to conduct their own research and seek professional advice before making any decisions based on the reports provided by Up Acre."
                ]
            },
            h4('Remuneration'),
            {
                margin: [0, 0, 0, 5],
                separator: ['3.', ''],
                ol: [
                    "Up Acre is typically remunerated by the Project Partner at a rate of 2% of the net profit on a finders fee.",
                    "The compensation amount and terms may vary based on the specific agreement between Up Acre and the Project Partner."
                ]
            },
            h4('Confidentiality'),
            {
                margin: [0, 0, 0, 5],
                separator: ['4.', ''],
                ol: [
                    "Up Acre acknowledges that the information provided by clients may be sensitive and confidential.",
                    "Up Acre agrees to take all reasonable measures to maintain the confidentiality of client information and not to disclose it to third parties without the client's explicit consent."
                ]
            },
            h4('Limitation of Liability'),
            {
                margin: [0, 0, 0, 5],
                separator: ['5.', ''],
                ol: [
                    "Up Acre shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from the use of its services.",
                    "Up Acre's liability is limited to the fees paid by the client for the specific services rendered."
                ]
            },
            h4('Client Responsibilities'),
            {
                margin: [0, 0, 0, 5],
                separator: ['6.', ''],
                ol: [
                    "Clients are responsible for verifying the accuracy and completeness of the information provided by Up Acre.",
                    "Clients are responsible for compliance with any applicable laws and regulations related to the use of Up Acre's services."
                ]
            },
            h4('Termination of Services'),
            {
                margin: [0, 0, 0, 5],
                separator: ['7.', ''],
                ol: [
                    "Either party may terminate the services provided by Up Acre at any given time."
                ]
            },
            h4('Governing Law'),
            {
                margin: [0, 0, 0, 5],
                separator: ['8.', ''],
                ol: [
                    "These terms and conditions are governed by the laws of England and any disputes shall be resolved in the appropriate courts of England."
                ]
            },
            h4('Amendment of Terms'),
            {
                margin: [0, 0, 0, 5],
                separator: ['9.', ''],
                ol: [
                    "Up Acre reserves the right to amend these terms and conditions at any time.",
                    "Clients will be notified of any changes to the terms and conditions, and continued use of Up Acre's services implies acceptance of the updated terms."
                ]
            },
            h4('Miscellaneous'),
            {
                margin: [0, 0, 0, 5],
                separator: ['10.', ''],
                ol: [
                    "These terms and conditions constitute the entire agreement between Up Acre and the client.",
                    "No waiver or modification of these terms shall be valid unless in writing and signed by both parties."
                ]
            },
        ]
    }
    return tc;
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

function DeleteElements(...selector) {

    for (let i = 0; i < selector.length; i++) {
        let v = selectAll(selector[i]);
        for (let j = 0; j < v.length; j++) {
            v[j].remove();
        }
    }

    // let selectors = [];
    // selectors.push(selector1, selector2, selector3)

    // for (let i = 0; i < selectors.length; i++) {
    //     let v = selectAll(selectors[i]);
    //     for (let j = 0; j < v.length; j++) {
    //         v[j].remove();
    //     }
    // }
}

function CreateDocument() {
    // UpdateValues();
    UpdateDoc();
    pdfMake.createPdf(docDefinition).open();
}