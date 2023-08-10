<template>
  <div id="slogan">
    <div class="text-center">
        <customHeaders>
                <add name="Access-Control-Allow-Origin" value="*" />
        </customHeaders>
      <h1>TESTE DE INTEGRAÇÃO COM O AGENTE SW</h1>
      <br/>
      <h6 class="text-secondary">teste para comunicação com agente skywalking</h6>
    </div>
  </div>
  <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <h5>coluna</h5>
            <div class="card">
               <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                      {{ prefix }}
                  </li>
                </ul>
                <br/>
        <div class="input-group">
           <input class="form-control" type="text" v-model="prefix" placeholder="digite algo "/>
        <div class="input-group-append">
                <button class="btn btn-info" v-on:click="addPrefix(prefix)"><span class="fa fa-plus"></span></button>
        </div>
        </div>
     </div>
            </div>
          </div>

          <div class="col-md">
            <h5>coluna 2</h5>
              <div class="card">
                <div class="card-body">
                  <ul class="list-group">
                   <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">
                      {{ sufix }}
                  </li>
                </ul>
                <br/>
        <div class="input-group">
                <input class="form-control" type="text" placeholder="digita "/>
        </div>
              </div>
            </div>
          </div>
        </div>
        <br/>

        <h5>coluna 3</h5>
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
import ClientMonitor from "skywalking-client-js";
ClientMonitor.register({
        collector: 'http://10.0.28.209:12888',
        service: 'GMMI::TESTE-FRONTEND-VUE-MANUAL',
        pagePath: 'root/teste/dist',
        serviceVersion: 'v1.0.0',
});

import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
export default {
  name: 'app',
  data: function (){
    return {
prefix: "",
      prefixes: ['aaa', 'bbb', 'ccc'],
      sufixes: ['ddd', 'eee', 'fff'],
      domains: ['aaa ddd', 'bbb eee', 'ccc fff']
    };
  },
        methods: {
                addPrefix(prefix) {
                        this.prefixes.push(prefix);
                }
        }
};
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
