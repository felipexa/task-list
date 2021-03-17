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
          <Button
            data-test="createTask"
            label="Criar"
            @click="createTask"
            :disabled="enabledcreateTask()"
          />
        </div>
      </div>
    </panel>
    <div class="todo-list__table pb-2">
      <CustomTable
        :columnsData="columnData"
        :title="titleTableTodo"
        :empty="returnDataTableTodo.length > 0"
      >
        <template slot="content-filter">
          <div class="d-flex align-items-center p-4">
            <RadioButton
              id="progress"
              v-model="checkSelected"
              value="Desenvolvimento"
              class="ml-3"
            />
            <label class="ml-1 mb-0" for="progress"> Desenvolvimento </label>
          </div>
        </template>

        <template slot="body">
          <tr
            v-for="(item, index) in returnDataTableTodo"
            :key="`${index} - ${item}`"
          >
            <td class="position-relative">             
              {{ item.status }}
            </td>
            <td>
              {{ item.description }}
            </td>
            <td>
              <div class="d-flex align-items-center justify-content-center">
                <div
                  class="action"
                  @click="markConclued(item)"
                  v-if="item.status !== 'Concluido'"
                  v-tooltip.top="'Marcar como concluído'"
                  :class="{ markConclued: index === 0 }"
                >
                  <font-awesome-icon
                    icon="check-square"
                    class="mx-2 check-done"
                  />
                </div>
                <div
                  :class="{ removeTask: index === 0 }"
                  class="action"
                  @click="removeTask(item)"
                  v-tooltip.top="'Remover Task'"
                >
                  <font-awesome-icon icon="trash-alt" class="mx-2 trash" />
                </div>
                <div
                  class="action"
                  :class="{ editTask: index === 0 }"
                  v-tooltip.top="'Editar Task'"
                  @click="editDocument(item)"
                  v-if="item.status !== 'Concluido'"
                >
                  <font-awesome-icon icon="edit" class="mx-2" />
                </div>
              </div>
            </td>
          </tr>
        </template>
      </CustomTable>
    </div>
    <div class="todo-list__table pb-2">
      <CustomTable
        :columnsData="columnData"
        :title="titleTableConclued"
        :showFilter="false"
        :empty="returnDataTableConclued.length > 0"
      >
        <template slot="body">
          <tr
            v-for="(item, index) in returnDataTableConclued"
            :key="`${index} - ${item}`"
          >
            <td class="position-relative">        
              {{ item.status }}
            </td>
            <td>
              {{ item.type }}
            </td>
            <td>
              {{ item.description }}
            </td>
            <td>
              {{ item.date }}
            </td>
            <td>
              <div
                class="action"
                @click="removeTask(item)"
                v-tooltip.top="'Remover Task'"
              >
                <font-awesome-icon icon="trash-alt" class="mx-2 trash" />
              </div>
            </td>
          </tr>
        </template>
      </CustomTable>
    </div>
    <div
      class="todo-list__buttons pb-5"
      v-if="returnDataTableConclued.length > 0"
    >
      <hr />
      <Button
        label="Limpar task(s)"
        class="danger removeAllTask"
        @click="removeAllConclued"
      />
    </div>
    <EditTask
      :visible.sync="visible"
      :data="itemEdit"
      @update="updateDataTable"
    />
  </div>
</template>

<script>
import CustomTable from "@/components/custom-table/CustomTable.vue";
import {
  getTaskList,
  addTaskList,
  deleteTask,
  editStatus,
} from "./service/service";
import EditTask from "@/components/editTask/EditTask.vue";
export default {
  components: { CustomTable, EditTask },
  mounted() {
    getTaskList().then((resp) => {
      this.dataTable = resp;
    });
  },
  data() {
    return {
      dataTable: [],
      titleTableTodo: "Task(s) - a fazer",
      titleTableConclued: "Task(s) - concluida",
      checkSelected: "",
      selectedDescription: "",
      selectedStatus: "",
      itemEdit: [],
      visible: false,
      columnData: {
        columnsToShow: ["Status", "Descrição", ""],
      },
      status: ["Desenvolvimento", "Concluido"],
    };
  },
  computed: {
    returnDataTableTodo() {
      if (this.checkSelected) {
        const resultFilter = this.dataTable.filter(
          (item) => this.checkSelected === item.status
        );
        return resultFilter;
      }
      return this.dataTable.filter((item) => item.status !== "Concluido");
    },
    returnDataTableConclued() {
      return this.dataTable.filter((item) => item.status === "Concluido");
    },
  },
  watch: {
    checkSelected(value) {
      if (value) {
        const status = {
          desenvolvimento: " Tasks em Desenvolvimento",
          "": "Task(s) - a fazer",
        };
        this.titleTableTodo = status[value.toLowerCase()];
      }
    },
  },
  methods: {
    updateDataTable(item) {
      const indexTask = this.dataTable.findIndex((task) => task.id === item.id);
      this.dataTable.splice(indexTask, 1, item);
    },
    removeAllConclued() {
      const filterConclued = this.dataTable.filter(
        (item) => item.status === "Concluido"
      );
      filterConclued.forEach((element) => {
        const indexConclued = this.dataTable.findIndex(
          (item) => item.id === element.id
        );
        this.dataTable.splice(indexConclued, 1);
        deleteTask(element.id);
      });
      this.$toast.add({
        severity: "success",
        detail: "Todas as task(s) concluidas foram removidas!!",
        life: 3000,
      });
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
    // returnColorStatus(item) {
    //   const colorsStatus = {
    //     desenvolvimento: " status-processing span-status",
    //     concluido: "status-done span-status",
    //   };
    //   const color = colorsStatus[item.status.toLowerCase()];
    //   return color;
    // },
    enabledcreateTask() {
      if (this.selectedDescription && this.selectedStatus) {
        return false;
      }
      return true;
    },
    clear() {
      this.selectedDescription = "";
      this.selectedStatus = "";
    },
    createTask() {
     addTaskList(this.parseTask())
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
    parseTask() {
      return {
        description: this.selectedDescription,
        status: this.selectedStatus,
      };
    },
  },
};
</script>

<style lang="scss">
.todo-list {
  h2 {
    font-family: "SF Pro Display Bold";
  }
  &__add {
    display: flex;
    align-items: flex-end;
    .item {
      h5 {
        font-size: 15px;
        font-family: "SF Pro Display Medium";
      }
    }
  }
  &__table {
    .check-done {
      color: #25a57d;
    }
    .trash {
      color: #d54545;
    }
    .span-status {
      height: 30px;
      width: 4px;
      left: 0;
      border-radius: 0px 5px 5px 0px;
      top: 11px;
    }
    .status-done {
      background: #25a57d;
    }
    .status-error {
      background: #d54545;
    }
    .status-processing {
      background: #2196f3;
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>