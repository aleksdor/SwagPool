function unique(arr, tokey) {
	return [...arr.reduce((s, c) => s.add(tokey(c)), new Set())];
}

function sum(arr, field) {
	return arr.reduce((s, c) => s + c[field], 0);
}

function group(arr, tokey) {
    return hash = arr.reduce((s, c) => ({...s, [tokey(c)]: [...(s[tokey(c)] || []), c] }) , new Set())	
}


module.exports = {
    unique,
    sum,
    group
}