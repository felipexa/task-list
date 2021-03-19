<template>
  <div class="todo-list">
    <panel>
      <template #header>
        <h2>Criar lista de tarefas</h2>
      </template>
      <div class="row py-2 d-flex align-items-end">
        <div class="item col-3">          
          <InputText
            class="w-100"
            v-model="listDescription"
            placeholder="Nome da Lista..."
          />
        </div>

        <div class="col-2">
          <Button
            data-test="createTask"
            label="Criar"
            @click="createTask"
            :disabled="!listDescription"                       
          />
        </div>
      </div>
    </panel>
    <div class="py-4">
      <div
        class="todo-list__content border my-3 pl-3 py-3"
        v-for="(item, index) in dataTable"
        :key="`${index} A`"
      >
        <h5>LISTA</h5>
        <hr />
        <div class="d-flex align-items-center">
          <div class="item">
            <h5>{{ item.description }}</h5>
          </div>
          <div class="item" @click="openCreateModal(item)">
            <font-awesome-icon
              icon="plus-square"
              class="ml-3"
              style="width: 1.3rem; height: 1.3rem; color: green"
            />
          </div>
        </div>
        <hr />
        <div v-if="item.tasklist.length > 0">
          <h5>TAREFAS</h5>
          <hr />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody v-for="(el, i) in item.tasklist" :key="`${i} A`">
              <tr>
                <th scope="row">{{ i + 1 }}</th>
                <td>{{ el.description }}</td>
                <td>
                  <font-awesome-icon
                    icon="trash-alt"
                    class="ml-2 trash"
                    style="width: 1.3rem; height: 1.3rem; color: red"
                    @click="removeTask(el, item, i)"
                  />
                  <font-awesome-icon
                    icon="check-square"
                    class="mx-2 trash"
                    :class="el.done ? 'green' : 'not-conclued'"
                    style="width: 1.3rem; height: 1.3rem"
                    @click="markConclued(el)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <CreateSubTask
      :visible.sync="visibleSubTask"
      :task="taskSelected"
      @newSubTask="newSubTask()"
    />
  </div>
</template>

<script>
import {
  getTaskList,
  addTaskList,
  deleteTask,
  updateTask,
} from "./service/service";
import CreateSubTask from "@/components/createSubTask/createSubTask.vue";
import { mapMutations } from "vuex";
export default {
  components: { CreateSubTask },
  mounted() {
    this.handleLoading(true);
    getTaskList()
      .then((resp) => (this.dataTable = resp))
      .catch((error) => console.log(error))
      .finally(() => this.handleLoading(false));
  },
  data() {
    return {
      dataTable: [],
      listDescription: "",
      itemEdit: [],
      visible: false,
      visibleSubTask: false,
      taskSelected: {},
    };
  },
  methods: {
    ...mapMutations(["handleLoading"]),
    newSubTask() {
      getTaskList()
        .then((resp) => (this.dataTable = resp))
        .catch((error) => console.log(error))
        .finally(() => this.handleLoading(false));
    },
    reloadTable() {
       getTaskList()
        .then((resp) => (this.dataTable = resp))
        .catch((error) => console.log(error))
        .finally(() => this.handleLoading(false));
    },
    openCreateModal(task) {
      this.visibleSubTask = true;
      this.taskSelected = task;
    },
    updateDataTable(item) {
      const indexTask = this.dataTable.findIndex((task) => task.id === item.id);
      this.dataTable.splice(indexTask, 1, item);
    },
    markConclued(task) {
      task.done = !task.done;
      updateTask(task.id, {done: task.done});
      if (task.done) {
        this.$toast.add({
          severity: "success",
          detail: "Tarefa concluída!!",
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "warn",
          detail: "Tarefa em andamento!!",
          life: 3000,
        });
      }
    },
    createTask() {
      this.handleLoading(true);
      const newTaskList = { description: this.listDescription }
      addTaskList(newTaskList)
        .then(() => {                  
          this.$toast.add({
            severity: "success",
            detail: "Lista adicionada com sucesso!!",
            life: 3000,
          });                                
          this.listDescription = "";   
          this.reloadTable();
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            detail: "Erro ao adicionar Lista!!",
            life: 3000,
          });
        })
        .finally(() => this.handleLoading(false));
    },
    removeTask(task, item, i) {
      this.handleLoading(true);
      deleteTask(task.id)
        .then(() => {
          item.tasklist.splice(i, 1);
          this.$toast.add({
            severity: "success",
            detail: "Tarefa removida com sucesso!!",
            life: 3000,
          });
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            detail: "Erro ao remover tarefa!!",
            life: 3000,
          });
        })
        .finally(() => this.handleLoading(false));
    },
  },
};
</script>

<style >
h2 {
  font-family: "SF Pro Display Bold";
}
.border {
  border: 1px solid gray;
}
.not-conclued {
  color: rgba(59, 10, 10, 0.288);
}
.green {
  color: green;
}
</style>