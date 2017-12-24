$(document).ready(
    ()=>{
        let searchText= $('#searchMobi').val();
        getMovies(searchText);
        
        $('#searchForm').on('submit',(e)=>{
            searchText= $('#searchMobi').val();
            getMovies(searchText);
                      
            e.preventDefault();
        });
    });
    function getMovies(searchText){
        axios.get('http://www.omdbapi.com/?s='+searchText +'&apikey=34d9da6c')
        .then( (Response)=>{
           // console.log(Response);
            let movies=Response.data.Search;
            let output='';
            $.each(movies,(index,movie)=>{
                output +=`
                <div class="col-md-3">      
                <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title} <h5>
                <a onclick="movieSlected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details<a>
               
                </div>
                </div>

                `;
            });
            $('#mobi').html(output);
            
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    function movieSlected(id){
        sessionStorage.setItem('movieId',id);
        window.location='mobi.html';
        return false;
    }

    function getMovie(){
        let movieId=sessionStorage.getItem('movieId');


        axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=34d9da6c')
        .then( (response)=>{
            console.log(response);
            let movie=response.data;
            let output=`
            <div class="row">
            <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                <li class="list-group-item"><strong>   Genre: </strong>${movie.Genre}</li>
                <li class="list-group-item"><strong>   Released: </strong>${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
                <li class="list-group-item"><strong>  imdbRating:       </strong>${movie.imdbRating }</li>
                <li class="list-group-item"><strong>  Director  :</strong>${movie.Director}</li>
                <li class="list-group-item"><strong> Writer:   </strong>${movie.Writer}</li>
                <li class="list-group-item"><strong>  Actor:  </strong>${movie.Actor}</li>
                
                
                </ul>
            </div>
            </div>
            <div class="row">
            <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html"  class="btn btn-default">Go back to search</a>

            </div>
            </div>



            `
              $('#mobiInfo').html(output);       
        })
        .catch((err)=>{
            console.log(err);
        })


    }