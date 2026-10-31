"""Génère les schémas SVG des notes de cours de Champs électromagnétiques (SP301P).

Chaque schéma est écrit sur une seule ligne dans
docs/physique-elec/champs-em/cours/_schemas/<nom>.svg, sous la forme
<figure class="schema">…</figure>, puis inclus dans les pages avec pymdownx.snippets :

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/coulomb.svg"

Les couleurs ne sont pas codées en dur : chaque élément utilise `currentColor` et une classe
(c-pos, c-neg, c-acc, c-ok, c-warn, c-mut) définie dans docs/stylesheets/extra.css, ce qui
permet de suivre le thème clair / sombre du site.

Usage : python outils/schemas_champs_em.py   (nécessite numpy et matplotlib)
"""
from __future__ import annotations

import math
from pathlib import Path

import numpy as np

SORTIE = Path(__file__).resolve().parent.parent / "docs/physique-elec/champs-em/cours/_schemas"


# --------------------------------------------------------------------------- outils SVG
def f(v: float) -> str:
    return f"{v:.1f}".rstrip("0").rstrip(".")


def it(t: str) -> str:
    """Variable en italique."""
    return f'<tspan font-style="italic">{t}</tspan>'


def vec(t: str) -> str:
    """Vecteur : gras italique."""
    return f'<tspan font-style="italic" font-weight="700">{t}</tspan>'


def sub(t: str) -> str:
    return f'<tspan baseline-shift="sub" font-size="75%">{t}</tspan>'


def sup(t: str) -> str:
    return f'<tspan baseline-shift="super" font-size="70%">{t}</tspan>'


class Fig:
    def __init__(self, nom: str, w: int, h: int, legende: str, alt: str):
        self.nom, self.w, self.h, self.legende, self.alt = nom, w, h, legende, alt
        self.el: list[str] = []

    # -- primitives
    @staticmethod
    def _c(c: str) -> str:
        return f' class="c-{c}"' if c else ""

    def line(self, x1, y1, x2, y2, c="", w=1.6, dash=None, op=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        o = f' stroke-opacity="{op}"' if op else ""
        self.el.append(f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" stroke="currentColor" stroke-width="{w}"{d}{o}{self._c(c)}/>')

    def path(self, d, c="", w=1.6, fill="none", dash=None, op=None, fop=None):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        o = f' stroke-opacity="{op}"' if op else ""
        fo = f' fill-opacity="{fop}"' if fop else ""
        st = f' stroke="currentColor" stroke-width="{w}"' if w else ' stroke="none"'
        self.el.append(f'<path d="{d}" fill="{fill}"{fo}{st}{da}{o} stroke-linejoin="round" stroke-linecap="round"{self._c(c)}/>')

    def poly(self, pts, c="", w=1.6, fill="none", dash=None, closed=False, op=None, fop=None):
        d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + (" Z" if closed else "")
        self.path(d, c, w, fill, dash, op, fop)

    def head(self, x, y, ang, c="", h=9):
        """Pointe de flèche en (x, y), orientée selon ang (radians, repère écran)."""
        ux, uy = math.cos(ang), math.sin(ang)
        p1 = (x - ux * h - uy * h * 0.45, y - uy * h + ux * h * 0.45)
        p2 = (x - ux * h + uy * h * 0.45, y - uy * h - ux * h * 0.45)
        self.el.append(f'<path d="M{f(x)} {f(y)} L{f(p1[0])} {f(p1[1])} L{f(p2[0])} {f(p2[1])} Z" fill="currentColor"{self._c(c)}/>')

    def arrow(self, x1, y1, x2, y2, c="", w=1.8, h=9, dash=None):
        L = math.hypot(x2 - x1, y2 - y1)
        if L < 1:
            return
        ang = math.atan2(y2 - y1, x2 - x1)
        k = max(0.0, (L - h * 0.8) / L)
        self.line(x1, y1, x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, c, w, dash)
        self.head(x2, y2, ang, c, h)

    def circle(self, x, y, r, c="", fill="none", w=1.6, dash=None, fop=None, stroke=True):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        fo = f' fill-opacity="{fop}"' if fop else ""
        st = f' stroke="currentColor" stroke-width="{w}"' if stroke else ""
        self.el.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{fill}"{fo}{st}{da}{self._c(c)}/>')

    def ellipse(self, x, y, rx, ry, c="", w=1.6, dash=None, fill="none", fop=None):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        fo = f' fill-opacity="{fop}"' if fop else ""
        self.el.append(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(rx)}" ry="{f(ry)}" fill="{fill}"{fo} stroke="currentColor" stroke-width="{w}"{da}{self._c(c)}/>')

    def rect(self, x, y, w, h, c="", fill="none", sw=1.6, fop=None, rx=0, stroke=True, dash=None):
        fo = f' fill-opacity="{fop}"' if fop else ""
        st = f' stroke="currentColor" stroke-width="{sw}"' if stroke else ""
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.el.append(f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" rx="{rx}" fill="{fill}"{fo}{st}{da}{self._c(c)}/>')

    def text(self, x, y, t, c="", size=14, anchor="middle", bold=False, italic=False, bg=False):
        b = ' font-weight="700"' if bold else ""
        i = ' font-style="italic"' if italic else ""
        halo = ' class="halo"' if bg else ""
        if bg:
            self.el.append(f'<text x="{f(x)}" y="{f(y)}" font-size="{size}" text-anchor="{anchor}"{b}{i} class="halo">{t}</text>')
        self.el.append(f'<text x="{f(x)}" y="{f(y)}" font-size="{size}" text-anchor="{anchor}"{b}{i} fill="currentColor"{self._c(c)}>{t}</text>')

    def charge(self, x, y, signe, r=13, label=None):
        c = "pos" if signe > 0 else "neg"
        self.circle(x, y, r, c, fill="currentColor", stroke=False)
        self.el.append(f'<text x="{f(x)}" y="{f(y + 5)}" font-size="{int(r * 1.15)}" text-anchor="middle" font-weight="700" class="on-charge">{"+" if signe > 0 else "−"}</text>')
        if label:
            self.text(x, y + r + 17, label, c, 14)

    def courant(self, x, y, sortant, r=11, c=None):
        c = c or ("pos" if sortant else "neg")
        self.circle(x, y, r, c, fill="none", w=2)
        self.el.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" class="fond"/>')
        self.circle(x, y, r, c, fill="none", w=2)
        if sortant:
            self.circle(x, y, r * 0.3, c, fill="currentColor", stroke=False)
        else:
            k = r * 0.55
            self.line(x - k, y - k, x + k, y + k, c, 2)
            self.line(x + k, y - k, x - k, y + k, c, 2)

    def fond(self, x, y, w, h):
        self.el.append(f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" class="fond"/>')

    def svg(self) -> str:
        corps = "".join(self.el)
        return (f'<figure class="schema"><svg viewBox="0 0 {self.w} {self.h}" width="{self.w}" '
                f'role="img" aria-label="{self.alt}" xmlns="http://www.w3.org/2000/svg">{corps}</svg>'
                f'<figcaption>{self.legende}</figcaption></figure>')

    def ecrire(self):
        SORTIE.mkdir(parents=True, exist_ok=True)
        (SORTIE / f"{self.nom}.svg").write_text(self.svg() + "\n", encoding="utf-8")
        print("écrit", self.nom)


# --------------------------------------------------------------------------- physique
def champ_E(charges, x, y):
    ex = ey = 0.0
    for (cx, cy, q) in charges:
        dx, dy = x - cx, y - cy
        r2 = max(dx * dx + dy * dy, 1e-6)
        r3 = r2 ** 1.5
        ex += q * dx / r3
        ey += q * dy / r3
    return ex, ey


def ligne_de_champ(charges, x, y, sens=1, pas=0.02, nmax=4000, borne=(-9, 9, -9, 9), stop=0.06):
    pts = [(x, y)]
    for _ in range(nmax):
        ex, ey = champ_E(charges, x, y)
        m = math.hypot(ex, ey) or 1
        mx, my = x + sens * ex / m * pas / 2, y + sens * ey / m * pas / 2
        ex, ey = champ_E(charges, mx, my)
        m = math.hypot(ex, ey) or 1
        x, y = x + sens * ex / m * pas, y + sens * ey / m * pas
        pts.append((x, y))
        if any(math.hypot(x - cx, y - cy) < stop for cx, cy, _ in charges if (cx, cy) != pts[0]):
            break
        if not (borne[0] < x < borne[1] and borne[2] < y < borne[3]):
            break
    return pts


def contours(X, Y, Z, niveaux):
    """Courbes de niveau (liste de polylignes en coordonnées monde)."""
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    cs = plt.contour(X, Y, Z, levels=sorted(niveaux))
    res = []
    for lvl, segs in zip(cs.levels, cs.allsegs):
        for s in segs:
            if len(s) > 3:
                res.append((lvl, s))
    plt.close("all")
    return res


def tracer_polyligne(F: Fig, pts, T, c="acc", w=1.6, fleches=(), sens=1, dash=None, op=None):
    """pts en coordonnées monde, T : monde → écran. fleches : fractions de longueur où poser une pointe."""
    P = [T(*p) for p in pts]
    F.poly(P, c, w, dash=dash, op=op)
    if not fleches:
        return
    L = [0.0]
    for a, b in zip(P, P[1:]):
        L.append(L[-1] + math.hypot(b[0] - a[0], b[1] - a[1]))
    tot = L[-1]
    for fr in fleches:
        d = fr * tot
        i = next((k for k in range(1, len(L)) if L[k] >= d), len(L) - 1)
        a, b = P[i - 1], P[i]
        ang = math.atan2(b[1] - a[1], b[0] - a[0]) + (0 if sens > 0 else math.pi)
        F.head(b[0], b[1], ang, c, 8)


# =========================================================================== CHAPITRE 1
def carte_chapitre():
    F = Fig("carte-chapitre-1", 640, 290,
            "Les quatre grandeurs du chapitre. À gauche, ce que créent les charges sources (même sans "
            "personne pour le subir) ; à droite, ce que subit une charge Q placée là. On passe d'une "
            "colonne à l'autre en multipliant par Q.",
            "Carte du chapitre : champ, force, potentiel, énergie potentielle et leurs liens")
    bx = {"E": (150, 60), "F": (440, 60), "V": (150, 195), "Ep": (440, 195)}
    W, H = 150, 62
    F.text(225, 26, "créé par les charges sources", "mut", 13)
    F.text(515, 26, "subi par une charge Q", "mut", 13)
    F.text(18, 95, "VECTEURS", "mut", 12, "start", bold=True)
    F.text(18, 230, "SCALAIRES", "mut", 12, "start", bold=True)
    contenu = {
        "E": ("acc", f"Champ {vec('E')}", "en V/m"),
        "F": ("warn", f"Force {vec('F')}", "en N"),
        "V": ("acc", f"Potentiel {it('V')}", "en V"),
        "Ep": ("warn", f"Énergie {it('E')}{sub('p')}", "en J"),
    }
    for k, (x, y) in bx.items():
        c, t1, t2 = contenu[k]
        F.rect(x, y, W, H, c, fill="currentColor", fop=0.1, sw=1.8, rx=10)
        F.text(x + W / 2, y + 28, t1, c, 17, bold=True)
        F.text(x + W / 2, y + 48, t2, "mut", 12.5)
    # × Q
    for y in (91, 226):
        F.arrow(302, y, 436, y, "", 2)
        F.text(369, y - 9, f"× {it('Q')}", "", 15, bold=True)
    F.text(369, 91 + 22, f"{vec('F')} = {it('Q')}{vec('E')}", "mut", 13)
    F.text(369, 226 + 22, f"{it('E')}{sub('p')} = {it('Q')}{it('V')}", "mut", 13)
    # E <-> V
    F.arrow(200, 190, 200, 126, "ok", 2)
    F.arrow(250, 126, 250, 190, "ok", 2)
    F.text(193, 163, f"{vec('E')} = −grad {it('V')}", "ok", 13, "end")
    F.text(258, 163, f"∫{vec('E')}·d{vec('l')} = {it('V')}({it('A')}) − {it('V')}({it('B')})", "ok", 13, "start")
    F.ecrire()


def coulomb():
    F = Fig("coulomb", 640, 220,
            "Loi de Coulomb : la force est portée par la droite qui joint les charges. Mêmes signes : "
            "elles se repoussent ; signes opposés : elles s'attirent. Les deux forces sont opposées "
            "(3ᵉ loi de Newton).",
            "Répulsion entre charges de même signe et attraction entre charges de signes opposés")
    for row, (s2, titre) in enumerate([(1, "Mêmes signes : répulsion"), (-1, "Signes opposés : attraction")]):
        y = 70 + row * 105
        x1, x2 = 230, 420
        F.text(18, y - 38, titre, "mut", 13, "start", bold=True)
        F.line(x1, y, x2, y, "mut", 1, dash="4 4")
        F.charge(x1, y, 1)
        F.charge(x2, y, s2)
        F.text(x1, y + 33, f"{it('q')}{sub('1')}", "pos", 14)
        F.text(x2, y + 33, f"{it('q')}{sub('2')}", "pos" if s2 > 0 else "neg", 14)
        if s2 > 0:
            F.arrow(x2 + 15, y, x2 + 95, y, "warn", 2.4)
            F.arrow(x1 - 15, y, x1 - 95, y, "warn", 2.4)
            F.text(x2 + 60, y - 12, f"{vec('F')}{sub('1→2')}", "warn", 14)
            F.text(x1 - 60, y - 12, f"{vec('F')}{sub('2→1')}", "warn", 14)
            F.arrow(x1, y - 26, x1 + 48, y - 26, "acc", 1.6, 7)
            F.text(x1 + 58, y - 22, f"{vec('u')}{sub('12')}", "acc", 13, "start")
            F.text((x1 + x2) / 2, y + 30, f"{it('r')}", "mut", 14, italic=False)
        else:
            F.arrow(x2 - 15, y, x2 - 75, y, "warn", 2.4)
            F.arrow(x1 + 15, y, x1 + 75, y, "warn", 2.4)
            F.text(x2 - 45, y - 12, f"{vec('F')}{sub('1→2')}", "warn", 14)
            F.text(x1 + 45, y - 12, f"{vec('F')}{sub('2→1')}", "warn", 14)
    F.text(555, 128, f"{it('F')} = {it('k')}{sub('e')}|{it('q')}{sub('1')}{it('q')}{sub('2')}|/{it('r')}{sup('2')}", "", 14.5, bold=True)
    F.ecrire()


def superposition():
    F = Fig("superposition", 660, 320,
            "Superposition. À gauche : en M, chaque charge crée son champ comme si elle était seule ; "
            "on additionne les vecteurs (règle du parallélogramme). À droite, le triangle du cours "
            "(diapo 13) : les composantes horizontales se compensent, la force résultante sur C est "
            "dirigée vers O.",
            "Somme vectorielle de deux champs et triangle de charges")
    # --- gauche : champ en M
    s = 55
    T = lambda x, y: (160 + x * s, 250 - y * s)
    ch = [(-1.7, 0, 1), (1.7, 0, -1)]
    M = (0.5, 2.6)
    for cx, cy, q in ch:
        F.line(*T(cx, cy), *T(*M), "mut", 1, dash="3 4")
    e = []
    for cx, cy, q in ch:
        ex, ey = champ_E([(cx, cy, q)], *M)
        e.append((ex, ey))
    k = 9.5
    p0 = T(*M)
    (e1x, e1y), (e2x, e2y) = e
    a1 = (p0[0] + e1x * k * s, p0[1] - e1y * k * s)
    a2 = (p0[0] + e2x * k * s, p0[1] - e2y * k * s)
    tot = (p0[0] + (e1x + e2x) * k * s, p0[1] - (e1y + e2y) * k * s)
    F.line(*a1, *tot, "mut", 1.2, dash="4 4")
    F.line(*a2, *tot, "mut", 1.2, dash="4 4")
    F.arrow(*p0, *a1, "pos", 2.2)
    F.arrow(*p0, *a2, "neg", 2.2)
    F.arrow(*p0, *tot, "ok", 3, 11)
    F.circle(*p0, 3.5, "", "currentColor", stroke=False)
    F.text(p0[0] - 12, p0[1] + 4, it("M"), "", 15, "end")
    F.text(a1[0] - 6, a1[1] - 6, f"{vec('E')}{sub('1')}", "pos", 14, "end")
    F.text(a2[0] + 8, a2[1] + 2, f"{vec('E')}{sub('2')}", "neg", 14, "start")
    F.text(tot[0] + 8, tot[1] - 4, f"{vec('E')} = {vec('E')}{sub('1')} + {vec('E')}{sub('2')}", "ok", 14, "start", bold=True)
    F.charge(*T(-1.7, 0), 1)
    F.charge(*T(1.7, 0), -1)
    F.text(*T(-1.7, -0.62), f"{it('q')}{sub('1')} &gt; 0", "pos", 13)
    F.text(*T(1.7, -0.62), f"{it('q')}{sub('2')} &lt; 0", "neg", 13)
    # --- droite : triangle
    s2 = 120
    T2 = lambda x, y: (500 + x * s2, 255 - y * s2)
    A, B, C = (-0.75, 0), (0.75, 0), (0, 0.75 * math.sqrt(3))
    F.poly([T2(*A), T2(*B), T2(*C)], "mut", 1.2, closed=True, dash="4 4")
    O = T2(0, 0)
    F.line(*O, *T2(*C), "mut", 1, dash="2 4")
    pc = T2(*C)
    L = 62
    for P in (A, B):
        pp = T2(*P)
        dx, dy = pp[0] - pc[0], pp[1] - pc[1]
        m = math.hypot(dx, dy)
        F.arrow(pc[0], pc[1], pc[0] + dx / m * L, pc[1] + dy / m * L, "warn", 2.2)
    # projections horizontales qui se compensent
    F.arrow(pc[0], pc[1] + 2, pc[0] - L * 0.5, pc[1] + 2, "mut", 1.2, 6, dash="3 3")
    F.arrow(pc[0], pc[1] + 2, pc[0] + L * 0.5, pc[1] + 2, "mut", 1.2, 6, dash="3 3")
    F.arrow(pc[0], pc[1], pc[0], pc[1] + 2 * L * math.cos(math.radians(30)), "ok", 3, 11)
    F.text(pc[0] + 10, pc[1] + 2 * L * 0.866 - 4, f"{vec('F')}{sub('C')}", "ok", 14, "start", bold=True)
    F.text(pc[0] - 44, pc[1] + 40, f"{vec('F')}{sub('1')}", "warn", 13, "end")
    F.text(pc[0] + 44, pc[1] + 40, f"{vec('F')}{sub('2')}", "warn", 13, "start")
    F.charge(*T2(*A), -1, 12)
    F.charge(*T2(*B), -1, 12)
    F.charge(*pc, 1, 14)
    F.text(T2(*A)[0], T2(*A)[1] + 30, f"{it('A')} : −{it('e')}", "neg", 13)
    F.text(T2(*B)[0], T2(*B)[1] + 30, f"{it('B')} : −{it('e')}", "neg", 13)
    F.text(pc[0] + 20, pc[1] - 12, f"{it('C')} : +2{it('e')}", "pos", 13, "start")
    F.circle(*O, 3, "", "currentColor", stroke=False)
    F.text(O[0], O[1] + 18, it("O"), "", 14)
    F.ecrire()


def champ_ponctuel():
    F = Fig("champ-ponctuel", 640, 250,
            "Champ d'une charge ponctuelle : radial, il s'éloigne d'une charge positive et pointe vers "
            "une charge négative. Il s'affaiblit en 1/r² : les flèches raccourcissent quand on s'éloigne.",
            "Champ radial centrifuge d'une charge positive et centripète d'une charge négative")
    for (cx, sgn, titre) in [(165, 1, f"{it('q')} &gt; 0 : champ centrifuge"), (475, -1, f"{it('q')} &lt; 0 : champ centripète")]:
        cy = 120
        for k in range(12):
            a = 2 * math.pi * k / 12 + 0.13
            ux, uy = math.cos(a), math.sin(a)
            for r0, L in ((26, 34), (72, 17)):
                r1 = r0 + L
                if sgn > 0:
                    F.arrow(cx + ux * r0, cy + uy * r0, cx + ux * r1, cy + uy * r1, "acc", 1.8, 7)
                else:
                    F.arrow(cx + ux * r1, cy + uy * r1, cx + ux * r0, cy + uy * r0, "acc", 1.8, 7)
        F.charge(cx, cy, sgn, 15)
        F.text(cx, 236, titre, "pos" if sgn > 0 else "neg", 14, bold=True)
    F.ecrire()


def dipole_lignes():
    F = Fig("dipole-lignes", 640, 340,
            "Lignes de champ (traits pleins, fléchés) et équipotentielles (pointillés) du dipôle. Les "
            "lignes partent de +q et finissent sur −q ; elles coupent toujours les équipotentielles à "
            "angle droit. La médiatrice est l'équipotentielle V = 0, mais le champ n'y est pas nul.",
            "Lignes de champ et équipotentielles d'un dipôle électrostatique")
    s = 72
    T = lambda x, y: (320 + x * s, 170 - y * s)
    ch = [(-1.0, 0.0, -1.0), (1.0, 0.0, 1.0)]
    X, Y = np.meshgrid(np.linspace(-4.6, 4.6, 400), np.linspace(-2.45, 2.45, 220))
    V = sum(q / np.sqrt((X - cx) ** 2 + (Y - cy) ** 2 + 1e-9) for cx, cy, q in ch)
    for lvl, seg in contours(X, Y, V, [-1.2, -0.6, -0.3, 0.3, 0.6, 1.2]):
        F.poly([T(x, y) for x, y in seg], "pos" if lvl > 0 else "neg", 1.3, dash="2 4")
    F.line(*T(0, -2.4), *T(0, 2.4), "", 1.3, dash="2 4", op=0.7)
    F.text(*T(0.08, 2.18), f"{it('V')} = 0", "", 13, "start")
    n = 14
    for k in range(n):
        a = 2 * math.pi * (k + 0.5) / n
        pts = ligne_de_champ(ch, 1 + 0.08 * math.cos(a), 0.08 * math.sin(a), 1, borne=(-4.6, 4.6, -2.4, 2.4))
        pts = [(1.0, 0.0)] + pts
        tracer_polyligne(F, pts, T, "acc", 1.7, fleches=(0.33,))
    F.charge(*T(-1, 0), -1, 14)
    F.charge(*T(1, 0), 1, 14)
    F.text(*T(-1, -0.42), f"−{it('q')} ({it('A')})", "neg", 13, bg=True)
    F.text(*T(1, -0.42), f"+{it('q')} ({it('B')})", "pos", 13, bg=True)
    F.ecrire()


def condensateur():
    F = Fig("condensateur", 690, 270,
            "Condensateur plan : entre les armatures, le champ est uniforme (mêmes flèches partout), "
            "dirigé du + vers le −, de norme U/d. Les équipotentielles sont des plans parallèles aux "
            "armatures ; V décroît linéairement de U à 0.",
            "Champ uniforme et équipotentielles dans un condensateur plan")
    x0, x1, y0, y1 = 180, 460, 45, 205
    F.rect(x0, y0, x1 - x0, y1 - y0, "acc", fill="currentColor", fop=0.06, stroke=False)
    for k in range(1, 4):
        x = x0 + (x1 - x0) * k / 4
        F.line(x, y0, x, y1, "mut", 1.2, dash="3 4")
        F.text(x, y1 + 20, f"{it('V')} = {['3', '', ''][k - 1] if False else ''}{['3U/4', 'U/2', 'U/4'][k - 1]}", "mut", 12.5)
    for j in range(5):
        y = y0 + 18 + j * 31
        for i in range(3):
            xa = x0 + 22 + i * 88
            F.arrow(xa, y, xa + 58, y, "acc", 1.8, 8)
    F.rect(x0 - 9, y0 - 10, 9, y1 - y0 + 20, "pos", fill="currentColor", stroke=False, rx=2)
    F.rect(x1, y0 - 10, 9, y1 - y0 + 20, "neg", fill="currentColor", stroke=False, rx=2)
    for j in range(6):
        y = y0 + 6 + j * 29
        F.text(x0 - 22, y + 5, "+", "pos", 16, bold=True)
        F.text(x1 + 24, y + 5, "−", "neg", 16, bold=True)
    F.text(x0 - 4, y0 - 18, f"+{it('Q')}, {it('V')} = {it('U')}", "pos", 13.5, "middle", bold=True)
    F.text(x1 + 4, y0 - 18, f"−{it('Q')}, {it('V')} = 0", "neg", 13.5, "middle", bold=True)
    F.arrow(x0 + 2, 248, x1 - 2, 248, "mut", 1.2, 7)
    F.arrow(x1 - 2, 248, x0 + 2, 248, "mut", 1.2, 7)
    F.text((x0 + x1) / 2, 243, it("d"), "mut", 14, bg=True)
    F.text(590, 115, f"{it('E')} = {it('U')} / {it('d')}", "acc", 17, bold=True)
    F.text(590, 137, "uniforme,", "mut", 12.5)
    F.text(590, 153, "du + vers le −", "mut", 12.5)
    F.ecrire()


def altitude():
    F = Fig("potentiel-altitude", 660, 290,
            "L'analogie de l'altitude. À gauche, une randonnée : les courbes de niveau relient les points "
            "de même altitude et la pente la plus raide leur est perpendiculaire. À droite, une charge "
            "positive : les équipotentielles relient les points de même V et le champ, perpendiculaire, "
            "pointe vers les potentiels qui baissent.",
            "Comparaison entre une carte topographique et les équipotentielles d'une charge")
    # --- gauche : colline (courbes de niveau irrégulières)
    cx, cy = 165, 135
    for k, (r, alt) in enumerate([(98, "100 m"), (70, "200 m"), (43, "300 m"), (18, "400 m")]):
        pts = []
        for i in range(73):
            a = 2 * math.pi * i / 72
            rr = r * (1 + 0.12 * math.sin(2 * a + k * 0.4) + 0.06 * math.cos(3 * a))
            pts.append((cx + rr * math.cos(a) * 1.15, cy + rr * math.sin(a)))
        F.poly(pts, "ok", 1.4, closed=True)
        F.text(cx + 4, cy - r * 0.93 + 4, alt, "ok", 11, bg=True)
    F.text(cx, cy + 4, "▲", "ok", 13)
    a = math.radians(-30)
    F.arrow(cx + 26 * math.cos(a) * 1.15, cy + 26 * math.sin(a), cx + 118 * math.cos(a) * 1.15, cy + 118 * math.sin(a), "warn", 2.4, 10)
    F.text(cx + 118 * math.cos(a) * 1.15 + 4, cy + 118 * math.sin(a) - 4, "descente", "warn", 13, "start", bold=True)
    F.text(cx, 270, "Carte de randonnée : courbes de niveau", "mut", 13, bold=True)
    # --- droite : charge + et équipotentielles
    cx2, cy2 = 495, 135
    for r, lab in [(100, "1"), (70, "1,4"), (44, "2,3"), (24, "4")]:
        F.circle(cx2, cy2, r, "pos", w=1.3, dash="3 4")
        F.text(cx2 + r * 0.71 + 4, cy2 - r * 0.71 - 2, f"{it('V')} = {lab}", "pos", 11, "start", bg=True)
    for k in range(8):
        aa = 2 * math.pi * k / 8 + 0.39
        F.arrow(cx2 + 18 * math.cos(aa), cy2 + 18 * math.sin(aa), cx2 + 112 * math.cos(aa), cy2 + 112 * math.sin(aa), "acc", 1.6, 8)
    # angle droit
    aa = 0.39
    px, py = cx2 + 70 * math.cos(aa), cy2 + 70 * math.sin(aa)
    ux, uy = math.cos(aa), math.sin(aa)
    tx, ty = -uy, ux
    q = 8
    F.poly([(px + ux * q, py + uy * q), (px + ux * q + tx * q, py + uy * q + ty * q), (px + tx * q, py + ty * q)], "", 1.2)
    F.charge(cx2, cy2, 1, 12)
    F.text(cx2, 270, f"Charge + : équipotentielles et {vec('E')}", "mut", 13, bold=True)
    F.ecrire()


def profil_potentiel():
    F = Fig("potentiel-profil", 640, 250,
            "V(r) le long d'une droite passant par la charge. Une charge positive est un sommet, une "
            "charge négative un puits. Une charge test positive « roule » vers les potentiels bas, "
            "dans le sens du champ.",
            "Profil du potentiel d'une charge positive (colline) et négative (puits)")
    for (ox, sgn) in [(165, 1), (485, -1)]:
        base = 125
        F.line(ox - 140, base, ox + 140, base, "mut", 1)
        F.text(ox + 142, base + 4, it("r"), "mut", 13, "start")
        pts_l, pts_r = [], []
        for i in range(120):
            x = 0.12 + i * 0.03
            v = 1 / x
            y = base - sgn * min(v, 7.5) * 13
            pts_r.append((ox + x * 36, y))
            pts_l.append((ox - x * 36, y))
        F.poly(pts_r, "pos" if sgn > 0 else "neg", 2.4)
        F.poly(pts_l, "pos" if sgn > 0 else "neg", 2.4)
        F.charge(ox, base, sgn, 11)
        # bille
        bx = 1.25 if sgn > 0 else 2.6
        by = base - sgn * (1 / bx) * 13
        F.circle(ox + bx * 36, by - 8, 7, "ok", fill="currentColor", stroke=False)
        F.text(ox + bx * 36, by - 4.5, "+", "", 11, bold=True)
        ang = 0 if sgn > 0 else math.pi
        F.arrow(ox + bx * 36 + (12 if sgn > 0 else -12), by - 22, ox + bx * 36 + (52 if sgn > 0 else -42), by - 22 + (14 if sgn > 0 else -2), "ok", 2, 8)
        F.text(ox, 235, "Charge + : une colline" if sgn > 0 else "Charge − : un puits", "pos" if sgn > 0 else "neg", 14, bold=True)
        F.text(ox - 135, 30, f"{it('V')}({it('r')}) = {it('k')}{sub('e')}{it('q')}/{it('r')}", "mut", 12.5, "start")
    F.ecrire()


def puits_hydrogene():
    F = Fig("puits-hydrogene", 600, 280,
            "Atome d'hydrogène : l'électron est piégé dans le puits de potentiel du proton. Son énergie "
            "mécanique E<sub>m</sub> = −k<sub>e</sub>e²/(2r) est négative : il faut lui fournir au moins "
            "|E<sub>m</sub>| (énergie d'ionisation) pour le remonter jusqu'à 0 et le libérer.",
            "Puits de potentiel de l'atome d'hydrogène et énergie d'ionisation")
    ox, oy, sx, sy = 70, 62, 95, 32
    T = lambda r, e: (ox + r * sx, oy - e * sy)
    F.arrow(ox, 262, ox, 22, "mut", 1.2, 7)
    F.arrow(ox, oy, 575, oy, "mut", 1.2, 7)
    F.text(ox - 6, 30, it("E"), "mut", 13, "end")
    F.text(572, oy - 8, it("r"), "mut", 13, "end")
    F.text(ox - 6, oy + 4, "0", "mut", 12, "end")
    pts = [T(r, -1 / r) for r in np.linspace(1 / 6.0, 5.3, 160)]
    F.poly(pts, "neg", 2.6)
    F.text(*T(2.4, -1.05), f"{it('E')}{sub('p')} = −{it('k')}{sub('e')}{it('e')}{sup('2')}/{it('r')}", "neg", 13, "start")
    r0 = 0.3
    em = -1 / (2 * r0)
    F.rect(ox, oy, 2 * r0 * sx, -em * sy, "ok", fill="currentColor", fop=0.08, stroke=False)
    F.line(*T(0, em), *T(2 * r0, em), "warn", 2.2, dash="6 4")
    F.text(T(2 * r0, em)[0] + 10, T(2 * r0, em)[1] + 22, f"{it('E')}{sub('m')} = −{it('k')}{sub('e')}{it('e')}{sup('2')}/(2{it('r')})", "warn", 13, "start", bold=True)
    F.circle(*T(r0, em), 7, "neg", fill="currentColor", stroke=False)
    F.el.append(f'<text x="{f(T(r0, em)[0])}" y="{f(T(r0, em)[1] + 4)}" font-size="10" text-anchor="middle" font-weight="700" class="on-charge">e</text>')
    F.arrow(T(0.48, em)[0], T(0.48, em)[1] - 3, T(0.48, 0)[0], T(0.48, 0)[1] + 2, "ok", 2.4, 9)
    F.text(T(0.48, 0)[0] + 10, T(0.48, em / 2)[1] + 5, f"énergie d'ionisation |{it('E')}{sub('m')}|", "ok", 13, "start", bold=True)
    F.text(*T(3.6, 0.45), f"électron libre ({it('E')} ≥ 0)", "mut", 12.5)
    F.text(*T(0.3, -5.2), "électron lié", "neg", 12.5, "start")
    F.ecrire()


def anneau():
    F = Fig("anneau", 560, 330,
            "Anneau chargé : deux morceaux dQ diamétralement opposés créent en M des champs dont les "
            "composantes perpendiculaires à l'axe se compensent. Il ne reste que les composantes selon "
            "l'axe Oz, qui s'ajoutent.",
            "Symétrie de l'anneau chargé et compensation des composantes")
    cx, cy, R, ry = 240, 255, 130, 34
    F.ellipse(cx, cy, R, ry, "pos", 2.4)
    F.arrow(cx, 300, cx, 22, "mut", 1.2, 7)
    F.text(cx - 8, 32, it("z"), "mut", 14, "end")
    F.circle(cx, cy, 3, "", "currentColor", stroke=False)
    F.text(cx + 8, cy + 16, it("O"), "", 13, "start")
    M = (cx, 95)
    P1, P2 = (cx - R, cy), (cx + R, cy)
    for P, c in ((P1, 1), (P2, -1)):
        F.line(*P, *M, "mut", 1, dash="3 4")
        F.circle(*P, 6, "pos", fill="currentColor", stroke=False)
        dx, dy = M[0] - P[0], M[1] - P[1]
        m = math.hypot(dx, dy)
        L = 85
        tip = (M[0] + dx / m * L, M[1] + dy / m * L)
        F.arrow(*M, *tip, "acc", 2, 8)
        F.line(*tip, M[0], tip[1], "mut", 1, dash="2 3")
        F.arrow(*M, tip[0], M[1], "mut", 1.4, 7, dash="3 3")
    F.text(P1[0] - 10, P1[1] + 4, f"d{it('Q')}", "pos", 14, "end")
    F.text(P2[0] + 10, P2[1] + 4, f"d{it('Q')}′", "pos", 14, "start")
    tipy = M[1] + (M[1] - cy) / math.hypot(R, cy - M[1]) * 85
    F.arrow(M[0], M[1], M[0], M[1] - 2 * 85 * (cy - M[1]) / math.hypot(R, cy - M[1]), "ok", 3, 11)
    F.circle(*M, 3.5, "", "currentColor", stroke=False)
    F.text(M[0] + 10, M[1] + 16, it("M"), "", 15, "start")
    F.text(M[0] - 72, M[1] - 30, f"d{vec('E')}", "acc", 13, "end")
    F.text(M[0] + 72, M[1] - 30, f"d{vec('E')}′", "acc", 13, "start")
    F.text(M[0] + 10, M[1] - 2 * 85 * (cy - M[1]) / math.hypot(R, cy - M[1]) + 8, f"{vec('E')} selon {it('Oz')}", "ok", 14, "start", bold=True)
    F.text(470, 100, "composantes", "mut", 12.5)
    F.text(470, 116, "horizontales :", "mut", 12.5)
    F.text(470, 134, "elles s'annulent", "mut", 12.5, bold=True)
    F.ecrire()


# =========================================================================== CHAPITRE 2
def coordonnees():
    F = Fig("coordonnees", 690, 285,
            "Les trois systèmes de coordonnées. Cartésiennes : trois longueurs. Cylindriques : la "
            "distance r à l'axe, l'angle θ autour de l'axe et la hauteur z. Sphériques : la distance r "
            "au centre, l'angle θ depuis l'axe Oz (comme une colatitude) et l'angle φ autour de Oz "
            "(comme une longitude).",
            "Coordonnées cartésiennes, cylindriques et sphériques d'un point M")

    def proj(ox, oy, x, y, z, s=52):
        return (ox + y * s - x * s * 0.55, oy - z * s + x * s * 0.38)

    def axes(ox, oy):
        for (v, lab) in [((2.2, 0, 0), "x"), ((0, 2.2, 0), "y"), ((0, 0, 2.6), "z")]:
            p = proj(ox, oy, *v)
            F.arrow(ox, oy, *p, "mut", 1.3, 7)
            F.text(p[0] + (-10 if lab == "x" else 8), p[1] + (12 if lab == "x" else (4 if lab == "y" else -2)), it(lab), "mut", 14, "middle")
        F.text(ox - 8, oy + 14, it("O"), "mut", 13)

    M = (1.1, 1.6, 1.7)
    # cartésiennes
    ox, oy = 80, 205
    axes(ox, oy)
    pm = proj(ox, oy, *M)
    pxy = proj(ox, oy, M[0], M[1], 0)
    F.line(*pm, *pxy, "mut", 1, dash="3 3")
    F.line(*pxy, *proj(ox, oy, M[0], 0, 0), "acc", 2)
    F.line(*pxy, *proj(ox, oy, 0, M[1], 0), "mut", 1, dash="3 3")
    F.line(*proj(ox, oy, M[0], 0, 0), *(ox, oy), "acc", 2)
    F.line(*pm, *pxy, "acc", 2)
    F.circle(*pm, 4, "warn", "currentColor", stroke=False)
    F.text(pm[0] + 8, pm[1] - 6, it("M"), "warn", 15, "start", bold=True)
    F.text(ox + 30, 272, f"({it('x')}, {it('y')}, {it('z')})", "", 14, bold=True)
    F.text(ox + 30, 22, "Cartésiennes", "", 14, bold=True)
    # cylindriques
    ox, oy = 310, 205
    axes(ox, oy)
    pm = proj(ox, oy, *M)
    pxy = proj(ox, oy, M[0], M[1], 0)
    F.line(*pm, *pxy, "acc", 2)
    F.line(ox, oy, *pxy, "acc", 2.2)
    rxy = math.hypot(M[0], M[1])
    th = math.atan2(M[1], M[0])
    arc = [proj(ox, oy, 0.7 * math.cos(t), 0.7 * math.sin(t), 0) for t in np.linspace(0, th, 20)]
    F.poly(arc, "ok", 1.8)
    F.head(*arc[-1], math.atan2(arc[-1][1] - arc[-2][1], arc[-1][0] - arc[-2][0]), "ok", 7)
    F.line(*pm, *proj(ox, oy, 0, 0, M[2]), "mut", 1, dash="3 3")
    F.text(*[a + b for a, b in zip(proj(ox, oy, 0.85 * math.cos(th / 2), 0.85 * math.sin(th / 2), 0), (-4, 16))], it("θ"), "ok", 15)
    mid = proj(ox, oy, M[0] / 2, M[1] / 2, 0)
    F.text(mid[0] + 4, mid[1] - 6, it("r"), "acc", 15, bold=True)
    F.text(pm[0] + 10, (pm[1] + pxy[1]) / 2 + 20, it("z"), "acc", 15, "start", bold=True)
    F.circle(*pm, 4, "warn", "currentColor", stroke=False)
    F.text(pm[0] + 8, pm[1] - 6, it("M"), "warn", 15, "start", bold=True)
    F.text(ox + 30, 272, f"({it('r')}, {it('θ')}, {it('z')})", "", 14, bold=True)
    F.text(ox + 30, 22, "Cylindriques", "", 14, bold=True)
    # sphériques
    ox, oy = 545, 205
    axes(ox, oy)
    pm = proj(ox, oy, *M)
    pxy = proj(ox, oy, M[0], M[1], 0)
    F.line(ox, oy, *pm, "acc", 2.4)
    F.line(*pm, *pxy, "mut", 1, dash="3 3")
    F.line(ox, oy, *pxy, "mut", 1, dash="3 3")
    rr = math.sqrt(sum(c * c for c in M))
    theta = math.acos(M[2] / rr)
    arc = [proj(ox, oy, *(0.9 * np.array([math.sin(t) * math.cos(th), math.sin(t) * math.sin(th), math.cos(t)]))) for t in np.linspace(0, theta, 20)]
    F.poly(arc, "ok", 1.8)
    F.head(*arc[-1], math.atan2(arc[-1][1] - arc[-2][1], arc[-1][0] - arc[-2][0]), "ok", 7)
    F.text(arc[8][0] + 8, arc[8][1] - 2, it("θ"), "ok", 15, "start")
    arc2 = [proj(ox, oy, 0.6 * math.cos(t), 0.6 * math.sin(t), 0) for t in np.linspace(0, th, 20)]
    F.poly(arc2, "warn", 1.8)
    F.head(*arc2[-1], math.atan2(arc2[-1][1] - arc2[-2][1], arc2[-1][0] - arc2[-2][0]), "warn", 7)
    F.text(arc2[10][0] - 2, arc2[10][1] + 18, it("φ"), "warn", 15)
    mid = proj(ox, oy, M[0] * 0.55, M[1] * 0.55, M[2] * 0.55)
    F.text(mid[0] + 10, mid[1] + 2, it("r"), "acc", 15, "start", bold=True)
    F.circle(*pm, 4, "warn", "currentColor", stroke=False)
    F.text(pm[0] + 8, pm[1] - 6, it("M"), "warn", 15, "start", bold=True)
    F.text(ox + 30, 272, f"({it('r')}, {it('θ')}, {it('φ')})", "", 14, bold=True)
    F.text(ox + 30, 22, "Sphériques", "", 14, bold=True)
    F.ecrire()


def flux():
    F = Fig("flux", 640, 250,
            "Le flux mesure « combien de champ traverse » une surface, comme la pluie qui passe par une "
            "fenêtre. Champ perpendiculaire à la surface (parallèle à n) : flux maximal, Φ = E·S. "
            "Champ rasant (perpendiculaire à n) : rien ne traverse, Φ = 0.",
            "Flux maximal pour un champ normal à la surface, nul pour un champ rasant")
    for col, (titre, rasant) in enumerate([(f"{vec('E')} ∥ {vec('n')} : Φ = {it('E')}·{it('S')}", False), (f"{vec('E')} ⊥ {vec('n')} : Φ = 0", True)]):
        ox = 160 + col * 320
        quad = [(ox - 40, 72), (ox + 40, 42), (ox + 40, 172), (ox - 40, 202)]
        ux, uy = 30 / math.hypot(30, 80), 80 / math.hypot(30, 80)  # direction le long du bord haut → normale
        nx, ny = 0.94, -0.35
        if not rasant:
            for k in range(4):
                cx, cy = ox, 82 + k * 34
                F.arrow(cx - nx * 110, cy - ny * 110, cx + nx * 110, cy + ny * 110, "ok", 1.8, 8)
        F.poly(quad, "acc", 1.6, fill="currentColor", fop=0.18, closed=True)
        if rasant:
            for k in range(4):
                cx = ox - 30 + k * 20
                cy = 122 - (k * 20 - 30) * 0.375
                F.arrow(cx, cy + 78, cx, cy - 78, "ok", 1.8, 8)
        F.text(ox - 52, 70, it("S"), "acc", 15, bold=True)
        F.arrow(ox, 122, ox + nx * 62, 122 + ny * 62, "", 2.4, 9)
        F.text(ox + nx * 62 + 6, 122 + ny * 62 - 4, vec("n"), "", 15, "start")
        F.text(ox - 15, 236, titre, "", 14, bold=True)
    F.ecrire()


def gauss_principe():
    F = Fig("gauss-principe", 660, 250,
            "Théorème de Gauss. Charge à l'intérieur : tout le champ sort, le flux vaut Q/ε₀. Charge à "
            "l'extérieur : chaque ligne qui entre ressort, le flux total est nul, même si le champ "
            "n'est pas nul sur la surface.",
            "Flux à travers une surface fermée selon que la charge est dedans ou dehors")

    def blob(cx, cy, s=1.0):
        pts = []
        for i in range(91):
            a = 2 * math.pi * i / 90
            r = (78 + 10 * math.sin(3 * a) + 6 * math.cos(2 * a)) * s
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a) * 0.82))
        return pts

    # charge dedans
    cx, cy = 165, 115
    F.poly(blob(cx, cy), "acc", 2, fill="currentColor", fop=0.07, closed=True, dash="7 5")
    for k in range(10):
        a = 2 * math.pi * k / 10 + 0.2
        F.arrow(cx + 16 * math.cos(a), cy + 16 * math.sin(a), cx + 112 * math.cos(a), cy + 100 * math.sin(a), "ok", 1.6, 7)
    F.charge(cx, cy, 1, 13)
    F.text(cx, 232, f"Dedans : Φ = {it('Q')}/{it('ε')}{sub('0')}", "", 14, bold=True)
    F.text(cx + 70, 40, f"{it('S')}{sub('g')}", "acc", 14, "start")
    # charge dehors
    cx, cy = 465, 115
    F.poly(blob(cx, cy), "acc", 2, fill="currentColor", fop=0.07, closed=True, dash="7 5")
    qx, qy = 330, 115
    for k in range(-3, 4):
        y = cy + k * 22
        F.arrow(qx + 14, qy + k * 6, 630, y + k * 6, "ok", 1.5, 7)
    F.charge(qx, qy, 1, 13)
    F.text(cx + 30, 232, "Dehors : ce qui entre ressort, Φ = 0", "", 14, bold=True)
    F.text(cx - 40, 110, "entre", "mut", 12.5, bg=True)
    F.text(cx + 90, 110, "sort", "mut", 12.5, bg=True)
    F.ecrire()


def surfaces_gauss():
    F = Fig("surfaces-gauss", 690, 290,
            "Les trois surfaces de Gauss à connaître. Sphère (centre O) : E radial, même norme partout, "
            "Φ = E·4πr². Fil infini : cylindre de rayon r et de hauteur h, flux nul sur les deux bases, "
            "Φ = E·2πrh. Plan infini : cylindre qui traverse le plan, flux nul sur le côté, Φ = 2E·S.",
            "Surface de Gauss sphérique, cylindrique autour d'un fil, et cylindre traversant un plan")
    # sphère
    cx, cy = 115, 140
    F.circle(cx, cy, 34, "pos", fill="currentColor", fop=0.25, stroke=False)
    F.circle(cx, cy, 75, "acc", w=2, dash="6 5")
    F.ellipse(cx, cy, 75, 18, "acc", 1, dash="3 4")
    for k in range(10):
        a = 2 * math.pi * k / 10
        F.arrow(cx + 75 * math.cos(a), cy + 75 * math.sin(a), cx + 105 * math.cos(a), cy + 105 * math.sin(a), "ok", 1.8, 7)
    F.text(cx, cy + 5, "boule", "pos", 12)
    F.text(cx, 272, f"Sphère : Φ = {it('E')}·4π{it('r')}{sup('2')}", "", 13.5, bold=True)
    # fil
    cx = 345
    top, bot, rx, ry = 70, 205, 52, 14
    F.line(cx, 30, cx, 245, "pos", 3)
    F.text(cx + 6, 28, f"fil ({it('λ')})", "pos", 12.5, "start")
    F.ellipse(cx, top, rx, ry, "acc", 1.8, dash="6 5")
    F.path(f"M{cx - rx} {bot} A{rx} {ry} 0 0 0 {cx + rx} {bot}", "acc", 1.8, dash="6 5")
    F.path(f"M{cx - rx} {bot} A{rx} {ry} 0 0 1 {cx + rx} {bot}", "acc", 1, dash="2 4")
    F.line(cx - rx, top, cx - rx, bot, "acc", 1.8, dash="6 5")
    F.line(cx + rx, top, cx + rx, bot, "acc", 1.8, dash="6 5")
    for y in (105, 140, 175):
        F.arrow(cx + rx, y, cx + rx + 38, y, "ok", 1.8, 7)
        F.arrow(cx - rx, y, cx - rx - 38, y, "ok", 1.8, 7)
    F.text(cx + rx + 6, top - 6, "Φ = 0 (base)", "mut", 11.5, "start")
    F.text(cx, 272, f"Cylindre : Φ = {it('E')}·2π{it('r')}{it('h')}", "", 13.5, bold=True)
    # plan
    cx, cy = 575, 150
    F.poly([(cx - 95, cy + 12), (cx - 35, cy - 28), (cx + 95, cy - 28), (cx + 35, cy + 12)], "pos", 1.4, fill="currentColor", fop=0.18, closed=True)
    F.text(cx + 88, cy - 34, f"plan ({it('σ')})", "pos", 12.5, "end")
    rx, ry, h = 26, 8, 52
    F.ellipse(cx, cy - h, rx, ry, "acc", 1.8, dash="5 4")
    F.ellipse(cx, cy + h, rx, ry, "acc", 1.8, dash="5 4")
    F.line(cx - rx, cy - h, cx - rx, cy + h, "acc", 1.8, dash="5 4")
    F.line(cx + rx, cy - h, cx + rx, cy + h, "acc", 1.8, dash="5 4")
    for dx in (-12, 12):
        F.arrow(cx + dx, cy - h, cx + dx, cy - h - 42, "ok", 1.8, 7)
        F.arrow(cx + dx, cy + h, cx + dx, cy + h + 42, "ok", 1.8, 7)
    F.text(cx + rx + 6, cy - h - 8, f"{it('S')}", "acc", 13, "start")
    F.text(cx, 272, f"Plan : Φ = 2{it('E')}·{it('S')}", "", 13.5, bold=True)
    F.ecrire()


def courbe_boule():
    F = Fig("courbe-boule", 560, 250,
            "Champ d'une boule uniformément chargée : il croît linéairement à l'intérieur (de plus en "
            "plus de charge enfermée), atteint son maximum en r = R, puis décroît en 1/r² comme pour "
            "une charge ponctuelle.",
            "Courbe E(r) pour une boule chargée en volume")
    ox, oy, sx, sy = 60, 215, 150, 150
    F.arrow(ox, oy, 540, oy, "mut", 1.2, 7)
    F.arrow(ox, oy, ox, 25, "mut", 1.2, 7)
    F.text(536, oy + 18, it("r"), "mut", 14, "end")
    F.text(ox - 8, 36, f"{it('E')}({it('r')})", "mut", 13, "end")
    F.rect(ox, 30, sx, oy - 30, "pos", fill="currentColor", fop=0.07, stroke=False)
    F.text(ox + sx / 2, 48, "dedans", "pos", 12.5)
    F.text(ox + sx * 1.9, 48, "dehors", "mut", 12.5)
    F.poly([(ox, oy), (ox + sx, oy - sy)], "ok", 3)
    F.poly([(ox + r * sx, oy - sy / (r * r)) for r in np.linspace(1, 3.1, 80)], "ok", 3)
    F.line(ox + sx, oy, ox + sx, oy - sy, "mut", 1, dash="3 4")
    F.line(ox, oy - sy, ox + sx, oy - sy, "mut", 1, dash="3 4")
    F.text(ox + sx, oy + 18, it("R"), "pos", 14, bold=True)
    F.text(ox - 6, oy - sy + 4, f"{it('E')}({it('R')})", "mut", 12, "end")
    F.text(ox + sx * 0.5 + 6, oy - sy * 0.5 + 24, "∝ r", "ok", 14, "start", bold=True)
    F.text(ox + sx * 1.9, oy - sy / 3.6 - 12, "∝ 1/r²", "ok", 14, "start", bold=True)
    F.ecrire()


def condensateur_superposition():
    F = Fig("condensateur-superposition", 640, 290,
            "Pourquoi le champ est nul hors d'un condensateur : chaque plan crée σ/2ε₀ de chaque côté. "
            "Le plan + repousse (flèches qui s'éloignent), le plan − attire. Entre les plans les deux "
            "champs s'ajoutent (σ/ε₀) ; à l'extérieur ils se compensent (0).",
            "Superposition des champs de deux plans chargés : champ nul à l'extérieur")
    xp, xm = 250, 390
    F.line(xp, 20, xp, 230, "pos", 5)
    F.line(xm, 20, xm, 230, "neg", 5)
    F.text(xp, 252, f"+{it('σ')}", "pos", 15, bold=True)
    F.text(xm, 252, f"−{it('σ')}", "neg", 15, bold=True)
    rows = [(55, "pos", [(-1, -1), (1, 1), (1, 1)], "plan + seul"), (115, "neg", [(1, 1), (1, 1), (-1, -1)], "plan − seul")]
    zones = [(115, 230), (xp + 10, xm - 10), (410, 525)]
    for y, c, dirs, lab in rows:
        for (x0, x1), (d, _) in zip(zones, dirs):
            if c == "pos":
                d = -1 if x1 <= xp else 1
            else:
                d = 1 if x1 <= xm else -1
            a, b = (x0 + 12, x1 - 12) if d > 0 else (x1 - 12, x0 + 12)
            F.arrow(a, y, b, y, c, 2, 8)
        F.text(30, y + 4, lab, c, 12.5, "start")
    y = 185
    F.line(30, 150, 610, 150, "mut", 1, dash="2 4")
    F.text(30, y + 4, "total", "ok", 13, "start", bold=True)
    F.text(172, y + 5, "0", "ok", 17, bold=True)
    F.arrow(xp + 22, y, xm - 22, y, "ok", 3.2, 11)
    F.text((xp + xm) / 2, y - 12, f"{it('σ')}/{it('ε')}{sub('0')}", "ok", 14, bold=True)
    F.text(468, y + 5, "0", "ok", 17, bold=True)
    F.ecrire()


# =========================================================================== CHAPITRE 3
def oersted():
    F = Fig("oersted", 600, 230,
            "Expérience d'Oersted (vue de dessus, fil au-dessus de la boussole). Sans courant, la boussole "
            "indique le nord, le long du fil. Avec un courant dirigé vers le nord, elle tourne vers "
            "l'ouest et se place perpendiculairement au fil (si le courant est assez fort) : le courant "
            "crée un champ magnétique. Si on inverse I, elle tourne dans l'autre sens.",
            "Boussole sous un fil, sans puis avec courant")

    def boussole(cx, cy, ang):
        F.circle(cx, cy, 44, "mut", fill="none", w=1.5)
        ux, uy = math.cos(ang), math.sin(ang)
        tx, ty = -uy, ux
        L, w = 38, 7
        F.poly([(cx + ux * L, cy + uy * L), (cx + tx * w, cy + ty * w), (cx - tx * w, cy - ty * w)], "warn", 0, fill="currentColor", closed=True)
        F.poly([(cx - ux * L, cy - uy * L), (cx + tx * w, cy + ty * w), (cx - tx * w, cy - ty * w)], "mut", 0, fill="currentColor", closed=True)
        F.circle(cx, cy, 3, "", "currentColor", stroke=False)
        F.text(cx + ux * (L + 14), cy + uy * (L + 14) + 4, "N", "warn", 12, bold=True)

    for col, (I, titre) in enumerate([(False, f"{it('I')} = 0"), (True, f"{it('I')} ≠ 0")]):
        cx = 150 + col * 300
        cy = 105
        boussole(cx, cy, -math.pi / 2 if not I else math.pi)
        F.rect(cx - 6, 22, 12, 170, "", fill="currentColor", fop=0.15, stroke=False, rx=3)
        F.line(cx, 22, cx, 192, "mut", 1.2)
        if I:
            F.arrow(cx + 18, 175, cx + 18, 135, "pos", 2.2, 8)
            F.text(cx + 26, 165, it("I"), "pos", 14, "start", bold=True)
            F.arrow(cx - 70, 40, cx - 120, 40, "acc", 2, 8)
            F.text(cx - 95, 30, f"{vec('B')} sous le fil", "acc", 13)
        F.text(cx, 220, titre, "", 14, bold=True)
    F.text(40, 30, "nord ↑", "mut", 12, "start")
    F.ecrire()


def fil_lignes():
    F = Fig("fil-lignes", 660, 290,
            "Champ d'un fil infini. À gauche : les lignes de champ sont des cercles autour du fil ; le "
            "sens est donné par la main droite (pouce dans le sens de I, les doigts s'enroulent dans "
            "le sens de B) ou par un tire-bouchon. À droite, vue de dessus : B est tangent aux cercles "
            "et diminue en 1/r.",
            "Lignes de champ circulaires autour d'un fil parcouru par un courant")
    cx = 165
    F.line(cx, 255, cx, 25, "pos", 4)
    F.head(cx, 22, -math.pi / 2, "pos", 12)
    F.text(cx + 10, 40, it("I"), "pos", 16, "start", bold=True)
    for (y, rx) in [(80, 85), (145, 110), (210, 75)]:
        ry = rx * 0.26
        F.path(f"M{cx - rx} {y} A{rx} {ry} 0 0 0 {cx + rx} {y}", "acc", 2)
        F.path(f"M{cx - rx} {y} A{rx} {ry} 0 0 1 {cx + rx} {y}", "acc", 1.2, dash="3 4")
        # flèche à l'avant (bas de l'ellipse), sens trigonométrique vu du dessus → vers la droite
        t = math.pi / 3
        F.head(cx + rx * math.cos(t), y + ry * math.sin(t), math.atan2(-ry * math.cos(t), rx * math.sin(t)), "acc", 9)
    F.text(cx + 118, 150, vec("B"), "acc", 15, "start")
    F.text(cx, 282, "Vue de côté", "mut", 13, bold=True)
    # vue de dessus
    cx2, cy2 = 495, 140
    for r in (36, 66, 100):
        F.circle(cx2, cy2, r, "acc", w=1.6)
        for a in (math.pi / 4, math.pi * 1.25):
            x, y = cx2 + r * math.cos(a), cy2 - r * math.sin(a)
            F.head(x, y, math.atan2(-math.cos(a), -math.sin(a)), "acc", 8)
    F.courant(cx2, cy2, True, 13)
    F.line(cx2, cy2, cx2 + 66, cy2, "mut", 1.2, dash="3 3")
    F.text(cx2 + 33, cy2 - 6, it("r"), "mut", 14)
    F.text(cx2, 268, f"{it('B')} = {it('μ')}{sub('0')}{it('I')} / (2π{it('r')})", "", 14, bold=True)
    F.text(cx2, 284, "Vue de dessus (I vers toi ⊙)", "mut", 12.5)
    F.ecrire()


def aimant_solenoide():
    F = Fig("aimant-solenoide", 690, 270,
            "Lignes de champ magnétique : elles sont toujours fermées. Aimant droit : elles sortent par "
            "le nord, rentrent par le sud et se referment à l'intérieur. Solénoïde (vue en coupe) : "
            "même allure qu'un aimant, avec un champ presque uniforme à l'intérieur.",
            "Lignes de champ d'un aimant droit et d'un solénoïde")
    # --- aimant : pôles magnétiques fictifs
    s = 48
    T = lambda x, y: (175 + x * s, 125 - y * s)
    poles = [(1.2, y, 0.25) for y in np.linspace(-0.3, 0.3, 4)] + [(-1.2, y, -0.25) for y in np.linspace(-0.3, 0.3, 4)]
    for a in np.linspace(-2.5, 2.5, 11):
        x, y = 1.2 + 0.42 * math.cos(a), 0.42 * math.sin(a)
        pts = [(x, y)]
        for _ in range(3000):
            ex, ey = champ_E(poles, x, y)
            m = math.hypot(ex, ey) or 1
            x, y = x + ex / m * 0.02, y + ey / m * 0.02
            pts.append((x, y))
            if x < -1.15 and abs(y) < 0.42:
                break
            if not (-3.6 < x < 3.6 and -2.5 < y < 2.5):
                break
        tracer_polyligne(F, pts, T, "acc", 1.5, fleches=(0.5,))
    F.rect(*T(-1.25, 0.36), 1.25 * s, 0.72 * s, "neg", fill="currentColor", fop=0.85, stroke=False)
    F.rect(*T(0, 0.36), 1.25 * s, 0.72 * s, "warn", fill="currentColor", fop=0.85, stroke=False)
    F.text(T(-0.62, 0)[0], T(0, 0)[1] + 6, "S", "", 17, bold=True)
    F.text(T(0.62, 0)[0], T(0, 0)[1] + 6, "N", "", 17, bold=True)
    F.el[-1] = F.el[-1].replace('fill="currentColor"', 'class="on-charge"')
    F.el[-2] = F.el[-2].replace('fill="currentColor"', 'class="on-charge"')
    F.arrow(T(-0.9, -0.2)[0], T(0, -0.2)[1], T(0.9, -0.2)[0], T(0, -0.2)[1], "", 1.4, 6)
    F.el[-1] = F.el[-1].replace('fill="currentColor"', 'class="on-charge"')
    F.el[-2] = F.el[-2].replace('stroke="currentColor"', 'stroke="#fff"')
    F.text(175, 258, "Aimant droit (à l'intérieur : du S vers le N)", "mut", 13, bold=True)
    # --- solénoïde en coupe
    s2 = 46
    T2 = lambda x, y: (520 + x * s2, 125 - y * s2)
    xs = np.linspace(-1.6, 1.6, 9)
    fils = [(x, 0.75, 1.0) for x in xs] + [(x, -0.75, -1.0) for x in xs]
    X, Y = np.meshgrid(np.linspace(-3.5, 3.5, 360), np.linspace(-2.5, 2.5, 260))
    psi = sum(I * np.log(np.sqrt((X - x) ** 2 + (Y - y) ** 2) + 1e-9) for x, y, I in fils)
    psi = np.clip(psi, -40, 40)
    lv = np.linspace(-6.5, 6.5, 13)
    for lvl, seg in contours(X, Y, psi, lv):
        if any(math.hypot(p[0] - x, p[1] - y) < 0.12 for p in seg[::5] for x, y, _ in fils):
            continue
        pts = [tuple(p) for p in seg]
        tracer_polyligne(F, pts, T2, "acc", 1.4)
        if int(round(lvl / (13 / 12))) % 2:
            continue
        m = pts[len(pts) // 4]
        bx = sum(-I * (m[1] - y) / ((m[0] - x) ** 2 + (m[1] - y) ** 2) for x, y, I in fils)
        by = sum(I * (m[0] - x) / ((m[0] - x) ** 2 + (m[1] - y) ** 2) for x, y, I in fils)
        p = T2(*m)
        F.head(p[0], p[1], math.atan2(-by, bx), "acc", 7)
    for x, y, I in fils:
        F.courant(*T2(x, y), I > 0, 7.5)
    F.text(520, 258, "Solénoïde (coupe) : ⊙ en haut, ⊗ en bas", "mut", 13, bold=True)
    F.ecrire()


def biot_savart_spire():
    F = Fig("biot-savart", 690, 310,
            "À gauche, Biot et Savart : l'élément I·dl en P crée en M un champ dB perpendiculaire au "
            "plan formé par dl et PM (ici, il rentre dans la page ⊗). À droite, la spire : les "
            "composantes de dB perpendiculaires à l'axe se compensent deux à deux, seule la composante "
            "selon l'axe reste.",
            "Loi de Biot et Savart pour un élément de courant et pour une spire")
    # gauche
    x0 = 95
    F.line(x0, 285, x0, 20, "pos", 3)
    F.head(x0, 18, -math.pi / 2, "pos", 10)
    P = (x0, 190)
    F.arrow(P[0] + 10, P[1] + 14, P[0] + 10, P[1] - 30, "pos", 2.6, 9)
    F.text(P[0] - 10, P[1] - 22, f"{it('I')} d{vec('l')}", "pos", 14, "end", bold=True)
    F.circle(*P, 4, "pos", "currentColor", stroke=False)
    F.text(P[0] - 10, P[1] + 5, it("P"), "pos", 14, "end")
    M = (290, 105)
    F.arrow(*P, M[0] - 4, M[1] + 2, "", 1.8, 8)
    F.text((P[0] + M[0]) / 2 + 6, (P[1] + M[1]) / 2 + 22, f"{vec('PM')}", "", 14, "start")
    a0 = math.atan2(M[1] - P[1], M[0] - P[0])
    arc = [(P[0] + 34 * math.cos(t), P[1] + 34 * math.sin(t)) for t in np.linspace(-math.pi / 2, a0, 15)]
    F.poly(arc, "mut", 1.2)
    F.text(P[0] + 40, P[1] - 30, it("α"), "mut", 14, "start")
    F.courant(*M, False, 12, "acc")
    F.text(M[0] + 18, M[1] - 12, f"d{vec('B')} (⊗)", "acc", 14, "start", bold=True)
    F.text(M[0], M[1] + 30, it("M"), "", 14)
    F.text(185, 300, f"d{vec('B')} = ({it('μ')}{sub('0')}/4π) {it('I')} d{vec('l')} ∧ {vec('PM')} / {it('PM')}{sup('3')}", "", 13, bold=True)
    # droite : spire
    cx, cy, R, ry = 525, 235, 105, 28
    F.ellipse(cx, cy, R, ry, "pos", 2.4)
    F.head(cx + 6, cy + ry, 0, "pos", 10)
    F.text(cx + 18, cy + ry + 18, it("I"), "pos", 14, "start", bold=True)
    F.arrow(cx, 290, cx, 18, "mut", 1.2, 7)
    F.text(cx - 8, 26, it("z"), "mut", 14, "end")
    M = (cx, 105)
    for sgn in (-1, 1):
        Pp = (cx + sgn * R, cy)
        F.line(*Pp, *M, "mut", 1, dash="3 4")
        dx, dy = M[0] - Pp[0], M[1] - Pp[1]
        m = math.hypot(dx, dy)
        # dB ⊥ PM, dans le plan de la figure, du côté de l'axe vers le haut
        nx, ny = (dy / m, -dx / m) if sgn < 0 else (-dy / m, dx / m)
        if ny > 0:
            nx, ny = -nx, -ny
        L = 70
        tip = (M[0] + nx * L, M[1] + ny * L)
        F.arrow(*M, *tip, "acc", 2, 8)
        F.line(*tip, M[0], tip[1], "mut", 1, dash="2 3")
        F.arrow(*M, tip[0], M[1], "mut", 1.3, 7, dash="3 3")
        F.circle(*Pp, 5, "pos", "currentColor", stroke=False)
    up = M[1] - 2 * 70 * abs(-(cx - R - M[0])) / math.hypot(R, cy - M[1])
    F.arrow(M[0], M[1], M[0], up, "ok", 3, 11)
    F.text(M[0] + 10, up + 6, f"{vec('B')} selon l'axe", "ok", 14, "start", bold=True)
    F.circle(*M, 3.5, "", "currentColor", stroke=False)
    F.text(M[0] - 10, M[1] + 18, it("M"), "", 14, "end")
    F.ecrire()


def ampere():
    F = Fig("ampere", 660, 280,
            "Théorème d'Ampère. À gauche : seuls les courants qui traversent le contour comptent, avec "
            "leur signe (+ s'ils vont dans le sens donné par la main droite, ici vers toi). I₃ est "
            "dehors : il crée du champ sur le contour mais ne compte pas. À droite, le câble coaxial : "
            "aller I au centre, retour −I sur la gaine ; hors du câble, ΣI = 0 donc B = 0.",
            "Contour d'Ampère et courants enlacés ; câble coaxial")
    cx, cy, R = 170, 130, 92
    F.circle(cx, cy, R, "ok", fill="currentColor", fop=0.06, w=2.2, dash="7 5")
    for a in (math.pi * 0.25, math.pi * 1.25):
        x, y = cx + R * math.cos(a), cy - R * math.sin(a)
        F.head(x, y, math.atan2(-math.cos(a), -math.sin(a)), "ok", 11)
    F.text(cx + R * 0.72 + 10, cy - R * 0.72 - 6, it("C"), "ok", 16, "start", bold=True)
    F.courant(cx - 30, cy - 20, True, 13)
    F.text(cx - 30, cy + 14, f"{it('I')}{sub('1')}", "pos", 14)
    F.courant(cx + 34, cy + 22, False, 13)
    F.text(cx + 34, cy + 56, f"{it('I')}{sub('2')}", "neg", 14)
    F.courant(cx + 135, cy - 70, True, 13)
    F.text(cx + 135, cy - 36, f"{it('I')}{sub('3')}", "pos", 14)
    F.text(cx, 255, f"∮{vec('B')}·d{vec('l')} = {it('μ')}{sub('0')}({it('I')}{sub('1')} − {it('I')}{sub('2')})", "", 14.5, bold=True)
    # coaxial
    cx2 = 500
    F.circle(cx2, cy, 68, "neg", fill="currentColor", fop=0.12, w=0)
    F.circle(cx2, cy, 54, "", fill="none", w=0)
    F.el.append(f'<circle cx="{cx2}" cy="{cy}" r="54" class="fond"/>')
    F.circle(cx2, cy, 68, "neg", w=1.6)
    F.circle(cx2, cy, 54, "neg", w=1.6)
    for k in range(8):
        a = 2 * math.pi * k / 8
        F.courant(cx2 + 61 * math.cos(a), cy + 61 * math.sin(a), False, 6)
    F.circle(cx2, cy, 20, "pos", fill="currentColor", fop=0.15, w=1.6)
    F.courant(cx2, cy, True, 10)
    F.circle(cx2, cy, 100, "ok", w=2, dash="7 5")
    F.text(cx2 + 76, cy - 76, it("C"), "ok", 16, "start", bold=True)
    F.text(cx2, 255, f"ΣI = {it('I')} − {it('I')} = 0  ⇒  {it('B')} = 0 dehors", "", 14.5, bold=True)
    F.ecrire()


TOUS = [carte_chapitre, coulomb, superposition, champ_ponctuel, dipole_lignes, condensateur, altitude,
        profil_potentiel, puits_hydrogene, anneau, coordonnees, flux, gauss_principe, surfaces_gauss,
        courbe_boule, condensateur_superposition, oersted, fil_lignes, aimant_solenoide,
        biot_savart_spire, ampere]

if __name__ == "__main__":
    for fn in TOUS:
        fn()
