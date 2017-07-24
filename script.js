/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width +5)
  .attr('height', height)
  .style('padding-left', '30')
  .style('margin-left', marginLeft)
  .style('padding-bottom', '20')
  .style('padding-top', '20')

let afc = []

// let axis = d3.axisLeft(xScale)



// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", (data) => {
    // console.log(data);
    data.forEach(d => {
      afc.push(d.GoalsScored)
    })
    redraw(afc);
  })
}

// reload()

// redraw function
let redraw = (data) => {
  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height])

  let y_Scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0])

  let xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  let y_axis = d3.axisLeft(y_Scale).ticks(d3.max(data))
  let x_axis = d3.axisBottom(xScale).ticks(data.length)
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['magenta', 'turquoise'])


  console.log('data', data);
  // Your data to graph here
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'goals-chart')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('y', (d) => {
      return 300 - yScale(d)
    })
    .attr('width', 15)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', colorScale)
    .attr("y", function (d, i) {
 			return height;
 		})
 		.attr("height", 0)
 		.transition()
 		.duration(2000)
 		.delay(function (d, i) {
 			return i
 		})
 		.attr("y", function (d, i) {
 			return height - yScale(d);
 		})
 		.attr("height", function (d, i) {
 			return yScale(d);
      });

  svg.append('g')
    .attr("transform", "translate(0,300)")
    .call(x_axis)


  svg.append('g')
    .call(y_axis)


}

reload()
