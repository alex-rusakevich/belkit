const buttons = [
    ["Метка", "[label]", "[/label]"],
    ["Прыклад", "[example]", "[/example]"],
];

window.addEventListener('load', function () {
    addCustomButtons();
});

function addCustomButtons() {
    const toolbar = document.querySelector("div.martor-toolbar")

    buttons.map(function (needed_button) {
        let new_btn = document.createElement("button")
        new_btn.setAttribute("type", "button")

        console.log(needed_button)

        new_btn.innerText = needed_button[0]
        new_btn.onclick = () => {
            let editor = document.querySelector(".ace_editor").env.editor

            var originalRange = editor.getSelectionRange();

            if (editor.selection.isEmpty()) {
                var curpos = editor.getCursorPosition();
                editor.session.insert(curpos, ' ' + needed_button[1] + needed_button[2] + ' ');
                editor.focus();
                editor.selection.moveTo(curpos.row, curpos.column + 2);
            } else {
                var range = editor.getSelectionRange();
                var text = editor.session.getTextRange(range);
                editor.session.replace(range, needed_button[1] + text + needed_button[2]);
                originalRange.end.column += 2;
                editor.focus();
                editor.selection.setSelectionRange(originalRange);
            }
        }

        toolbar.appendChild(new_btn)
    })
}
