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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// estados reativos
const name = ref('')
const message = ref('')
const comments = ref([])

// funções
function addComment() {
  if (message.value.trim() === '') {
    alert('Por favor, escreva uma mensagem antes de comentar.')
    return
  }

  comments.value.push({
    name: name.value.trim() || null,
    message: message.value.trim(),
  })

  // limpa os campos
  name.value = ''
  message.value = ''
}

function removeComment(index) {
  if (confirm('Tem certeza que deseja excluir este comentário?')) {
    comments.value.splice(index, 1)
  }
}
</script>
