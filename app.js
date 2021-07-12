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
         $('#bookTitle').html(data.items[0].volumeInfo.title);
         $('#authors').html('by ' + data.items[0].volumeInfo.authors);
         $('#imageLink').html(`<img src="${data.items[0].volumeInfo.imageLinks.thumbnail}" />`);

         // ==== book overview section ==== //
         $('#overview').text('Overview');
         $('#ratings').html('<b><u>Ratings</u>: </b> ' + data.items[0].volumeInfo.averageRating);
         $('#genre').html('<b><u>Genre</u>: </b>' + data.items[0].volumeInfo.categories);
         $('#description').html('<b><u>Description</u>: </b>' + '<br/>' + data.items[0].volumeInfo.description)

   },
      () => {
         console.log('bad request');
   }
   )

   })

});
