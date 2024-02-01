
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

function TableFill(column1, column2) {
    let t = [{ fillColor: '#b3b3b3', bold: true, text: column1 }, { fillColor: '#e6e6e6', text: column2 }]
    return t
}

function LineTable(values) {
    // v = v.filter(Boolean); // remove all the undefined values
    let l = {
        // layout: 'lightHorizontalLines', // optional
        layout: {
            hLineWidth: function hLineWidth(i, node) {
                //   if (i === 0 || i === node.table.body.length) {
                //     return 0;
                //   }
                //   return i === node.table.headerRows ? 2 : 1;
                return (0.5);
            },
            vLineWidth: function vLineWidth(i) {
                return 0;
            },
            hLineColor: function hLineColor(i) {
                //   return i === 1 ? 'black' : '#aaa';
                return lightGray;
            },
            paddingLeft: function paddingLeft(i) {
                //   return i === 0 ? 0 : 8;
                return 0;
            },
            paddingRight: function paddingRight(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return 50;
            },
            paddingTop: function paddingTop(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return 8;
            },
            paddingBottom: function paddingBottom(i, node) {
                //   return i === node.table.widths.length - 1 ? 0 : 8;
                return 4;
            }
        },
        style: 'body',
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
        for (let i = 0; i < values.length; i++) {
            // let r = [{ bold: true, text: values[i] }, { text: values[i + 1] }]
            let c1 = [{ bold: true, text: values[i] }];
            let c2 = [{ text: values[i + 1] }];
            c1.push(c2);
            // print(c1);
            rows.push(c1);
        }
        // print(c1);
        return rows;
    }
}

function TwoColumn(column1, column2, color) {
    let columnWidth = 100;
    let pad = 14;
    let c;
    if (color) {
        c = {
            style: 'body',
            table: {
                headerRows: 0,
                widths: [columnWidth, '*'],
                body: [
                    [{ fillColor: color, color: '#ffffff', bold: true, alignment: 'center', lineHeight: 1, text: column1 }, { fillColor: lightGray, text: column2 }]
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
    } else {
        c = {
            style: 'body',
            table: {
                headerRows: 0,
                widths: [columnWidth, '*'],
                body: [
                    [{ fillColor: midGray, bold: true, alignment: 'center', lineHeight: 1, text: column1 }, { fillColor: lightGray, text: column2 }]
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
    }
    return c;
}

function Arrow(color) {
    let size = 15;
    let origin = 56;
    let shapeSize = origin + size;
    let c = {
        margin: [0, -(gap + 1), 0, (gap / 3)],
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

function CreateDocument() {
    UpdateValues();
    UpdateDoc();
    pdfMake.createPdf(docDefinition).open();
}