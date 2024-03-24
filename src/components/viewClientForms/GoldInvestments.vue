<template>
  <div class="container mt-5">
    <h1>Gold Investment Details</h1>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ goldInvestmentFormData.name }}</p>
      <p>
        <strong>Investment Value per Gram (in Rs):</strong>
        {{ goldInvestmentFormData.investmentValue }}
      </p>
      <p>
        <strong>Quantity of Grams:</strong>
        {{ goldInvestmentFormData.quantity }}
      </p>
      <p>
        <strong>Date of Investment:</strong>
        {{ goldInvestmentFormData.investmentDate }}
      </p>
      <p><strong>Gold Type:</strong> {{ goldInvestmentFormData.goldType }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else>
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
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="goldType" class="form-label">Select Gold Type</label>
        <select
          v-model="goldInvestmentFormData.goldType"
          class="form-select"
          id="goldType"
        >
          <option value="" selected>Not Specified</option>
          <option value="22 Carat">22 Carat</option>
          <option value="24 Carat">24 Carat</option>
        </select>
        <div
          v-if="
            goldInvestmentFormData.goldType !== '22 Carat' &&
            goldInvestmentFormData.goldType !== '24 Carat'
          "
        >
          <input
            v-model="goldInvestmentFormData.goldType"
            type="text"
            class="form-control"
            id="goldType"
            placeholder="Enter gold type"
            required
          />
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-between mt-4 mb-4">
      <button @click="toggleEditMode" class="btn btn-primary">
        {{ isEditing ? "Save" : "Edit" }}
      </button>
    </div>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { GoldInvestmentDetails } from "@/schemas/forms/GoldInvestmentDetails";
import queries from '@/plugins/db/queries/quries';

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const currentFormInfo = store.state.viewClientData.clientData.goldInvestmentFormData;
const emit = defineEmits(["next-step", "prev-step"]);
const goldInvestmentFormData = ref(new GoldInvestmentDetails());
const isEditing = ref(false);


const toggleEditMode = () => {
  if (isEditing.value) {
    updateClientsData()
  }
  isEditing.value = !isEditing.value;
};
const updateClientsData = async() => {
  store.commit('setLoading',true)
  try {
    let clientId = store.state.viewClientData.id;
    const data = {
      goldInvestmentFormData: { ...goldInvestmentFormData.value },
      lastUpdated: Date(),
    }
    await queries.updateClientInformationData(clientId,data);
    store.commit('setLoading',false)
  } catch (error) {
    console.error("Error updating client data:", error);
    store.commit('setLoading',false)

    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
    throw error;
  }
}


const fetchGoldInvestmentData = () => {
  goldInvestmentFormData.value = new GoldInvestmentDetails(
    currentFormInfo.name ? currentFormInfo.name : '',
    currentFormInfo.investmentValue ? currentFormInfo.investmentValue : '',
    currentFormInfo.quantity ? currentFormInfo.quantity : '',
    currentFormInfo.investmentDate ? currentFormInfo.investmentDate : '',
    currentFormInfo.goldType ? currentFormInfo.goldType : ''
  );
};

fetchGoldInvestmentData();
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
