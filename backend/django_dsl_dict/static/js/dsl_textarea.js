function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')            // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '')        // Remove all non-word characters (except hyphens)
        .replace(/--+/g, '-')          // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');        // Remove leading and trailing hyphens
}


function dsl_to_html(dsl) {
    var text = dsl.replace(/\[(m\d+)\]/g, (match) => { return `<div class='dsl-to-html-${slugify(match)}'>` })
    text = text.replace(/\[\/m\]/g, '</div>')

    text = text.replace(/\[ref\](.*?)\[\/ref\]/g, '<a href="/search/$1/">$1</a>');

    text = text.replace(/\[(\w+)\]/g, (match) => { return `<span class='dsl-to-html-${slugify(match)}'>` })
    text = text.replace(/\[\/(\w+)\]/g, '</span>')

    return text
}


function renderDsl(dsl_text, target_div) {
    target_div.innerHTML = dsl_to_html(dsl_text)
}

function initDslWidget(dsl_widget) {
    let textarea = dsl_widget.querySelector("textarea")
    let target_div = dsl_widget.querySelector("div.dsl-result-render")

    textarea.addEventListener('input', function () { renderDsl(textarea.value, target_div) })
    textarea.addEventListener('paste', function () { renderDsl(textarea.value, target_div) })

    renderDsl(textarea.value, target_div)
}

document.addEventListener('DOMContentLoaded', function () {
    for (const widget of document.querySelectorAll("div.dsl-textarea-widget")) {
        initDslWidget(widget)
    }
});
