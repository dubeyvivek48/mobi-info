$(document).ready(
    ()=>{
        $('#searchForm').on('submit',(e)=>{
            let searchText=$('#searchMobi').val();
            getMovies(searchText);
            console.log(searchText);
            e.preventDefault();
        });
    });
    function getMovies(searchText){
        axios.get('http://www.omdbapi.com/?s='+searchText +'&apikey=34d9da6c')
        .then( (Response)=>{
            console.log(Response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }