
mappings = {
    '2': ['A', 'B', 'C'],
    '3': ['D', 'E', 'F'],
    '4': ['G', 'H', 'I'],
    '5': ['J', 'K', 'L'],
    '6': ['M', 'N', 'O'],
    '7': ['P', 'Q', 'R', 'S'],
    '8': ['T', 'U', 'V'],
    '9': ['W', 'X', 'Y', 'Z']
}

function buildCombi(s) {
    return s.split('').map(function (v) { return mappings[v] || ['']; }).reduce(function (a, b) {
        var combi = [];
        for (var i = 0; i < a.length; i++)
            for (var j = 0; j < b.length; j++)
                combi.push(a[i] + b[j]);
        return combi;
    });
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

var finalArray = [];
// test
function build(s, findx, idx) {
    var charactor = s.charAt(idx);
    var predictionArray = buildCombi(charactor);
    if (findx) {
        for (var j = 0; j < predictionArray.length; j++) {
                var value = s.replaceAt(idx, predictionArray[j]);
                finalArray.push(value);
        }
    } else {
        for (var j = 0; j < predictionArray.length; j++) {
            const length = finalArray.length;
            mergeValue  (length, predictionArray[j], idx);
        }
    }
}

function mergeValue(length, prediction, idx) {
    for (var i = 0; i < length; i++) {
        var value = finalArray[i].replaceAt(idx, prediction);
        finalArray.push(value);
    } 
}



function predict(strValue) {
    console.log('started')
    for (var i = 0; i < strValue.length; i++) {
        var cidx = (strValue.length - i) - 1;
        build(strValue, (i==0)? true: false, cidx);
    }
    const data = {length : finalArray.length, value: finalArray};
    finalArray = [];
    console.log('finished')
    return data
}

module.exports = { predict };
