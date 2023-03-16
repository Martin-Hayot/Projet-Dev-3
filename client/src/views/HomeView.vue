<template>
  <div class="background">
    <div class="home">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <div class="spotify">
      <title>Jazz</title>
      <iframe class="album" style="border-radius:12px" src="https://open.spotify.com/embed/album/6FCzvataOZh68j8OKzOt9a?utm_source=generator" width="20%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

      <title>Pop</title>
      <iframe class="album" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7D8GQsPKGvy?utm_source=generator" width="20%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

      <title>Hip-Hop</title>
      <iframe class="album" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6ddS6zsEjzvf0NgPOzSrL1?utm_source=generator" width="20%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

      <title>Electro</title>
      <iframe class="album" style="border-radius:12px" src="https://open.spotify.com/embed/album/5wBz69rJgZF0s2y2KWQXfV?utm_source=generator" width="20%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  </div>
  <footer>
    <div>
      <p>© 2023 Electric city. Tous droits réservés.</p>
      <ul class="list-link-footer">
        <li><a class="links-footer" href="#">Politique de confidentialité</a></li>
        <li><a class="links-footer" href="#">Conditions d'utilisation</a></li>
        <li><a class="links-footer" href="#">Contact</a></li>
        <li><a class="links-footer" href="#">FAQ</a></li>
      </ul>
    </div>
  </footer>
</template>

<!-- <script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script> -->
<style>
  body{
    background-color: #4f4138;
  }
  /* .spotify{
    width: 16%;
  } */
  .album{
    display:inline-block;
    position: relative;
    margin-top: 80px;
    margin-left: 60px;
  }
  .background{
    background-image: url(../assets/StudioFond.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
  }
  footer{
    width: 100vw;
    height: 100px;
    background-color: #4f4138;
    display: flex;
    align-items:top;
    justify-content:center;
    color: white;
  }
  .links-footer{
    text-decoration: none;
    color: white;
  }
  .list-link-footer{
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 3em;
    align-items: center;
    list-style-type: none;
  }
</style>
