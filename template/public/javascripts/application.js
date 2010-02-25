$(document).ready(function(){

  $.tablesorter.addWidget({
    id: "columnHighlight",
    format: function(table) {
      if (!this.tds)
        this.tds =  $("td", table.tBodies[0]);
      if (!this.headers)
        this.headers = $("thead th", table);
      this.tds.removeClass("sorted");
      var ascSort = $("th." + table.config.cssAsc);
      var descSort = $("th." + table.config.cssDesc);
      var index = sortByIndex;
      if (ascSort.length)
        index = this.headers.index(ascSort[0]);
      if (descSort.length)
        index = this.headers.index(descSort[0]);
      $("tr td:nth-child(" + (index+1) + ")", table.tBodies[0]).each(function(row){
        $(this).addClass('sorted');
      });
    }
  }); 

  //initialize the table

  var table = $('#data');
  table.tablesorter({
    widgets: ['columnHighlight'],
    sortList: [[sortByIndex || 0, sortOrderBit || 0]]
  });
  function filter(){
    $.uiTableFilter( table, this.value );
    return false;
  }
  $("#filter input").keyup(filter);
  $("#filter input").submit(filter)
});