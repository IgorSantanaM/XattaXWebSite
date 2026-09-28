"""Trace the supplied monochrome company logo into true SVG paths.
No font substitution, embedded raster, or recreated lettering is used.
"""
from PIL import Image
from collections import defaultdict
from pathlib import Path
import math

root = Path(__file__).resolve().parents[1]
im = Image.open(root / 'design/xattax-reference.jpg').convert('L')
w, h = im.size
pixels = im.load()
mask = {(x,y) for y in range(h) for x in range(w) if pixels[x,y] < 155}
edges = defaultdict(list)
for x,y in mask:
    if (x,y-1) not in mask: edges[(x,y)].append((x+1,y))
    if (x+1,y) not in mask: edges[(x+1,y)].append((x+1,y+1))
    if (x,y+1) not in mask: edges[(x+1,y+1)].append((x,y+1))
    if (x-1,y) not in mask: edges[(x,y+1)].append((x,y))

def simplify(points, epsilon=.72):
    if len(points)<3: return points
    a,b=points[0],points[-1]
    dx,dy=b[0]-a[0],b[1]-a[1]
    den=math.hypot(dx,dy)
    distances=[abs(dy*(p[0]-a[0])-dx*(p[1]-a[1]))/den if den else math.dist(p,a) for p in points]
    far=max(range(len(distances)),key=distances.__getitem__)
    if distances[far]>epsilon:
        return simplify(points[:far+1],epsilon)[:-1]+simplify(points[far:],epsilon)
    return [a,b]

contours=[]
while edges:
    start=min(edges)
    contour=[start]
    current=start
    for _ in range(w*h):
        nxt=edges[current].pop()
        if not edges[current]: del edges[current]
        contour.append(nxt)
        if nxt==start: break
        current=nxt
    area=abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(contour,contour[1:]))/2)
    if area<2: continue
    far=max(range(len(contour)-1),key=lambda i:math.dist(contour[0],contour[i]))
    points=simplify(contour[:far+1])+simplify(contour[far:])[1:]
    contours.append(points)

def path(points):
    return 'M'+' '.join(f'{x},{y}' for x,y in points[:-1])+'Z'
def svg(filename, viewbox, color, selected, title, background=''):
    body=''.join(path(c) for c in selected)
    result=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-labelledby="title"><title id="title">{title}</title>{background}<path fill="{color}" fill-rule="evenodd" d="{body}"/></svg>\n'
    (root / filename).write_text(result,encoding='utf-8')

box='20 32 588 392'
svg('public/brand/xattax-logo.svg',box,'#172434',contours,'XattaX — Escritório contábil')
svg('public/brand/xattax-logo-light.svg',box,'#EEEEEE',contours,'XattaX — Escritório contábil')
mark=[c for c in contours if max(y for _,y in c)<395]
svg('public/brand/xattax-mark-light.svg','20 32 588 360','#EEEEEE',mark,'XattaX')
# The favicon isolates the original roof symbol so it remains legible at 16 px.
roof=[c for c in contours if max(y for _,y in c)<240]
paths=''.join(path(c) for c in roof)
favicon=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><rect width="640" height="640" rx="110" fill="#033679"/><g transform="translate(0 150)"><path fill="#EEEEEE" fill-rule="evenodd" d="{paths}"/></g></svg>\n'
(root/'public/favicon.svg').write_text(favicon,encoding='utf-8')
print({'contours':len(contours),'svg_bytes':(root/'public/brand/xattax-logo.svg').stat().st_size,'favicon_contours':len(roof)})
