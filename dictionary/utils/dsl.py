import re


def dsl_to_html(dsl_text_in: str) -> str:
    # Sections
    dsl_text_in = re.sub(r"\[(m[^\/\]]+)\]", r"<div class='dict-\1'>", dsl_text_in)
    dsl_text_in = re.sub(r"\[(\/m[^\]]*)\]", r"</div>", dsl_text_in)

    # Text runs
    dsl_text_in = re.sub(r"\[([^\/\]]+)\]", r"<span class='dict-\1'>", dsl_text_in)
    dsl_text_in = re.sub(r"\[(\/[^\]]*)\]", r"</span>", dsl_text_in)

    return dsl_text_in
