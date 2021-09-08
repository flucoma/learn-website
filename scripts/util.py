def url_from_route(route):
    """
    Takes a raw route like...
    src/routes/overviews/foo.svx
    and returns
    /overviews/foo
    """
    return f"/{'/'.join(route.with_suffix('').parts[2:])}"
