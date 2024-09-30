import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmUxZGJhN2U3MDA2MjQ1NWIzNDU4YWRkNTUwYTEzZiIsIm5iZiI6MTcyNzcwMzMwNC42NzY4NDcsInN1YiI6IjY2ZjliYzRmMzkzY2RhMWQxZGNjNjFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x0XCBWaiOfQH61_llnS3eo6ggze-L2CvITY4QrQTpkw'
  }
})

export default instance;