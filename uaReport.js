pdfMake.fonts = {
    helvetica: {
      normal: './fonts/HelveticaNeue-01.ttf',
      bold: './fonts/HelveticaNeue-Bold-02.ttf',
      italics: './fonts/HelveticaNeue-Italic-03.ttf',
      bolditalics: './fonts/HelveticaNeue-BoldItalic-04.ttf'
      
    }
}


let docDefinition = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	],
    defaultStyle: {
        font: 'helvetica'
      }
}


pdfMake.createPdf(docDefinition).open();