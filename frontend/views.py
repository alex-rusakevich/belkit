from django_nextjs.render import render_nextjs_page


async def next_js_page(request):
    # Your custom logic
    return await render_nextjs_page(request)
