// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour").on("click", function(event) {
      var id = $(this).data("id");
      var newDevour = $(this).data("newdevoured");
  
      // this var helps the ajax to read if its true or false     
      var newDevourStatus = {
        devoured: newDevour
      };
  
      // Send the PUT request.
      $.ajax({
        type: "PUT",
        url: "/api/burgers/" + id,
        data: newDevourStatus
      }).then(
        function() {          
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event. AKA no reload
      event.preventDefault();
  
      var newBurger = {
        // this is where the input goes aka the name 
        name: $("#ca").val().trim(),       
      };
  
      // Send the POST request.
      $.ajax({
        type: "POST",
        url: "/api/burgers",
        data: newBurger
      }).then(
        function() {          
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });  
    
  });