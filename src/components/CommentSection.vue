<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="addComment">
        <div class="form-group mb-3">
          <label for="name">Nome</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Digite seu nome (ou deixe em branco)"
          />
        </div>

        <div class="form-group mb-3">
          <label for="message">Comentário</label>
          <textarea
            id="message"
            v-model="message"
            class="form-control"
            rows="3"
            placeholder="Digite seu comentário aqui..."
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary w-100">
          Comentar
        </button>
        </form>

      <hr />

      <div v-if="comments.length === 0" class="text-muted text-center">
        Nenhum comentário ainda. Seja o primeiro!
      </div>

      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <p class="mb-1">{{ comment.message }}</p>
          <small class="text-secondary">
            — {{ comment.name || 'Anônimo' }}
          </small>
          <button
            class="btn btn-sm btn-outline-danger float-end"
            @click="removeComment(index)"
          >
            Excluir
          </button>
        </li>
      </ul>
<hr />
    <div class="mt-4">
    <h5>Testes de Erro (Skywalking)</h5>
    <button class="btn btn-warning me-2" @click="simulateLatency">Simular Latência</button>
    <button class="btn btn-danger" @click="simulateProcessingError">Simular Erro de Processamento</button>
    <button class="btn btn-danger me-2" @click="simulateErroraddComment">Simular Erro de Adição no Comentário</button>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// =======================================================
// Integração com backend e banco de dados MySQL
// =======================================================
// Os comentários são persistidos em um banco de dados MySQL através de uma API REST.
// A API está configurada para responder em /api/comments e deve oferecer suporte aos métodos:
// - GET    → para listar todos os comentários
// - POST   → para adicionar um novo comentário
// - DELETE → para remover um comentário específico (usando o ID)
// O Axios é utilizado para fazer as requisições HTTP.

// URL do backend (ajusta se estiver em outro servidor)
const API_URL = '/api/comments'

// estados reativos
const name = ref('')
const message = ref('')
const comments = ref([])

// carrega os comentários do banco
async function loadComments() {
  try {
    const res = await axios.get(API_URL)
    comments.value = res.data
  } catch (err) {
    console.error('Erro ao carregar comentários:', err)
  }
}

// adiciona novo comentário
async function addComment() {
  if (message.value.trim() === '') {
    alert('Por favor, escreva uma mensagem antes de comentar.')
    return
  }

  try {
    await axios.post(API_URL, {
      name: name.value.trim() || null,
      message: message.value.trim()
    })
    message.value = ''
    name.value = ''
    loadComments() // atualiza lista
  } catch (err) {
    console.error('Erro ao adicionar comentário:', err)
  }
}

// exclui um comentário do banco
async function removeComment(index) {
  const comment = comments.value[index]
  if (!comment) return
  if (confirm('Tem certeza que deseja excluir este comentário?')) {
    try {
      await axios.delete(`${API_URL}/${comment.id}`)
      comments.value.splice(index, 1)
    } catch (err) {
      console.error('Erro ao excluir comentário:', err)
    }
  }
}

// Funções para simulações de erro da aplicação
async function simulateLatency() {
  try {
    const res = await axios.get('/api/simulate-latency');
    alert('Latência simulada: ' + res.data.message);
  } catch (err) {
    console.error('Erro de latência:', err);
    alert('Erro capturado na latência');
  }
}

async function simulateProcessingError() {
  try {
    await axios.get('/api/simulate-processing-error');
  } catch (err) {
    console.error('Erro de processamento:', err);
    alert('Erro capturado: ' + err.response?.data?.error || err.message);
  }
}

async function simulateErroraddComment() {
  if (message.value.trim() === '') {
    alert('Por favor, escreva uma mensagem antes de comentar.')
    return
  }

    await axios.post('/api/comments/erro', {
		name: name.value.trim() || null,
		message: message.value.trim()
    })
    
	message.value = ''
    name.value = ''
    loadComments() // atualiza lista
}

// carrega os comentários ao montar o componente
onMounted(loadComments)
</script>
