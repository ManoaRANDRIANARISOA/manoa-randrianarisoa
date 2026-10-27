import re, sys

SRC = r"C:\wrk\Portf\src\partials\journey.html"
DST = r"C:\wrk\Portf\tools\og-card.html"

html = open(SRC, encoding="utf-8").read()
# locate the walker svg by marker instead of line numbers (the partial keeps growing)
start = html.index('<svg class="figure-svg"')
end = html.index("</svg>", start) + len("</svg>")
fig = html[start:end].rstrip()

# nest it inside the scene svg: give the outer svg element x/y/width/height
fig = fig.replace(
    '<svg class="figure-svg" viewBox="0 -7 120 159.5" preserveAspectRatio="xMidYMax meet" focusable="false">',
    '<svg x="221" y="66" width="176" height="234" viewBox="0 -7 120 159.5" preserveAspectRatio="xMidYMax meet">',
    1,
)

dst = open(DST, encoding="utf-8").read()
if "<!--WALKER_SVG-->" not in dst:
    # strip previously injected nested walker svg (second-to-last </svg> closes it)
    prev_svg = re.search(r'<svg x="\d+" y="66"', dst)
    assert prev_svg, "no injected walker and no placeholder in og-card.html"
    start = prev_svg.start()
    last = dst.rindex("</svg>")
    prev = dst.rindex("</svg>", 0, last)
    dst = dst[:start] + "<!--WALKER_SVG-->" + dst[prev + 6:]
assert "<!--WALKER_SVG-->" in dst, "placeholder missing in og-card.html"
dst = dst.replace("<!--WALKER_SVG-->", fig, 1)
open(DST, "w", encoding="utf-8").write(dst)
print("ok: walker injected into og-card.html")
