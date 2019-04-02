function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var sampleurl = `/metadata/${sample}`;

  //PSEUDO: Use `d3.json` to fetch the metadata for a samplle.
  //SLAV:  I am using the example we did in the class for full stack plotly for code below:
  d3.json(sampleurl).then.function(sample)
    {

    //PSEUDO: Use d3 to select the panel with id of `#sample-metadata`
    //SLAV: creating variable in which i will use d3.select method to get the sample data.
    // I have used https://d3indepth.com/selections/ to get more familiar with d3 functions. 
    // I was initially using d3.select all but i realize i do need just d3.select. Also this has been covered in
    // exercise 15-2-8 line 36
    var smpmtd = d3.select["#sample-metadata"];

    //PSEUDO: Use `.html("") to clear any existing metadata
    // SLAV: Based on Devang comment on Slack after Ashely asked i am going to try to use: 
    //d3.select(smpmtd).node().value = ""; However based on PSEUDO code I realize i have to use:
    smpmtd.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    // SLAV: as suggested in instruction, I will use Object.entries on sample data, creating for each function
    // with key, value and append the variable row to my smpmtd variable.

    Object.entries(sample).forEach(function([key,value]) {
      var row = smpmtd.append("tr");
      row.text(`${key}: ${value}`);
   });
  };
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  //SLAV: in exercise 15-2-4 we used API example but in this case we will
  // usee data from a sample
   var sample_html = `/samples/${sample}`;

    // @TODO: Build a Bubble Chart using the sample data
    // * Create a Bubble Chart that uses data from your samples route (`/samples/<sample>`) to display each sample.
    d3.json(sample_html).then(function(data) {
    // * Use `otu_ids` for the x values
        var x_val = data.otu_ids;
    //* Use `sample_values` for the y values
        var y_val =data.sample_values;
    //* Use `sample_values` for the marker size
        var mk_size = data.sample_values;
    //* Use `otu_ids` for the marker colors
        var mk_col = data.otu_ids;
    //* Use `otu_labels` for the text values
        var txt_val = data.otu_labels;
    // Establishing the elements for bubble chart using previously created variables above:
        var elements = {
          type: "bubble",
          mode: "markers",
          x: "x_val",
          y: "y_val",
          text: text_val,
          marker: {
            color: mk_col,
            size: mk_size,
           }
       };

       var ch_data = [elements]; 
 		 		
       var chlyout = {
         xaxis: { title: "OTU ID" },
   };
      
   Plotly.newPlot("bubble", ch_data, chlyout);

        });
      }
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
