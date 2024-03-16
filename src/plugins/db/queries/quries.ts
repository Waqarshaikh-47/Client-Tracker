// queries.ts

import firestore from "@/plugins/db/fireBaseInit";
import { User } from "@/schemas/user/User";
const queries: any = {
  async fetchUserDataByEmail(email: string) {
    console.log(email);

    try {
      const querySnapshot = await firestore
        .collection("users")
        .where("email", "==", email)
        .get();
      const userData: any = [];
      querySnapshot.forEach((userDoc) => {
        userData.push(userDoc.data());
      });
      return userData;
    } catch (error) {
      console.error("Error fetching user data by email:", error);
      throw error;
    }
  },

  async addUser(userData: User) {
    try {
      const userDataPlainObject = { ...userData }; // Convert User object to plain JavaScript object
      await firestore.collection("users").add(userDataPlainObject);
      console.log("User added successfully");
      alert("User added successfully");
    } catch (error) {
      alert("error" + error);
      console.error("Error adding user:", error);
      throw error;
    }
  },

  async getAllClientsInformation() {
    try {
      let data: any[] = [];
      const res = await firestore.collection("client-info").get();
      res.forEach((userDoc: any) => {
        data.push(userDoc.data());
      });
      return data;
    } catch (error) {
      console.log();
      return [];
    }
  },

  async addClientInformationData(data: object) {
    try {
      await firestore.collection("client-info").add({ ...data });
      console.log("User added successfully");
      alert("User added successfully");
    } catch (error) {
      alert("error" + error);
      console.error("Error adding user:", error);
      throw error;
    }
  },
  // Define more query functions here
};

export default queries;
