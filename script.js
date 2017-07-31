/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')




// Data reloading
let reload = () => {
  d3.tsv(('afcw-results.tsv'), (rows) => {

    const dataset = rows.map((row) => {
      return parseInt(row.GoalsScored, 10);
    });
    // console.log(dataset);
    //
    // const maxValue = d3.max(dataset);
    //
    // const colorScale = d3.scaleLinear()
    //   .domain([0, maxValue])
    //   .range(['peru', 'teal'])
    //
    // const yScale = d3.scaleLinear()
    //   .domain([0, maxValue])
    //   .range([0, 300])
    //
    //   var scale = d3.scaleLinear()
    //     .domain([0, maxValue])
    //     .range([0, maxValue]);
    //
    //   var axis = d3.axisLeft(scale);
    //
    //
    // svg.selectAll('rect')
    //   .data(dataset)
    //   .enter()
    //   .append('rect')
    //   .style('padding', '50px')
    //   .attr('class', 'bar')
    //   .attr('x', (d, i) => {
    //     return i * 22
    //   })
    //   .attr('y', (d) => {
    //     return height - yScale(d)
    //   })
    //   .attr('width', 20)
    //   .attr('height', (d) => {
    //     return yScale(d)
    //   })
    //   .attr('fill', colorScale)
    //   .append('g')
    //   .attr('transform', 'translate(30, 0)')
    //   .call(axis)

      // .on('mouseover', function (d, i) {
      //   d3.select(this).style('fill', '#bada55')
      // })
      // .on('mouseout', function (d, i) {
      //   d3.select(this).style('fill', colorScale(d))
      // })
      const data = dataset;
      var barWidth = width / data.length;
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d)])
        .range([height - 10, 0])

      // var chart = d3.select("#results")
      //   .attr('width', width)
      //   .attr('height', height)

      const chart = svg;

      var groups = chart.selectAll(".bar")
          .data(data)
        .enter().append("g")
          .attr('transform', (d, i) => `translate(${i * barWidth + 30}, 0)`)

      groups.append('rect')
        .attr('y', (d) => yScale(d))
        .attr('height', (d) => height - 10 - yScale(d))
        .attr('width', barWidth - 1)

      groups.append('text')
      	.attr("class", "barText")
        .attr('x', barWidth / 2)
      	.attr('y', d=> yScale(d) + 6)
        .attr('height', (d) => height - 10 - yScale(d))
        .attr('width', barWidth - 1)
        .text(d => d)

        chart.append("g")
        .attr("class", "y axis")
      	.attr("transform", "translate(30,0)")
        .call(d3.axisLeft(yScale));
  });
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

}

reload()
