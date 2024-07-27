import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const useMainStore = defineStore('main', () => {
  const url = ref('https://api.trm.uz')
  
  const getAllDiscussions = () => {
    return axios(url.value+`/discussion`)
    .catch(er => console.log(er))
  }
  
  const getDiscussion = (id) => {
    return axios(url.value+`/discussion/${id}`)
    .catch(er => console.log(er))
  }

  const getAllComments = () => {
    return axios(url.value+`/comment`)
    .catch(er => console.log(er))
  }

  async function sendComment(params) {
    console.log(params);
    await axios.post(url.value+`/comment`, {
      name: params?.name,
      phone: params?.phone,
      text: params?.text,
      discussion: params?.discussion
    }, 
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
    )
    .then(function () {
      getAllComments()
    })
  }

  return { url, getAllDiscussions, getDiscussion, getAllComments, sendComment }
})
