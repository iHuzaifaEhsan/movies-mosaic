import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice"

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`)
    const externalid = await axios.get(`/movie/${id}/external_ids`)
    const recomendations = await axios.get(`/movie/${id}/recomendations`)
    const similar = await axios.get(`/movie/${id}/similar`)
    const videos = await axios.get(`/movie/${id}/videos`)
    const watchproviders = await axios.get(`/movie/${id}/videos/watch/providers`)
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recomendations: recomendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results,
      watchproviders: watchproviders.data.results
    }
    console.log(theultimatedetails);
  } catch (error) {
    console.log("Error:", error);
  }
}