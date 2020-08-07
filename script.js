var canvas = document.getElementById('mainCanvas'),
    context = canvas.getContext('2d');


// taken from http://rosettacode.org/wiki/Evaluate_binomial_coefficients#JavaScript
function binom(n, k) {
    var coeff = 1;
    for (var i = n - k + 1; i <= n; i++) coeff *= i;
    for (var i = 1; i <= k; i++) coeff /= i;
    return coeff;
}

async function basicBezierPresentation(acc, pList, rad, context) {
    let sepDist = 400;
    let pDist = 0;
    let diff = 0;
    let lx = parseInt(bezier(0, pList)[0]);
    let ly = parseInt(bezier(0, pList)[1]);

    context.fillStyle = 'red';
    for (let i = 1 / acc; i <= 1 + 1 / acc; i += 1 / acc) {  // acc --> accuracy
        let x = parseInt(bezier(i, pList)[0]);
        let y = parseInt(bezier(i, pList)[1]);
        pDist = dist(lx, ly, x, y)
        diff = Math.abs(sepDist - pDist);
        //alert([diff, pDist, sepDist]);
        if (diff % sepDist < 50) {
            context.beginPath();
            context.arc(x, y, rad, 0, 2 * Math.PI, false);
            context.fill();
            context.stroke();
            context.moveTo(x,y);
            context.lineTo(lx, ly);
            context.stroke();

            pDist = 0;

            lx = x;
            ly = y;
        }

        await sleep(10);
    }

    context.fillStyle = 'green';
    for (let i = 0; i < pList.length; i++) {
        context.beginPath();
        context.arc(pList[i][0], pList[i][1], rad, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
    }
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

// taken from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const plistReal = [[300, 260], [28, 286], [600, 53], [500, 300], [26, 152]];

basicBezierPresentation(1000, plistReal, 5, context);