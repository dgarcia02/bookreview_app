$(() => {

   $('form').on('submit', (event) => {
      event.preventDefault();

      const userInput = $('#userInput').val()

      $.ajax({
         url: "https://www.googleapis.com/books/v1/volumes?q=" + userInput,
         // url: "https://www.googleapis.com/books/v1/volumes?q=one%20last%20stop",
         type: "GET",
         // data:
      }).then(
         (data) => {
            console.log(data);
      },
      () => {
            console.log('bad request');
      }
      )


   })


})
