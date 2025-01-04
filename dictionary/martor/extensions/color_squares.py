import re
import xml.etree.ElementTree as etree

import markdown
from markdown.inlinepatterns import Pattern

COLORS = ["green", "gray"]


def gen_css():
    result = ""

    for color in COLORS:
        result += f".text-{color} {{ color: {color}; }}\n\n"

    return result


class SimpleTagAttributesPattern(Pattern):
    def __init__(self, pattern: str, tag: str, attrs: dict = {}):
        Pattern.__init__(self, pattern)
        self.tag = tag
        self.attrs = attrs
        """ The tag of the rendered element. """

    def handleMatch(self, m: re.Match[str]) -> etree.Element:
        el = etree.Element(self.tag)
        el.text = m.group(3)

        print(el.text)

        for key, value in self.attrs.items():
            el.set(key, value)

        return el


class ColorSquaresExtension(markdown.extensions.Extension):
    """Adds [green] and [gray] support to Markdown"""

    def extendMarkdown(self, md: markdown.core.Markdown, *args):
        priority = 20

        for color in COLORS:
            tag = "span"
            COLOR_RE = r"(\[{0}\])(.+?)(\[\/{0}\])".format(color)

            pattern = SimpleTagAttributesPattern(
                COLOR_RE, tag, {"class": f"text-{color}"}
            )
            md.inlinePatterns.register(pattern, "color-squares-" + color, priority)
            priority += 1


def makeExtension(*args, **kwargs):
    return ColorSquaresExtension(*args, **kwargs)


if __name__ == "__main__":
    md = markdown.Markdown(extensions=[ColorSquaresExtension()])
    result = md.convert("[green]This is test[/green]")
    print(result)
