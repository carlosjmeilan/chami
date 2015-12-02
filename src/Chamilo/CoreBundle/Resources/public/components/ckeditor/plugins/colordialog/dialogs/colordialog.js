﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("colordialog", function (t) {
    function n() {
        d.getById(o).removeStyle("background-color");
        p.getContentElement("picker", "selectedColor").setValue("");
        j && j.removeAttribute("aria-selected");
        j = null
    }

    function u(a) {
        var a = a.data.getTarget(), c;
        if ("td" == a.getName() && (c = a.getChild(0).getHtml()))j = a, j.setAttribute("aria-selected", !0), p.getContentElement("picker", "selectedColor").setValue(c)
    }

    function y(a) {
        for (var a = a.replace(/^#/, ""), c = 0, b = []; 2 >= c; c++)b[c] = parseInt(a.substr(2 * c, 2), 16);
        return "#" +
            (165 <= 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2] ? "000" : "fff")
    }

    function v(a) {
        !a.name && (a = new CKEDITOR.event(a));
        var c = !/mouse/.test(a.name), b = a.data.getTarget(), g;
        if ("td" == b.getName() && (g = b.getChild(0).getHtml()))q(a), c ? e = b : w = b, c && (b.setStyle("border-color", y(g)), b.setStyle("border-style", "dotted")), d.getById(k).setStyle("background-color", g), d.getById(l).setHtml(g)
    }

    function q(a) {
        if (a = !/mouse/.test(a.name) && e) {
            var c = a.getChild(0).getHtml();
            a.setStyle("border-color", c);
            a.setStyle("border-style", "solid")
        }
        !e && !w && (d.getById(k).removeStyle("background-color"), d.getById(l).setHtml("&nbsp;"))
    }

    function z(a) {
        var c = a.data, b = c.getTarget(), g = c.getKeystroke(), d = "rtl" == t.lang.dir;
        switch (g) {
            case 38:
                if (a = b.getParent().getPrevious())a = a.getChild([b.getIndex()]), a.focus();
                c.preventDefault();
                break;
            case 40:
                if (a = b.getParent().getNext())(a = a.getChild([b.getIndex()])) && 1 == a.type && a.focus();
                c.preventDefault();
                break;
            case 32:
            case 13:
                u(a);
                c.preventDefault();
                break;
            case d ? 37 : 39:
                if (a = b.getNext())1 == a.type && (a.focus(), c.preventDefault(!0));
                else if (a = b.getParent().getNext())if ((a = a.getChild([0])) && 1 == a.type)a.focus(), c.preventDefault(!0);
                break;
            case d ? 39 : 37:
                if (a = b.getPrevious())a.focus(), c.preventDefault(!0); else if (a = b.getParent().getPrevious())a = a.getLast(), a.focus(), c.preventDefault(!0)
        }
    }

    var r = CKEDITOR.dom.element, d = CKEDITOR.document, f = t.lang.colordialog, p, x = {
        type: "html",
        html: "&nbsp;"
    }, j, e, w, m = function (a) {
        return CKEDITOR.tools.getNextId() + "_" + a
    }, k = m("hicolor"), l = m("hicolortext"), o = m("selhicolor"), h;
    (function () {
        function a(a, d) {
            for (var s =
                a; s < a + 3; s++) {
                var e = new r(h.$.insertRow(-1));
                e.setAttribute("role", "row");
                for (var f = d; f < d + 3; f++)for (var g = 0; 6 > g; g++)c(e.$, "#" + b[f] + b[g] + b[s])
            }
        }

        function c(a, c) {
            var b = new r(a.insertCell(-1));
            b.setAttribute("class", "ColorCell");
            b.setAttribute("tabIndex", -1);
            b.setAttribute("role", "gridcell");
            b.on("keydown", z);
            b.on("click", u);
            b.on("focus", v);
            b.on("blur", q);
            b.setStyle("background-color", c);
            b.setStyle("border", "1px solid " + c);
            b.setStyle("width", "14px");
            b.setStyle("height", "14px");
            var d = m("color_table_cell");
            b.setAttribute("aria-labelledby", d);
            b.append(CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + c + "</span>", CKEDITOR.document))
        }

        h = CKEDITOR.dom.element.createFromHtml('<table tabIndex="-1" aria-label="' + f.options + '" role="grid" style="border-collapse:separate;" cellspacing="0"><caption class="cke_voice_label">' + f.options + '</caption><tbody role="presentation"></tbody></table>');
        h.on("mouseover", v);
        h.on("mouseout", q);
        var b = "00 33 66 99 cc ff".split(" ");
        a(0, 0);
        a(3, 0);
        a(0,
            3);
        a(3, 3);
        var d = new r(h.$.insertRow(-1));
        d.setAttribute("role", "row");
        c(d.$, "#000000");
        for (var e = 0; 16 > e; e++) {
            var i = e.toString(16);
            c(d.$, "#" + i + i + i + i + i + i)
        }
        c(d.$, "#ffffff")
    })();
    return {
        title: f.title, minWidth: 360, minHeight: 220, onLoad: function () {
            p = this
        }, onHide: function () {
            n();
            var a = e.getChild(0).getHtml();
            e.setStyle("border-color", a);
            e.setStyle("border-style", "solid");
            d.getById(k).removeStyle("background-color");
            d.getById(l).setHtml("&nbsp;");
            e = null
        }, contents: [{
            id: "picker", label: f.title, accessKey: "I", elements: [{
                type: "hbox",
                padding: 0,
                widths: ["70%", "10%", "30%"],
                children: [{
                    type: "html",
                    html: "<div></div>",
                    onLoad: function () {
                        CKEDITOR.document.getById(this.domId).append(h)
                    },
                    focus: function () {
                        (e || this.getElement().getElementsByTag("td").getItem(0)).focus()
                    }
                }, x, {
                    type: "vbox",
                    padding: 0,
                    widths: ["70%", "5%", "25%"],
                    children: [{
                        type: "html",
                        html: "<span>" + f.highlight + '</span><div id="' + k + '" style="border: 1px solid; height: 74px; width: 74px;"></div><div id="' + l + '">&nbsp;</div><span>' + f.selected + '</span><div id="' + o + '" style="border: 1px solid; height: 20px; width: 74px;"></div>'
                    },
                        {
                            type: "text",
                            label: f.selected,
                            labelStyle: "display:none",
                            id: "selectedColor",
                            style: "width: 76px;margin-top:4px",
                            onChange: function () {
                                try {
                                    d.getById(o).setStyle("background-color", this.getValue())
                                } catch (a) {
                                    n()
                                }
                            }
                        }, x, {
                            type: "button",
                            id: "clear",
                            label: f.clear,
                            onClick: n
                        }]
                }]
            }]
        }]
    }
});
