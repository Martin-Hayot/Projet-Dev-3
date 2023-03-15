<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: ''
    }
  },
  created() {
    fetch('http://localhost:3000/users')
      .then(response => response.text())
      .then(data => {
        this.message = data
      })
  }
}
</script>