// Reference data from html locations
d3.json('data/images.json')
.then(function(dataset){	

//Width and height of svg, as well as squares
console.log(dataset)
var size = 40;
var w = window.innerWidth;
var h = window.innerHeight;
var numPerRow = w/size;

//Create extra scale functions
Scale = d3.scaleLinear()
            .domain([0, numPerRow - 1])
            .range([0, numPerRow * size]);


//Create SVG element
var svg = d3.select("#test")
            .append("svg")
            .attr("class", "firstVis")
            .attr("width", numPerRow * size)
            .attr("height", numPerRow * size/2);

//Create grid
var grid = svg.selectAll(".square")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("class", "square")
                .attr("x", function(d){
                    const n = d.id % numPerRow;
                    //console.log(n)
                    return Scale(n);
                })
                .attr("y", function(d){
                    const n = Math.floor(d.id/numPerRow);
                    //console.log(n)
                    return Scale(n);
                })
                .attr("width", size)
                .attr("height", size)
                .attr("fill", "#031837")
                .style("opacity", 1)
                .on("mouseover",function(d){                                        
                    if (d.images != '') {
                        // Adjust color when selecting
                        d3.select(this).attr("fill","#f15f53")
                        .style("opacity", 1)
                    } else {
                        // Adjust color when selecting
                        d3.select(this).attr("fill","grey")
                        .style("opacity", 1)
                    }
                })
                .on("mouseout",function(d){
                    d3.select(this)
                            .transition()
                            .attr("fill","#031837")
                            .attr("height", function(d){
                                return size;
                            })
                            .attr("width", function(d){
                                return size;
                            })
                            .style("opacity", 0.625);
                    
                    //d3.select("#toolTip")
                      //      .remove();
                });

// Select rectangles for appending images
svg.selectAll(".square")
        .data(dataset)
        .on("click", function(d){

            console.log("working!")
            // Create variables
            var imaSize = size * 15;
            var panos = svg.append("g");

            //console.log('working!');
            panos.append("image")
                .attr("xlink:href", function(){
                    if (d.images == ''){
                        
                    } else{
                        console.log('visuals/' + d.id + '.jpg')
                        return 'visuals/' + d.id + '.jpg';
                    }
                })
                .attr("id", "panos")
                .attr("width", function() {
                    return imaSize;
                    // if (d.images == ''){
                    //     return 0
                    // } else{
                    //     return imaSize;
                    // }
                })
                .attr("height", imaSize)
                .attr("x", function(){
                    return 100;
                    // const n = d.id % numPerRow;
                    // //console.log(n)
                    // return Scale(n);
                })
                .attr("y", function(){
                    return 100;
                    // const n = Math.floor(d.id/numPerRow);
                    // console.log(n)
                    // console.log(Scale(n));
                    // return Scale(n) - (size*5);
                });
            
            /*
            d3.select("#panos")
                .transition()
                .delay(1000)
                .remove();
            */
        });
    })