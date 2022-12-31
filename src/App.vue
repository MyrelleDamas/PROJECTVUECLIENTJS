<template>
  <div id="slogan">
    <div class="text-center">
      <h1>FUNCIONAAA</h1>
      <br/>
      <h6 class="text-secondary">nao faco ideia do que to fazendo</h6>
    </div>
  </div>
  <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <h5>sei la</h5>
            <div class="card">
               <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                      {{ prefix }}
                  </li>
                </ul>
                <br/>
                <input class="form-control" type="text" placeholder="digita "/>
              </div>
            </div>
          </div>

          <div class="col-md">
            <h5>sei la2</h5>
              <div class="card">
                <div class="card-body">
                  <ul class="list-group">
                   <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">
                      {{ sufix }}
                  </li>
                </ul>
                <br/>
                <input class="form-control" type="text" placeholder="digita "/>
              </div>
            </div>
          </div>
        </div>
        <br/>

        <h5>nao etnendo nada ainda</h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
                   <li class="list-group-item" v-for="domain in domains" v-bind:key="domain">
                      {{ domain }}
                  </li>
                </ul>

          </div>
        </div>
      </div>
  </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
export default {
  name: 'app',
  data: function (){
    return {
      prefixes: ['aaa', 'bbb', 'ccc'],
      sufixes: ['ddd', 'eee', 'fff'],
      domains: ['aaa ddd', 'bbb eee', 'ccc fff']
    };
  }
}
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}

#main {
  background-color: #f1f1f1;
  padding-bottom: 30px;
}
</style>
