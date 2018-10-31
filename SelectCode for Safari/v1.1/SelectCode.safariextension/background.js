var ipsArr = document.querySelectorAll('.ipsCode');
for (var i = 0; i < ipsArr.length; i++) {
    var btn = document.createElement('button');
    btn.classList.add('selectCode');
    btn.textContent = 'Сopy code to clipboard';
    ipsArr[i].parentNode.insertBefore(btn, ipsArr[i]);
}
document.addEventListener('click', selectText)

function selectText(e) {
    if (e.target.classList.contains('selectCode') && e.target.tagName == 'BUTTON') {
        e.preventDefault();
        window.getSelection().removeAllRanges();
        var sel = e.target.nextElementSibling;
        var range = document.createRange();
        range.selectNodeContents(sel);
        window.getSelection().addRange(range);
        document.addEventListener('mousedown', removeSelection);
    }
}

function removeSelection(e) {
    if (e.target.className != 'selectCode') {
        window.getSelection().removeAllRanges();
        document.removeEventListener('mousedown', removeSelection);     
    }
}
