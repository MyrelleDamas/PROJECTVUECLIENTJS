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
    collector: 'http://IPDOSERVER:12800',
    service: 'PROJETOSHELLOWORLD::FRONTEND-VUE',
    pagePath: '/dist',
    serviceVersion: 'v1.0.0',
});
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
