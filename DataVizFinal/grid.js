const width = 10; //should be 100
const height = 3; //should be 35
const total = width*height;
const maleRatio = .5;
const SVGwidth = 900;
const SVGheight = 420;
const margin = 50;
const unit = 57; //should be 7
const sexes = ["Male", "Female"]
let index = 0;

gridSVG = d3.select('#gridSVG').append('svg:svg')
      .attr('width', SVGwidth)
      .attr('height', SVGheight);

index = 0;
for(x = 0; x < width; x++) {
  for(y = 0; y < height; y++) {
    gridSVG.append('svg:rect')
      .attr('index', index++)
      .attr('type', 'unit')
      .attr('x', (unit+1)*x + margin)
      .attr('y', (unit+1)*y + margin)
      .attr('width', unit)
      .attr('height', unit)
      .attr('fill', 'black');
  }
}

const units = gridSVG.selectAll('[type=unit]');

gridSVG.append('svg:rect')
  .attr('type', 'sexFilterRect')
  .attr('x', 500)
  .attr('y', 0)
  .attr('width', 100)
  .attr('height', 30)
  .attr('opacity', .3)
  .attr('fill', 'black');
gridSVG.append('svg:text')
  .attr('type', 'sexFilterText')
  .text('All sexes')
  .attr('x', 505)
  .attr('z-index', )
  .attr('y', 20);
index = 0;
sexes.forEach(sex => {
  index += 1
  gridSVG.append('svg:rect')
    .text(sex)
    .attr('type', 'sexOptionRect')
    .attr('opacity', 0)
    .attr('x', 500)
    .attr('y', 30*index)
    .attr('width', 100)
    .attr('height', 30)
    .attr('opacity', 0)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('border-width', 1);
  gridSVG.append('svg:text')
    .text(sex)
    .attr('type', 'sexOptionText')
    .attr('opacity', 0)
    .attr('x', 505)
    .attr('y', 30*(index)+20);
})

const sexFilterRect = gridSVG.select('[type=sexFilterRect]');
const sexOptionsText = gridSVG.selectAll('[type=sexOptionText]');
const sexOptionsRect = gridSVG.selectAll('[type=sexOptionRect]');

function toggleSexOptions() {
  sexOptionsText
    .transition()
      .duration(250)
      .attr('opacity', 1);
  sexOptionsRect
    .transition()
      .duration(250)
      .attr('opacity', 1);
}

sexFilterRect.on('click', toggleSexOptions);
sexFilterText.on('click', toggleSexOptions);


gridSVG.append('rect')
  .attr('type', 'filter')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 100)
  .attr('height', 20)
  .attr('fill', 'black');

const filter = gridSVG.select('[type=filter]');

filter
  .on('click', function() {
    units[0].forEach((unit) => {
      curUnit = d3.select(unit);
      index = curUnit.attr('index');
      curUnit
        .attr('fill', () => index > 10 ? 'red' : 'green');
    });
  });

