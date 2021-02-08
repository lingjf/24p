var P = { "+": 1, "-": 1, "*": 2, "/": 2 };

function calc(a, o, b) {
  ea = a["e"];
  eb = b["e"];
  va = eval(a["e"]);
  vb = eval(b["e"]);
  c = a["c"] + b["c"];
  if (a.hasOwnProperty("o") && P[a["o"]] < P[o]) ea = "(" + a["e"] + ")";
  if (b.hasOwnProperty("o") && P[o] > P[b["o"]]) eb = "(" + b["e"] + ")";
  if (b.hasOwnProperty("o") && P[o] == P[b["o"]]) {
    if ((o == "+" && b["o"] == "+") || (o == "*" && b["o"] == "*")) {
    } else eb = "(" + b["e"] + ")";
  }

  e = ea + o + eb;
  if (o == "+") {
    c += 1;
    if (va + vb == 24) {
    } else {
      //和越大越复杂
      t = va + vb;
      if (t <= 10) {
      } else c += t * 1.2;
    }
  } else if (o == "-") {
    c += 1;
    t = va - vb;
    if (t < 0) {
      //减出负数
      c += 100;
    }
  } else if (o == "*") {
    c += 1;
    if (va == 1 && vb == 1) {
      //与1相乘不增加复杂度
    } else if (va * vb == 24) {
    } else {
      //积越大越复杂
      t = va * vb;
      if (t <= 10) {
      } else c += t;
    }
  } else if (o == "/") {
    c += 2;
    if (va == vb) {
      //相同数相除不增加复杂度
    } else {
      c += 3;
      t = va / vb;
      t = t - Math.floor(t);
      if (t > 0) {
        //商为小数
        c += 800;
        t = t * 100000;
        if (t - Math.floor(t) > 0)
          //无理数
          c += 800;
      }
    }
  }
  return { r: eval(e), e: e, o: o, c: Math.round(c) };
}

function node1_get(a) {
  return [{ r: a, e: a + "", c: 0 }];
}

function node2_get(a, b) {
  A = Array.isArray(a) ? a : node1_get(a);
  B = Array.isArray(b) ? b : node1_get(b);
  z = [];
  for (var i in A) {
    a = A[i];
    for (var j in B) {
      b = B[j];
      if (a["c"] < b["c"]) {
        z.push(calc(b, "+", a));
        z.push(calc(b, "*", a));
      } else {
        z.push(calc(a, "+", b));
        z.push(calc(a, "*", b));
      }

      z.push(calc(a, "-", b));
      z.push(calc(b, "-", a));
      if (b["r"] != 0) z.push(calc(a, "/", b));
      if (a["r"] != 0) z.push(calc(b, "/", a));
    }
  }
  return z;
}

function node3_get(a, b, c) {
  return [].concat(
    node2_get(a, node2_get(b, c)),
    node2_get(b, node2_get(a, c)),
    node2_get(c, node2_get(a, b))
  );
}

function node4_get(a, b, c, d) {
  return [].concat(
    node2_get(node2_get(a, b), node2_get(c, d)),
    node2_get(node2_get(a, c), node2_get(b, d)),
    node2_get(node2_get(a, d), node2_get(b, c)),
    node2_get(a, node3_get(b, c, d)),
    node2_get(b, node3_get(a, c, d)),
    node2_get(c, node3_get(a, b, d)),
    node2_get(d, node3_get(a, b, c))
  );
}

module.exports.fx = function (target, values) {
  n = values.length;
  var z = [];
  if (n == 4) z = node4_get(values[0], values[1], values[2], values[3]);
  else if (n == 3) z = node3_get(values[0], values[1], values[2]);

  return z.filter(function (x) {
    return x["r"] == target;
  });
};

module.exports.fy = function (z, complex_fold = true) {
  z.sort(function (a, b) {
    return a["c"] - b["c"];
  });
  e = new Set();
  c = new Set();
  d = []
  for (j in z) {
    a = z[j];
    if (!e.has(a["e"])) {
      if (complex_fold && c.has(a["c"])) continue;
      e.add(a["e"]);
      c.add(a["c"]);
      d.push({'e': Math.round(a["r"]) + "=" + a["e"], 'c': a["c"]})
    }
  }
  return d;
};

module.exports.gen = function () {
  s = [
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    8,
    8,
    8,
    8,
    9,
    9,
    9,
    9,
    10,
    10,
    10,
    10,
  ];
  v = [0, 0, 0, 0];
  for (i = 0; i < 4; i++) {
    d = parseInt(Math.random() * (40 - i));
    v[i] = s[d];
    s[d] = s[40 - 1 - i];
  }
  return v;
};
