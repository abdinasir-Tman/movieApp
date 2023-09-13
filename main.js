let api_key = "cde69b8ab4588148413d2dbdc4565071";
let movie_url = "https://api.themoviedb.org/3/movie/latest?"
let image = `https://image.tmdb.org/t/p/w500/`;
$("#cancel").click( () =>{
    $("#modal").addClass("hidden");
    $("iframe").attr('src',$("iframe").attr('src'));
});
document.addEventListener("click", (e) =>{
    let id = e.target
    console.log(id);
})
$("body").on("click",".mg",function(){
//   let title = $(this).next().text()
  let id = $(this).parent().find("input[type='hidden']").val();
//    $(".title").text(title)
//    $(".movie-detail").text(overview);
 displayTrailer(id)
    
})


let movie_container = document.querySelector("#movie_container");
const displayDom = (request) => {
    request.forEach( result => {
    movie_container.innerHTML +=`<div class="w-[200px] bg-[#302462] p-2  rounded cursor-pointer">
                <input type="hidden" value="${result.id}">
                <img class="rounded mg" src="${image}${result.backdrop_path}" alt="" >
                <span class="mt-2">${result.original_title}</span>
                <div class="flex justify-between mt-2" >
                    <span class="bg-green-500 rounded-xl p-1">${result.vote_average}</span>
                    <span class="bg-green-500">${result.release_date}</span>
                </div>
            </div>`
    })
}
const popular_movie_db = async () => {
    const request = await fetch(`${movie_url}api_key=${api_key}&page=1`);
    const {results}  = await request.json()
    // console.log(results)
    displayDom(results)
     }
     const trailerMovie = async (id) =>{
       const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`
       const request = await fetch(url);
       const {results} = await request.json();
    //    console.log(request)
       return results
}
const displayTrailer =(id) =>{
    
trailerMovie(id)
        .then( id =>{
               id.forEach( d =>{
           
                  if(d.type == "Trailer"){
                    $(".trailer").html(`<iframe width="100%" height="400px" src="https://www.youtube.com/embed/${d.key}
?autoplay=1&mute=1" id="trailer">
</iframe>`)
                      $("#modal").removeClass("hidden");
                      
                  }
               })
        })
}

// getPopularMovies()

//     .then( data =>{
//         data.forEach( movie =>{
//              console.log(movie.id)
//         })
//     })
popular_movie_db()
