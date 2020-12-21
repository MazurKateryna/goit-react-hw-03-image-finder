import axios from 'axios';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios
  .get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=18874151-a59734316416ca9832deb4716&image_type=photo&orientation=horizontal&per_page=12`)
  .then(response => response.data.hits)
};

export default {
  fetchImagesWithQuery,
};