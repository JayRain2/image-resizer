let values = ['hi', 'hi', 'im', 'im', 'jason', 'jason', 'jason'];

values = values.filter((v, i) => i == values.indexOf(v))

console.log(values);
