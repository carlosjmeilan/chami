﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
    function n(a, f, d, b) {
        if (!a.isReadOnly() && !a.equals(d.editable())) {
            CKEDITOR.dom.element.setMarker(b, a, "bidi_processed", 1);
            for (var b = a, c = d.editable(); (b = b.getParent()) && !b.equals(c);)if (b.getCustomData("bidi_processed")) {
                a.removeStyle("direction");
                a.removeAttribute("dir");
                return
            }
            b = "useComputedState" in d.config ? d.config.useComputedState : 1;
            if ((b ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != f)a.removeStyle("direction"), b ? (a.removeAttribute("dir"), f != a.getComputedStyle("direction") &&
            a.setAttribute("dir", f)) : a.setAttribute("dir", f), d.forceNextSelectionCheck()
        }
    }

    function r(a, f, d) {
        var b = a.getCommonAncestor(!1, !0), a = a.clone();
        a.enlarge(d == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
        if (a.checkBoundaryOfElement(b, CKEDITOR.START) && a.checkBoundaryOfElement(b, CKEDITOR.END)) {
            for (var c; b && b.type == CKEDITOR.NODE_ELEMENT && (c = b.getParent()) && 1 == c.getChildCount() && !(b.getName() in f);)b = c;
            return b.type == CKEDITOR.NODE_ELEMENT && b.getName() in f && b
        }
    }

    function m(a) {
        return {
            context: "p",
            allowedContent: {
                "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
                    propertiesOnly: !0,
                    attributes: "dir"
                }
            }, requiredContent: "p[dir]", refresh: function (a, d) {
                var b = a.config.useComputedState, c, b = void 0 === b || b;
                if (!b) {
                    c = d.lastElement;
                    for (var h = a.editable(); c && !(c.getName() in q || c.equals(h));) {
                        var e = c.getParent();
                        if (!e)break;
                        c = e
                    }
                }
                c = c || d.block || d.blockLimit;
                c.equals(a.editable()) && (h = a.getSelection().getRanges()[0].getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (c = h);
                c && (b = b ? c.getComputedStyle("direction") :
                c.getStyle("direction") || c.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
                b = (d.block || d.blockLimit || a.editable()).getDirection(1);
                if (b != (a._.selDir || a.lang.dir))a._.selDir = b, a.fire("contentDirChanged", b)
            }, exec: function (f) {
                var d = f.getSelection(), b = f.config.enterMode, c = d.getRanges();
                if (c && c.length) {
                    for (var h = {}, e = d.createBookmarks(), c = c.createIterator(), g,
                             j = 0; g = c.getNextRange(1);) {
                        var i = g.getEnclosedNode();
                        if (!i || i && !(i.type == CKEDITOR.NODE_ELEMENT && i.getName() in o))i = r(g, p, b);
                        i && n(i, a, f, h);
                        var k = new CKEDITOR.dom.walker(g), l = e[j].startNode, m = e[j++].endNode;
                        k.evaluator = function (a) {
                            var c = b == CKEDITOR.ENTER_P ? "p" : "div", d;
                            if (!(d = !(a && a.type == CKEDITOR.NODE_ELEMENT))) {
                                if (d = a.getName() in p) {
                                    if (!(c = !a.is(c)))c = a.getParent(), c = !(c && c.type == CKEDITOR.NODE_ELEMENT) || !a.getParent().is("blockquote");
                                    d = c && a.getPosition(l) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(m) &
                                        CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING
                                }
                                d = !d
                            }
                            return !d
                        };
                        for (; i = k.next();)n(i, a, f, h);
                        g = g.createIterator();
                        for (g.enlargeBr = b != CKEDITOR.ENTER_BR; i = g.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");)n(i, a, f, h)
                    }
                    CKEDITOR.dom.element.clearAllMarkers(h);
                    f.forceNextSelectionCheck();
                    d.selectBookmarks(e);
                    f.focus()
                }
            }
        }
    }

    function s(a) {
        var f = a == j.setAttribute, d = a == j.removeAttribute, b = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
        return function (c, h) {
            if (!this.isReadOnly()) {
                var e;
                if (e = c == (f || d ? "dir" : "direction") || "style" == c && (d || b.test(h))) {
                    a:{
                        e = this;
                        for (var g = e.getDocument().getBody().getParent(); e;) {
                            if (e.equals(g)) {
                                e = !1;
                                break a
                            }
                            e = e.getParent()
                        }
                        e = !0
                    }
                    e = !e
                }
                if (e && (e = this.getDirection(1), g = a.apply(this, arguments), e != this.getDirection(1)))return this.getDocument().fire("dirChanged", this), g
            }
            return a.apply(this, arguments)
        }
    }

    var p = {table: 1, ul: 1, ol: 1, blockquote: 1, div: 1}, o = {}, q = {};
    CKEDITOR.tools.extend(o, p, {tr: 1, p: 1, div: 1, li: 1});
    CKEDITOR.tools.extend(q, o, {td: 1});
    CKEDITOR.plugins.add("bidi",
        {
            lang: "af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
            icons: "bidiltr,bidirtl",
            hidpi: !0,
            init: function (a) {
                function f(b, c, d, e, f) {
                    a.addCommand(d, new CKEDITOR.command(a, e));
                    a.ui.addButton && a.ui.addButton(b, {
                        label: c,
                        command: d,
                        toolbar: "bidi," + f
                    })
                }

                if (!a.blockless) {
                    var d = a.lang.bidi;
                    f("BidiLtr", d.ltr, "bidiltr", m("ltr"), 10);
                    f("BidiRtl",
                        d.rtl, "bidirtl", m("rtl"), 20);
                    a.on("contentDom", function () {
                        a.document.on("dirChanged", function (b) {
                            a.fire("dirChanged", {
                                node: b.data,
                                dir: b.data.getDirection(1)
                            })
                        })
                    });
                    a.on("contentDirChanged", function (b) {
                        var b = (a.lang.dir != b.data ? "add" : "remove") + "Class", c = a.ui.space(a.config.toolbarLocation);
                        if (c)c[b]("cke_mixed_dir_content")
                    })
                }
            }
        });
    for (var j = CKEDITOR.dom.element.prototype, l = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], k = 0; k < l.length; k++)j[l[k]] = CKEDITOR.tools.override(j[l[k]], s)
})();
