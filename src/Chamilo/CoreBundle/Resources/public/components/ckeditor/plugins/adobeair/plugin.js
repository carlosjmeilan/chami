﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
    function f(a) {
        for (var a = a.getElementsByTag("*"), c = a.count(), b, d = 0; d < c; d++)b = a.getItem(d), function (a) {
            for (var b = 0; b < j.length; b++)(function (b) {
                var d = a.getAttribute("on" + b);
                a.hasAttribute("on" + b) && (a.removeAttribute("on" + b), a.on(b, function (b) {
                    var c = /(return\s*)?CKEDITOR\.tools\.callFunction\(([^)]+)\)/.exec(d), i = c && c[1], e = c && c[2].split(","), c = /return false;/.test(d);
                    if (e) {
                        for (var k = e.length, h, g = 0; g < k; g++) {
                            e[g] = h = CKEDITOR.tools.trim(e[g]);
                            var f = h.match(/^(["'])([^"']*?)\1$/);
                            if (f)e[g] = f[2];
                            else if (h.match(/\d+/))e[g] = parseInt(h, 10); else switch (h) {
                                case "this":
                                    e[g] = a.$;
                                    break;
                                case "event":
                                    e[g] = b.data.$;
                                    break;
                                case "null":
                                    e[g] = null
                            }
                        }
                        e = CKEDITOR.tools.callFunction.apply(window, e);
                        i && !1 === e && (c = 1)
                    }
                    c && b.data.preventDefault()
                }))
            })(j[b])
        }(b)
    }

    var j = "click keydown mousedown keypress mouseover mouseout".split(" ");
    CKEDITOR.plugins.add("adobeair", {
        onLoad: function () {
            CKEDITOR.env.air && (CKEDITOR.dom.document.prototype.write = CKEDITOR.tools.override(CKEDITOR.dom.document.prototype.write, function (a) {
                function c(b,
                           a, c, i) {
                    a = b.append(a);
                    (c = CKEDITOR.htmlParser.fragment.fromHtml(c).children[0].attributes) && a.setAttributes(c);
                    i && a.append(b.getDocument().createText(i))
                }

                return function (b) {
                    if (this.getBody()) {
                        var d = this, f = this.getHead(), b = b.replace(/(<style[^>]*>)([\s\S]*?)<\/style>/gi, function (a, b, d) {
                            c(f, "style", b, d);
                            return ""
                        }), b = b.replace(/<base\b[^>]*\/>/i, function (b) {
                            c(f, "base", b);
                            return ""
                        }), b = b.replace(/<title>([\s\S]*)<\/title>/i, function (b, a) {
                            d.$.title = a;
                            return ""
                        }), b = b.replace(/<head>([\s\S]*)<\/head>/i, function (b) {
                            var a =
                                new CKEDITOR.dom.element("div", d);
                            a.setHtml(b);
                            a.moveChildren(f);
                            return ""
                        });
                        b.replace(/(<body[^>]*>)([\s\S]*)(?=$|<\/body>)/i, function (b, a, c) {
                            d.getBody().setHtml(c);
                            (b = CKEDITOR.htmlParser.fragment.fromHtml(a).children[0].attributes) && d.getBody().setAttributes(b)
                        })
                    } else a.apply(this, arguments)
                }
            }), CKEDITOR.addCss("body.cke_editable { padding: 8px }"), CKEDITOR.ui.on("ready", function (a) {
                a = a.data;
                if (a._.panel) {
                    var c = a._.panel._.panel, b;
                    (function () {
                        c.isLoaded ? (b = c._.holder, f(b)) : setTimeout(arguments.callee,
                            30)
                    })()
                } else a instanceof CKEDITOR.dialog && f(a._.element)
            }))
        }, init: function (a) {
            CKEDITOR.env.air && (a.on("uiReady", function () {
                f(a.container);
                a.on("elementsPathUpdate", function (a) {
                    f(a.data.space)
                })
            }), a.on("contentDom", function () {
                a.document.on("click", function (a) {
                    a.data.preventDefault(!0)
                })
            }))
        }
    })
})();
