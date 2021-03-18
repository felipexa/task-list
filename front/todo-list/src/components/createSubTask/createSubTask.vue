<template>
  <div>
    <Dialog
      :visible.sync="displayModal"
      :style="{ width: '60vw' }"
      header="Adicionar  SubTask"
      modal
    >
      <panel>
        <template #header>
          <h2>Criar SubTask</h2>
        </template>
        <div class="todo-list__add row py-2">
          <div class="item col-3">
            <h5>Descrição</h5>
            <InputText
              data-test="selectedDescription"
              class="w-100"
              v-model="selectedDescription"
              placeholder="Descrição"
            />
          </div>
          <div class="item col-2">
            <h5>Status</h5>
            <Dropdown
              :options="status"
              class="w-100"
              v-model="selectedStatus"
              data-test="selectedStatus"
            >
              <template #option="slotProps">
                {{ slotProps.option }}
              </template>
              <template #value="slotProps">
                <template v-if="selectedStatus">
                  {{ slotProps.value }}
                </template>
                <template v-else> Status </template>
              </template>
            </Dropdown>
          </div>
          <div class="col-2">
            <Button label="Criar" @click="createTask" />
          </div>
        </div>
      </panel>
    </Dialog>
  </div>
</template>
<script>
import { addTask } from "@/views/todo-list/service/service.js";
export default {
  mounted() {
    this.selectedStatus = status[1];
  },
  props: ["visible", "task"],
  data() {
    return {
      selectedDescription: "",
      selectedStatus: "",
      status: ["Concluido", "Não concluido"],
    };
  },
  computed: {
    displayModal: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      },
    },
  },
  methods: {
    createTask() {
      const done = this.selectedStatus === this.status[0] ? true : false;
      const newTask = {
        description: this.selectedDescription,
        done,
        taskList: this.task.id,
      };
      addTask(newTask)
        .then(() => {
          this.$toast.add({
            severity: "success",
            detail: "SubTask adicionado com sucesso!!",
            life: 3000,
          });
          this.clear();
          this.$emit("update:visible", false);
          this.$emit("newSubTask", newTask);
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            detail: "Erro ao adicionar subtask!!",
            life: 3000,
          });
        });
    },
  },
};
</script>

<style>
</style>