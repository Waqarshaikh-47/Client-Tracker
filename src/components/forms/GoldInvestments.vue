<template>
  <div class="container mt-5">
    <h1>Gold Investment Details</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="goldInvestmentFormData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentValue" class="form-label"
          >Investment Value per Gram (in Rs)</label
        >
        <input
          v-model="goldInvestmentFormData.investmentValue"
          type="number"
          class="form-control"
          id="investmentValue"
          placeholder="Enter investment value per gram"
          required
        />
      </div>
      <div class="mb-3">
        <label for="quantity" class="form-label">Quantity of Grams</label>
        <input
          v-model="goldInvestmentFormData.quantity"
          type="number"
          class="form-control"
          id="quantity"
          placeholder="Enter quantity of grams"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentDate" class="form-label"
          >Date of Investment</label
        >
        <input
          v-model="goldInvestmentFormData.investmentDate"
          type="date"
          class="form-control"
          id="investmentDate"
          required
          style="max-width: 200px;"
        />
      </div>
      <div class="mb-3">
        <label for="goldType" class="form-label">Select Gold Type</label>
        <select v-model="goldInvestmentFormData.goldType" class="form-select" id="goldType">
          <option value="" selected>Not Specified</option>
          <option value="22 Carat">22 Carat</option>
          <option value="24 Carat">24 Carat</option>
        </select>
        <div v-if="goldInvestmentFormData.goldType != '22 Carat' && goldInvestmentFormData.goldType != '24 Carat'">
          <input v-model="goldInvestmentFormData.goldType" type="text" class="form-control" id="goldType" placeholder="Enter gold type" required>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4 mb-4">
        <button
          :disabled="legIndex == 0"
          @click.prevent="previousButton"
          type="button"
          class="btn btn-secondary"
        >
          Previous
        </button>
        <button type="submit" class="btn btn-primary">
          Save & Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from 'vuex';
import { GoldInvestmentDetails } from "@/schemas/forms/GoldInvestmentDetails";
import { cloneDeep } from 'lodash';
import queries from '@/plugins/db/queries/quries';

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step","prev-step"]);
const goldInvestmentFormData = ref(new GoldInvestmentDetails('',0,0,'',''));
const originalData = cloneDeep(goldInvestmentFormData.value);

const updateClientsData = async () => {
  let clientId = store.state.clientId;
  let newData = cloneDeep(goldInvestmentFormData.value);
  const data = {
    goldInvestmentFormData: [{ ...newData }],
    lastUpdated: Date(),
    fillerInfo: {
      name: store.state.user.displayName,
      email: store.state.user.email,
    }
  };
  await queries.updateClientInformationData(clientId, data);
};

const submitForm = async () => {
  try {
    store.commit('setLoading', true);
    store.commit("setGoldInvestmentFormData", goldInvestmentFormData.value);
    await updateClientsData();
    store.commit('setLoading', false);
    emit("next-step");
  } catch (error) {
    // Show alert notification
    alert("Something went wrong. Please try again.");
    store.commit('setLoading', false);
    // Reset form to original values
    Object.assign(goldInvestmentFormData.value, cloneDeep(originalData));
  }
};

const previousButton = () => {
  emit("prev-step");
};
</script>


<style scoped>
.btn-primary {
  background-color: #3d444b;
  border-color: #3d444b;
}

.btn-primary:hover {
  background-color: #000000;
  border-color: #000000;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #5a6167;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6167;
}
</style>
