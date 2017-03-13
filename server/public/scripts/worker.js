
self.addEventListener('message', function(data){
  // recieving a message from the main thread

  console.log(data, ' this is worker')

  console.log('message is happeing in web worker')






  // send back results
  self.postMessage({
    type: 'results',
    data: {
      jim: 'is here'
    }
  })
})
