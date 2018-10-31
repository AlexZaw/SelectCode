(function() {
    var sel;
    var xml = new XMLHttpRequest();
    xml.open('GET', 'https://htmlforum.io', true);
    xml.send(null);
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {

            var ipsArr = document.querySelectorAll('.ipsCode');
            for (var i = 0; i < ipsArr.length; i++) {
                var btn = document.createElement('button');
                btn.classList.add('selectCode');
                btn.textContent = 'Сopy code to clipboard';
                btn.addEventListener('click', selectText);
                ipsArr[i].parentNode.insertBefore(btn, ipsArr[i]);
            }
            var sel;

            function selectText(e) {
                e.preventDefault();
                window.getSelection().removeAllRanges();
                sel = this.nextElementSibling;
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
                    document.removeEventListener('mousedown', removeSelection);
                    document.removeEventListener('copy', copyCode);
                }

            }
        }
    }
})();