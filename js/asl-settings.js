(function(c) {
    c.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        showSettings: function() {
            let b;
            null == (b = this.initSettings) || b.call(this);
            this.n("searchsettings").css(this.settAnim.showCSS);
            this.n("searchsettings").removeClass(this.settAnim.hideClass).addClass(this.settAnim.showClass);
            this.n("prosettings").data("opened", 1);
            this.fixSettingsPosition(!0)
        },
        hideSettings: function() {
            let b = this, a;
            null == (a = b.initSettings) || a.call(b);
            b.n("searchsettings").removeClass(b.settAnim.showClass).addClass(b.settAnim.hideClass);
            setTimeout(function() {
                b.n("searchsettings").css(b.settAnim.hideCSS)
            }, b.settAnim.duration);
            b.n("prosettings").data("opened", 0)
        }
    })
}
)(WPD.dom);
(function(c) {
    c.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initFacetEvents: function() {
            let b = this;
            c("input[type=checkbox]", b.n("searchsettings")).on("asl_chbx_change", function(a) {
                b.ktype = a.type;
                b.n("searchsettings").find("input[name=filters_changed]").val(1);
                let e;
                null == (e = b.gaEvent) || e.call(b, "facet_change", {
                    option_label: c(this).closest("fieldset").find("legend").text(),
                    option_value: c(this).closest(".asl_option").find(".asl_option_label").text() + (c(this).prop("checked") ? "(checked)" : "(unchecked)")
                });
                b.setFilterStateInput(65);
                b.searchWithCheck(80)
            })
        }
    })
}
)(WPD.dom);
(function(c) {
    let b = window.WPD.ajaxsearchlite.helpers;
    c.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initSettingsSwitchEvents: function() {
            let a = this;
            a.n("prosettings").on("click", function() {
                0 == a.n("prosettings").data("opened") ? a.showSettings() : a.hideSettings()
            });
            1 == a.o.settingsVisible && a.showSettings(!1)
        },
        initSettingsEvents: function() {
            let a = this, e, g = function() {
                "undefined" === typeof a.originalFormData && (a.originalFormData = b.formData(c("form", a.n("searchsettings"))));
                a.n("searchsettings").off("mousedown touchstart mouseover", g)
            };
            a.n("searchsettings").on("mousedown touchstart mouseover", g);
            let f = function(d) {
                if (0 == c(d.target).closest(".asl_w").length && !a.dragging) {
                    let h;
                    null == (h = a.hideSettings) || h.call(a)
                }
            };
            a.documentEventHandlers.push({
                node: document,
                event: a.clickTouchend,
                handler: f
            });
            c(document).on(a.clickTouchend, f);
            a.n("searchsettings").on("click", function() {
                a.settingsChanged = !0
            });
            a.n("searchsettings").on(a.clickTouchend, function(d) {
                a.updateHref();
                "undefined" == typeof d.target || c(d.target).hasClass("noUi-handle") ? "click" == d.type && d.stopImmediatePropagation() : d.stopImmediatePropagation()
            });
            c('.asl_option_cat input[type="checkbox"]', a.n("searchsettings")).on("asl_chbx_change", function() {
                a.settingsCheckboxToggle(c(this).closest(".asl_option_cat"))
            });
            c(".asl_option_cat", a.n("searchsettings")).forEach(function(d) {
                a.settingsCheckboxToggle(c(d), !1)
            });
            c("div.asl_option", a.n("searchsettings")).on(a.mouseupTouchend, function(d) {
                d.preventDefault();
                d.stopImmediatePropagation();
                if (a.dragging)
                    return !1;
                c(this).find('input[type="checkbox"]').prop("checked", !c(this).find('input[type="checkbox"]').prop("checked"));
                clearTimeout(e);
                let h = this;
                e = setTimeout(function() {
                    c(h).find('input[type="checkbox"]').trigger("asl_chbx_change")
                }, 50)
            });
            c("div.asl_option label", a.n("searchsettings")).on("click", function(d) {
                d.preventDefault()
            });
            c("fieldset.asl_checkboxes_filter_box", a.n("searchsettings")).forEach(function() {
                let d = !0;
                c(this).find('.asl_option:not(.asl_option_selectall) input[type="checkbox"]').forEach(function() {
                    if (1 == c(this).prop("checked"))
                        return d = !1
                });
                d && c(this).find('.asl_option_selectall input[type="checkbox"]').prop("checked", !1).removeAttr("data-origvalue")
            });
            c("fieldset", a.n("searchsettings")).forEach(function() {
                c(this).find(".asl_option:not(.hiddend)").last().addClass("asl-o-last")
            });
            c('.asl_option_cat input[type="checkbox"], .asl_option_cff input[type="checkbox"]', a.n("searchsettings")).on("asl_chbx_change", function() {
                let d = c(this).data("targetclass");
                "string" == typeof d && "" != d && c("input." + d, a.n("searchsettings")).prop("checked", c(this).prop("checked"))
            })
        }
    })
}
)(WPD.dom);
(function(c) {
    c.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initSettings: function() {
            if (!this.settingsInitialized) {
                let b;
                null == (b = this.loadASLFonts) || b.call(this);
                let a;
                null == (a = this.initSettingsBox) || a.call(this);
                let e;
                null == (e = this.initSettingsEvents) || e.call(this);
                let g;
                null == (g = this.initFacetEvents) || g.call(this)
            }
        },
        initSettingsBox: function() {
            let b = this, a;
            null == (a = b.initSettingsAnimations) || a.call(b);
            (function(e) {
                let g = b.n("searchsettings").get(0);
                b.nodes.searchsettings = b.n("searchsettings").clone();
                e.append(b.n("searchsettings"));
                c(g).find("*[id]").forEach(function(f) {
                    0 > f.id.indexOf("__original__") && (f.id = "__original__" + f.id)
                });
                b.n("searchsettings").find("*[id]").forEach(function(f) {
                    -1 < f.id.indexOf("__original__") && (f.id = f.id.replace("__original__", ""))
                })
            }
            )(c("body"));
            b.n("searchsettings").get(0).id = b.n("searchsettings").get(0).id.replace("__original__", "");
            b.detectAndFixFixedPositioning();
            b.settingsInitialized = !0
        },
        initSettingsAnimations: function() {
            this.settAnim = {
                showClass: "",
                showCSS: {
                    visibility: "visible",
                    display: "block",
                    opacity: 1,
                    "animation-duration": this.animOptions.settings.dur + "ms"
                },
                hideClass: "",
                hideCSS: {
                    visibility: "hidden",
                    opacity: 0,
                    display: "none"
                },
                duration: this.animOptions.settings.dur + "ms"
            };
            "fade" == this.animOptions.settings.anim && (this.settAnim.showClass = "asl_an_fadeIn",
            this.settAnim.hideClass = "asl_an_fadeOut");
            "fadedrop" != this.animOptions.settings.anim || this.o.blocking ? "fadedrop" == this.animOptions.settings.anim && (this.settAnim.showClass = "asl_an_fadeIn",
            this.settAnim.hideClass = "asl_an_fadeOut") : (this.settAnim.showClass = "asl_an_fadeInDrop",
            this.settAnim.hideClass = "asl_an_fadeOutDrop");
            this.n("searchsettings").css({
                "-webkit-animation-duration": this.settAnim.duration + "ms",
                "animation-duration": this.settAnim.duration + "ms"
            })
        }
    })
}
)(WPD.dom);
