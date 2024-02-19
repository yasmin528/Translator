function changeActiveTab(event, language, tabId) {
    event.preventDefault();
    const tabs = document.querySelectorAll(`#${tabId} .nav-link`);
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

async function translateText() {
    const inputText = document.getElementById('inputText').value;

    const sourceLang = document.querySelector('#languageTab1 .nav-link.active').innerText.toLowerCase();
    const targetLang = document.querySelector('#languageTab2 .nav-link.active').innerText.toLowerCase();
    try {
        translate(inputText, sourceLang, targetLang);
    } catch (error) {
        console.error(error);
    }
}

async function translate(text, sourceLang, targetLang) {
    sourceLang = mapLanguageCode(sourceLang);
    targetLang = mapLanguageCode(targetLang);
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(text);
    var resultValue;
    $.getJSON(url, function (data) {
        resultValue = data[0][0][0];
        var translatedDiv = document.getElementById("translatedText");
        translatedDiv.innerHTML = resultValue;
    });
}

function mapLanguageCode(langName) {
    switch (langName.toLowerCase()) {
        case 'english':
            return 'en';
        case 'french':
            return 'fr';
        case 'arabic':
            return 'ar';
        default:
            return langName;
    }
}
