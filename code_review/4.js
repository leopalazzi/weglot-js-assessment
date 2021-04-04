//Use try catch because otherwise it will throw an error if provider is not in link

function getQueryProvider() {
  try{  
  	const url = window.location.href;
  	const [_, provider] = url.match(/provider=([^&]*)/);
    return provider;
  }
  catch(e){
  return;
  }
}