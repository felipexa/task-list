<template>
  <div>
    <Dialog
      :visible.sync="displayModal"
      :style="{ width: '60vw' }"
      header="Adicionar  Tarefa"
      modal
    >
      <panel class="px-5 pb-5 pt-3">
        <template #header>
          <h2>Criar Tarefa</h2>
        </template>
        <div class="row py-4 d-flex align-items-end">
          <div class="col-md-3">
            <h5>Descrição</h5>
            <InputText
              class="w-100"
              v-model="selectedDescription"
              placeholder="Descrição"
            />
          </div>
          <div class="col-md-4">
            <h5>Status</h5>
            <Dropdown class="w-100" :options="status" v-model="selectedStatus">
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
          <div class="col-md-2">
            <Button label="Criar" @click="createTask" />
          </div>
        </div>
      </panel>
    </Dialog>
  </div>
</template>
<script>
import { addTask } from "@/views/todo-list/service/service.js";
import { mapMutations } from "vuex";
export default {
  mounted() {
    this.selectedStatus = 'Não concluido'
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
        this.selectedDescription = "";
      },
    },
  },
  methods: {
    ...mapMutations(["handleLoading"]),
    createTask() {
      this.handleLoading(true);
      const done = this.selectedStatus === this.status[0] ? true : false;
      const newTask = {
        description: this.selectedDescription,
        done,
        tasklist: this.task.id,
      };
      addTask(newTask)
        .then(() => {
          this.$toast.add({
            severity: "success",
            detail: "Tarefa adicionada com sucesso!!",
            life: 3000,
          });
          this.selectedDescription = "";
          this.displayModal = false;
          this.$emit("newSubTask");
        })
    },
  },
  parseTask() {
    return {
      
    }
  }
};
</script>

<style>
</style>