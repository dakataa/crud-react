const a = "5.9.2", i = 25, s = 0, o = 51, m = 800, c = 800, n = "Azul", d = 0, t = [], e = [{ ddd: 0, ind: 1, ty: 4, nm: "Capa de formas 14", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [401.405, 551.405, 0], ix: 2, l: 2 }, a: { a: 0, k: [-10.595, 165.405, 0], ix: 1, l: 2 }, s: { a: 0, k: [216.866, 216.866, 100], ix: 6, l: 2, x: `var $bm_rt;
var result;
result = getAnimationComposerPresetValue();
function getAnimationComposerPresetValue() {
    var bL = thisLayer;
    var tTrI = null;
    var tTrO = null;
    if (bL.marker.numKeys > 0) {
        var acmp = 'zzzzzzzzzzzzzzz_AC';
        for (var i = 1; i <= bL.marker.numKeys; i++) {
            var m = bL.marker.key(i);
            var p = m.parameters;
            if (p.hasOwnProperty(acmp + 'MarkerEnabled') && p.hasOwnProperty(acmp + 'MarkerType') && p.hasOwnProperty(acmp + 'MarkerAppPresetType')) {
                if (p[acmp + 'MarkerEnabled'] != '1') {
                    continue;
                }
                switch (p[acmp + 'MarkerAppPresetType']) {
                case '1': {
                        tTrI = m.time;
                        break;
                    }
                }
            }
        }
    }
    function acPD(fxN) {
        try {
            if (bL.effect(fxN).active === false) {
                ac.en = false;
            }
        } catch (e) {
        }
    }
    function acSliderValP(fxN, stN, dV) {
        try {
            return bL.effect(fxN)(stN);
        } catch (e) {
            return dV;
        }
    }
    function acValMul(val) {
        acAccM *= val;
    }
    function mhOvershoot(t, a, f, d) {
        if (d <= 0) {
            d = 0;
        }
        var y = $bm_div($bm_mul(a, Math.cos($bm_mul($bm_mul($bm_mul(t, f), Math.PI), 2))), Math.exp($bm_mul(t, d)));
        if (t < 0.8) {
            return y;
        }
        return $bm_mul(y, $bm_sub(1, $bm_div($bm_sub(t, 0.8), 0.2)));
    }
    function upACo(tIn, dIn, tOut, dOut, eFi, eFo) {
        if (dIn < 0) {
            dIn = 0;
        }
        if (dOut < 0) {
            dOut = 0;
        }
        ac.fade = 1;
        if (t < tOut) {
            if (t < $bm_sum(tIn, dIn)) {
                if (dIn == 0) {
                    ac.fade = 0;
                } else {
                    ac.fade = $bm_div($bm_sub(t, tIn), dIn);
                    if (ac.fade < 0) {
                        ac.fade = 0;
                    }
                    if (ac.fade > 1) {
                        ac.fade = 1;
                    }
                    if (eFi) {
                        ac.fade = eFi(ac.fade);
                    }
                }
            }
        } else {
            if (dOut == 0) {
                ac.fade = 0;
            } else {
                ac.fade = $bm_div($bm_sub(t, tOut), dOut);
                if (ac.fade < 0) {
                    ac.fade = 0;
                }
                if (ac.fade > 1) {
                    ac.fade = 1;
                }
                if (eFo) {
                    ac.fade = eFo(ac.fade);
                }
                ac.fade = $bm_sub(1, ac.fade);
            }
        }
        ac.intensity = 1;
        ac.en = true;
        ac.t = $bm_sub(t, tIn);
    }
    var ac = {};
    ac.en = false;
    var v = thisProperty.value;
    var t = time;
    var acAccM = 1;
    ac.en = false;
    if (tTrI !== null && t < tTrI) {
        upACo(bL.inPoint, $bm_sub(tTrI, bL.inPoint), bL.outPoint, 0);
        ac.fade = $bm_sub(1, ac.fade);
    }
    acPD('AC IN [YRH] Controls');
    if (ac.en) {
        acValMul($bm_sub(1, $bm_mul(mhOvershoot($bm_sub(1, ac.fade), 1, acSliderValP('AC IN [YRH] Controls', 'Number of bounces', 2), 7), $bm_sum($bm_div(acSliderValP('AC IN [YRH] Controls', 'Scale', 0), -100), 1))));
    }
    v = thisProperty.value;
    v *= acAccM;
    return v;
}
$bm_rt = result;` } }, ao: 0, ef: [{ ty: 5, nm: "AC IN [YRH] Controls", np: 4, mn: "Pseudo/MHAC PrCtrl YRH 4", ix: 1, en: 1, ef: [{ ty: 0, nm: "Number of bounces", mn: "Pseudo/MHAC PrCtrl YRH 4-0001", ix: 1, v: { a: 0, k: 2, ix: 1 } }, { ty: 0, nm: "Scale", mn: "Pseudo/MHAC PrCtrl YRH 4-0002", ix: 2, v: { a: 0, k: 0, ix: 2 } }] }], shapes: [{ ty: "gr", it: [{ d: 1, ty: "el", s: { a: 0, k: [30.81, 30.81], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, nm: "Trazado elÃÂ­ptico 1", mn: "ADBE Vector Shape - Ellipse", hd: !1 }, { ty: "fl", c: { a: 0, k: [0.180392156863, 0.545098039216, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "Relleno 1", mn: "ADBE Vector Graphic - Fill", hd: !1 }, { ty: "tr", p: { a: 0, k: [-10.595, 165.405], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transformar" }], nm: "Elipse 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }], ip: 16, op: 51, st: -757, bm: 0 }, { ddd: 0, ind: 2, ty: 4, nm: "Capa de formas 13", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [396.219, 320, 0], ix: 2, l: 2 }, a: { a: 0, k: [-12, -56, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 81.25, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], v: [[-12, -216], [-12, 104]], c: !1 }, ix: 2 }, nm: "Trazado 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 0, k: [0.180392156863, 0.545098039216, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 74, ix: 5 }, lc: 2, lj: 1, ml: 4, bm: 0, nm: "Trazo 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [68.49, 76.853], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transformar" }], nm: "Forma 1", np: 3, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "tm", s: { a: 0, k: 0, ix: 1 }, e: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 10, s: [0] }, { t: 16, s: [100] }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, m: 1, ix: 2, nm: "Recortar trazados 1", mn: "ADBE Vector Filter - Trim", hd: !1 }], ip: 0, op: 51, st: -777, bm: 0 }, { ddd: 0, ind: 3, ty: 4, nm: "Capa 1 contornos 16", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [-90] }, { t: 50, s: [270] }], ix: 10 }, p: { a: 0, k: [400, 400, 0], ix: 2, l: 2 }, a: { a: 0, k: [586.5, 586.5, 0], ix: 1, l: 2 }, s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 } }, ao: 0, shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, -185.844], [185.844, 0], [0, 185.844], [-185.844, 0]], o: [[0, 185.844], [-185.844, 0], [0, -185.844], [185.844, 0]], v: [[336.5, 0], [0, 336.5], [-336.5, 0], [0, -336.5]], c: !0 }, ix: 2 }, nm: "Trazado 1", mn: "ADBE Vector Shape - Group", hd: !1 }, { ty: "st", c: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0.176470592618, 0.168627455831, 0.20000000298, 1] }, { t: 12, s: [0.180392161012, 0.54509806633, 1, 1] }], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 50, ix: 5 }, lc: 2, lj: 1, ml: 10, bm: 0, nm: "Trazo 1", mn: "ADBE Vector Graphic - Stroke", hd: !1 }, { ty: "tr", p: { a: 0, k: [586.5, 586.5], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transformar" }], nm: "Grupo 1", np: 2, cix: 2, bm: 0, ix: 1, mn: "ADBE Vector Group", hd: !1 }, { ty: "tm", s: { a: 0, k: 0, ix: 1 }, e: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 17, s: [100] }], ix: 2 }, o: { a: 0, k: 0, ix: 3 }, m: 1, ix: 2, nm: "Recortar trazados 1", mn: "ADBE Vector Filter - Trim", hd: !1 }], ip: 0, op: 51, st: 0, bm: 0 }], r = [{ tm: -356, cm: "1", dr: 0 }, { tm: -307, cm: "2", dr: 0 }], l = {
  v: a,
  fr: 25,
  ip: 0,
  op: 51,
  w: 800,
  h: 800,
  nm: n,
  ddd: 0,
  assets: t,
  layers: e,
  markers: r
};
export {
  t as assets,
  d as ddd,
  l as default,
  i as fr,
  c as h,
  s as ip,
  e as layers,
  r as markers,
  n as nm,
  o as op,
  a as v,
  m as w
};
