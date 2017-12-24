$(document).ready(
    ()=>{
        let searchText= $('#searchMobi').val();
        getMovies(searchText);
        
        $('#searchForm').on('submit',(e)=>{
            searchText= $('#searchMobi').val();
            getMovies(searchText);
            console.log(searchText);
            
            e.preventDefault();
        });
    });
    function getMovies(searchText){
        axios.get('http://www.omdbapi.com/?s='+searchText +'&apikey=34d9da6c')
        .then( (Response)=>{
            console.log(Response);
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
        let movieId=sessionStorage.getItem(movieId);


        axios.get('http://www.omdbapi.com/?i='+movieId +'&apikey=34d9da6c')
        .then( (Response)=>{
            console.log(Response);
                        
        })
        .catch((err)=>{
            console.log(err);
        })


    }