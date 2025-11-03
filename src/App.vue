<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">Sistema de Comentários</h1>
    <CommentSection />
  </div>
</template>

<script setup>
import CommentSection from './components/CommentSection.vue'
import ClientMonitor from 'skywalking-client-js';

ClientMonitor.register({
<<<<<<< HEAD
    collector: 'http://IPDOSERVIDOR:12888',
    service: 'PROJETOSHELLOWORLD::FRONTEND-VUE',
    pagePath: 'root/PROJECTVUECLIENTJS/dist',
=======
    collector: 'http://IPDOSERVER:12800', // IP do servidor do Skywalking com porta que aponta para o ClientJS
    service: 'NOMEDOGRUPO::NOMEDOSERVICO', 
    pagePath: '/dist', // referenciar a pasta dist
>>>>>>> 889776bb3a4c0b80b52ba923a5b76c0e0a437aad
    serviceVersion: 'v2.0.0',
});
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
