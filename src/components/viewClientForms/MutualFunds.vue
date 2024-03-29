<template>
  <div class="container mt-5">
    <h1>Mutual Funds</h1>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ mutualFundFormData.name }}</p>
      <p><strong>Start Date:</strong> {{ mutualFundFormData.startDate }}</p>
      <p>
        <strong>Investment Type:</strong>
        {{ mutualFundFormData.investmentType }}
      </p>
      <p><strong>Company Name:</strong> {{ mutualFundFormData.companyName }}</p>
      <p>
        <strong>Investment Amount:</strong>
        {{ mutualFundFormData.investmentAmount }}
      </p>
      <p><strong>Remark:</strong> {{ mutualFundFormData.remark }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="mutualFundFormData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date</label>
        <input
          v-model="mutualFundFormData.startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
          style="max-width: 200px;"
        />
      </div>
      <div class="mb-3">
        <label for="investmentType" class="form-label">Investment Type</label>
        <select
          v-model="mutualFundFormData.investmentType"
          class="form-select"
          id="investmentType"
          required
        >
          <option value="" disabled selected>Select investment type</option>
          <option value="SIP">SIP</option>
          <option value="Lumpsum">Lumpsum</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="companyName" class="form-label">Company Name</label>
        <input
          v-model="mutualFundFormData.companyName"
          type="text"
          class="form-control"
          id="companyName"
          placeholder="Enter company name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentAmount" class="form-label"
          >Investment Amount</label
        >
        <input
          v-model="mutualFundFormData.investmentAmount"
          type="number"
          class="form-control"
          id="investmentAmount"
          placeholder="Enter investment amount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="remark" class="form-label">Remark</label>
        <textarea
          v-model="mutualFundFormData.remark"
          class="form-control"
          id="remark"
          rows="3"
          placeholder="Enter any remarks"
        ></textarea>
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
import { MutualFundDetails } from "@/schemas/forms/MutualFundDetails";
import { useStore } from "vuex";
import queries from '@/plugins/db/queries/quries';
import { cloneDeep } from "lodash";


const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const mutualFundFormData = ref(new MutualFundDetails());
const isEditing = ref(false);
const currentFormInfo = store.state.viewClientData.clientData.mutualFundFormData;

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
      mutualFundFormData: { ...mutualFundFormData.value },
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

const fetchMutualFundFormData = () => {
  // Simulated data for example
  mutualFundFormData.value = new MutualFundDetails(
    currentFormInfo.name ? currentFormInfo.name : '',
    currentFormInfo.startDate ? currentFormInfo.startDate : '',
    currentFormInfo.investmentType ? currentFormInfo.investmentType : '',
    currentFormInfo.companyName ? currentFormInfo.companyName : '',
    currentFormInfo.investmentAmount ? currentFormInfo.investmentAmount : '',
    currentFormInfo.remark ? currentFormInfo.remark : '',
  );
};

fetchMutualFundFormData();

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
