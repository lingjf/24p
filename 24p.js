const readline = require("readline");
var P24 = require("./p24/p24.js");

args = process.argv.slice(2);
n = args.length;

if (n == 4) {
  v = args.map(function (a) {
    return parseInt(a);
  });
  r = P24.fy(P24.fx(24, v));
  for (var i in r) {
    console.log(r[i]["e"], r[i]["c"]);
  }
  process.exit(0);
}

var status = "new question";
var start = new Date().getTime();
var result = []

function new_question() {
  var d = [];
  while (d.length == 0) {
    v = P24.gen();
    d = P24.fx(24, v);
  }
  process.stdout.write("\u001B[2J\u001B[0;0f");
  console.log(v);
  status = "new question";
  start = new Date().getTime();
  return d;
}

function show_answer(d, n, f, delta) {
  r = P24.fy(d, n, f);
  if (n == 1) {
    console.log(r[0]["e"]);
    console.log("")
    console.log("complexity", r[0]["c"]);
    console.log("total", r.length, "solutions");
    console.log("cost", delta / 1000, "seconds");
  } else {
    for (var i in r) {
      if (i < n) console.log(r[i]["e"], r[i]["c"]);
    }
  }
  status = "show answer";
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

result = new_question();

rl.on("line", function (line) {
  if (line == "q") process.exit(0);

  if (status == "new question") {
    delta = new Date().getTime() - start;
    if (line == "") {
      show_answer(result, 1, true, delta);
    } else {
      if (line == "a") show_answer(result, 99999, false, delta);
      else if (line == "b") show_answer(result, 99999, true, delta);
      else if (line == "n") show_answer(result, 99999, true, delta);
      console.log("cost ", delta / 1000, " seconds");
    }
  } else if (status == "show answer") {
    if (line == "a") show_answer(result, 99999, false, 0);
    else if (line == "b") show_answer(result, 99999, true, 0);
    else result = new_question();
  }
});
