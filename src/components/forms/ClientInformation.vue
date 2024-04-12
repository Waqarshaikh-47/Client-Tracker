<template>
  <div class="container mt-5">
    <h1>Client Information</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name</label>
        <input
          v-model="clientInformationData.fullName"
          type="text"
          class="form-control"
          id="fullName"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="panNumber" class="form-label">PAN Card Number</label>
        <input
          v-model="clientInformationData.panNumber"
          pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
          type="text"
          class="form-control"
          id="panNumber"
          placeholder="Enter your PAN card number"
          title="PAN number should be in the format ABCDE1234F"
          required
        />
      </div>
      <div class="mb-3">
        <label for="dob" class="form-label">Date of Birth</label>
        <input
          v-model="clientInformationData.dob"
          type="date"
          class="form-control"
          id="dob"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input
          v-model="clientInformationData.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          v-model="clientInformationData.phone"
          type="tel"
          class="form-control"
          id="phone"
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
          title="Mobile number should contain 10 digits"
          required
        />
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select
          v-model="clientInformationData.gender"
          id="gender"
          class="form-control"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <textarea
          v-model="clientInformationData.address"
          id="address"
          class="form-control"
          rows="4"
          placeholder="Enter address"
          required
        ></textarea>
      </div>
      <div class="d-flex justify-content-between mt-4 mb-4">
        <button type="submit" class="btn btn-primary">
          {{ "Save & Continue" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref, onMounted } from "vue";
import { ClientInformation } from "@/schemas/forms/ClientInformation";
import { useStore } from "vuex";
import queries from "@/plugins/db/queries/quries";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const clientInformationData = new ClientInformation("", "", "", "", "", "");

const saveClientsData = async () => {
  const data = {
    clientInformationFormData: { ...clientInformationData },
    mutualFundFormData: [],
    insurancePolicyFormData: [],
    goldInvestmentFormData: [],
    fixedDepositFormData: [],
    indiaPostFormData: [],
    startDate: Date(),
    lastUpdated: Date(),
    fillerInfo: {
      name: store.state.user.displayName,
      email: store.state.user.email,
    },
  };
  let clientId = await queries.addClientInformationData(data);
  return clientId;
  // Save data to database or perform other actions
};

const submitForm = async () => {
  try {
    store.commit("setLoading", true);
    store.commit("setClientInformationFormData", clientInformationData);
    let clientId = await saveClientsData();
    store.commit("setClientId", clientId);
    store.commit("setLoading", false);
    emit("next-step");
  } catch (error) {
    // Show alert notification
    alert("Something went wrong. Please try again.");
  }
};

const previousButton = () => {
  emit("prev-step");
};

onMounted(() => {});
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

/* Added style for the max-width of date input */
input[type="date"] {
  max-width: 200px;
}
</style>
