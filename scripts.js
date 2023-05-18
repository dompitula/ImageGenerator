$(function() {

   $(function() {
      $(":file").change(function() {
        if (this.files && this.files[0]) {
          for (var i = 0; i < 3; i++) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[i]);
          }
        }
      });
    });
    
    function imageIsLoaded(e) {
      $('#myImg').append('<img src=' + e.target.result + '>');
    };

	var clientID = "vBZPA1MHSw5Hu0IAlHJf1aPY5vevEtQ15CODlC43oII";

	var getImage = function()
	{
		var image = $('#term').val();
		var number = $('#quantity').val() || 1;

		if (image == '') 
		{
			$('#image0').html("<h2 class='loading'>Proszę wprowadzić poprawne słowo wyszukania.</h2>");
		} 
		else 
		{
			$('#image0').html("<h2 class='loading'>Trwa ładowanie obrazów...</h2>");

			$.getJSON(`https://api.unsplash.com/search/photos?lang=pl&page=1&query=${image}&client_id=${clientID}`,
				function(jsonData) {

					for (let i = 0; i < 5; i++)
					{
						$(`#image${i}`).html(`<img id="theImage" src=""/>`);
					}

					if (jsonData.total > 0) 
					{
						console.log(number);
						if (number == 1)
						{
							$(`#image0`).html(`<img id="theImage" src=${jsonData.results[0].urls.regular}/>`);
						}
						else
						{
							for (let i = 0; i < number; i++)
								{
									$(`#image${i}`).html(`<img id="theImage" src=${jsonData.results[i].urls.regular}/>`);
								}
						}
					} 
					else if (jsonData.total == 0)
					{
						$.getJSON(`https://api.unsplash.com/search/photos?lang=pl&page=1&query=cat&client_id=${clientID}`, 
							function(jsonData){
								$('#image0').html(`<h2 class="loading">Nie udało się odnaleźć pasujących obrazów, a może chodziło ci o zdjęcia kota?</h2><img id="theImage" src=${jsonData.results[0].urls.regular}/>`);
	                    });                 
	                }
			});
		}

		return false;	
	}

	$('#fetch form').on('submit', getImage);
});
