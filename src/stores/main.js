import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {
  const url = ref('https://api.trm.uz')
  const comments = ref()
  
  const getAllDiscussions = () => {
    return axios(url.value+`/discussion`)
    .catch(er => console.log(er))
  }
  
  const getDiscussion = (id) => {
    return axios(url.value+`/discussion/${id}`)
    .catch(er => console.log(er))
  }

  const getAllComments = async () => {
    const res = await axios(url.value+`/comment`)
    if (res.status === 200) {
      console.log(res.data)
      comments.value = res.data
    }
    console.log(comments.value)
    // .catch(er => console.log(er))
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

  return { url, comments, getAllDiscussions, getDiscussion, getAllComments, sendComment }
})
