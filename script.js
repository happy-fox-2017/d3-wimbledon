/* global d3 */

// Our canvas
const width = 800,
      height = 300,
      margin = 20,
      marginLeft = 40;

const transition = d3.transition();
var widthbar = 0;

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#bbffff')

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv('afcw-results.tsv', (rows) => {
    data = rows.map(row => {
      return row.GoalsScored;
    })
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  let min = d3.min(data);
  let max = d3.max(data);
  widthbar = width / data.length;

  const yScale = d3.scaleLinear()
    .domain([min, max])
    .range([height-margin, min])

  const colorScale = d3.scaleLinear()
        .domain([min, max])
        .range(['#00ffff', '#008500'])

  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', colorScale)
      .attr('x', (d, i) => {
        return i * widthbar + marginLeft
      })
      .attr('y', (d) => {
        return height - yScale(d) - margin
      })
      .attr('width', widthbar - 3)
      .attr('height', (d) => {
        return yScale(d)
      })

      var yAxis = d3.axisLeft()
                  .scale(yScale);

      var xScale = d3.scaleLinear()
                  .domain([0, data.length])
                  .range([0, width]);

      var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(data.length);
      
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate( ${marginLeft - 5}, ${height - margin} )`)
        .call(xAxis);

      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate( ${marginLeft - 5} )`)
        .call(yAxis);

      svg.selectAll('rect')
      .transition()
      .style('fill', '#ff3333')
      .duration(1000);
}

reload()
