<script setup>
import { reactive } from 'vue'
import { Button } from '@/components/ui/button'

import { useApiStore } from '@/stores/api/api'
const api = useApiStore()

const state = reactive({
  title: '',
  body: '',
})

const formData = new FormData()
const handleFiles = (event) => {
  for (let file of event.target.files) {
    formData.append('pictures', file)
  }
}

const add = () => {
  formData.append('title', state.title)
  formData.append('body', state.body)

  api
    .postFormData({
      url: 'post/create',
      data: formData,
    })
    .then((res) => {
      console.log(res)
    })
  formData.delete('title')
  formData.delete('body') 
  formData.delete('pictures') 
}
</script>

<template>
  <div>
    <h1>dashboard</h1>

    <form @submit.prevent="add">
      <input type="text" v-model="state.title" />
      <input type="text" v-model="state.body" />
      <input type="file" multiple @change="handleFiles" />
      <Button type="submit">submit</Button>
    </form>
  </div>
</template>

<style></style>
