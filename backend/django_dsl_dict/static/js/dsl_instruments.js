const instrument_set = [
    { "name": "label", "tags": ["c", "i"], "text": "Памета" },
    { "name": "bold", "tags": ["b"], "text": "Тоўсты" },
    { "name": "italics", "tags": ["i"], "text": "Курсіў" },
    { "name": "paragraph", "tags": ["m1"], "text": "Параграф" },
    { "name": "example", "tags": ["m2", "e"], "text": "Прыклад" },
    { "name": "reference", "tags": ["ref"], "text": "Спасылка" },
]

function initInstruments(widget) {
    const instruments_div = widget.querySelector("div.dsl-instruments")
    const textarea = widget.querySelector("textarea")

    for (const instrument of instrument_set) {
        const button = document.createElement("button")

        button.innerText = instrument["text"]
        button.setAttribute("type", "button")

        button.classList.add(`dsl-instrument-${instrument['name']}`)
        button.classList.add("btn")
        button.classList.add("btn-secondary")

        button.addEventListener("click", function () {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = textarea.value.substring(start, end);

            if (selectedText) {
                const beforeSelection = textarea.value.substring(0, start);
                const afterSelection = textarea.value.substring(end);

                //#region Construct start and end tags
                var startTag = ""

                for (const tag of instrument["tags"]) {
                    startTag += `[${tag}]`
                }

                var endTag = ""

                for (const tag of instrument["tags"]) {
                    endTag += `[/${tag.replace(/\d+$/, '')}]`
                }
                //#endregion

                textarea.value = beforeSelection + startTag + selectedText + endTag + afterSelection;

                const newCursorPos = start + startTag.length
                textarea.setSelectionRange(newCursorPos, newCursorPos + selectedText.length);
            }
        })

        instruments_div.appendChild(button)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    for (const widget of document.querySelectorAll("div.dsl-textarea-widget")) {
        initInstruments(widget)
    }
});