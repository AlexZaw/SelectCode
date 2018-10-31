(function() {
    var sel;
    var xml = new XMLHttpRequest();
    xml.open('GET', 'http://htmlforum.io', true);
    xml.send(null);
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {

            var ipsArr = document.querySelectorAll('.ipsCode');
            for (var i = 0; i < ipsArr.length; i++) {
                var btnTop = document.createElement('button');
                var btnBottom = document.createElement('button');
                btnTop.classList.add('selectCode');
                btnBottom.classList.add('selectCode');
                btnTop.textContent = 'Сopy code after button to clipboard';
                btnBottom.textContent = 'Сopy code before button to clipboard';
                btnTop.addEventListener('click', selectTextAfter);
                btnBottom.addEventListener('click', selectTextBefore);
                ipsArr[i].parentNode.insertBefore(btnTop, ipsArr[i]);
                ipsArr[i].parentNode.insertBefore(btnBottom, ipsArr[i].nextSibling);
            }
            var sel;

            function selectTextAfter(e) {
                e.preventDefault();
                window.getSelection().removeAllRanges();
                sel = this.nextElementSibling;
                var range = document.createRange();
                range.selectNode(sel);
                window.getSelection().addRange(range);
                if (sel.nextElementSibling.tagName==='SPAN' && sel.nextElementSibling.nextElementSibling.tagName=="BUTTON"){
                    sel.parentNode.removeChild(sel.nextElementSibling);
                }
                document.addEventListener('copy', copyCode);
                document.addEventListener('mousedown', removeSelection);
            }
            function selectTextBefore(e) {
                e.preventDefault();
                window.getSelection().removeAllRanges();
                if (this.previousElementSibling.tagName==='SPAN'){
                    this.parentNode.removeChild(this.previousElementSibling);
                }
                sel = this.previousElementSibling;
                console.log(sel);
                var range = document.createRange();
                range.selectNode(sel);
                window.getSelection().addRange(range);
                document.addEventListener('copy', copyCode);
                document.addEventListener('mousedown', removeSelection);
            }

            function copyCode(e) {
                var copiedCode = sel.textContent;
                e.clipboardData.setData('text/plain', copiedCode);
                document.execCommand('copy');
                e.preventDefault();
                window.getSelection().removeAllRanges();
                document.removeEventListener('copy', copyCode);
                sel = null;
            }

            function removeSelection(e) {
                if (e.target.className != 'selectCode') {
                    window.getSelection().removeAllRanges();
                    sel = null;
                    document.removeEventListener('mousedown', removeSelection);
                    document.removeEventListener('copy', copyCode);
                }

            }
        }
    }
})();