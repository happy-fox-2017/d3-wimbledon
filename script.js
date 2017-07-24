/* global d3 */

// Our canvas
const width = 1050,
  height = 300,
  margin = 400,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background','#cacaca')
  .style('padding','40px')

// Data reloading
let reload = () => {
  // Your data parsing here...
  // d3.tsv('afcw-results.tsv', (data) => {
  //   redraw(data)
  // })
  let data = []
  d3.tsv("afcw-results.tsv", function (db) {
    let data_bucket = db.map(data => {
      return data.GoalsScored
    })
    redraw(data_bucket)
  })
}

// redraw function
let redraw = (data) => {
  console.log(data)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height])

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  const yScaleforaxes = d3.scaleLinear()
  .domain([0,d3.max(data)])
  .range([height, 0])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['brown', 'green'])

  const mouseover = (d, i) => {
    debugger
  }

  var axis = d3.axisBottom(yScale);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 22
    })
    .attr('y', (d) => {
      return 300 - yScale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yScale(d)
    })

    .attr('fill', colorScale)
    .on('mouseover', function (d, i) {
      d3.select(this).style('fill', 'blue')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', colorScale(d))
    })

		.attr("y", function (d, i) {
			return height;
		})
		.attr("height", 0)
		.transition()
		.duration(500)
		.delay(function (d, i) {
			return i * 50;
		})
		.attr("y", function (d, i) {
			return height - yScale(d);
		})
		.attr("height", function (d, i) {
			return yScale(d);
		});


    var xAxis = d3.axisBottom(xScale)
    .ticks(data.length);

    var yAxis = d3.axisLeft(yScaleforaxes)
    .ticks(d3.max(data))

    svg.append('g')
    .attr('transform', 'translate(0,0)')
    .call(yAxis)

    svg.append('g')
    .attr('transform', 'translate(0,300)')
    .call(xAxis)


}

reload()
