const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data2 = [
    ['fr-cor', 0],
    ['fr-bre', 1],
    ['fr-pdl', 2],
    ['fr-pac', 3],
    ['fr-occ', 4],
    ['fr-naq', 5],
    ['fr-bfc', 6],
    ['fr-cvl', 7],
    ['fr-idf', 8],
    ['fr-hdf', 9],
    ['fr-ara', 10],
    ['fr-ges', 11],
    ['fr-nor', 12],
    ['fr-lre', 13],
    ['fr-may', 14],
    ['fr-gf', 15],
    ['fr-mq', 16],
    ['fr-gua', 17]
];

// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'countries/fr/fr-all'
    },

    title: {
        text: 'Highmaps basic demo'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/fr/fr-all.js">France</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }, {
        name: 'Separators',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['countries/fr/fr-all'], 'mapline'),
        color: 'silver',
        nullColor: 'silver',
        showInLegend: false,
        enableMouseTracking: false
    }]
});




request.send();
