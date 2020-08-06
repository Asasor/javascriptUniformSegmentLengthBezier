var canvas = document.getElementById('mainCanvas'),
    context = canvas.getContext('2d');


// taken from http://rosettacode.org/wiki/Evaluate_binomial_coefficients#JavaScript
function binom(n, k) {
    var coeff = 1;
    for (var i = n - k + 1; i <= n; i++) coeff *= i;
    for (var i = 1; i <= k; i++) coeff /= i;
    return coeff;
}


// modified from https://stackoverflow.com/questions/31167663/how-to-code-an-nth-order-bezier-curve
function bezier(t, plist) {
    var order = plist.length - 1;

    var y = 0;
    var x = 0;

    for (i = 0; i <= order; i++) {
        x = x + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i][0]));
        y = y + (binom(order, i) * Math.pow((1 - t), (order - i)) * Math.pow(t, i) * (plist[i][1]));
    }

    return [x,y];
}


function dist(x1, y1, x2, y2) {
    return Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2);
}


drawBezierSegments(40, 40, [[358,148],[120,144],[364,265]], [100,-10]);