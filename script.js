/* global d3 */

// Our canvas
const width = 950,
  height = 300,
  margin = 20
  marginLeft = 40

var colorScale = d3.scaleLinear()
     yScale = d3.scaleLinear()

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .style('background', '#cacaca')
  .attr('width', width + marginLeft)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function (d) {
    let goals = d.map(data => {
      return data.GoalsScored
    })
    redraw(goals)
  })
}

// redraw function
let redraw = (data) => {
  colorScale.domain([0, d3.max(data)])
          .range(['red', 'blue'])
  yScale.domain([0, d3.max(data)])
          .range([0, height - margin])

  let yAxis = d3.scaleLinear()
          .domain([0, d3.max(data)])
          .range([height - margin, 0])
  let xAxis = d3.scaleLinear()
          .domain([0, data.length])
          .range([0, width])

  let barWidth = width/data.length

  // Your data to graph here
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', colorScale)
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * barWidth + marginLeft - 10
    })
    .attr('y', (d) => {
      return height - yScale(d) - margin
    })
    .attr('width', barWidth - 2)
    .attr('height', (d) => {
      return yScale(d)
    })

    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', '#bada55')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d))
    })

          .attr("y", function (d, i) {
               return height;
          })
          .attr("height", 0)
          .transition()
          .duration(1500)
          .delay(function(d, i) {
               return i
          })
          .attr("y", function (d,i) {
               return height - yScale(d) - margin
          })
          .attr("height", function (d, i) {
               return yScale(d)
          })


  svg.append('g')
    .attr('class', 'axisSteelBlue')
    .attr('transform', `translate(${marginLeft - 10})`)
    .call(d3.axisLeft(yAxis).ticks(d3.max(data)))
  svg.append('g')
    .attr('class', 'axisSteelBlue')
    .attr('transform', `translate(${marginLeft - 10}, ${height - margin})`)
    .call(d3.axisBottom(xAxis).ticks(data.length))

}

reload()
