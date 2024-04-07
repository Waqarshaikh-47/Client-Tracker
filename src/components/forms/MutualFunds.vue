<template>
  <div class="container mt-5">
    <h1>Mutual Funds</h1>
    <form @submit.prevent="submitForm">
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
        <label for="fundName" class="form-label">Fund Name</label>
        <input
          v-model="mutualFundFormData.fundName"
          type="text"
          class="form-control"
          id="fundName"
          placeholder="Enter Fund name"
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

<script setup language="ts">
import { onMounted, ref } from "vue";
import { useStore } from 'vuex';
import { MutualFundDetails } from "@/schemas/forms/MutualFundDetails";
import queries from '@/plugins/db/queries/quries';

const store = useStore()
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const mutualFundFormData = new MutualFundDetails();
onMounted(()=>{
  // Data initialization when field is not required
  mutualFundFormData.remark = ''
})
const updateClientsData = async() => {
  let clientId = store.state.clientId;
  const data = {
    mutualFundFormData: [{ ...mutualFundFormData }],
    lastUpdated: Date(),
    fillerInfo: {
      name: store.state.user.displayName,
      email: store.state.user.email,
    }
  }
  await queries.updateClientInformationData(clientId,data);
}

const submitForm = async() => {
  try {
    store.commit('setLoading', true);
    store.commit("setMutualFundFormData", mutualFundFormData);
    await updateClientsData();
    store.commit('setLoading', false);
      emit("next-step");
  } catch (error) {
    // Show alert notification
    store.commit('setLoading', false);
    alert("Something went wrong. Please try again.");
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
