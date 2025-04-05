function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')            // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '')        // Remove all non-word characters (except hyphens)
        .replace(/--+/g, '-')          // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');        // Remove leading and trailing hyphens
}


function dsl_to_html(dsl: string): string {
    var text = dsl.replace(/\[(m\d+)\]/g, (match) => { return `<div class='dsl-to-html-${slugify(match)}'>` })
    text = text.replace(/\[\/m\]/g, '</div>')

    text = text.replace(
        /\[ref\](.*?)\[\/ref\]/g,
        (match, content) => {
            // Strip HTML tags from the content
            const strippedContent = content.replace(/<[^>]*>/g, '');
            // Return the desired <a> tag with cleaned content
            return `<a href="/search/${strippedContent}/">${strippedContent}</a>`;
        }
    );

    text = text.replace(/\[(\w+)\]/g, (match) => { return `<span class='dsl-to-html-${slugify(match)}'>` })
    text = text.replace(/\[\/(\w+)\]/g, '</span>')

    return text
}

export default dsl_to_html
