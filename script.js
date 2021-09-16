let data = [
  {
    name: 'Perry',
    age: '36',
  },
  {
    name: 'Perry',
    age: '36',
  },
  {
    name: 'Perry',
    age: '36',
  },
  {
    name: 'Perry',
    age: '36',
  },
  {
    name: 'Perry',
    age: '36',
  },
  {
    name: 'Perry',
    age: '36',
  },
];

const info = document.querySelector('#info');

let details = data.map(function(item) {
  return '<div>' + item.name + ' ' + 'is ' + item.age + ' years old' + '</div>';
});

info.innerHTML = details.join('\n')