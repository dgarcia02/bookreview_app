$(() => {

let currentImageIndex = 0;
let $numOfImages = $('.book-images').children().length - 1
const $carouselImages = $('.book-images').children()

// add an event handler to the carousel next button
$('.next').on('click', (event) => {
   $carouselImages.eq(currentImageIndex).css('display', 'none')
   if (currentImageIndex < $numOfImages) {
      // add to the image index to go to the next image
      currentImageIndex++
   } else {
      // this will start the images again
      currentImageIndex = 0
   }
   $carouselImages.eq(currentImageIndex).css('display', 'block')
})

// event/handler for the previous button
$('.previous').on('click', (event) => {
   $carouselImages.eq(currentImageIndex).css('display', 'none')
   if (currentImageIndex > 0) {
      currentImageIndex--
   } else {
      currentImageIndex = $numOfImages
   }
   $carouselImages.eq(currentImageIndex).css('display', 'block')
})


// event listen/handler to the submit button
$('form').on('submit', (event) => {
   event.preventDefault();
   // grab the value of the text from the input
   const userInput = $('#userInput').val()
   // this empties the input text
   $(event.currentTarget).trigger('reset')




   $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + userInput,
      type: "GET",
   }).then(
      (data) => {
         // console.log(data);
         const $title = $('<h2>')
               .addClass('title')
               .text(data.items[0].volumeInfo.title)
               .appendTo('.book-info')
               console.log(data);

         const $authors = $('<h3>')
               .addClass('authors')
               // .text('by')
               .text(data.items[0].volumeInfo.authors)
               .appendTo('.book-info')

         const $ratings = $('<h6>')
               .addClass('ratings')
               .text(data.items[0].volumeInfo.averageRating)
               .appendTo('.book-info')

         const $imageLink = $('<img>')
               .attr('src', data.items[0].volumeInfo.imageLinks.thumbnail)
               .addClass('imageLink')
               .appendTo('.book-info')

         const $h4Description = $('<h4>')
               .addClass('overview')
               .text('Description')
               .appendTo('.description')

         const $description = $('<p>')
               .text(data.items[0].volumeInfo.description)
               .appendTo('.overview')

         const $by = $('<p>')
               .text('by')
               .prependTo('.authors')
   },
      () => {
         console.log('bad request');
   }
   )


   })

});
