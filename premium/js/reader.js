const urlParams = new URLSearchParams(window.location.search);
const filePath = urlParams.get('file');

let pdfDoc = null;
let pageNum = 1;
let canvas = document.getElementById('pdfCanvas');
let ctx = canvas.getContext('2d');

pdfjsLib.getDocument(filePath).promise.then(function (pdfDoc_) {
  pdfDoc = pdfDoc_;
  renderPage(pageNum);
});

function renderPage(num) {
  pdfDoc.getPage(num).then(function (page) {
    let viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    let renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);
  });
}

document.getElementById("searchText").addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  if (!pdfDoc) return;

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(" ").toLowerCase();

    if (pageText.includes(query)) {
      pageNum = i;
      renderPage(pageNum);
      break;
    }
  }
});
