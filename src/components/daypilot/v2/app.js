﻿! function() {
    "use strict";
    var t = {
            572: function(t, e, n) {
                n.r(e), e.default = '      <div class=" menu">\r\n                              </div>\r\n\r\n        </div>\r\n                          <div class="placeholder">  </div>\r\n\r\n</div>\r\n'
            },
            722: function(t, e) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.i = void 0;
                var n = function() {
                    function t() {}
                    return t.o = navigator && navigator.userAgent && (-1 !== navigator.userAgent.indexOf("MSIE") || -1 !== navigator.userAgent.indexOf("Trident")), t
                }();
                e.i = n
            },
            143: function(t, e) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.l = void 0;
                var n = function() {
                    function t() {}
                    return t.get = function(t) {
                        return document.getElementById(t)
                    }, t.query = function(t) {
                        return Array.apply(null, document.querySelectorAll(t))
                    }, t.u = function(t, e) {
                        return t.getElementsByClassName(e)[0]
                    }, t.create = function(t) {
                        return document.createElement(t)
                    }, t.h = function() {
                        return document.createDocumentFragment()
                    }, t
                }();
                e.l = n
            },
            730: function(t, e) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.m = void 0;
                var n = function() {
                    function t() {}
                    return t.prototype.v = function() {
                        var t = this;
                        document.addEventListener("DOMContentLoaded", (function() {
                            Array.apply(null, document.querySelectorAll(".track-download")).forEach((function(e) {
                                e.addEventListener("click", (function(n) {
                                    t.track(e, "/action/trialdownload") || n.preventDefault()
                                }))
                            }))
                        }))
                    }, t.prototype.download = function(t) {
                        var e = document.createElement("a");
                        e.href = t, e.download = t.split("/").pop(), document.body.appendChild(e), e.click(), document.body.removeChild(e)
                    }, t.prototype.track = function(t, e) {
                        var n = this,
                            i = window.ga;
                        return void 0 !== i && i("send", "pageview", e), "_blank" === t.target || (setTimeout((function() {
                            n.download(t.href)
                        }), 150), !1)
                    }, t
                }();
                e.m = n
            },
            447: function(t, e, n) {
                var i = this && this.p || function(t, e, n, i) {
                        return new(n || (n = Promise))((function(r, a) {
                            function o(t) {
                                try {
                                    s(i.next(t))
                                } catch (t) {
                                    a(t)
                                }
                            }

                            function l(t) {
                                try {
                                    s(i.g(t))
                                } catch (t) {
                                    a(t)
                                }
                            }

                            function s(t) {
                                var e;
                                t.done ? r(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                                    t(e)
                                }))).then(o, l)
                            }
                            s((i = i.apply(t, e || [])).next())
                        }))
                    },
                    r = this && this.T || function(t, e) {
                        var n, i, r, a, o = {
                            label: 0,
                            M: function() {
                                if (1 & r[0]) throw r[1];
                                return r[1]
                            },
                            k: [],
                            S: []
                        };
                        return a = {
                            next: l(0),
                            g: l(1),
                            O: l(2)
                        }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                            return this
                        }), a;

                        function l(l) {
                            return function(s) {
                                return function(l) {
                                    if (n) throw new TypeError("Generator is already executing.");
                                    for (; a && (a = 0, l[0] && (o = 0)), o;) try {
                                        if (n = 1, i && (r = 2 & l[0] ? i.O : l[0] ? i.g || ((r = i.O) && r.call(i), 0) : i.next) && !(r = r.call(i, l[1])).done) return r;
                                        switch (i = 0, r && (l = [2 & l[0], r.value]), l[0]) {
                                            case 0:
                                            case 1:
                                                r = l;
                                                break;
                                            case 4:
                                                return o.label++, {
                                                    value: l[1],
                                                    done: !1
                                                };
                                            case 5:
                                                o.label++, i = l[1], l = [0];
                                                continue;
                                            case 7:
                                                l = o.S.pop(), o.k.pop();
                                                continue;
                                            default:
                                                if (!(r = o.k, (r = r.length > 0 && r[r.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                    o = 0;
                                                    continue
                                                }
                                                if (3 === l[0] && (!r || l[1] > r[0] && l[1] < r[3])) {
                                                    o.label = l[1];
                                                    break
                                                }
                                                if (6 === l[0] && o.label < r[1]) {
                                                    o.label = r[1], r = l;
                                                    break
                                                }
                                                if (r && o.label < r[2]) {
                                                    o.label = r[2], o.S.push(l);
                                                    break
                                                }
                                                r[2] && o.S.pop(), o.k.pop();
                                                continue
                                        }
                                        l = e.call(t, o)
                                    } catch (t) {
                                        l = [6, t], i = 0
                                    } finally {
                                        n = r = 0
                                    }
                                    if (5 & l[0]) throw l[1];
                                    return {
                                        value: l[0] ? l[1] : void 0,
                                        done: !0
                                    }
                                }([l, s])
                            }
                        }
                    };
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.j = e._ = void 0;
                var a = n(572),
                    o = n(4),
                    l = n(143),
                    s = n(11),
                    c = n(463),
                    u = n(730),
                    h = n(151),
                    m = n(722),
                    d = function() {
                        function t() {
                            this.D = 0 === window.location.protocol.indexOf("http"), this.content = l.l.get("content"), this.location = new s.A(window.location.protocol, window.location.host, this.content.dataset.path || window.location.pathname), this.C = {}, this.search = new c.P, this.R = new o.L, this.N = new u.m, this.version = ""
                        }
                        return t.prototype.V = function() {
                            this.W(), this.G()
                        }, t.prototype.W = function() {
                            var t = this;
                            this.version = this.content.dataset.version;
                            var e = "true" === this.content.dataset.I,
                                n = l.l.create("div");
                            n.innerHTML = a.default;
                            var i = null;
                            if (!this.location.J && !e) {
                                var r = l.l.u(n, "menu"),
                                    o = this.H();
                                r.appendChild(o);
                                var s = function() {
                                    o.scrollHeight <= o.offsetHeight ? (r.classList.add("no-gradient-bottom"), r.classList.add("no-gradient-top")) : (o.scrollTop + o.offsetHeight >= o.scrollHeight ? r.classList.add("no-gradient-bottom") : r.classList.remove("no-gradient-bottom"), 0 == o.scrollTop ? r.classList.add("no-gradient-top") : r.classList.remove("no-gradient-top"))
                                };
                                s(), o.addEventListener("scroll", s), window.addEventListener("resize", s), new MutationObserver(s).observe(o, {
                                    childList: !0,
                                    subtree: !0
                                }), o.addEventListener("mouseover", (function(e) {
                                    var n = e.target;
                                    if ("A" === n.tagName) {
                                        var i = n.getAttribute("href");
                                        i && t.B(i)
                                    }
                                })), o.addEventListener("touchstart", (function(e) {
                                    var n = e.target;
                                    if ("A" === n.tagName) {
                                        var i = n.getAttribute("href");
                                        i && t.B(i)
                                    }
                                })), i = o.querySelector(".active"), document.body.className = "dpw-sidebar-left"
                            } else document.body.className = "dpw-no-sidebar";
                            var d = l.l.u(n, "placeholder");
                            this.placeholder = d, d.appendChild(this.Y(document)), m.i.o ? d.appendChild(this.content) : d.appendChild(this.content.content), new h.K(this.placeholder).q(), document.body.insertBefore(n, document.body.firstChild), i && this.U(i), this.location.X && !this.location.sandbox && this.N.v()
                        }, t.prototype.Y = function(t) {
                            var e = t.title.split("|")[0].trim(),
                                n = t.createElement("h2");
                            return n.className = "title", n.innerHTML = e, n
                        }, t.prototype.U = function(t) {
                            var e = document.querySelector(".dp-menu");
                            if (e) {
                                var n = e.getBoundingClientRect(),
                                    i = t.getBoundingClientRect();
                                i.top < n.top ? e.scrollTop -= n.top - i.top + 45 : i.bottom > n.bottom && (e.scrollTop += i.bottom - n.bottom + 85)
                            }
                        }, t.prototype.H = function() {
                            var t = this,
                                e = l.l.create("div");
                            e.className = "dp-menu";
                            var n = l.l.create("ul"),
                                i = this.location.Z;
                            return this.R.getItems(i).forEach((function(e) {
                                var i = e.filename;
                                "index.html" !== i || t.location.filesystem || (i = "./");
                                var r = t.$(e.text, i, e.filename === t.location.filename, e.tt);
                                n.appendChild(r.div)
                            })), e.appendChild(n), e
                        }, t.prototype.$ = function(t, e, n, i) {
                            var r = this,
                                a = l.l.create("li");
                            if ("string" == typeof e) {
                                var o = document.createElement("a");
                                if (o.href = e, o.title = t, n && (o.className = "active"), this.D && o.addEventListener("click", (function(t) {
                                        window.innerWidth <= 1e3 || (t.preventDefault(), r.et(e))
                                    })), i) {
                                    var s = l.l.create("span");
                                    s.innerText = "NEW", s.className = "new", o.appendChild(s)
                                }
                                var c = l.l.create("span");
                                c.innerText = t, o.appendChild(c), a.appendChild(o)
                            } else {
                                var u = l.l.create("strong");
                                u.innerText = t, a.appendChild(u)
                            }
                            return {
                                div: a
                            }
                        }, t.prototype.F = function() {
                            var t = this,
                                e = l.l.h(),
                                n = this.location.J ? "" : "../",
                                i = this.location.filesystem ? "index.html" : "",
                                r = this.location.sandbox ? "Sandbox" : "Demo",
                                a = this.nt(r, n + i, this.location.J);
                            return e.appendChild(a.div), this.R.it().forEach((function(r) {
                                var a = "".concat(n).concat(r.Z, "/").concat(i),
                                    o = r.Z === t.location.Z,
                                    l = t.nt(r.text, a, o);
                                e.appendChild(l.div)
                            })), e
                        }, t.prototype.nt = function(t, e, n) {
                            var i = l.l.create("div");
                            i.className = "dpw-header-item";
                            var r = document.createElement("a");
                            return r.href = e, r.innerText = t, n && (r.className = "dpw-header-item-selected"), i.appendChild(r), {
                                div: i,
                                a: r
                            }
                        }, t.prototype.G = function() {
                            var t = this;
                            window.addEventListener("popstate", (function(e) {
                                var n = window.location.pathname,
                                    i = n.substring(n.lastIndexOf("/") + 1);
                                "" !== i && "index.html" !== i || (i = "./"), t.et(i, !0)
                            }))
                        }, t.prototype.B = function(t) {
                            return i(this, void 0, void 0, (function() {
                                var e, n, i;
                                return r(this, (function(r) {
                                    switch (r.label) {
                                        case 0:
                                            return this.C[t] ? [2, this.C[t]] : [4, fetch(t)];
                                        case 1:
                                            return (e = r.M()).ok ? [4, e.text()] : [2, null];
                                        case 2:
                                            return -1 === (n = r.M()).indexOf("<!DOCTYPE html>") ? [2, null] : (i = new v(n), this.rt(i.ot), this.C[t] = i, [2, i])
                                    }
                                }))
                            }))
                        }, t.prototype.et = function(t, e) {
                            return i(this, void 0, void 0, (function() {
                                var n, i, a, o, s, c, u, m, d, v, f;
                                return r(this, (function(r) {
                                    switch (r.label) {
                                        case 0:
                                            return n = window.location.href, (i = this.C[t]) ? [3, 2] : [4, this.B(t)];
                                        case 1:
                                            i = r.M(), r.label = 2;
                                        case 2:
                                            return i ? (a = i.ot, o = a.querySelector("#content").content, this.rt(a), o.querySelectorAll("script").forEach((function(t) {
                                                var e = t.parentNode,
                                                    n = document.createElement("script");
                                                n.innerHTML = "(function() {".concat(t.innerHTML, "})();"), e.replaceChild(n, t)
                                            })), this.placeholder.innerHTML = "", this.placeholder.appendChild(this.Y(a)), this.placeholder.appendChild(o), (s = a.querySelector("script[src*='jquery']")) && (c = s.getAttribute("src")) && (document.querySelector('script[src="'.concat(c, '"]')) || ((u = document.createElement("script")).setAttribute("src", c), document.head.appendChild(u))), new h.K(this.placeholder).q(), m = a.querySelector("title"), document.title = m.innerText, e || window.history.pushState({}, "", t), this.search.v(), d = l.l.u(document.body, "dp-menu"), (v = d.querySelector("a.active")) && v.classList.remove("active"), (f = d.querySelector('a[href="'.concat(t, '"]'))) && (f.classList.add("active"), this.U(f)), this.lt({
                                                referrer: n
                                            }), [2]) : [2]
                                    }
                                }))
                            }))
                        }, t.prototype.lt = function(t) {
                            var e = window.__sendPageView;
                            e && e(window.location.href, t)
                        }, t.prototype.rt = function(t) {
                            t.querySelectorAll("link[rel=stylesheet]").forEach((function(t) {
                                var e = t.getAttribute("href");
                                if (e && !document.querySelector('link[href="'.concat(e, '"]'))) {
                                    var n = document.createElement("link");
                                    n.setAttribute("rel", "stylesheet"), n.setAttribute("href", e), document.head.appendChild(n)
                                }
                            }))
                        }, t
                    }();
                e._ = d;
                var v = function() {
                    function t(t) {
                        this.st = t
                    }
                    return Object.defineProperty(t.prototype, "ot", {
                        get: function() {
                            return (new DOMParser).parseFromString(this.st, "text/html")
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t
                }();
                e.j = v
            },
            11: function(t, e) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.A = void 0;
                var n = function() {
                    function t(t, e, n) {
                        this.ct = ["demo", "demo2", "sandbox", "lite"], this.pathname = n, this.host = e, this.protocol = t, this.ut()
                    }
                    return Object.defineProperty(t.prototype, "J", {
                        get: function() {
                            return "ROOT" === this.Z
                        },
                        enumerable: !1,
                        configurable: !0
                    }), t.test = function() {}, t.prototype.ut = function() {
                        this.filename = this.ht(this.pathname), this.Z = this.dt(this.pathname), this.sandbox = this.vt(this.pathname), this.X = this.ft(this.host), this.filesystem = this.xt(this.protocol)
                    }, t.prototype.ht = function(t) {
                        var e = t.substring(t.lastIndexOf("/") + 1);
                        return "" === e && (e = "index.html"), e
                    }, t.prototype.xt = function(t) {
                        return "file:" === t
                    }, t.prototype.dt = function(t) {
                        var e = t.lastIndexOf("/"),
                            n = t.lastIndexOf("/", e - 1),
                            i = t.substring(n + 1, e);
                        return "/" === i && (i = "ROOT"), -1 !== this.ct.indexOf(i) && (i = "ROOT"), i
                    }, t.prototype.ft = function(t) {
                        return "javascript.daypilot.org" === t
                    }, t.prototype.vt = function(t) {
                        return 0 === t.indexOf("/sandbox")
                    }, t.prototype.print = function() {
                        window.console.log(this.pathname, this.Z, this.filename)
                    }, t
                }();
                e.A = n
            },
            463: function(t, e, n) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.P = void 0;
                var i = n(143),
                    r = function() {
                        function t() {
                            this.wt = null
                        }
                        return  t.prototype.yt = function() {
                            this.gt.value = "", this.bt("")
                        }, t.prototype.bt = function(t) {
                            var e = !t || "" === t.trim();
                            e ? this.Et() : this.Tt(), i.l.query(".menu li").forEach((function(n) {
                                var i = n.getElementsByTagName("a")[0],
                                    r = i && -1 !== i.innerText.toLowerCase().indexOf(t.toLowerCase()),
                                    a = e || r;
                                n.style.display = a ? "" : "none"
                            }))
                        }, t.prototype.Tt = function() {
                            if (null == this.wt) {
                                var t = this.Mt();
                                t && (this.wt = t.offsetHeight, t.style.height = this.wt + "px")
                            }
                        }, t.prototype.Et = function() {
                            var t = this.Mt();
                            this.wt = null, t && (t.style.height = "")
                        }, t.prototype.Mt = function() {
                            return i.l.query(".dp-menu")[0]
                        }, t
                    }();
                e.P = r
            },
            151: function(t, e, n) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.K = void 0;
                var i = n(143),
                    r = n(827),
                    a = n(722),
                    o = function() {
                        function t(t) {
                            this.placeholder = t
                        }
                        return t.prototype.q = function() {
                            // if (null !== this.kt()) {
                            //     var t = this.St();
                            //     this.placeholder.appendChild(t)
                            // }
                        }, t.prototype.St = function() {
                            // var t = this,
                            //     e = i.l.create("div");
                            // e.className = "space";
                            // var n = i.l.create("button");
                            // return n.className = "button-source", n.innerText = "Show source", n.onclick = function() {
                            //     t.Ot(), n.style.display = "none"
                            // }, e.appendChild(n), e
                        }, t.prototype.Ot = function() {
                            var t, e = this.kt(),
                                n = a.i.o ? e.innerText : e.innerHTML,
                                o = n;
                            if (n.startsWith("(function() {")) {
                                var l = n.indexOf("(function() {"),
                                    s = n.lastIndexOf("})();");
                                o = n.substring(l + 13, s)
                            }
                            a.i.o ? ((t = i.l.create("div")).innerHTML = "<pre>" + r._t.jt(o) + "</pre>", this.placeholder.appendChild(t)) : ((t = i.l.create("pre")).innerText = r._t.jt(o), this.placeholder.appendChild(t))
                        }, t.prototype.kt = function() {
                            return this.placeholder.querySelector("script:not([src])")
                        }, t
                    }();
                e.K = o
            },
            4: function(t, e) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e.L = void 0;
                var n = [{
                        text: "Calendar",
                        Z: "calendar",
                        children: [{
                            text: "Main"
                        }, {
                            text: "JavaScript Event Calendar",
                            filename: "index.html"
                        }, {
                            text: "View Types"
                        }, {
                            text: "Day View",
                            filename: "day.html"
                        }, {
                            text: "Days View",
                            filename: "days.html"
                        }, {
                            text: "Week View",
                            filename: "week.html"
                        }, {
                            text: "Resources View",
                            filename: "resources.html"
                        }, {
                            text: "Resource Calendar"
                        }, {
                            text: "Resource Images",
                            filename: "resourceimages.html",
                            tt: !0
                        }, {
                            text: "Resource Icons",
                            filename: "resourceicons.html",
                            tt: !0
                        }, {
                            text: "Navigation"
                        }, {
                            text: "Navigator",
                            filename: "navigator.html"
                        }, {
                            text: "Date Picker",
                            filename: "datepicker.html"
                        }, {
                            text: "Next/Previous",
                            filename: "nextprevious.html"
                        }, {
                            text: "Themes"
                        }, {
                            text: "Green Theme",
                            filename: "themegreen.html"
                        }, {
                            text: "Transparent Theme",
                            filename: "themetransparent.html"
                        }, {
                            text: "White Theme",
                            filename: "themewhite.html"
                        }, {
                            text: "Events"
                        }, {
                            text: "Event Active Areas",
                            filename: "eventareas.html",
                            tt: !0
                        }, {
                            text: "Event Context Menu",
                            filename: "eventmenu.html"
                        }, {
                            text: "Event Customization",
                            filename: "eventcustomization.html"
                        }, {
                            text: "Event Icons",
                            filename: "eventicons.html",
                            tt: !0
                        }, {
                            text: "Event Deleting",
                            filename: "eventdeleting.html"
                        }, {
                            text: "Event Types",
                            filename: "eventtypes.html",
                            tt: !0
                        }, {
                            text: "Localization"
                        }, {
                            text: "Localization",
                            filename: "localization.html"
                        }, {
                            text: "Frameworks"
                        }, {
                            text: "Angular",
                            filename: "angular.html"
                        }, {
                            text: "React",
                            filename: "react.html"
                        }, {
                            text: "Vue",
                            filename: "vue.html"
                        }]
                    }, {
                        text: "Month",
                        Z: "month",
                        children: [{
                            text: "Main"
                        }, {
                            text: "JavaScript Monthly Event Calendar",
                            filename: "index.html"
                        }, {
                            text: "Navigation"
                        }, {
                            text: "Navigator",
                            filename: "navigator.html"
                        }, {
                            text: "Date Picker",
                            filename: "datepicker.html"
                        }, {
                            text: "Next/Previous",
                            filename: "nextprevious.html"
                        }, {
                            text: "Themes"
                        }, {
                            text: "Green Theme",
                            filename: "themegreen.html"
                        }, {
                            text: "Transparent Theme",
                            filename: "themetransparent.html"
                        }, {
                            text: "White Theme",
                            filename: "themewhite.html"
                        }, {
                            text: "Events"
                        }, {
                            text: "Event Active Areas",
                            filename: "eventareas.html",
                            tt: !0
                        }, {
                            text: "Event Context Menu",
                            filename: "eventmenu.html",
                            tt: !0
                        }, {
                            text: "Event Customization",
                            filename: "eventcustomization.html"
                        }, {
                            text: "Event Deleting",
                            filename: "eventdeleting.html"
                        }, {
                            text: "Frameworks"
                        }, {
                            text: "Angular",
                            filename: "angular.html"
                        }, {
                            text: "React",
                            filename: "react.html"
                        }, {
                            text: "Vue",
                            filename: "vue.html"
                        }, {
                            text: "Localization"
                        }, {
                            text: "Localization",
                            filename: "localization.html"
                        }]
                    }, {
                        text: "Scheduler",
                        Z: "scheduler",
                        children: [{
                            text: "Main"
                        }, {
                            text: "JavaScript Scheduler",
                            filename: "index.html"
                        }, {
                            text: "Themes"
                        }, {
                            text: "Transparent Theme",
                            filename: "themetransparent.html"
                        }, {
                            text: "White Theme",
                            filename: "themewhite.html"
                        }, {
                            text: "Green Theme",
                            filename: "themegreen.html"
                        }, {
                            text: "Theme 8",
                            filename: "theme8.html"
                        }, {
                            text: "Traditional Theme",
                            filename: "themetraditional.html"
                        }, {
                            text: "Blue Theme",
                            filename: "themeblue.html"
                        }, {
                            text: "Navigation"
                        }, {
                            text: "Navigator",
                            filename: "navigator.html"
                        }, {
                            text: "Next/Previous Buttons",
                            filename: "nextprevious.html"
                        }, {
                            text: "Grid"
                        }, {
                            text: "Cell Width",
                            filename: "cellwidth.html"
                        }, {
                            text: "Scrolling",
                            filename: "scrolling.html"
                        }, {
                            text: "Snap to Grid",
                            filename: "snaptogrid.html"
                        }, {
                            text: "Time Range Selecting",
                            filename: "timerangeselecting.html"
                        }, {
                            text: "Timeline"
                        }, {
                            text: "Time Headers",
                            filename: "timeheaders.html"
                        }, {
                            text: "Scale: Hours",
                            filename: "scalehours.html"
                        }, {
                            text: "Scale: Days",
                            filename: "scaledays.html"
                        }, {
                            text: "Scale: Weeks",
                            filename: "scaleweeks.html"
                        }, {
                            text: "Scale: Months",
                            filename: "scalemonths.html"
                        }, {
                            text: "Scale: Years",
                            filename: "scaleyears.html"
                        }, {
                            text: "API"
                        }, {
                            text: "Angular",
                            filename: "angular2.html"
                        }, {
                            text: "Vue.js",
                            filename: "vuejs.html"
                        }, {
                            text: "React",
                            filename: "react.html"
                        }, {
                            text: "Events"
                        }, {
                            text: "Asynchronous Validation",
                            filename: "asyncvalidation.html"
                        }, {
                            text: "Event Active Areas",
                            filename: "eventareas.html"
                        }, {
                            text: "Event Context Menu",
                            filename: "eventmenu.html"
                        }, {
                            text: "Event Copying",
                            filename: "eventcopying.html"
                        }, {
                            text: "Event Customization",
                            filename: "eventcustomization.html"
                        }, {
                            text: "Event Deleting",
                            filename: "eventdeleting.html"
                        }, {
                            text: "Event Height",
                            filename: "eventheight.html"
                        }, {
                            text: "Event Icons",
                            filename: "eventicons.html"
                        }, {
                            text: "Event Loading",
                            filename: "eventloading.html"
                        }, {
                            text: "Event Moving",
                            filename: "eventmoving.html"
                        }, {
                            text: "Rows"
                        }, {
                            text: "Custom Event Height",
                            filename: "roweventheight.html"
                        }, {
                            text: "Progressive Rendering",
                            filename: "rowprogressive.html"
                        }, {
                            text: "Localization"
                        }, {
                            text: "Localization",
                            filename: "localization.html"
                        }]
                    }],
                    i = function() {
                        function t() {
                            this.Dt = {}, this.load()
                        }
                        return t.prototype.getItems = function(t) {
                            var e, n;
                            return null !== (n = null === (e = this.Dt[t]) || void 0 === e ? void 0 : e.children) && void 0 !== n ? n : []
                        }, t.prototype.it = function() {
                            return n
                        }, t.prototype.load = function() {
                            var t = this;
                            n.forEach((function(e) {
                                t.Dt[e.Z] = e
                            }))
                        }, t
                    }();
                e.L = i
            },
            827: function(t, e) {
                Object.defineProperty(e, "t", {
                    value: !0
                }), e._t = void 0;
                var n = function() {
                    function t() {}
                    return t.jt = function(t) {
                        var e = this,
                            n = t.split(/\r?\n/),
                            i = 100;
                        n.forEach((function(t) {
                            if (!(0 === t.trim().length)) {
                                var n = e.zt(t);
                                n < i && (i = n)
                            }
                        }));
                        var r = n.map((function(t) {
                                return 0 === t.trim().length ? "" : t.substring(i)
                            })),
                            a = !1;
                        return r.filter((function(t) {
                            var e = 0 === t.trim().length;
                            return !(!a && e) && (a = !0, !0)
                        })).join("\n")
                    }, t.zt = function(e) {
                        var n = 0;
                        return t.At(e).some((function(t) {
                            if (" " !== t) return !0;
                            n += 1
                        })), n
                    }, t.At = function(t) {
                        return t.split("")
                    }, t
                }();
                e._t = n
            }
        },
        e = {};

    function n(i) {
        var r = e[i];
        if (void 0 !== r) return r.exports;
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, n), a.exports
    }
    n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "t", {
            value: !0
        })
    };
    (new(n(447)._)).V()
}();