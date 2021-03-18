<template>
  <div class="todo-list">
    <panel>
      <template #header>
        <h2>Criar Task</h2>
      </template>
      <div class="todo-list__add row py-2">
        <div class="item col-3">
          <h5>Descrição</h5>
          <InputText
            class="w-100"
            v-model="selectedDescription"
            placeholder="Descrição"
          />
        </div>

        <div class="col-2">
          <Button
            data-test="createTask"
            label="Criar"
            @click="createTask"
            :disabled="!selectedDescription"
          />
        </div>
      </div>
    </panel>
    <div class="py-4">
      <div
        class="todo-list__content border my-3 p-3"
        v-for="(item, index) in dataTable"
        :key="`${index} A`"
      >
        <h5>TASK</h5>
        <hr />
        <div class="d-flex align-items-center">
          <div class="item mx-4">
            <h5>Descrição</h5>
            <label>{{ item.description }}</label>
          </div>
          <div class="item" @click="openCreateModal(item)">
            <font-awesome-icon
              icon="plus-square"
              class="ml-3"
              style="width: 1.3rem; height: 1.3rem"
            />
          </div>
        </div>
        <hr />
        <h5>SUBTASKS</h5>
        <hr />
        <div
          v-for="(el, index) in item.tasklist"
          :key="`${index} A`"
          class="d-flex align-items-center pl-2"
        >
          <div class="item mx-4">
            <h5>Descrição</h5>
            <label>{{ el.description }}</label>
          </div>
          <div class="item">
            <font-awesome-icon
              icon="trash-alt"
              class="ml-2 trash"
              style="width: 1.3rem; height: 1.3rem"
            />
            <font-awesome-icon
              icon="check-square"
              class="mx-2 trash"
              style="width: 1.3rem; height: 1.3rem"
            />
          </div>
        </div>
      </div>
    </div>

    <EditTask
      :visible.sync="visible"
      :data="itemEdit"
      @update="updateDataTable"
    />
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
  editStatus,
} from "./service/service";
import EditTask from "@/components/editTask/EditTask.vue";
import CreateSubTask from "@/components/createSubTask/createSubTask.vue";
export default {
  components: { EditTask, CreateSubTask },
  mounted() {
    getTaskList()
      .then((resp) => (this.dataTable = resp))
      .catch((error) => console.log(error));
  },
  data() {
    return {
      dataTable: [],
      selectedDescription: "",
      itemEdit: [],
      visible: false,
      visibleSubTask: false,
      taskSelected: {},
    };
  },
  methods: {
    newSubTask(newTask) {
      console.log(newTask);
      const findIndex = this.data.findIndex((item) => item.id === newTask.id);
      this.dataTable[findIndex].tasklist.push(newTask);
    },
    openCreateModal(task) {
      this.visibleSubTask = true;
      this.taskSelected = task;
    },
    updateDataTable(item) {
      const indexTask = this.dataTable.findIndex((task) => task.id === item.id);
      this.dataTable.splice(indexTask, 1, item);
    },
    editDocument(task) {
      this.visible = true;
      this.itemEdit = task;
    },
    markConclued(task) {
      const indexTask = this.dataTable.findIndex((item) => item.id === task.id);
      editStatus(task.id, { status: "Concluido" })
        .then(() => {
          this.dataTable[indexTask].status = "Concluido";
          this.$toast.add({
            severity: "success",
            detail: "Task movida para o status concluído!!",
            life: 3000,
          });
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            detail: "Erro ao mudar status da task!!",
            life: 3000,
          });
        });
    },
    clear() {
      this.selectedDescription = "";
    },
    createTask() {
      addTaskList({ description: this.selectedDescription })
        .then((resp) => {
          this.dataTable.push(resp);
          this.$toast.add({
            severity: "success",
            detail: "Task adicionado com sucesso!!",
            life: 3000,
          });
          this.clear();
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            detail: "Erro ao adicionar task!!",
            life: 3000,
          });
        });
    },
    removeTask(task) {
      const indexTask = this.dataTable.findIndex((item) => item.id === task.id);
      deleteTask(task.id)
        .then(() => {
          this.dataTable.splice(indexTask, 1);
          this.$toast.add({
            severity: "success",
            detail: "Task removida com sucesso!!",
            life: 3000,
          });
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            detail: "Erro ao adicionar task!!",
            life: 3000,
          });
        });
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
</style>